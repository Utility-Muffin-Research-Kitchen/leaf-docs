#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const validator = new URL('./validate-pakrat-catalog.mjs', import.meta.url);
const catalogPath = new URL('../public/pakrat/v1/storefront.json', import.meta.url);
const source = JSON.parse(await readFile(catalogPath, 'utf8'));
const temp = await mkdtemp(join(tmpdir(), 'leaf-pakrat-validator-'));

function run(path, remote = false, previousPath = null, archivePath = null) {
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
  return spawnSync(process.execPath, args, { encoding: 'utf8' });
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
} finally {
  await rm(temp, { recursive: true, force: true });
}
