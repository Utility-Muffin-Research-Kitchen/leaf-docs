// A read-only look at a pak archive: the central directory, unix modes, and
// one small entry inflated on demand. It never extracts to disk, so nothing in
// an archive runs or lands anywhere. Only what Leaf's own extractor (miniz)
// handles is accepted: stored or deflated entries, no encryption, no zip64,
// one disk. The artifact's sha256 already pins every byte, so CRCs are not
// rechecked here.

import { open } from 'node:fs/promises';
import { inflateRawSync } from 'node:zlib';

const EOCD_SIGNATURE = 0x06054b50;
const ZIP64_LOCATOR_SIGNATURE = 0x07064b50;
const CENTRAL_SIGNATURE = 0x02014b50;
const LOCAL_SIGNATURE = 0x04034b50;
const EOCD_SIZE = 22;
const MAX_COMMENT = 0xffff;
const HOST_UNIX = 3;
const S_IFMT = 0o170000;
const S_IFLNK = 0o120000;
const S_IFDIR = 0o040000;
const S_IFREG = 0o100000;

export class ZipError extends Error {}

async function readAt(handle, offset, length) {
  const buffer = Buffer.alloc(length);
  const { bytesRead } = await handle.read(buffer, 0, length, offset);
  if (bytesRead !== length) {
    throw new ZipError(`truncated archive: wanted ${length} bytes at ${offset}`);
  }
  return buffer;
}

async function findEndOfCentralDirectory(handle, size) {
  const tailLength = Math.min(size, EOCD_SIZE + MAX_COMMENT);
  const tailStart = size - tailLength;
  const tail = await readAt(handle, tailStart, tailLength);
  for (let index = tailLength - EOCD_SIZE; index >= 0; index -= 1) {
    if (tail.readUInt32LE(index) === EOCD_SIGNATURE &&
        index + EOCD_SIZE + tail.readUInt16LE(index + 20) === tailLength) {
      const zip64 = index >= 20 && tail.readUInt32LE(index - 20) === ZIP64_LOCATOR_SIGNATURE;
      return { record: tail.subarray(index, index + EOCD_SIZE), zip64 };
    }
  }
  throw new ZipError('not a zip archive (no end of central directory)');
}

// Returns every central-directory entry. `unixMode` is null when the archive
// was not written by a unix zip, because the mode bits then mean nothing.
export async function inspectZip(path) {
  const handle = await open(path, 'r');
  try {
    const { size } = await handle.stat();
    const { record, zip64 } = await findEndOfCentralDirectory(handle, size);
    const diskNumber = record.readUInt16LE(4);
    const centralDisk = record.readUInt16LE(6);
    const diskEntries = record.readUInt16LE(8);
    const totalEntries = record.readUInt16LE(10);
    const centralSize = record.readUInt32LE(12);
    const centralOffset = record.readUInt32LE(16);
    if (zip64 || totalEntries === 0xffff || centralSize === 0xffffffff ||
        centralOffset === 0xffffffff) {
      throw new ZipError('zip64 archives are not supported');
    }
    if (diskNumber !== 0 || centralDisk !== 0 || diskEntries !== totalEntries) {
      throw new ZipError('multi-disk archives are not supported');
    }
    if (centralOffset + centralSize > size) {
      throw new ZipError('central directory runs past the end of the archive');
    }
    const central = await readAt(handle, centralOffset, centralSize);
    const entries = [];
    let cursor = 0;
    for (let index = 0; index < totalEntries; index += 1) {
      if (cursor + 46 > central.length || central.readUInt32LE(cursor) !== CENTRAL_SIGNATURE) {
        throw new ZipError(`malformed central directory entry ${index}`);
      }
      const madeBy = central.readUInt16LE(cursor + 4);
      const flags = central.readUInt16LE(cursor + 8);
      const nameLength = central.readUInt16LE(cursor + 28);
      const extraLength = central.readUInt16LE(cursor + 30);
      const commentLength = central.readUInt16LE(cursor + 32);
      const externalAttributes = central.readUInt32LE(cursor + 38);
      const nameBytes = central.subarray(cursor + 46, cursor + 46 + nameLength);
      entries.push({
        name: nameBytes.toString(flags & 0x800 ? 'utf8' : 'latin1'),
        method: central.readUInt16LE(cursor + 10),
        encrypted: (flags & 0x1) !== 0,
        compressedSize: central.readUInt32LE(cursor + 20),
        uncompressedSize: central.readUInt32LE(cursor + 24),
        localHeaderOffset: central.readUInt32LE(cursor + 42),
        unixMode: madeBy >> 8 === HOST_UNIX ? externalAttributes >>> 16 : null,
      });
      cursor += 46 + nameLength + extraLength + commentLength;
    }
    return entries;
  } finally {
    await handle.close();
  }
}

export async function readZipEntry(path, entry, maxBytes) {
  if (entry.uncompressedSize > maxBytes) {
    throw new ZipError(`${entry.name} is ${entry.uncompressedSize} bytes, over the ${maxBytes}-byte limit`);
  }
  const handle = await open(path, 'r');
  try {
    const header = await readAt(handle, entry.localHeaderOffset, 30);
    if (header.readUInt32LE(0) !== LOCAL_SIGNATURE) {
      throw new ZipError(`${entry.name}: bad local header`);
    }
    const dataStart = entry.localHeaderOffset + 30 + header.readUInt16LE(26) + header.readUInt16LE(28);
    const data = await readAt(handle, dataStart, entry.compressedSize);
    const bytes = entry.method === 0
      ? data
      : inflateRawSync(data, { maxOutputLength: Math.max(maxBytes, 1) });
    if (bytes.length !== entry.uncompressedSize) {
      throw new ZipError(`${entry.name}: inflated to ${bytes.length} bytes, expected ${entry.uncompressedSize}`);
    }
    return bytes;
  } finally {
    await handle.close();
  }
}

function isSafeName(name) {
  if (name === '' || name.startsWith('/') || name.includes('\\') || name.includes('\0')) {
    return false;
  }
  const segments = name.endsWith('/') ? name.slice(0, -1).split('/') : name.split('/');
  return segments.every((segment) => segment !== '' && segment !== '.' && segment !== '..');
}

// The layout a store app pak must have: everything under one top folder named
// installName, nothing Leaf's extractor would refuse or mangle, no symlinks
// (the device would write the link target out as a plain file), an executable
// launch.sh (the device keeps the archive's mode bits and falls back to 0644),
// and a pak.json. installedSize is what Pak Rat compares free space against.
export function checkPakLayout(entries, installName) {
  const problems = [];
  const prefix = `${installName}/`;
  let installedSize = 0;
  let launch = null;
  let manifest = null;
  const seen = new Set();
  for (const entry of entries) {
    const label = JSON.stringify(entry.name);
    if (!isSafeName(entry.name)) {
      problems.push(`${label} is not a safe relative path`);
      continue;
    }
    if (seen.has(entry.name)) {
      problems.push(`${label} appears more than once`);
    }
    seen.add(entry.name);
    if (entry.name !== prefix && !entry.name.startsWith(prefix)) {
      problems.push(`${label} is outside the single top folder ${JSON.stringify(installName)}`);
    }
    if (entry.encrypted) {
      problems.push(`${label} is encrypted`);
    }
    if (entry.method !== 0 && entry.method !== 8) {
      problems.push(`${label} uses compression method ${entry.method} (only stored and deflate are supported)`);
    }
    const type = entry.unixMode === null ? 0 : entry.unixMode & S_IFMT;
    if (type === S_IFLNK) {
      problems.push(`${label} is a symlink`);
    } else if (type !== 0 && type !== S_IFDIR && type !== S_IFREG) {
      problems.push(`${label} is not a regular file or folder`);
    }
    if (!entry.name.endsWith('/')) {
      installedSize += entry.uncompressedSize;
    }
    if (entry.name === `${prefix}launch.sh`) {
      launch = entry;
    }
    if (entry.name === `${prefix}pak.json`) {
      manifest = entry;
    }
  }
  if (!launch) {
    problems.push(`${prefix}launch.sh is missing`);
  } else if (launch.unixMode === null || (launch.unixMode & 0o111) === 0) {
    problems.push(`${prefix}launch.sh is not executable in the archive (Leaf keeps the archive's file mode)`);
  }
  if (!manifest) {
    problems.push(`${prefix}pak.json is missing`);
  }
  return { problems, installedSize, manifest };
}
