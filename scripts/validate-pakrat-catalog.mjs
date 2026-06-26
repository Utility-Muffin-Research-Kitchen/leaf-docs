#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { get } from 'node:https';
import { URL } from 'node:url';

const catalogPath = new URL('../public/pakrat/v1/storefront.json', import.meta.url);
const checkRemote = process.argv.includes('--remote');
const errors = [];

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

function requireStringArray(value, path) {
  if (!Array.isArray(value)) {
    fail(path, 'must be an array');
    return false;
  }
  value.forEach((item, index) => requireString(item, `${path}[${index}]`));
  return true;
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
    requireString(app.version, `${appPath}.version`);
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
      requireString(pkg.platform, `${pkgPath}.platform`);
      if (pkg.runtime !== 'leaf') {
        fail(`${pkgPath}.runtime`, 'must be "leaf"');
      }
      requireString(pkg.version, `${pkgPath}.version`);
      if (pkg.version !== app.version) {
        fail(`${pkgPath}.version`, 'must match app version in v1');
      }
      if (requireString(pkg.install_name, `${pkgPath}.install_name`) && !pkg.install_name.endsWith('.pak')) {
        fail(`${pkgPath}.install_name`, 'must end with .pak');
      }
      requireSafeRelativePath(pkg.runtime_manifest_path, `${pkgPath}.runtime_manifest_path`);

      const artifactPath = `${pkgPath}.artifact`;
      if (!requireObject(pkg.artifact, artifactPath)) {
        return;
      }
      requireHttpsUrl(pkg.artifact.url, `${artifactPath}.url`);
      requireString(pkg.artifact.name, `${artifactPath}.name`);
      if (pkg.artifact.archive !== 'zip') {
        fail(`${artifactPath}.archive`, 'must be "zip"');
      }
      requireInteger(pkg.artifact.size, `${artifactPath}.size`);
      requireInteger(pkg.artifact.installed_size, `${artifactPath}.installed_size`);
      requireSha256(pkg.artifact.sha256, `${artifactPath}.sha256`);
      artifacts.push({ artifact: pkg.artifact, path: artifactPath });
    });
  });
  return artifacts;
}

function downloadArtifact(url, redirectCount = 0) {
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
        resolve(downloadArtifact(new URL(location, url).toString(), redirectCount + 1));
        return;
      }
      if (status !== 200) {
        res.resume();
        reject(new Error(`HTTP ${status}`));
        return;
      }

      const hash = createHash('sha256');
      let size = 0;
      res.on('data', (chunk) => {
        size += chunk.length;
        hash.update(chunk);
      });
      res.on('end', () => resolve({ size, sha256: hash.digest('hex') }));
      res.on('error', reject);
    }).on('error', reject);
  });
}

let catalog;
try {
  catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
} catch (error) {
  console.error(`Pak Rat catalog parse failed: ${error.message}`);
  process.exit(1);
}

const artifacts = validateCatalog(catalog);

if (checkRemote && errors.length === 0) {
  for (const { artifact, path } of artifacts) {
    try {
      const remote = await downloadArtifact(artifact.url);
      if (remote.size !== artifact.size) {
        fail(`${path}.size`, `remote size ${remote.size} does not match catalog ${artifact.size}`);
      }
      if (remote.sha256 !== artifact.sha256.toLowerCase()) {
        fail(`${path}.sha256`, `remote sha256 ${remote.sha256} does not match catalog ${artifact.sha256}`);
      }
    } catch (error) {
      fail(`${path}.url`, `remote validation failed: ${error.message}`);
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

console.log(`Pak Rat catalog valid: ${artifacts.length} artifact(s)${checkRemote ? ' with remote checks' : ''}`);
