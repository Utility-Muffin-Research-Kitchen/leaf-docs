// Pak Rat version grammars. The validator and the upstream poller both import
// this file, so a version the poller writes is judged by exactly these rules.
//
// strict:   MAJOR.MINOR.PATCH. Every shipped Leaf client parses apps[],
//           content[], min_leaf_version and theme gates this way, so it stays
//           as loose as it always was (leading zeros pass, components <= 9999).
// extended: MAJOR.MINOR.PATCH[.BUILD][-(alpha|beta|rc).N], apps_v2[] only.
//           Components and N are 0-9999 without leading zeros. A missing BUILD
//           counts as 0, so 5.4.0 and 5.4.0.0 compare equal. Order: the core
//           numbers, then alpha < beta < rc < release, then N. A suffix is
//           what makes a version a pre-release; there is no separate flag.

export const MAX_VERSION_COMPONENT = 9999;

export const STRICT_VERSION_RE = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/;
const COMPONENT = '(0|[1-9][0-9]{0,3})';
export const EXTENDED_VERSION_RE = new RegExp(
  `^${COMPONENT}\\.${COMPONENT}\\.${COMPONENT}(?:\\.${COMPONENT})?(?:-(alpha|beta|rc)\\.${COMPONENT})?$`,
);

const STAGE_RANK = { alpha: 1, beta: 2, rc: 3, release: 4 };

function parsed(core, stage, number) {
  return { core, stage, number, prerelease: stage !== 'release' };
}

export function parseStrictVersion(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const match = STRICT_VERSION_RE.exec(value);
  if (!match) {
    return null;
  }
  const core = match.slice(1, 4).map(Number);
  if (core.some((component) => component > MAX_VERSION_COMPONENT)) {
    return null;
  }
  return parsed([...core, 0], 'release', 0);
}

export function parseExtendedVersion(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const match = EXTENDED_VERSION_RE.exec(value);
  if (!match) {
    return null;
  }
  const core = [match[1], match[2], match[3], match[4] ?? '0'].map(Number);
  return match[5]
    ? parsed(core, match[5], Number(match[6]))
    : parsed(core, 'release', 0);
}

export function compareVersions(left, right) {
  for (let index = 0; index < 4; index += 1) {
    if (left.core[index] !== right.core[index]) {
      return left.core[index] - right.core[index];
    }
  }
  if (left.stage !== right.stage) {
    return STAGE_RANK[left.stage] - STAGE_RANK[right.stage];
  }
  return left.number - right.number;
}
