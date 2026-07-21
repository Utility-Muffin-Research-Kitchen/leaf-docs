#!/usr/bin/env node
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const validator = new URL('./validate-pakrat-catalog.mjs', import.meta.url);
const catalogPath = new URL('../public/pakrat/v1/storefront.json', import.meta.url);
const source = JSON.parse(await readFile(catalogPath, 'utf8'));
const temp = await mkdtemp(join(tmpdir(), 'leaf-pakrat-validator-'));

function run(path, remote = false, previousPath = null) {
  const args = [validator.pathname, '--catalog', path];
  if (remote) {
    args.push('--remote');
  }
  if (previousPath) {
    args.push('--previous-catalog', previousPath);
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
} finally {
  await rm(temp, { recursive: true, force: true });
}
