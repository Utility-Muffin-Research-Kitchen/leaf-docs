---
title: Adding a system or emulator
description: Package a third-party system, libretro core, or standalone emulator for Leaf as a self-contained content pak.
---

A **content pak** is a `.pak` whose `pak.json` has a top-level `provides`
object. Installing it can add a system to the launcher, ship the emulator that
runs that system, or add an alternate core to an existing system. It never
patches Leaf's installed files: the core, metadata, and artwork stay inside the
pak, and uninstalling the pak removes its contribution on the same library
rescan.

The complete buildable example is
[ScummVM-pak](https://github.com/Utility-Muffin-Research-Kitchen/ScummVM-pak).
Clone that repository if you want a working starting point rather than an empty
directory. The public
[content-pak contract](https://github.com/Utility-Muffin-Research-Kitchen/leaf-contracts/blob/main/docs/content-paks.md)
is the final authority when this guide and the schema disagree.

## Before you start

A content pak must:

- target a concrete platform such as `mlp1`, not `shared`;
- live under `Apps/<platform>/Name.pak/` on the primary SD card;
- declare `min_leaf_version` for a Leaf release that supports content paks;
- keep every executable, core, `.info` file, and icon inside the pak;
- use pak-relative paths with no absolute path or `..` component.

The last rule matters on the MLP1: the same card can mount at `/mnt/sdcard` or
`/media/sdcard1` after a reboot. Leaf resolves pak-relative paths against the
pak's current install location, so the contribution survives that swap.

## Start with this layout

```text
MySystem.pak/
  pak.json
  art/
    MYSYSTEM.png
  cores/
    mycore_libretro.so
  info/
    mycore_libretro.info
```

Do not add `launch.sh` for a pure content pak. It will contribute its system but
stay out of the Apps tab. Add an executable `launch.sh` only if the package also
has an app UI; that hybrid pak contributes content and appears in Apps.

## Declare a new system and libretro core

This is the minimal useful shape. Replace every example identifier and file with
your own; paths are relative to `MySystem.pak/`.

```json
{
  "name": "My System",
  "platform": "mlp1",
  "pak_version": "1.0.0",
  "min_leaf_version": "0.11.0",
  "provides": {
    "schema": 1,
    "systems": [
      {
        "id": "MYSYSTEM",
        "name": "My System",
        "patterns": ["MYSYSTEM"],
        "extensions": ["rom"],
        "rom_root": "Roms/MYSYSTEM",
        "image_root": "Images/MYSYSTEM",
        "default_core": "mycore",
        "icon_flat": "art/MYSYSTEM.png",
        "icon_photographic": null
      }
    ],
    "system_extensions": [],
    "cores": [
      {
        "id": "mycore",
        "display_name": "My Core",
        "type": "retroarch",
        "libretro_name": "mycore",
        "file_name": "cores/mycore_libretro.so",
        "info_name": "info/mycore_libretro.info",
        "config_folder": "MyCore",
        "supports_menu": true,
        "supports_savestate": false,
        "supports_disk_control": false
      }
    ]
  }
}
```

`id` is the catalog identity. `patterns` are ROM-folder names Leaf recognizes;
keep the canonical spelling only because matching is case-insensitive.
`rom_root` and `image_root` are the public SD-card folders. `default_core` must
name a core in the final merged catalog.

`config_folder` becomes a real directory under `Saves/` and `States/`, so use a
single FAT32-safe component. Set the three capability flags from the emulator's
actual behavior rather than assuming every libretro core supports them.

## Ship a standalone emulator

Use a `path` core for an executable that accepts the selected game path. The
target must exist inside the pak and be executable:

```json
{
  "id": "my_standalone",
  "display_name": "My Standalone Emulator",
  "type": "path",
  "path": "bin/my-emulator",
  "supports_menu": false,
  "supports_savestate": false,
  "supports_disk_control": false
}
```

A third-party manifest cannot request direct DRM, legacy flat-core migration,
arcade name maps, or a core status. The forbidden fields are
`requires_direct_drm`, `legacy_flat_core`, `name_map`, and `status`; Leaf derives
runtime status from the installed files.

## Add a core to an existing system

Do not copy an existing system into `systems[]`. Use `system_extensions[]`,
which can only append alternate cores:

```json
{
  "systems": [],
  "system_extensions": [
    {
      "system_id": "SFC",
      "add_alternate_cores": ["my_snes_core"]
    }
  ],
  "cores": [
    {
      "id": "my_snes_core",
      "display_name": "My SNES Core",
      "type": "retroarch",
      "libretro_name": "my_snes_core",
      "file_name": "cores/my_snes_core_libretro.so",
      "info_name": "info/my_snes_core_libretro.info",
      "config_folder": "MySnesCore"
    }
  ]
}
```

Content paks cannot replace a first-party system or change its default core.

## Artwork and scraper metadata

Every new system ships a flat PNG in `icon_flat`. `icon_photographic` may name a
second PNG or be `null`; when it is absent, Leaf uses the flat icon even under
the Photographic setting. A user-created `Roms/<SYSTEM>/icon.png` still wins
over both.

Optional system fields include:

- `screenscraper_platform_ids`: ScreenScraper numeric platform IDs;
- `group`: the group Central Scrutinizer displays, such as `Computer`;
- `bios_directory`: the directory below `BIOS/` used by the system;
- `bios_notes`: short descriptions of required user-supplied BIOS files.

Record the source and licence of both artwork and emulator binaries in the
repository. If the emulator licence requires corresponding source, publish the
source for the exact shipped binary alongside the package.

## Validate before installing

CI should fetch a pinned commit of the public
[`leaf-contracts`](https://github.com/Utility-Muffin-Research-Kitchen/leaf-contracts)
repository and validate the packaged tree, not only the source manifest. The
ScummVM reference shows this flow in its `Makefile` and workflow.

For a quick device iteration:

1. Assemble `MySystem.pak/` on your computer.
2. Copy that one directory to `Apps/mlp1/` on the primary SD card.
3. In Leaf, run **System → Rescan Library**.
4. Put ROMs in the declared `Roms/<SYSTEM>/` folder.

The new system and its games appear in that same rescan. Removing the pak and
rescanning removes the system contribution; it does not delete the user's ROMs,
images, saves, or states.

## When the pak installs but contributes nothing

First open its Pak Rat detail page. Leaf shows what the installed manifest says
it provides and the newest matching catalog diagnostic. Developers can also
inspect:

```text
.umrk/<platform>/catalog/diagnostics.json
```

Common failures are:

- a declared file is missing, not regular, or not executable;
- a path is absolute, traverses with `..`, or escapes through a symlink;
- the pak is under `Apps/shared/` or on a secondary card;
- a system/core id, ROM folder, image folder, config folder, or `.info` filename
  collides with Leaf or another pak;
- a system's `default_core` was rejected or does not exist.

Leaf drops only the refused contribution, logs the reason, and continues with a
valid catalog. The [content-pak field reference](/develop/content-pak-reference/)
lists the allowed fields and identifier rules.
