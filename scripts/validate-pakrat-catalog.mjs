#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { get } from 'node:https';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { URL } from 'node:url';

const checkRemote = process.argv.includes('--remote');
const catalogArg = process.argv.indexOf('--catalog');
const previousCatalogArg = process.argv.indexOf('--previous-catalog');
if (catalogArg >= 0 && !process.argv[catalogArg + 1]) {
  console.error('usage: validate-pakrat-catalog.mjs [--remote] [--catalog <path>] [--previous-catalog <path>]');
  process.exit(2);
}
if (previousCatalogArg >= 0 && !process.argv[previousCatalogArg + 1]) {
  console.error('usage: validate-pakrat-catalog.mjs [--remote] [--catalog <path>] [--previous-catalog <path>]');
  process.exit(2);
}
const catalogPath = catalogArg >= 0
  ? process.argv[catalogArg + 1]
  : new URL('../public/pakrat/v1/storefront.json', import.meta.url);
const previousCatalogPath = previousCatalogArg >= 0
  ? process.argv[previousCatalogArg + 1]
  : null;
const errors = [];
const VERSION_RE = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const MAX_VERSION_COMPONENT = 9999;
const MAX_PACKAGE_VERSIONS = 16;

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
  return [{ version: pkg.version, artifact: pkg.artifact }];
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

  for (const previousApp of previous.apps) {
    const appPath = `$.apps[id=${JSON.stringify(previousApp.id)}]`;
    const currentApp = current.apps.find((candidate) => candidate.id === previousApp.id);
    if (!currentApp) {
      fail(appPath, 'previously published app must not be removed');
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
  if (!Array.isArray(catalog.apps) || catalog.apps.length === 0) {
    fail('$.apps', 'must be a non-empty array');
    return [];
  }

  const ids = new Set();
  const artifacts = [];
  catalog.apps.forEach((app, appIndex) => {
    const appPath = `$.apps[${appIndex}]`;
    if (!requireObject(app, appPath)) {
      return;
    }
    if (requireString(app.id, `${appPath}.id`)) {
      if (ids.has(app.id)) {
        fail(`${appPath}.id`, `duplicate app id "${app.id}"`);
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
        fail(`${pkgPath}.platform`, 'must be "mlp1"');
      }
      if (pkg.runtime !== 'leaf') {
        fail(`${pkgPath}.runtime`, 'must be "leaf"');
      }
      requireVersion(pkg.version, `${pkgPath}.version`);
      if (pkg.version !== app.version) {
        fail(`${pkgPath}.version`, 'must match the legacy app version');
      }
      if ('min_leaf_version' in pkg) {
        fail(`${pkgPath}.min_leaf_version`, 'must be absent from the ungated legacy safe floor');
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
            minLeafVersion: null,
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
          });
        }
      });

      const safeFloor = validatedVersions.find((candidate) => !candidate.gated);
      if (!safeFloor) {
        fail(`${pkgPath}.versions`, 'must contain an ungated safe-floor version');
        return;
      }
      if (pkg.version !== safeFloor.entry.version || app.version !== safeFloor.entry.version) {
        fail(
          `${pkgPath}.version`,
          `legacy app/package versions must match safe floor ${JSON.stringify(safeFloor.entry.version)}`,
        );
      }
      if (!artifactsEqual(pkg.artifact, safeFloor.entry.artifact)) {
        fail(artifactPath, `must exactly match safe-floor artifact ${safeFloor.path}.artifact`);
      }
    });
  });
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
          validateRuntimeManifest(destination, record);
        }
      } catch (error) {
        fail(`${path}.url`, `remote validation failed: ${error.message}`);
      }
    }
  } finally {
    await rm(downloadDir, { recursive: true, force: true });
  }
}

if (errors.length > 0) {
  console.error('Pak Rat catalog validation failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Pak Rat catalog valid: ${artifacts.length} artifact(s)${checkRemote ? ' with remote checks' : ''}`);
