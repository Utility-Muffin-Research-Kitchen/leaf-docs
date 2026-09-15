#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { get } from 'node:https';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { URL, fileURLToPath } from 'node:url';

const checkRemote = process.argv.includes('--remote');
const catalogArg = process.argv.indexOf('--catalog');
const previousCatalogArg = process.argv.indexOf('--previous-catalog');
const archiveArg = process.argv.indexOf('--archive');
if (catalogArg >= 0 && !process.argv[catalogArg + 1]) {
  console.error('usage: validate-pakrat-catalog.mjs [--remote] [--catalog <path>] [--previous-catalog <path>]');
  process.exit(2);
}
if (previousCatalogArg >= 0 && !process.argv[previousCatalogArg + 1]) {
  console.error('usage: validate-pakrat-catalog.mjs [--remote] [--catalog <path>] [--previous-catalog <path>]');
  process.exit(2);
}
if (archiveArg >= 0 && !process.argv[archiveArg + 1]) {
  console.error('usage: validate-pakrat-catalog.mjs [--remote] [--archive <path>] [--catalog <path>] [--previous-catalog <path>]');
  process.exit(2);
}
const catalogPath = catalogArg >= 0
  ? process.argv[catalogArg + 1]
  : new URL('../public/pakrat/v1/storefront.json', import.meta.url);
const previousCatalogPath = previousCatalogArg >= 0
  ? process.argv[previousCatalogArg + 1]
  : null;
const archivePath = archiveArg >= 0 ? process.argv[archiveArg + 1] : null;
const errors = [];
const previews = [];
const VERSION_RE = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const MAX_VERSION_COMPONENT = 9999;
const MAX_PACKAGE_VERSIONS = 16;

// THEME-1 (leaf-contracts docs/themes.md). The themes lane restates the
// package rules a catalog entry can express; the archive itself is judged by
// the reference validator in leaf-contracts, never by a copy of it here.
const THEME_ID_RE = /^[a-z0-9][a-z0-9-]{1,39}$/;
const THEME_VERSION_RE = /^(0|[1-9][0-9]{0,3})\.(0|[1-9][0-9]{0,3})\.(0|[1-9][0-9]{0,3})$/;
const THEME_MIN_LEAF_VERSION = '0.12.0';
const THEME_LICENSES = ['CC-BY-4.0', 'CC-BY-SA-4.0', 'CC0-1.0', 'redistribution-permitted'];
// THEME-1 reserved install names: the bundled themes a Leaf release replaces
// on every install. The one list is the "Reserved install names" table in
// leaf-contracts docs/themes.md; keep this in step with it. The archive check
// also refuses these (theme-reserved-name), but a catalog-only check must
// catch them without --remote or --archive. Compared case-insensitively
// because the card is FAT32; THEME-1 ids are lowercase anyway.
const THEME_RESERVED_INSTALL_NAMES = ['sample'];
// An allowlist rather than the other lanes' open shape: a misspelled
// `withdrawn` would otherwise leave a taken-down theme installable.
const THEME_KEYS = new Set([
  'id', 'name', 'author', 'owner_github_id', 'summary', 'description', 'license',
  'preview', 'version', 'min_leaf_version', 'install_name', 'artifact', 'versions',
  'withdrawn',
]);
const THEME_REFUSED_KEYS = new Set(['platform', 'runtime', 'runtime_manifest_path', 'packages']);
const THEME_VERSION_KEYS = new Set(['version', 'min_leaf_version', 'artifact']);
const isReservedThemeName = (value) =>
  typeof value === 'string' && THEME_RESERVED_INSTALL_NAMES.includes(value.toLowerCase());
const themeArchiveCheck = fileURLToPath(new URL('./theme-archive-check.py', import.meta.url));

function fail(path, message) {
  errors.push(`${path}: ${message}`);
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requireObject(value, path) {
  if (!isObject(value)) {
    fail(path, 'must be an object');
    return false;
  }
  return true;
}

function requireString(value, path) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(path, 'must be a non-empty string');
    return false;
  }
  return true;
}

function requireInteger(value, path, min = 1) {
  if (!Number.isSafeInteger(value) || value < min) {
    fail(path, `must be an integer >= ${min}`);
    return false;
  }
  return true;
}

function requireSafeRelativePath(value, path) {
  if (!requireString(value, path)) {
    return false;
  }
  if (value.startsWith('/') || value.includes('\\') || value.split('/').includes('..')) {
    fail(path, 'must be a safe relative path');
    return false;
  }
  return true;
}

function requireHttpsUrl(value, path) {
  if (!requireString(value, path)) {
    return false;
  }
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail(path, 'must be a valid URL');
    return false;
  }
  if (parsed.protocol !== 'https:') {
    fail(path, 'must use HTTPS');
    return false;
  }
  if (['localhost', '127.0.0.1', '::1'].includes(parsed.hostname)) {
    fail(path, 'must not point at a local development host');
    return false;
  }
  return true;
}

function requireSha256(value, path) {
  if (!requireString(value, path)) {
    return false;
  }
  if (!/^[a-f0-9]{64}$/i.test(value)) {
    fail(path, 'must be a 64-character SHA-256 hex digest');
    return false;
  }
  return true;
}

function requireVersion(value, path) {
  if (!requireString(value, path)) {
    return null;
  }
  if (!VERSION_RE.test(value)) {
    fail(path, 'must be a bare MAJOR.MINOR.PATCH version');
    return null;
  }
  const parsed = value.split('.').map(Number);
  if (parsed.some((component) => component > MAX_VERSION_COMPONENT)) {
    fail(path, `components must be <= ${MAX_VERSION_COMPONENT}`);
    return null;
  }
  return parsed;
}

function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) {
      return left[index] - right[index];
    }
  }
  return 0;
}

function requireStringArray(value, path) {
  if (!Array.isArray(value)) {
    fail(path, 'must be an array');
    return false;
  }
  value.forEach((item, index) => requireString(item, `${path}[${index}]`));
  return true;
}

function validateArtifact(artifact, path) {
  if (!requireObject(artifact, path)) {
    return false;
  }
  const validUrl = requireHttpsUrl(artifact.url, `${path}.url`);
  const validName = requireString(artifact.name, `${path}.name`);
  if (artifact.archive !== 'zip') {
    fail(`${path}.archive`, 'must be "zip"');
  }
  const validSize = requireInteger(artifact.size, `${path}.size`);
  const validInstalledSize = requireInteger(
    artifact.installed_size,
    `${path}.installed_size`,
  );
  const validSha = requireSha256(artifact.sha256, `${path}.sha256`);
  return validUrl && validName && artifact.archive === 'zip' && validSize &&
    validInstalledSize && validSha;
}

function artifactsEqual(left, right) {
  return isObject(left) && isObject(right) &&
    left.url === right.url &&
    left.name === right.name &&
    left.archive === right.archive &&
    left.size === right.size &&
    left.installed_size === right.installed_size &&
    typeof left.sha256 === 'string' &&
    typeof right.sha256 === 'string' &&
    left.sha256.toLowerCase() === right.sha256.toLowerCase();
}

function packageHistory(pkg) {
  if (Array.isArray(pkg.versions)) {
    return pkg.versions;
  }
  return [{
    version: pkg.version,
    ...(Object.hasOwn(pkg, 'min_leaf_version')
      ? { min_leaf_version: pkg.min_leaf_version }
      : {}),
    artifact: pkg.artifact,
  }];
}

function historyEntriesEqual(left, right) {
  const leftMinimum = Object.hasOwn(left, 'min_leaf_version')
    ? left.min_leaf_version
    : null;
  const rightMinimum = Object.hasOwn(right, 'min_leaf_version')
    ? right.min_leaf_version
    : null;
  return left.version === right.version && leftMinimum === rightMinimum &&
    artifactsEqual(left.artifact, right.artifact);
}

function validateImmutableHistory(previous, current) {
  if (!isObject(previous) || !Array.isArray(previous.apps) ||
      !isObject(current) || !Array.isArray(current.apps)) {
    fail('$', 'cannot compare immutable history from malformed catalogs');
    return;
  }

  const lanes = ['apps', 'content'];
  for (const lane of lanes) {
    const previousEntries = Array.isArray(previous[lane]) ? previous[lane] : [];
    const currentEntries = Array.isArray(current[lane]) ? current[lane] : [];
    for (const previousApp of previousEntries) {
      const appPath = `$.${lane}[id=${JSON.stringify(previousApp.id)}]`;
      const currentApp = currentEntries.find((candidate) => candidate.id === previousApp.id);
      if (!currentApp) {
        fail(appPath, `previously published ${lane === 'apps' ? 'app' : 'content package'} must not be removed or change lanes`);
        continue;
      }
      if (!Array.isArray(previousApp.packages) || !Array.isArray(currentApp.packages)) {
        fail(`${appPath}.packages`, 'cannot compare malformed package history');
        continue;
      }
      for (const previousPackage of previousApp.packages) {
        const pkgPath = `${appPath}.packages[platform=${JSON.stringify(previousPackage.platform)},install_name=${JSON.stringify(previousPackage.install_name)}]`;
        const currentPackage = currentApp.packages.find((candidate) =>
          candidate.platform === previousPackage.platform &&
          candidate.install_name === previousPackage.install_name);
        if (!currentPackage) {
          fail(pkgPath, 'previously published package must not be removed');
          continue;
        }
        for (const previousEntry of packageHistory(previousPackage)) {
          const currentEntry = packageHistory(currentPackage).find(
            (candidate) => candidate.version === previousEntry.version,
          );
          const versionPath = `${pkgPath}.versions[version=${JSON.stringify(previousEntry.version)}]`;
          if (!currentEntry) {
            fail(versionPath, 'previously published version must not be removed');
          } else if (!historyEntriesEqual(previousEntry, currentEntry)) {
            fail(versionPath, 'previously published version facts are immutable');
          }
        }
      }
    }
  }
  validateImmutableThemes(previous, current);
}

function requireThemeVersion(value, path) {
  if (!requireString(value, path)) {
    return null;
  }
  if (!THEME_VERSION_RE.test(value)) {
    fail(path, 'must be MAJOR.MINOR.PATCH with components 0-9999 and no leading zeros');
    return null;
  }
  return value.split('.').map(Number);
}

function requireThemeMinimum(value, path) {
  const parsed = requireThemeVersion(value, path);
  if (parsed && compareVersions(parsed, THEME_MIN_LEAF_VERSION.split('.').map(Number)) < 0) {
    fail(path, `must be at least ${THEME_MIN_LEAF_VERSION}`);
    return null;
  }
  return parsed;
}

function requireKnownKeys(object, allowed, path) {
  for (const key of Object.keys(object)) {
    if (THEME_REFUSED_KEYS.has(key)) {
      fail(`${path}.${key}`, 'themes are platform-independent and have no runtime; this key is refused');
    } else if (!allowed.has(key)) {
      fail(`${path}.${key}`, 'is not a themes lane field');
    }
  }
}

function validateTheme(theme, themePath, ids, artifacts) {
  if (!requireObject(theme, themePath)) {
    return;
  }
  requireKnownKeys(theme, THEME_KEYS, themePath);
  if (requireString(theme.id, `${themePath}.id`)) {
    if (!THEME_ID_RE.test(theme.id)) {
      fail(`${themePath}.id`, `must match ${THEME_ID_RE.source}`);
    }
    if (isReservedThemeName(theme.id)) {
      fail(`${themePath}.id`, `"${theme.id}" is a reserved install name (THEME-1 theme-reserved-name)`);
    }
    if (ids.has(theme.id)) {
      fail(`${themePath}.id`, `duplicate id "${theme.id}" (an id may appear in exactly one lane)`);
    }
    ids.add(theme.id);
  }
  requireString(theme.name, `${themePath}.name`);
  requireString(theme.author, `${themePath}.author`);
  requireString(theme.summary, `${themePath}.summary`);
  if ('description' in theme) {
    requireString(theme.description, `${themePath}.description`);
  }
  requireInteger(theme.owner_github_id, `${themePath}.owner_github_id`);
  if (!THEME_LICENSES.includes(theme.license)) {
    fail(`${themePath}.license`, `must be one of ${THEME_LICENSES.join(', ')}`);
  }
  if ('withdrawn' in theme && typeof theme.withdrawn !== 'boolean') {
    fail(`${themePath}.withdrawn`, 'must be a boolean when present');
  }

  const previewPath = `${themePath}.preview`;
  if (requireObject(theme.preview, previewPath)) {
    const validUrl = requireHttpsUrl(theme.preview.url, `${previewPath}.url`);
    const validSha = requireSha256(theme.preview.sha256, `${previewPath}.sha256`);
    const validSize = requireInteger(theme.preview.size, `${previewPath}.size`);
    if (validUrl && validSha && validSize) {
      previews.push({ preview: theme.preview, path: previewPath });
    }
  }

  requireThemeVersion(theme.version, `${themePath}.version`);
  requireThemeMinimum(theme.min_leaf_version, `${themePath}.min_leaf_version`);
  if (typeof theme.install_name !== 'string' || theme.install_name !== theme.id) {
    fail(`${themePath}.install_name`, 'must equal the theme id (no .pak suffix)');
  }
  if (theme.install_name !== theme.id && isReservedThemeName(theme.install_name)) {
    fail(
      `${themePath}.install_name`,
      `"${theme.install_name}" is a reserved install name (THEME-1 theme-reserved-name)`,
    );
  }
  const artifactPath = `${themePath}.artifact`;
  validateArtifact(theme.artifact, artifactPath);

  // Unlike apps[] and content[] there is no legacy reader to serve, so the
  // history is always present and the top-level fields mirror its newest entry.
  const versionsPath = `${themePath}.versions`;
  if (!Array.isArray(theme.versions) || theme.versions.length === 0) {
    fail(versionsPath, 'must be a non-empty array');
    return;
  }
  if (theme.versions.length > MAX_PACKAGE_VERSIONS) {
    fail(versionsPath, `must contain at most ${MAX_PACKAGE_VERSIONS} entries`);
  }
  const seenVersions = new Set();
  let previousParsed = null;
  theme.versions.forEach((entry, versionIndex) => {
    const versionPath = `${versionsPath}[${versionIndex}]`;
    if (!requireObject(entry, versionPath)) {
      return;
    }
    requireKnownKeys(entry, THEME_VERSION_KEYS, versionPath);
    const parsed = requireThemeVersion(entry.version, `${versionPath}.version`);
    if (typeof entry.version === 'string') {
      if (seenVersions.has(entry.version)) {
        fail(`${versionPath}.version`, `duplicate theme version "${entry.version}"`);
      }
      seenVersions.add(entry.version);
    }
    if (parsed && previousParsed && compareVersions(previousParsed, parsed) <= 0) {
      fail(`${versionPath}.version`, 'versions must be strictly descending newest-first');
    }
    if (parsed) {
      previousParsed = parsed;
    }
    let minimum = null;
    if (!('min_leaf_version' in entry)) {
      fail(`${versionPath}.min_leaf_version`, 'every theme version must declare min_leaf_version');
    } else {
      minimum = requireThemeMinimum(entry.min_leaf_version, `${versionPath}.min_leaf_version`);
    }
    const versionArtifactPath = `${versionPath}.artifact`;
    if (validateArtifact(entry.artifact, versionArtifactPath) && parsed && minimum) {
      artifacts.push({
        kind: 'theme',
        artifact: entry.artifact,
        path: versionArtifactPath,
        themeId: theme.id,
        version: entry.version,
        minLeafVersion: entry.min_leaf_version,
        // license and preview describe the newest version only; an older
        // package may carry the license it was published under.
        license: versionIndex === 0 ? theme.license : null,
      });
    }
  });

  const newest = theme.versions[0];
  if (!isObject(newest)) {
    return;
  }
  if (theme.version !== newest.version) {
    fail(`${themePath}.version`, `must match newest version ${JSON.stringify(newest.version)}`);
  }
  if (theme.min_leaf_version !== newest.min_leaf_version) {
    fail(
      `${themePath}.min_leaf_version`,
      `must mirror the newest version's gate ${JSON.stringify(newest.min_leaf_version ?? null)}`,
    );
  }
  if (!artifactsEqual(theme.artifact, newest.artifact)) {
    fail(artifactPath, `must exactly match newest-version artifact ${versionsPath}[0].artifact`);
  }
}

function validateImmutableThemes(previous, current) {
  const previousThemes = Array.isArray(previous.themes) ? previous.themes : [];
  const currentThemes = Array.isArray(current.themes) ? current.themes : [];
  for (const previousTheme of previousThemes) {
    if (!isObject(previousTheme)) {
      continue;
    }
    const themePath = `$.themes[id=${JSON.stringify(previousTheme.id)}]`;
    const currentTheme = currentThemes.find(
      (candidate) => isObject(candidate) && candidate.id === previousTheme.id,
    );
    if (!currentTheme) {
      fail(themePath, 'previously published theme must not be removed or change lanes');
      continue;
    }
    if (!Array.isArray(previousTheme.versions) || !Array.isArray(currentTheme.versions)) {
      fail(`${themePath}.versions`, 'cannot compare malformed theme history');
      continue;
    }
    // Everything a published version says is fixed. `withdrawn` and the
    // display fields are not part of a version, so a takedown (or its
    // reversal) passes here untouched.
    let newestPublished = null;
    for (const previousEntry of previousTheme.versions) {
      if (!isObject(previousEntry)) {
        continue;
      }
      const versionPath = `${themePath}.versions[version=${JSON.stringify(previousEntry.version)}]`;
      const currentEntry = currentTheme.versions.find(
        (candidate) => isObject(candidate) && candidate.version === previousEntry.version,
      );
      if (!currentEntry) {
        fail(versionPath, 'previously published version must not be removed');
      } else if (!historyEntriesEqual(previousEntry, currentEntry)) {
        fail(versionPath, 'previously published version facts are immutable');
      }
      if (typeof previousEntry.version === 'string' && THEME_VERSION_RE.test(previousEntry.version)) {
        const parsed = previousEntry.version.split('.').map(Number);
        if (!newestPublished || compareVersions(parsed, newestPublished.parsed) > 0) {
          newestPublished = { parsed, version: previousEntry.version };
        }
      }
    }
    if (!newestPublished) {
      continue;
    }
    for (const currentEntry of currentTheme.versions) {
      if (!isObject(currentEntry) || typeof currentEntry.version !== 'string' ||
          !THEME_VERSION_RE.test(currentEntry.version) ||
          previousTheme.versions.some((entry) => isObject(entry) && entry.version === currentEntry.version)) {
        continue;
      }
      if (compareVersions(currentEntry.version.split('.').map(Number), newestPublished.parsed) <= 0) {
        fail(
          `${themePath}.versions[version=${JSON.stringify(currentEntry.version)}]`,
          `a new version must be greater than the newest published version ${JSON.stringify(newestPublished.version)}`,
        );
      }
    }
  }
}

function validateCatalog(catalog) {
  if (!requireObject(catalog, '$')) {
    return [];
  }
  if (catalog.schema !== 1) {
    fail('$.schema', 'must be 1');
  }
  if (catalog.product !== 'pak-rat') {
    fail('$.product', 'must be "pak-rat"');
  }
  requireString(catalog.catalog_revision, '$.catalog_revision');
  if (requireString(catalog.generated_at, '$.generated_at') && Number.isNaN(Date.parse(catalog.generated_at))) {
    fail('$.generated_at', 'must be an ISO-like date string');
  }
  if (!Array.isArray(catalog.apps)) {
    fail('$.apps', 'must be an array');
    return [];
  }
  // STORE-CONTENT-1. `schema` stays 1 and the key is optional: a gate-unaware
  // client parses apps[], ignores an unknown `content` key, and never learns a
  // content pak exists. A present-but-malformed lane is still an error.
  if ('content' in catalog && !Array.isArray(catalog.content)) {
    fail('$.content', 'must be an array when present');
    return [];
  }
  const contentLane = Array.isArray(catalog.content) ? catalog.content : [];
  // THEME-1 store lane. Optional for the same reason as content[]: shipped
  // launchers read only apps and content and ignore this key.
  if ('themes' in catalog && !Array.isArray(catalog.themes)) {
    fail('$.themes', 'must be an array when present');
    return [];
  }

  const ids = new Set();
  const artifacts = [];
  const lanes = [
    { entries: catalog.apps, key: 'apps', isContent: false },
    { entries: contentLane, key: 'content', isContent: true },
  ];
  lanes.forEach(({ entries, key: laneKey, isContent }) => {
    entries.forEach((app, appIndex) => {
      const appPath = `$.${laneKey}[${appIndex}]`;
      if (!requireObject(app, appPath)) {
        return;
      }
      if (requireString(app.id, `${appPath}.id`)) {
        if (ids.has(app.id)) {
          // Shared across BOTH lanes on purpose: an id in apps[] and content[]
          // resolves to one install_path, which is a duplicate-identity bug.
          fail(`${appPath}.id`, `duplicate app id "${app.id}" (an id may appear in exactly one lane)`);
        }
        ids.add(app.id);
      }
      requireString(app.name, `${appPath}.name`);
      requireString(app.summary, `${appPath}.summary`);
      requireVersion(app.version, `${appPath}.version`);
      if ('description' in app) {
        requireString(app.description, `${appPath}.description`);
      }
      if ('author' in app) {
        requireString(app.author, `${appPath}.author`);
      }
      if ('repo_url' in app) {
        requireHttpsUrl(app.repo_url, `${appPath}.repo_url`);
      }
      if ('categories' in app) {
        requireStringArray(app.categories, `${appPath}.categories`);
      }
      if (!Array.isArray(app.packages) || app.packages.length === 0) {
        fail(`${appPath}.packages`, 'must be a non-empty array');
        return;
      }

      app.packages.forEach((pkg, pkgIndex) => {
        const pkgPath = `${appPath}.packages[${pkgIndex}]`;
        if (!requireObject(pkg, pkgPath)) {
          return;
        }
        if (requireString(pkg.platform, `${pkgPath}.platform`) && pkg.platform !== 'mlp1') {
          // D16: cores and standalone emulator binaries are platform-specific,
          // so a content package can never be "shared".
          fail(
            `${pkgPath}.platform`,
            isContent && pkg.platform === 'shared'
              ? 'content packages must name a concrete platform; "shared" is refused'
              : 'must be "mlp1"',
          );
        }
        if (pkg.runtime !== 'leaf') {
          fail(`${pkgPath}.runtime`, 'must be "leaf"');
        }
        requireVersion(pkg.version, `${pkgPath}.version`);
        if (pkg.version !== app.version) {
          fail(`${pkgPath}.version`, 'must match the legacy app version');
        }
        if ('min_leaf_version' in pkg && !isContent) {
          fail(`${pkgPath}.min_leaf_version`, 'must be absent from the ungated legacy safe floor');
        }
        if (isContent && !('min_leaf_version' in pkg)) {
          fail(`${pkgPath}.min_leaf_version`, 'every content version must declare min_leaf_version');
        } else if (isContent) {
          requireVersion(pkg.min_leaf_version, `${pkgPath}.min_leaf_version`);
        }
        if (requireSafeRelativePath(pkg.install_name, `${pkgPath}.install_name`) &&
            !pkg.install_name.endsWith('.pak')) {
          fail(`${pkgPath}.install_name`, 'must end with .pak');
        }
        requireSafeRelativePath(pkg.runtime_manifest_path, `${pkgPath}.runtime_manifest_path`);

        const artifactPath = `${pkgPath}.artifact`;
        const legacyArtifactValid = validateArtifact(pkg.artifact, artifactPath);

        if (!('versions' in pkg)) {
          if (legacyArtifactValid) {
            artifacts.push({
              artifact: pkg.artifact,
              path: artifactPath,
              installName: pkg.install_name,
              runtimeManifestPath: pkg.runtime_manifest_path,
              version: pkg.version,
              minLeafVersion: isContent ? pkg.min_leaf_version : null,
              isContent,
            });
          }
          return;
        }

        if (!Array.isArray(pkg.versions) || pkg.versions.length === 0) {
          fail(`${pkgPath}.versions`, 'must be a non-empty array when present');
          return;
        }
        if (pkg.versions.length > MAX_PACKAGE_VERSIONS) {
          fail(`${pkgPath}.versions`, `must contain at most ${MAX_PACKAGE_VERSIONS} entries`);
        }

        const seenVersions = new Set();
        const validatedVersions = [];
        let previousParsed = null;
        pkg.versions.forEach((entry, versionIndex) => {
          const versionPath = `${pkgPath}.versions[${versionIndex}]`;
          if (!requireObject(entry, versionPath)) {
            return;
          }
          const parsed = requireVersion(entry.version, `${versionPath}.version`);
          if (typeof entry.version === 'string') {
            if (seenVersions.has(entry.version)) {
              fail(`${versionPath}.version`, `duplicate package version "${entry.version}"`);
            }
            seenVersions.add(entry.version);
          }
          if (parsed && previousParsed && compareVersions(previousParsed, parsed) <= 0) {
            fail(`${versionPath}.version`, 'versions must be strictly descending newest-first');
          }
          if (parsed) {
            previousParsed = parsed;
          }

          let minimum = null;
          const gated = 'min_leaf_version' in entry;
          if (isContent && !gated) {
            fail(`${versionPath}.min_leaf_version`, 'every content version must declare min_leaf_version');
          }
          if (gated) {
            minimum = requireVersion(entry.min_leaf_version, `${versionPath}.min_leaf_version`);
          }
          const versionArtifactPath = `${versionPath}.artifact`;
          const artifactValid = validateArtifact(entry.artifact, versionArtifactPath);
          validatedVersions.push({ entry, path: versionPath, parsed, gated });
          if (artifactValid && parsed && (!gated || minimum)) {
            artifacts.push({
              artifact: entry.artifact,
              path: versionArtifactPath,
              installName: pkg.install_name,
              runtimeManifestPath: pkg.runtime_manifest_path,
              version: entry.version,
              minLeafVersion: gated ? entry.min_leaf_version : null,
              isContent,
            });
          }
        });

        // The safe-floor rule is the ONE thing content[] relaxes: every content
        // package gates on the contract that defines it, and no gate-unaware
        // client parses this lane. Immutability and append-only history above
        // still apply unchanged.
        const mirror = isContent
          ? validatedVersions.reduce(
              (newest, candidate) =>
                !newest || compareVersions(candidate.entry.version, newest.entry.version) > 0
                  ? candidate
                  : newest,
              null,
            )
          : validatedVersions.find((candidate) => !candidate.gated);
        if (!mirror) {
          fail(
            `${pkgPath}.versions`,
            isContent ? 'must contain at least one version' : 'must contain an ungated safe-floor version',
          );
          return;
        }
        // Wording is load-bearing for the apps lane: existing tests assert these
        // exact strings, and they are what a publisher sees on a failed release.
        const mirrorLabel = isContent ? 'newest version' : 'safe floor';
        const mirrorArtifactLabel = isContent ? 'newest-version' : 'safe-floor';
        if (pkg.version !== mirror.entry.version || app.version !== mirror.entry.version) {
          fail(
            `${pkgPath}.version`,
            `legacy app/package versions must match ${mirrorLabel} ${JSON.stringify(mirror.entry.version)}`,
          );
        }
        if (!artifactsEqual(pkg.artifact, mirror.entry.artifact)) {
          fail(artifactPath, `must exactly match ${mirrorArtifactLabel} artifact ${mirror.path}.artifact`);
        }
        if (isContent && (pkg.min_leaf_version ?? null) !== (mirror.entry.min_leaf_version ?? null)) {
          fail(
            `${pkgPath}.min_leaf_version`,
            `must mirror the newest version's gate ${JSON.stringify(mirror.entry.min_leaf_version ?? null)}`,
          );
        }
      });
    });
  });
  if (Array.isArray(catalog.themes)) {
    catalog.themes.forEach((theme, themeIndex) => {
      validateTheme(theme, `$.themes[${themeIndex}]`, ids, artifacts);
    });
  }
  return artifacts;
}

function downloadArtifact(url, destination, redirectCount = 0) {
  if (redirectCount > 5) {
    return Promise.reject(new Error('too many redirects'));
  }
  return new Promise((resolve, reject) => {
    get(url, (res) => {
      const status = res.statusCode || 0;
      if ([301, 302, 303, 307, 308].includes(status)) {
        const location = res.headers.location;
        res.resume();
        if (!location) {
          reject(new Error(`redirect ${status} without location`));
          return;
        }
        resolve(downloadArtifact(
          new URL(location, url).toString(),
          destination,
          redirectCount + 1,
        ));
        return;
      }
      if (status !== 200) {
        res.resume();
        reject(new Error(`HTTP ${status}`));
        return;
      }

      const hash = createHash('sha256');
      let size = 0;
      const output = createWriteStream(destination);
      res.on('data', (chunk) => {
        size += chunk.length;
        hash.update(chunk);
      });
      res.pipe(output);
      output.on('finish', () => resolve({ size, sha256: hash.digest('hex') }));
      output.on('error', reject);
      res.on('error', reject);
    }).on('error', reject);
  });
}

function validateRuntimeManifest(archivePath, record) {
  const manifestPath = `${record.installName}/${record.runtimeManifestPath}`;
  const extracted = spawnSync('unzip', ['-p', archivePath, manifestPath], {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  });
  if (extracted.error) {
    fail(record.path, `runtime manifest validation failed: ${extracted.error.message}`);
    return;
  }
  if (extracted.status !== 0) {
    fail(record.path, `archive does not contain ${manifestPath}`);
    return;
  }

  let manifest;
  try {
    manifest = JSON.parse(extracted.stdout);
  } catch (error) {
    fail(record.path, `${manifestPath} is not valid JSON: ${error.message}`);
    return;
  }
  if (manifest.pak_version !== record.version) {
    fail(
      record.path,
      `${manifestPath} pak_version ${JSON.stringify(manifest.pak_version)} does not match catalog ${JSON.stringify(record.version)}`,
    );
  }
  const runtimeMinimum = Object.hasOwn(manifest, 'min_leaf_version')
    ? manifest.min_leaf_version
    : null;
  if (runtimeMinimum !== record.minLeafVersion) {
    fail(
      record.path,
      `${manifestPath} min_leaf_version ${JSON.stringify(runtimeMinimum)} does not match catalog ${JSON.stringify(record.minLeafVersion)}`,
    );
  }
  const declaresProvides = isObject(manifest.provides);
  if (record.isContent && !declaresProvides) {
    fail(record.path, `${manifestPath} must declare a provides object for content[]`);
  } else if (!record.isContent && Object.hasOwn(manifest, 'provides')) {
    fail(record.path, `${manifestPath} must not declare provides for apps[]`);
  }
}

function leafContractsDir() {
  const configured = process.env.LEAF_CONTRACTS_DIR;
  return configured
    ? resolve(configured)
    : fileURLToPath(new URL('../../leaf-contracts', import.meta.url));
}

function validateThemeArchive(archivePath, record) {
  const contractsDir = leafContractsDir();
  const checked = spawnSync('python3', [themeArchiveCheck, contractsDir, archivePath], {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  });
  if (checked.error) {
    fail(record.path, `THEME-1 check could not run: ${checked.error.message}`);
    return;
  }
  if (checked.status !== 0) {
    fail(
      record.path,
      `THEME-1 check could not run (LEAF_CONTRACTS_DIR=${contractsDir}): ${checked.stderr.trim()}`,
    );
    return;
  }
  let verdict;
  try {
    verdict = JSON.parse(checked.stdout);
  } catch (error) {
    fail(record.path, `THEME-1 check printed invalid JSON: ${error.message}`);
    return;
  }
  if (verdict.warnings.length > 0) {
    console.log(`${record.path}: THEME-1 warnings: ${verdict.warnings.join(', ')}`);
  }
  if (verdict.reasons.length > 0) {
    fail(record.path, `THEME-1 archive rejected: ${verdict.reasons.join(', ')}`);
    return;
  }
  const expected = {
    id: record.themeId,
    version: record.version,
    min_leaf_version: record.minLeafVersion,
    ...(record.license !== null ? { license: record.license } : {}),
  };
  for (const [key, value] of Object.entries(expected)) {
    if (verdict.manifest[key] !== value) {
      fail(
        record.path,
        `theme.json ${key} ${JSON.stringify(verdict.manifest[key])} does not match catalog ${JSON.stringify(value)}`,
      );
    }
  }
}

function validateArchiveContents(archivePath, record) {
  if (record.kind === 'theme') {
    validateThemeArchive(archivePath, record);
  } else {
    validateRuntimeManifest(archivePath, record);
  }
}

let catalog;
try {
  catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
} catch (error) {
  console.error(`Pak Rat catalog parse failed: ${error.message}`);
  process.exit(1);
}

const artifacts = validateCatalog(catalog);

if (previousCatalogPath) {
  try {
    const previousCatalog = JSON.parse(await readFile(previousCatalogPath, 'utf8'));
    validateImmutableHistory(previousCatalog, catalog);
  } catch (error) {
    fail('$', `previous catalog parse failed: ${error.message}`);
  }
}

if (checkRemote && errors.length === 0) {
  const downloadDir = await mkdtemp(join(tmpdir(), 'leaf-pakrat-artifacts-'));
  try {
    for (let index = 0; index < artifacts.length; index += 1) {
      const record = artifacts[index];
      const { artifact, path } = record;
      const destination = join(downloadDir, `${index}.zip`);
      try {
        const remote = await downloadArtifact(artifact.url, destination);
        if (remote.size !== artifact.size) {
          fail(`${path}.size`, `remote size ${remote.size} does not match catalog ${artifact.size}`);
        }
        if (remote.sha256 !== artifact.sha256.toLowerCase()) {
          fail(`${path}.sha256`, `remote sha256 ${remote.sha256} does not match catalog ${artifact.sha256}`);
        }
        if (remote.size === artifact.size && remote.sha256 === artifact.sha256.toLowerCase()) {
          validateArchiveContents(destination, record);
        }
      } catch (error) {
        fail(`${path}.url`, `remote validation failed: ${error.message}`);
      }
    }
    for (let index = 0; index < previews.length; index += 1) {
      const { preview, path } = previews[index];
      try {
        const remote = await downloadArtifact(preview.url, join(downloadDir, `preview-${index}.png`));
        if (remote.size !== preview.size) {
          fail(`${path}.size`, `remote size ${remote.size} does not match catalog ${preview.size}`);
        }
        if (remote.sha256 !== preview.sha256.toLowerCase()) {
          fail(`${path}.sha256`, `remote sha256 ${remote.sha256} does not match catalog ${preview.sha256}`);
        }
      } catch (error) {
        fail(`${path}.url`, `remote validation failed: ${error.message}`);
      }
    }
  } finally {
    await rm(downloadDir, { recursive: true, force: true });
  }
}

if (archivePath && errors.length === 0) {
  if (artifacts.length !== 1) {
    fail('$', '--archive requires a catalog containing exactly one artifact');
  } else {
    const record = artifacts[0];
    try {
      const bytes = await readFile(archivePath);
      const sha256 = createHash('sha256').update(bytes).digest('hex');
      if (bytes.length !== record.artifact.size) {
        fail(`${record.path}.size`, `archive size ${bytes.length} does not match catalog ${record.artifact.size}`);
      }
      if (sha256 !== record.artifact.sha256.toLowerCase()) {
        fail(`${record.path}.sha256`, `archive sha256 ${sha256} does not match catalog ${record.artifact.sha256}`);
      }
      if (bytes.length === record.artifact.size &&
          sha256 === record.artifact.sha256.toLowerCase()) {
        validateArchiveContents(archivePath, record);
      }
    } catch (error) {
      fail('$', `archive validation failed: ${error.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error('Pak Rat catalog validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const previewCount = previews.length > 0 ? `, ${previews.length} theme preview(s)` : '';
console.log(`Pak Rat catalog valid: ${artifacts.length} artifact(s)${previewCount}${checkRemote ? ' with remote checks' : ''}`);
