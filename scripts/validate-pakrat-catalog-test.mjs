#!/usr/bin/env node
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const validator = new URL('./validate-pakrat-catalog.mjs', import.meta.url);
const catalogPath = new URL('../public/pakrat/v1/storefront.json', import.meta.url);
const source = JSON.parse(await readFile(catalogPath, 'utf8'));
const temp = await mkdtemp(join(tmpdir(), 'leaf-pakrat-validator-'));

function run(path, remote = false) {
  const args = [validator.pathname, '--catalog', path];
  if (remote) {
    args.push('--remote');
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
  }, 'must match app version');

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
