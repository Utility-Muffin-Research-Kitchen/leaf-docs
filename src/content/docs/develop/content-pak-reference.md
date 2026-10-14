---
title: Content pak reference
description: Field reference for Leaf content-paks-v1 manifests.
---

This page is the short authoring reference for `content-paks-v1`. See
[Adding a system or emulator](/develop/adding-an-emulator/) for a walkthrough
and the public
[normative contract](https://github.com/Utility-Muffin-Research-Kitchen/leaf-contracts/blob/main/docs/content-paks.md)
for every rejection reason, default, merge rule, and effective-catalog detail.

## Package marker

`pak.json` becomes a content manifest when it has a top-level `provides` object:

```json
{
  "name": "Example",
  "platform": "mlp1",
  "pak_version": "1.0.0",
  "min_leaf_version": "0.11.0",
  "provides": {
    "schema": 1,
    "systems": [],
    "system_extensions": [],
    "cores": []
  }
}
```

At least one of the three arrays must be non-empty. `schema` is exactly `1`.
Unknown fields inside `provides` and its entries are refused rather than
ignored. Other top-level `pak.json` metadata is allowed; `content_scrape` is
one such optional companion.

An executable `launch.sh` controls whether the installed pak appears in Apps:

| `launch.sh` | `provides` | Result |
|---|---|---|
| yes | no | ordinary app |
| yes | yes | app plus content contribution |
| no | yes | content only; hidden from Apps |
| no | no | invalid package |

## `systems[]`

| Field | Required | Value |
|---|---|---|
| `id` | yes | `^[A-Z0-9_]{2,32}$` |
| `name` | yes | 1-64 characters |
| `patterns` | yes | 1-32 recognized ROM-folder names |
| `extensions` | yes | 1-64 lowercase extensions, without dots |
| `default_core` | yes | core id available after merge |
| `rom_root` | yes | `Roms/<folder>` |
| `image_root` | yes | `Images/<folder>` |
| `icon_flat` | yes | pak-relative existing PNG |
| `icon_photographic` | no | pak-relative existing PNG or `null` |
| `archive_extensions` | no | archive extensions accepted directly |
| `archive_inner_extensions` | no | ROM extensions recognized inside archives |
| `archive_mode` | no | `pass_through`, `extract`, or `none` |
| `file_names` | no | exact filenames that identify content |
| `ignore_file_names` | no | exact filenames discovery ignores |
| `playlist_extensions` | no | playlist extensions such as `m3u` |
| `m3u_generation` | no | `none`, `auto`, or `manual` |
| `alternate_cores` | no | additional core ids for this new system |
| `bios_notes` | no | up to eight short BIOS requirements |
| `screenscraper_platform_ids` | no | up to eight integers from 1-99999 |
| `group` | no | Central Scrutinizer group, or `null` |
| `bios_directory` | no | one FAT32-safe directory component, or `null` |

Defaults and exact length limits live in the normative contract and schema.

## `cores[]`

Every core has `id`, `display_name`, and `type`. Core ids match
`^[a-z0-9_]{2,64}$`.

For `type: "retroarch"`:

| Field | Required | Value |
|---|---|---|
| `libretro_name` | yes | libretro core name |
| `file_name` | yes | pak-relative core binary |
| `info_name` | yes | pak-relative `.info` file |
| `config_folder` | yes | FAT32-safe Saves/States directory component |
| `frontend` | no | object that runs the core in a RetroArch the pak ships; see [`frontend`](#frontend) |

For `type: "path"`:

| Field | Required | Value |
|---|---|---|
| `path` | yes | pak-relative existing executable |

A `retroarch` core may not carry `path`, and a `path` core may not carry
`libretro_name`, `file_name`, `info_name`, `config_folder`, or `frontend`; either
mix is refused with `core-type-field-mismatch`.

Both types may declare boolean `supports_menu`, `supports_savestate`,
`supports_disk_control`, and `needs_swap`; each defaults to `false`.

The fields `requires_direct_drm`, `legacy_flat_core`, `name_map`, and `status`
are forbidden.

## `frontend`

An optional object on a `retroarch` core. It makes Leaf run the pak's own
RetroArch build for that core in place of the RetroArch Leaf ships, for cores
that can't load there. [Adding a system or emulator](/develop/adding-an-emulator/#ship-your-own-retroarch-build)
walks through it, and the
[LEAF-RA-1 contract](https://github.com/Utility-Muffin-Research-Kitchen/leaf-contracts/blob/main/docs/leaf-retroarch-frontend.md)
says what the build has to do.

```json
"frontend": { "path": "frontend/retroarch.sh", "protocol": "leaf-ra-1" }
```

| Field | Required | Value |
|---|---|---|
| `path` | yes | pak-relative existing executable |
| `protocol` | yes | exactly `leaf-ra-1` |

The object has exactly those two fields. `frontend` doesn't replace anything:
`libretro_name`, `file_name`, `info_name`, and `config_folder` are still
required.

| Rejection reason | When |
|---|---|
| `malformed-frontend` | `frontend` isn't an object, has a key besides `path` and `protocol`, or `path` is missing, empty, or not a string |
| `unknown-frontend-protocol` | `protocol` is missing or is anything but `leaf-ra-1` |
| `core-type-field-mismatch` | `frontend` is on a `type: "path"` core |
| `absolute-path`, `path-traversal`, `escaping-symlink`, `missing-file`, `non-regular-file`, `not-executable` | `path` breaks the [path rules](#path-rules) |

`provides.schema` stays `1`. A Leaf that predates `frontend` refuses the pak with
`unknown-field`, so a pak that declares it must set `min_leaf_version` to the
first Leaf release that supports it. Leaf copies the core into its catalog as
written and fingerprints the frontend file with the pak's other declared files,
so replacing the frontend without editing `provides` still refreshes the
catalog.

## `system_extensions[]`

This is the only supported way to add an alternate core to an existing system:

```json
{
  "system_id": "SFC",
  "add_alternate_cores": ["my_snes_core"]
}
```

It has exactly those two fields. It cannot override a system's name, folders,
art, extensions, or default core.

## Path rules

Every declared file path is relative to the pak root and must:

- not begin with `/`;
- contain no `..` component;
- remain inside the pak after resolving every symlink component;
- exist as a regular file;
- be executable when it is a standalone `path` core or a `frontend`.

Do not persist an SD-card mount point in a manifest. Leaf resolves the provider
pak at runtime so `/mnt/sdcard` and `/media/sdcard1` swaps remain safe.

## Merge ownership

Ownership is case-insensitively unique across system ids, patterns, ROM roots,
image roots, core ids, config folders, and materialized `.info` filenames.

- A collision with Leaf refuses that contribution.
- A collision between two paks refuses both; directory order never chooses a
  winner.
- Refusing a default core also refuses the system that depends on it.
- A missing extension target is dropped and diagnosed.
- A missing alternate core name is dropped while the rest of the extension can
  remain.

Diagnostics are written to `.umrk/<platform>/catalog/diagnostics.json` and
shown on the installed pak's Pak Rat detail page.

## Store submission

A package that declares `provides` belongs in the storefront's `content[]`
lane, even when it is a hybrid with `launch.sh`. Its `pakrat.json` uses
`"kind": "content"`, targets a concrete platform, and gates every published
version with `min_leaf_version`. The same id must never appear in both
`apps[]` and `content[]`.

Use the
[ScummVM-pak repository](https://github.com/Utility-Muffin-Research-Kitchen/ScummVM-pak)
as the build, licence, Pak Rat metadata, and CI reference.
