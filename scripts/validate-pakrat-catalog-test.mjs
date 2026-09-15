#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const validator = new URL('./validate-pakrat-catalog.mjs', import.meta.url);
const catalogPath = new URL('../public/pakrat/v1/storefront.json', import.meta.url);
const source = JSON.parse(await readFile(catalogPath, 'utf8'));
const temp = await mkdtemp(join(tmpdir(), 'leaf-pakrat-validator-'));

function run(path, remote = false, previousPath = null, archivePath = null, env = process.env) {
  const args = [validator.pathname, '--catalog', path];
  if (remote) {
    args.push('--remote');
  }
  if (previousPath) {
    args.push('--previous-catalog', previousPath);
  }
  if (archivePath) {
    args.push('--archive', archivePath);
  }
  return spawnSync(process.execPath, args, { encoding: 'utf8', env });
}

async function expectRejected(name, mutate, expected, remote = false) {
  const catalog = structuredClone(source);
  mutate(catalog);
  const path = join(temp, `${name}.json`);
  await writeFile(path, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
  const result = run(path, remote);
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status === 0) {
    throw new Error(`${name}: invalid catalog was accepted`);
  }
  if (!output.includes(expected)) {
    throw new Error(`${name}: expected ${JSON.stringify(expected)} in:\n${output}`);
  }
  console.log(`PASS ${name}`);
}

async function expectImmutableRejected(name, current, previous, expected) {
  const currentPath = join(temp, `${name}-current.json`);
  const previousPath = join(temp, `${name}-previous.json`);
  await writeFile(currentPath, `${JSON.stringify(current, null, 2)}\n`, 'utf8');
  await writeFile(previousPath, `${JSON.stringify(previous, null, 2)}\n`, 'utf8');
  const result = run(currentPath, false, previousPath);
  const output = `${result.stdout}\n${result.stderr}`;
  if (result.status === 0) {
    throw new Error(`${name}: immutable history change was accepted`);
  }
  if (!output.includes(expected)) {
    throw new Error(`${name}: expected ${JSON.stringify(expected)} in:\n${output}`);
  }
  console.log(`PASS ${name}`);
}

try {
  const valid = run(catalogPath.pathname);
  if (valid.status !== 0) {
    throw new Error(`valid catalog was rejected:\n${valid.stderr}`);
  }

  await expectRejected('duplicate-id', (catalog) => {
    catalog.apps.push(structuredClone(catalog.apps[0]));
  }, 'duplicate app id');

  await expectRejected('unsafe-install-name', (catalog) => {
    catalog.apps[0].packages[0].install_name = '../Itch-io.pak';
  }, 'must be a safe relative path');

  await expectRejected('wrong-platform', (catalog) => {
    catalog.apps[0].packages[0].platform = 'tg5040';
  }, 'must be "mlp1"');

  await expectRejected('version-mismatch', (catalog) => {
    catalog.apps[0].packages[0].version = '9.9.9';
  }, 'must match the legacy app version');

  await expectRejected('package-version-suffix', (catalog) => {
    catalog.apps[0].version = '0.1.0-rc.1';
    catalog.apps[0].packages[0].version = '0.1.0-rc.1';
  }, 'must be a bare MAJOR.MINOR.PATCH version');

  const addValidHistory = (catalog) => {
    const app = catalog.apps.find((candidate) => candidate.id === 'org.umrk.nimbus');
    const pkg = app.packages[0];
    pkg.versions = [
      {
        version: '0.2.0',
        min_leaf_version: '0.7.0',
        artifact: {
          ...structuredClone(pkg.artifact),
          url: 'https://example.invalid/v0.2.0/Nimbus.pak.zip',
          size: pkg.artifact.size + 1,
          installed_size: pkg.artifact.installed_size + 1,
          sha256: '1'.repeat(64),
        },
      },
      { version: pkg.version, artifact: structuredClone(pkg.artifact) },
    ];
    return { app, pkg };
  };

  const validHistory = structuredClone(source);
  addValidHistory(validHistory);
  const validHistoryPath = join(temp, 'valid-history.json');
  await writeFile(validHistoryPath, `${JSON.stringify(validHistory, null, 2)}\n`, 'utf8');
  const validHistoryResult = run(validHistoryPath);
  if (validHistoryResult.status !== 0) {
    throw new Error(`valid version history was rejected:\n${validHistoryResult.stderr}`);
  }
  console.log('PASS valid-history');

  const previousCatalogPath = join(temp, 'previous-catalog.json');
  await writeFile(previousCatalogPath, `${JSON.stringify(source, null, 2)}\n`, 'utf8');
  const validAppendResult = run(validHistoryPath, false, previousCatalogPath);
  if (validAppendResult.status !== 0) {
    throw new Error(`valid append-only history was rejected:\n${validAppendResult.stderr}`);
  }
  console.log('PASS valid-append-only-history');

  const removedHistory = structuredClone(validHistory);
  removedHistory.apps.find((app) => app.id === 'org.umrk.nimbus')
    .packages[0].versions.pop();
  await expectImmutableRejected(
    'history-removal',
    removedHistory,
    validHistory,
    'previously published version must not be removed',
  );

  const mutatedHistory = structuredClone(validHistory);
  mutatedHistory.apps.find((app) => app.id === 'org.umrk.nimbus')
    .packages[0].versions[0].artifact.sha256 = '2'.repeat(64);
  await expectImmutableRejected(
    'history-mutation',
    mutatedHistory,
    validHistory,
    'previously published version facts are immutable',
  );

  await expectRejected('history-order', (catalog) => {
    const { pkg } = addValidHistory(catalog);
    pkg.versions.reverse();
  }, 'strictly descending newest-first');

  await expectRejected('history-duplicate', (catalog) => {
    const { pkg } = addValidHistory(catalog);
    pkg.versions.push(structuredClone(pkg.versions[1]));
  }, 'duplicate package version');

  await expectRejected('history-invalid-gate', (catalog) => {
    const { pkg } = addValidHistory(catalog);
    pkg.versions[0].min_leaf_version = 'v0.7.0';
  }, 'must be a bare MAJOR.MINOR.PATCH version');

  await expectRejected('history-no-safe-floor', (catalog) => {
    const { pkg } = addValidHistory(catalog);
    pkg.versions[1].min_leaf_version = '0.1.0';
  }, 'must contain an ungated safe-floor version');

  await expectRejected('history-safe-floor-version', (catalog) => {
    const { app, pkg } = addValidHistory(catalog);
    app.version = '0.2.0';
    pkg.version = '0.2.0';
  }, 'legacy app/package versions must match safe floor');

  await expectRejected('history-safe-floor-artifact', (catalog) => {
    const { pkg } = addValidHistory(catalog);
    pkg.artifact.size += 1;
  }, 'must exactly match safe-floor artifact');

  await expectRejected('history-too-long', (catalog) => {
    const { pkg } = addValidHistory(catalog);
    pkg.versions = Array.from({ length: 17 }, (_, index) => ({
      version: `${17 - index}.0.0`,
      ...(index < 16 ? { min_leaf_version: '0.7.0' } : {}),
      artifact: structuredClone(pkg.artifact),
    }));
  }, 'must contain at most 16 entries');

  await expectRejected('non-https-url', (catalog) => {
    catalog.apps[0].packages[0].artifact.url =
      'http://example.invalid/Itch-io.mlp1.pak.zip';
  }, 'must use HTTPS');

  await expectRejected('incorrect-sha', (catalog) => {
    const app = catalog.apps.find((candidate) => candidate.id === 'org.umrk.itchio');
    catalog.apps = [app];
    const sha = app.packages[0].artifact.sha256;
    app.packages[0].artifact.sha256 = `${sha[0] === '0' ? '1' : '0'}${sha.slice(1)}`;
  }, 'remote sha256', true);

  // ---- STORE-CONTENT-1: the content[] lane --------------------------------

  // Build a content package out of a real published app entry so every other
  // rule (HTTPS, sha256, version grammar) still holds and only the lane
  // differs.
  const asContentPackage = (catalog, id = 'org.umrk.scummvm') => {
    const entry = structuredClone(catalog.apps[0]);
    entry.id = id;
    entry.name = 'ScummVM';
    const pkg = entry.packages[0];
    pkg.install_name = 'ScummVM.pak';
    pkg.min_leaf_version = '0.11.0';
    pkg.versions = [
      {
        version: pkg.version,
        min_leaf_version: '0.11.0',
        artifact: structuredClone(pkg.artifact),
      },
    ];
    return entry;
  };

  const writeArchiveCase = async (name, catalog, manifest) => {
    const pkg = (catalog.content?.[0] ?? catalog.apps[0]).packages[0];
    const root = join(temp, `${name}-archive-root`);
    const pakRoot = join(root, pkg.install_name);
    await mkdir(pakRoot, { recursive: true });
    await writeFile(join(pakRoot, pkg.runtime_manifest_path),
      `${JSON.stringify(manifest)}\n`, 'utf8');
    const archive = join(temp, `${name}.zip`);
    const zipped = spawnSync('zip', ['-q', '-r', '-X', archive, pkg.install_name], {
      cwd: root,
      encoding: 'utf8',
    });
    if (zipped.status !== 0) {
      throw new Error(`${name}: zip failed: ${zipped.stderr}`);
    }
    const bytes = await readFile(archive);
    const artifact = {
      ...structuredClone(pkg.artifact),
      size: bytes.length,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    };
    pkg.artifact = structuredClone(artifact);
    if (Array.isArray(pkg.versions)) {
      pkg.versions.forEach((entry) => { entry.artifact = structuredClone(artifact); });
    }
    const path = join(temp, `${name}-catalog.json`);
    await writeFile(path, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
    return { archive, path };
  };

  {
    // An all-gated content package with no ungated floor is VALID here and
    // would be rejected outright in apps[]. That asymmetry is the lane.
    const catalog = structuredClone(source);
    catalog.content = [asContentPackage(catalog)];
    const path = join(temp, 'content-all-gated.json');
    await writeFile(path, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
    const result = run(path);
    if (result.status !== 0) {
      throw new Error(
        `content-all-gated: valid content package was rejected:\n${result.stdout}\n${result.stderr}`,
      );
    }
    console.log('PASS content-all-gated');
  }

  {
    const catalog = structuredClone(source);
    catalog.content = [asContentPackage(catalog)];
    catalog.apps = [];
    const { archive, path } = await writeArchiveCase(
      'content-only-runtime-provides',
      catalog,
      {
        name: 'ScummVM',
        platform: 'mlp1',
        pak_version: catalog.content[0].packages[0].version,
        min_leaf_version: '0.11.0',
        provides: {},
      },
    );
    const result = run(path, false, null, archive);
    if (result.status !== 0) {
      throw new Error(`content-only-runtime-provides rejected:\n${result.stdout}\n${result.stderr}`);
    }
    console.log('PASS content-only-runtime-provides');
  }

  {
    const catalog = structuredClone(source);
    catalog.content = [asContentPackage(catalog)];
    catalog.apps = [];
    const { archive, path } = await writeArchiveCase(
      'content-runtime-missing-provides',
      catalog,
      {
        name: 'ScummVM',
        platform: 'mlp1',
        pak_version: catalog.content[0].packages[0].version,
        min_leaf_version: '0.11.0',
      },
    );
    const result = run(path, false, null, archive);
    const output = `${result.stdout}\n${result.stderr}`;
    if (result.status === 0 || !output.includes('must declare a provides object')) {
      throw new Error(`content-runtime-missing-provides was not rejected:\n${output}`);
    }
    console.log('PASS content-runtime-missing-provides');
  }

  {
    const catalog = structuredClone(source);
    catalog.apps = [structuredClone(source.apps[0])];
    delete catalog.content;
    const pkg = catalog.apps[0].packages[0];
    const { archive, path } = await writeArchiveCase(
      'apps-runtime-declares-provides',
      catalog,
      {
        name: catalog.apps[0].name,
        platform: 'mlp1',
        pak_version: pkg.version,
        provides: {},
      },
    );
    const result = run(path, false, null, archive);
    const output = `${result.stdout}\n${result.stderr}`;
    if (result.status === 0 || !output.includes('must not declare provides')) {
      throw new Error(`apps-runtime-declares-provides was not rejected:\n${output}`);
    }
    console.log('PASS apps-runtime-declares-provides');
  }

  await expectRejected('content-id-in-both-lanes', (catalog) => {
    catalog.content = [asContentPackage(catalog, catalog.apps[0].id)];
  }, 'may appear in exactly one lane');

  await expectRejected('content-shared-platform', (catalog) => {
    const entry = asContentPackage(catalog);
    entry.packages[0].platform = 'shared';
    catalog.content = [entry];
  }, '"shared" is refused');

  await expectRejected('content-not-an-array', (catalog) => {
    catalog.content = {};
  }, 'must be an array when present');

  await expectRejected('content-legacy-gate-mismatch', (catalog) => {
    const entry = asContentPackage(catalog);
    // The legacy fields must mirror the newest entry's gate; claiming an
    // ungated legacy install of a gated package is exactly the confusion the
    // apps[] safe-floor rule exists to prevent.
    delete entry.packages[0].min_leaf_version;
    catalog.content = [entry];
  }, "must mirror the newest version's gate");

  await expectRejected('content-version-ungated', (catalog) => {
    const entry = asContentPackage(catalog);
    delete entry.packages[0].versions[0].min_leaf_version;
    catalog.content = [entry];
  }, 'every content version must declare min_leaf_version');

  await expectRejected('content-legacy-artifact-mismatch', (catalog) => {
    const entry = asContentPackage(catalog);
    entry.packages[0].artifact = {
      ...entry.packages[0].artifact,
      size: entry.packages[0].artifact.size + 1,
    };
    catalog.content = [entry];
  }, 'must exactly match newest-version artifact');

  {
    const previous = structuredClone(source);
    previous.content = [asContentPackage(previous)];
    const current = structuredClone(previous);
    current.content = [];
    await expectImmutableRejected(
      'content-history-removal', current, previous,
      'previously published content package must not be removed or change lanes',
    );
  }

  {
    const previous = structuredClone(source);
    previous.content = [asContentPackage(previous)];
    const current = structuredClone(previous);
    current.content[0].packages[0].versions[0].artifact.sha256 = '3'.repeat(64);
    await expectImmutableRejected(
      'content-history-mutation', current, previous,
      'previously published version facts are immutable',
    );
  }

  // apps[] must not inherit the exemption.
  await expectRejected('apps-lane-still-needs-a-safe-floor', (catalog) => {
    const pkg = catalog.apps[0].packages[0];
    pkg.versions = [
      {
        version: pkg.version,
        min_leaf_version: '0.11.0',
        artifact: structuredClone(pkg.artifact),
      },
    ];
  }, 'must contain an ungated safe-floor version');

  // ---- THEME-1: the themes[] lane -----------------------------------------

  const themeArtifact = (id, version, seed) => ({
    url: `https://github.com/Utility-Muffin-Research-Kitchen/leaf-themes/releases/download/${id}-v${version}/${id}-${version}.zip`,
    name: `${id}-${version}.zip`,
    archive: 'zip',
    size: 4096 + seed,
    installed_size: 8192 + seed,
    sha256: createHash('sha256').update(`${id}-${version}`).digest('hex'),
  });

  // A valid theme with two published versions, newest first.
  const themeEntry = (id = 'neon-nights', versions = ['1.2.0', '1.0.0']) => {
    const history = versions.map((version, index) => ({
      version,
      min_leaf_version: '0.12.0',
      artifact: themeArtifact(id, version, index),
    }));
    return {
      id,
      name: 'Neon Nights',
      author: 'Example',
      owner_github_id: 1234567,
      summary: 'Pink and cyan on black.',
      description: 'A test theme.',
      license: 'CC-BY-4.0',
      preview: {
        url: `https://github.com/Utility-Muffin-Research-Kitchen/leaf-themes/releases/download/${id}-v${versions[0]}/${id}-${versions[0]}.preview.png`,
        sha256: createHash('sha256').update(`${id}-${versions[0]}-preview`).digest('hex'),
        size: 123456,
      },
      version: history[0].version,
      min_leaf_version: history[0].min_leaf_version,
      install_name: id,
      artifact: structuredClone(history[0].artifact),
      versions: history,
      withdrawn: false,
    };
  };

  const withTheme = (mutateTheme) => (catalog) => {
    const theme = themeEntry();
    catalog.themes = [theme];
    mutateTheme(theme, catalog);
  };

  const writeCatalog = async (name, catalog) => {
    const path = join(temp, `${name}.json`);
    await writeFile(path, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
    return path;
  };

  const expectAccepted = async (name, current, previous = null) => {
    const currentPath = await writeCatalog(`${name}-current`, current);
    const previousPath = previous ? await writeCatalog(`${name}-previous`, previous) : null;
    const result = run(currentPath, false, previousPath);
    if (result.status !== 0) {
      throw new Error(`${name}: valid catalog was rejected:\n${result.stdout}\n${result.stderr}`);
    }
    console.log(`PASS ${name}`);
  };

  const catalogWithTheme = (theme = themeEntry()) => {
    const catalog = structuredClone(source);
    catalog.themes = [theme];
    return catalog;
  };

  await expectAccepted('theme-valid', catalogWithTheme());
  {
    const theme = themeEntry('plain', ['0.1.0']);
    delete theme.withdrawn;
    delete theme.description;
    await expectAccepted('theme-valid-minimal', catalogWithTheme(theme));
  }

  await expectRejected('themes-not-an-array', (catalog) => {
    catalog.themes = {};
  }, '$.themes: must be an array when present');

  await expectRejected('theme-id-uppercase', withTheme((theme) => {
    theme.id = 'Neon-Nights';
    theme.install_name = theme.id;
  }), '$.themes[0].id: must match ^[a-z0-9][a-z0-9-]{1,39}$');

  await expectRejected('theme-id-too-short', withTheme((theme) => {
    theme.id = 'n';
    theme.install_name = theme.id;
  }), '$.themes[0].id: must match');

  await expectRejected('theme-id-too-long', withTheme((theme) => {
    theme.id = `n${'e'.repeat(40)}`;
    theme.install_name = theme.id;
  }), '$.themes[0].id: must match');

  for (const field of ['name', 'author', 'summary']) {
    await expectRejected(`theme-${field}-missing`, withTheme((theme) => {
      delete theme[field];
    }), `$.themes[0].${field}: must be a non-empty string`);
  }

  await expectRejected('theme-description-empty', withTheme((theme) => {
    theme.description = ' ';
  }), '$.themes[0].description: must be a non-empty string');

  await expectRejected('theme-owner-zero', withTheme((theme) => {
    theme.owner_github_id = 0;
  }), '$.themes[0].owner_github_id: must be an integer >= 1');

  await expectRejected('theme-owner-string', withTheme((theme) => {
    theme.owner_github_id = '1234567';
  }), '$.themes[0].owner_github_id: must be an integer >= 1');

  await expectRejected('theme-owner-missing', withTheme((theme) => {
    delete theme.owner_github_id;
  }), '$.themes[0].owner_github_id: must be an integer >= 1');

  await expectRejected('theme-license-unknown', withTheme((theme) => {
    theme.license = 'MIT';
  }), '$.themes[0].license: must be one of CC-BY-4.0, CC-BY-SA-4.0, CC0-1.0, redistribution-permitted');

  await expectRejected('theme-preview-missing', withTheme((theme) => {
    delete theme.preview;
  }), '$.themes[0].preview: must be an object');

  await expectRejected('theme-preview-http', withTheme((theme) => {
    theme.preview.url = theme.preview.url.replace('https:', 'http:');
  }), '$.themes[0].preview.url: must use HTTPS');

  await expectRejected('theme-preview-sha', withTheme((theme) => {
    theme.preview.sha256 = 'abc';
  }), '$.themes[0].preview.sha256: must be a 64-character SHA-256 hex digest');

  await expectRejected('theme-preview-size', withTheme((theme) => {
    theme.preview.size = 1.5;
  }), '$.themes[0].preview.size: must be an integer >= 1');

  await expectRejected('theme-version-leading-zero', withTheme((theme) => {
    theme.version = '1.02.0';
  }), '$.themes[0].version: must be MAJOR.MINOR.PATCH with components 0-9999 and no leading zeros');

  await expectRejected('theme-version-component-too-large', withTheme((theme) => {
    theme.versions[0].version = '10000.0.0';
  }), '$.themes[0].versions[0].version: must be MAJOR.MINOR.PATCH');

  await expectRejected('theme-min-leaf-version-too-old', withTheme((theme) => {
    theme.min_leaf_version = '0.11.9';
  }), '$.themes[0].min_leaf_version: must be at least 0.12.0');

  await expectRejected('theme-version-entry-min-leaf-version-too-old', withTheme((theme) => {
    theme.versions[1].min_leaf_version = '0.11.0';
  }), '$.themes[0].versions[1].min_leaf_version: must be at least 0.12.0');

  await expectRejected('theme-version-entry-ungated', withTheme((theme) => {
    delete theme.versions[1].min_leaf_version;
  }), 'every theme version must declare min_leaf_version');

  await expectRejected('theme-install-name-pak', withTheme((theme) => {
    theme.install_name = `${theme.id}.pak`;
  }), '$.themes[0].install_name: must equal the theme id (no .pak suffix)');

  await expectRejected('theme-install-name-other', withTheme((theme) => {
    theme.install_name = 'neon';
  }), '$.themes[0].install_name: must equal the theme id');

  await expectRejected('theme-artifact-http', withTheme((theme) => {
    theme.artifact.url = theme.artifact.url.replace('https:', 'http:');
    theme.versions[0].artifact.url = theme.artifact.url;
  }), '$.themes[0].versions[0].artifact.url: must use HTTPS');

  await expectRejected('theme-artifact-archive', withTheme((theme) => {
    theme.versions[1].artifact.archive = 'tar';
  }), '$.themes[0].versions[1].artifact.archive: must be "zip"');

  await expectRejected('theme-artifact-size', withTheme((theme) => {
    theme.versions[1].artifact.size = '4096';
  }), '$.themes[0].versions[1].artifact.size: must be an integer >= 1');

  await expectRejected('theme-artifact-installed-size', withTheme((theme) => {
    delete theme.versions[1].artifact.installed_size;
  }), '$.themes[0].versions[1].artifact.installed_size: must be an integer >= 1');

  await expectRejected('theme-artifact-sha', withTheme((theme) => {
    theme.versions[1].artifact.sha256 = 'z'.repeat(64);
  }), '$.themes[0].versions[1].artifact.sha256: must be a 64-character SHA-256 hex digest');

  await expectRejected('theme-versions-missing', withTheme((theme) => {
    delete theme.versions;
  }), '$.themes[0].versions: must be a non-empty array');

  await expectRejected('theme-versions-empty', withTheme((theme) => {
    theme.versions = [];
  }), '$.themes[0].versions: must be a non-empty array');

  await expectRejected('theme-versions-too-long', withTheme((theme) => {
    const long = themeEntry('neon-nights', Array.from({ length: 17 }, (_, index) => `${17 - index}.0.0`));
    Object.assign(theme, long);
  }), '$.themes[0].versions: must contain at most 16 entries');

  await expectRejected('theme-versions-order', withTheme((theme) => {
    theme.versions.reverse();
  }), 'versions must be strictly descending newest-first');

  await expectRejected('theme-versions-duplicate', withTheme((theme) => {
    theme.versions.push(structuredClone(theme.versions[1]));
  }), 'duplicate theme version "1.0.0"');

  await expectRejected('theme-version-entry-unknown-key', withTheme((theme) => {
    theme.versions[1].platform = 'mlp1';
  }), '$.themes[0].versions[1].platform: themes are platform-independent');

  await expectRejected('theme-mirror-version', withTheme((theme) => {
    theme.version = '1.0.0';
  }), '$.themes[0].version: must match newest version "1.2.0"');

  await expectRejected('theme-mirror-gate', withTheme((theme) => {
    theme.min_leaf_version = '0.13.0';
  }), "$.themes[0].min_leaf_version: must mirror the newest version's gate");

  await expectRejected('theme-mirror-artifact', withTheme((theme) => {
    theme.artifact = structuredClone(theme.versions[1].artifact);
  }), '$.themes[0].artifact: must exactly match newest-version artifact');

  await expectRejected('theme-withdrawn-not-boolean', withTheme((theme) => {
    theme.withdrawn = 'true';
  }), '$.themes[0].withdrawn: must be a boolean when present');

  for (const key of ['platform', 'runtime', 'runtime_manifest_path', 'packages']) {
    await expectRejected(`theme-refuses-${key}`, withTheme((theme) => {
      theme[key] = key === 'packages' ? [] : 'leaf';
    }), `$.themes[0].${key}: themes are platform-independent and have no runtime; this key is refused`);
  }

  await expectRejected('theme-unknown-key', withTheme((theme) => {
    delete theme.withdrawn;
    theme.withdrawm = true;
  }), '$.themes[0].withdrawm: is not a themes lane field');

  await expectRejected('theme-id-shared-with-app', withTheme((theme, catalog) => {
    catalog.apps[0].id = theme.id;
  }), '$.themes[0].id: duplicate id "neon-nights" (an id may appear in exactly one lane)');

  await expectRejected('theme-id-shared-with-content', withTheme((theme, catalog) => {
    catalog.content = [asContentPackage(catalog, theme.id)];
  }), '$.themes[0].id: duplicate id "neon-nights" (an id may appear in exactly one lane)');

  await expectRejected('theme-id-duplicate-theme', withTheme((theme, catalog) => {
    catalog.themes.push(structuredClone(theme));
  }), '$.themes[1].id: duplicate id "neon-nights"');

  // ---- themes[] immutability ------------------------------------------------

  {
    const previous = catalogWithTheme();
    const current = structuredClone(previous);
    current.themes[0].withdrawn = true;
    await expectAccepted('theme-withdraw', current, previous);
    await expectAccepted('theme-unwithdraw', previous, current);

    const implicit = structuredClone(previous);
    delete implicit.themes[0].withdrawn;
    await expectAccepted('theme-withdraw-from-default', current, implicit);
  }

  {
    const previous = catalogWithTheme();
    const current = catalogWithTheme(themeEntry('neon-nights', ['1.3.0', '1.2.0', '1.0.0']));
    current.themes[0].versions.slice(1).forEach((entry, index) => {
      entry.artifact = structuredClone(previous.themes[0].versions[index].artifact);
    });
    current.themes[0].withdrawn = true;
    current.themes[0].name = 'Neon Nights Redux';
    await expectAccepted('theme-add-version', current, previous);
  }

  {
    const previous = catalogWithTheme();
    const current = structuredClone(previous);
    current.themes = [];
    await expectImmutableRejected(
      'theme-removed', current, previous,
      'previously published theme must not be removed or change lanes',
    );
  }

  {
    const previous = catalogWithTheme();
    const current = structuredClone(previous);
    delete current.themes;
    current.content.push(asContentPackage(current, 'neon-nights'));
    await expectImmutableRejected(
      'theme-changed-lanes', current, previous,
      '$.themes[id="neon-nights"]: previously published theme must not be removed or change lanes',
    );
  }

  {
    const previous = catalogWithTheme();
    const current = structuredClone(previous);
    current.themes[0].versions.pop();
    await expectImmutableRejected(
      'theme-version-removed', current, previous,
      '$.themes[id="neon-nights"].versions[version="1.0.0"]: previously published version must not be removed',
    );
  }

  {
    const previous = catalogWithTheme();
    const current = structuredClone(previous);
    current.themes[0].versions[1].artifact.sha256 = '4'.repeat(64);
    await expectImmutableRejected(
      'theme-version-artifact-mutated', current, previous,
      '$.themes[id="neon-nights"].versions[version="1.0.0"]: previously published version facts are immutable',
    );
  }

  {
    const previous = catalogWithTheme();
    const current = structuredClone(previous);
    current.themes[0].versions[1].min_leaf_version = '0.13.0';
    await expectImmutableRejected(
      'theme-version-gate-mutated', current, previous,
      'previously published version facts are immutable',
    );
  }

  {
    const previous = catalogWithTheme();
    const current = catalogWithTheme(themeEntry('neon-nights', ['1.2.0', '1.1.0', '1.0.0']));
    current.themes[0].versions = [
      structuredClone(previous.themes[0].versions[0]),
      current.themes[0].versions[1],
      structuredClone(previous.themes[0].versions[1]),
    ];
    current.themes[0].artifact = structuredClone(previous.themes[0].artifact);
    await expectImmutableRejected(
      'theme-version-inserted-below-newest', current, previous,
      'a new version must be greater than the newest published version "1.2.0"',
    );
  }

  // ---- themes[] archives: the THEME-1 reference validator -------------------

  const contractsDir = process.env.LEAF_CONTRACTS_DIR
    ? resolve(process.env.LEAF_CONTRACTS_DIR)
    : fileURLToPath(new URL('../../leaf-contracts', import.meta.url));
  const fixtures = join(contractsDir, 'contracts', 'leaf-themes', 'fixtures');
  if (!existsSync(join(fixtures, 'valid', 'full.zip'))) {
    throw new Error(
      `THEME-1 fixtures not found under ${fixtures}; check out leaf-contracts and set LEAF_CONTRACTS_DIR`,
    );
  }

  // A catalog whose only artifact is the fixture, described by `facts`.
  const archiveCase = async (name, fixture, facts) => {
    const archive = join(fixtures, fixture);
    const bytes = await readFile(archive);
    const theme = themeEntry(facts.id, [facts.version]);
    theme.license = facts.license;
    const artifact = {
      ...theme.artifact,
      size: bytes.length,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    };
    theme.artifact = structuredClone(artifact);
    theme.versions[0].artifact = structuredClone(artifact);
    const catalog = structuredClone(source);
    catalog.apps = [];
    delete catalog.content;
    catalog.themes = [theme];
    return { archive, path: await writeCatalog(name, catalog) };
  };

  const expectArchive = async (name, fixture, facts, expected, env = process.env) => {
    const { archive, path } = await archiveCase(name, fixture, facts);
    const result = run(path, false, null, archive, env);
    const output = `${result.stdout}\n${result.stderr}`;
    if (expected === null) {
      if (result.status !== 0) {
        throw new Error(`${name}: valid theme archive was rejected:\n${output}`);
      }
    } else if (result.status === 0 || !output.includes(expected)) {
      throw new Error(`${name}: expected rejection ${JSON.stringify(expected)} in:\n${output}`);
    }
    console.log(`PASS ${name}`);
  };

  const full = { id: 'full', version: '2.10.3', license: 'redistribution-permitted' };

  await expectArchive('theme-archive-full', 'valid/full.zip', full, null);

  await expectArchive(
    'theme-archive-invalid-fixture', 'invalid/unknown-license.zip',
    { id: 'unknown-license', version: '1.0.0', license: 'CC-BY-4.0' },
    '$.themes[0].versions[0].artifact: THEME-1 archive rejected: theme-unknown-license',
  );

  await expectArchive(
    'theme-archive-id-mismatch-fixture', 'invalid/id-mismatch.zip',
    { id: 'id-mismatch', version: '1.0.0', license: 'CC-BY-4.0' },
    'THEME-1 archive rejected: theme-id-mismatch',
  );

  await expectArchive(
    'theme-archive-catalog-id', 'valid/full.zip', { ...full, id: 'fuller' },
    'theme.json id "full" does not match catalog "fuller"',
  );

  await expectArchive(
    'theme-archive-catalog-version', 'valid/full.zip', { ...full, version: '2.10.4' },
    'theme.json version "2.10.3" does not match catalog "2.10.4"',
  );

  await expectArchive(
    'theme-archive-catalog-license', 'valid/full.zip', { ...full, license: 'CC0-1.0' },
    'theme.json license "redistribution-permitted" does not match catalog "CC0-1.0"',
  );

  {
    const { archive, path } = await archiveCase('theme-archive-catalog-gate', 'valid/full.zip', full);
    const catalog = JSON.parse(await readFile(path, 'utf8'));
    catalog.themes[0].min_leaf_version = '0.13.0';
    catalog.themes[0].versions[0].min_leaf_version = '0.13.0';
    const result = run(await writeCatalog('theme-archive-catalog-gate', catalog), false, null, archive);
    const output = `${result.stdout}\n${result.stderr}`;
    if (result.status === 0 ||
        !output.includes('theme.json min_leaf_version "0.12.0" does not match catalog "0.13.0"')) {
      throw new Error(`theme-archive-catalog-gate was not rejected:\n${output}`);
    }
    console.log('PASS theme-archive-catalog-gate');
  }

  await expectArchive(
    'theme-archive-without-contracts', 'valid/full.zip', full,
    'THEME-1 check could not run',
    { ...process.env, LEAF_CONTRACTS_DIR: join(temp, 'no-leaf-contracts') },
  );
} finally {
  await rm(temp, { recursive: true, force: true });
}
