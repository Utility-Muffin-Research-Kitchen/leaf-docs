// Theme gallery data: turns a Pak Rat catalog into the list the gallery shows.
//
// The gallery is built at deploy time from the catalog's `themes` lane, whose
// entry shape is defined by THEME-1 and enforced by
// scripts/validate-pakrat-catalog.mjs. This module never fetches anything; it
// reads a catalog file from disk during the build.
//
// Order. Theme entries carry no dates. The publishing bot in leaf-themes
// (tools/catalog.py add_version) appends a theme the first time it is
// published and updates it in place afterwards, so catalog order is first
// publication order. "Newest first" is therefore the catalog order reversed:
// the most recently added theme leads, and a new version of an older theme
// does not move it. The rule is stable because the validator forbids removing
// a published theme.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// The live Pak Rat catalog, read from disk when the site builds. Publishing a
// theme merges a catalog change into this repository, which redeploys the site,
// so the gallery is always in step with Pak Rat.
export const GALLERY_CATALOG_PATH = 'public/pakrat/v1/storefront.json';

export type ThemeLicense = 'CC-BY-4.0' | 'CC-BY-SA-4.0' | 'CC0-1.0' | 'redistribution-permitted';

export interface ThemeArtifact {
  url: string;
  name: string;
  archive: 'zip';
  size: number;
  installed_size: number;
  sha256: string;
}

export interface ThemeVersion {
  version: string;
  min_leaf_version: string;
  artifact: ThemeArtifact;
}

export interface CatalogTheme {
  id: string;
  name: string;
  author: string;
  owner_github_id: number;
  summary: string;
  description?: string;
  license: ThemeLicense;
  preview: { url: string; sha256: string; size: number };
  version: string;
  min_leaf_version: string;
  install_name: string;
  artifact: ThemeArtifact;
  versions: ThemeVersion[];
  withdrawn?: boolean;
}

export interface GalleryTheme extends CatalogTheme {
  /** The license as people read it, e.g. "CC BY 4.0". */
  licenseLabel: string;
  /** A shorter form for chips and filters. */
  licenseShort: string;
  /** The license deed, when there is a public one. */
  licenseUrl: string | null;
  /** `description` when present, otherwise `summary`. */
  about: string;
  /** Position in newest-first order, 0 = newest. */
  rank: number;
}

export const LICENSES: Record<ThemeLicense, { label: string; short: string; url: string | null }> = {
  'CC-BY-4.0': { label: 'CC BY 4.0', short: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
  'CC-BY-SA-4.0': { label: 'CC BY-SA 4.0', short: 'CC BY-SA 4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  'CC0-1.0': { label: 'CC0', short: 'CC0', url: 'https://creativecommons.org/publicdomain/zero/1.0/' },
  'redistribution-permitted': {
    label: 'All rights reserved, redistribution permitted',
    short: 'Redistribution permitted',
    url: null,
  },
};

/** The order license filters are offered in. */
export const LICENSE_ORDER: ThemeLicense[] = ['CC0-1.0', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'redistribution-permitted'];

function isTheme(value: unknown): value is CatalogTheme {
  if (value === null || typeof value !== 'object') return false;
  const t = value as Partial<CatalogTheme>;
  return typeof t.id === 'string' && typeof t.name === 'string' &&
    typeof t.preview === 'object' && t.preview !== null && typeof t.preview.url === 'string' &&
    Array.isArray(t.versions) && typeof t.license === 'string' && t.license in LICENSES;
}

/**
 * The themes a visitor may see, newest first. Withdrawn themes are dropped,
 * as is anything that isn't a well-formed theme entry (the validator should
 * already have refused those).
 */
export function visibleThemes(catalog: unknown): GalleryTheme[] {
  const lane = catalog && typeof catalog === 'object' ? (catalog as { themes?: unknown }).themes : undefined;
  if (!Array.isArray(lane)) return [];
  return lane
    .filter(isTheme)
    .filter((theme) => theme.withdrawn !== true)
    .reverse()
    .map((theme, rank) => {
      const license = LICENSES[theme.license];
      return {
        ...theme,
        licenseLabel: license.label,
        licenseShort: license.short,
        licenseUrl: license.url,
        about: theme.description?.trim() ? theme.description : theme.summary,
        rank,
      };
    });
}

/** Reads the gallery's catalog from disk at build time. */
export function galleryThemes(path: string = GALLERY_CATALOG_PATH): GalleryTheme[] {
  const catalog = JSON.parse(readFileSync(resolve(process.cwd(), path), 'utf8'));
  return visibleThemes(catalog);
}

/** "1.8 MB" style size for a download. */
export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Alt text for a theme's preview image. */
export function previewAlt(theme: Pick<CatalogTheme, 'name'>): string {
  return `${theme.name} theme preview`;
}
