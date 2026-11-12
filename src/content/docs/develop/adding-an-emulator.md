---
title: Adding a system or emulator
description: Package a third-party system, libretro core, or standalone emulator for Leaf as a self-contained content pak.
---

A **content pak** adds a system and its emulator to Leaf, or an alternate core to
an existing system. It is a `.pak` whose `pak.json` has a top-level `provides`
object. The core, metadata, and artwork stay inside the pak, and uninstalling it
removes its contribution on the next library rescan.

This page is the walkthrough. The
[content pak reference](/develop/content-pak-reference/) has every field, and the
public
[content-pak contract](https://github.com/Utility-Muffin-Research-Kitchen/leaf-contracts/blob/main/docs/content-paks.md)
is the final authority when the two disagree.
[ScummVM-pak](https://github.com/Utility-Muffin-Research-Kitchen/ScummVM-pak) is a
complete buildable example you can clone as a starting point.

## Before you start

A content pak must:

- target a concrete platform such as `mlp1`, not `shared`;
- live under `Apps/<platform>/Name.pak/` on the primary SD card;
- declare `min_leaf_version` for a Leaf release that supports content paks;
- keep every executable, core, `.info` file, and icon inside the pak, declared by
  a path that follows the [path rules](/develop/content-pak-reference/#path-rules).

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

A pure content pak has no `launch.sh` and stays out of the Apps tab. Add an
executable `launch.sh` only if the package also has an app UI. The reference has
the [full table](/develop/content-pak-reference/#package-marker).

## Declare a new system and libretro core

Replace every example identifier and file with your own. Paths are relative to
`MySystem.pak/`.

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

`id` is the catalog identity. `patterns` are the ROM-folder names Leaf recognizes.
Matching is case-insensitive, so list the canonical spelling only. `rom_root` and
`image_root` are the public SD-card folders. `default_core` must name a core in
the final merged catalog.

`config_folder` becomes a real directory under `Saves/` and `States/`. Set the
three capability flags from what the emulator does; not every libretro core
supports them. The reference lists the allowed values for
[`systems[]`](/develop/content-pak-reference/#systems) and
[`cores[]`](/develop/content-pak-reference/#cores), and the fields a third-party
manifest can't use.

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

Leaf runs the target with one argument, the absolute path of the selected game,
and exports the runtime paths such as `ROMS_PATH`, `SAVES_PATH`, `USERDATA_PATH`,
and `LOGS_PATH`. `ROMS_PATH` and `SAVES_PATH` belong to the card the game is on.
The target is usually a small launch script. Pass every location on the
emulator's command line each time, don't store an absolute mount path, and end
with `exec` so Leaf supervises the emulator itself.

With `supports_menu` set to `false`, a tap on Leaf's **MENU** button shows
**Return to Leaf?**, and a second tap within four seconds sends the emulator
`SIGTERM`. If Leaf can't show the prompt, the first tap sends it. With
`supports_menu` set to `true`, the tap reaches the emulator as its own menu
button. Either way, holding **MENU** for three seconds sends `SIGTERM`, and two
more seconds send `SIGKILL`. Neither saves the game, so make sure players can save
inside the emulator.

A path core in `alternate_cores` starts only for games or systems where the
player chose it; the system's `default_core` stays the default.
[ScummVM-pak](https://github.com/Utility-Muffin-Research-Kitchen/ScummVM-pak)
ships its standalone ScummVM this way. Its `standalone/` build and
`launch-game.sh` are a complete example, including checks that the binary only
needs libraries the device provides, and its corresponding-source archive.

## Ship your own RetroArch build

A `retroarch` core runs in the RetroArch that Leaf ships. A core that can't load
there, such as one that only exists for 32-bit ARM, can still get Leaf's in-game
menu, save states, and Game Switcher if your pak ships its own RetroArch build
and declares it as the core's `frontend`. Leaf then runs your build in place of
its own, with the same command line and the same generated configuration, and
treats the game as an ordinary RetroArch game.
[Yabadabadoo](/app-store/yabadabadoo/) does this for its 32-bit Saturn core.

```json
{
  "id": "mysaturn",
  "display_name": "My Saturn Core",
  "type": "retroarch",
  "libretro_name": "mysaturn",
  "file_name": "cores/mysaturn_libretro.so",
  "info_name": "info/mysaturn_libretro.info",
  "config_folder": "MySaturn",
  "frontend": {
    "path": "frontend/retroarch.sh",
    "protocol": "leaf-ra-1"
  }
}
```

`frontend.path` is usually a short script that sets up what your build needs,
such as a 32-bit loader and libraries, and then `exec`s RetroArch. The reference
has the [field rules and rejection reasons](/develop/content-pak-reference/#frontend).
You still ship the core file and its `.info`.

`config_folder` must be the name the core reports to RetroArch as its library
name. RetroArch files saves, states, and thumbnails under that name, and Leaf's
menu looks for states there, so a mismatch hides the player's saves. The validator
can't check this for you.

Your frontend takes on a few obligations. The
[LEAF-RA-1 contract](https://github.com/Utility-Muffin-Research-Kitchen/leaf-contracts/blob/main/docs/leaf-retroarch-frontend.md)
specifies them all; in short, it must:

- run with Leaf's arguments unchanged and `exec` RetroArch, so the process Leaf
  tracks is the one holding the game;
- honor the generated config file in full, without filtering it, merging
  settings into it, or logging it, because it can hold the player's
  RetroAchievements login;
- listen for Leaf's commands on the UDP port the config names, and answer
  `GET_INFO` early, before content has loaded;
- exit cleanly on the `QUIT` command and on `SIGTERM`.

Upstream RetroArch answers only a few of those commands, so your build needs
patches for the rest. Leaf's own RetroArch patches, in the **retroarch-builds**
repository (see the [repository table](/develop/architecture/#repositories)), are
the reference implementation.

Set `min_leaf_version` to the first Leaf release that supports `frontend`, which
is Leaf 0.13. An older Leaf refuses the pak, and the store doesn't offer it there.
To keep working on older Leaf, publish an earlier version without `frontend` and
gate the two versions separately.

### What players get

When your frontend answers `GET_INFO`, players get Leaf's in-game menu for it as
for any core: save states with thumbnails, load, reset, disc swapping, shaders,
and **RetroArch Settings**. They also get the Game Switcher, saving on power
hold and resuming after power-off, and **MENU** hotkeys. If it doesn't answer,
**MENU** opens RetroArch's own menu instead and those features stay off for that
game.

Some things don't come with it:

- Leaf doesn't ask a frontend to record or to switch to Bluetooth audio, so
  don't depend on either.
- Settings a player changes in your RetroArch are saved back to Leaf's shared
  RetroArch settings only when its version matches the RetroArch Leaf ships.
  Build the same upstream version if you want them kept.

## Add a core to an existing system

Use `system_extensions[]`, which appends alternate cores. Don't copy an existing
system into `systems[]`.

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
the **Photographic** setting. A user-created `Roms/<SYSTEM>/icon.png` still wins
over both.

A system can also declare its Central Scrutinizer `group`, its `bios_directory`
and `bios_notes`, and its ScreenScraper platform IDs. See
[`systems[]`](/develop/content-pak-reference/#systems) for the values.

### How ScreenScraper IDs work

ScreenScraper gives each platform a numeric `systemeid`. Put that number in
`screenscraper_platform_ids`; it is not the Leaf system `id`, ROM-folder name,
or emulator core id. For example, ScreenScraper's ScummVM platform is `123`:

```json
"screenscraper_platform_ids": [123]
```

Use ScreenScraper's official
[Web API reference](https://www.screenscraper.fr/webapi2.php) and its
`systemesListe.php` response to find the number for a platform. A system may
declare up to eight IDs when its games span several ScreenScraper platforms. Leaf
tries them in the declared order until it finds usable artwork, so put the most
specific match first. A wrong ID produces wrong or missing matches and uses up the
player's request allowance. Without declared IDs, Leaf can't scrape a new
third-party system.

The platform ID says where to search, and the ROM filename normally says what to
search for. Some systems instead use a small descriptor file whose contents are
the canonical game identity. Declare that with the optional top-level
`content_scrape` companion:

```json
{
  "content_scrape": {
    "schema": 1,
    "systems": [
      {
        "id": "SCUMMVM",
        "name_source": "descriptor",
        "lookup_extension": "scummvm"
      }
    ]
  }
}
```

If `Kings Quest 1.scummvm` contains `kq1`, Leaf first searches for
`kq1.scummvm` under platform `123`, then falls back to filename-based
candidates. The launcher title and artwork path still use `Kings Quest 1`.
Only use descriptor mode when the file contains a stable game identifier; its
`lookup_extension` must also appear in that system's `extensions` list.

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
3. Put ROMs in the declared `Roms/<SYSTEM>/` folder.
4. In Leaf, press **MENU**, then choose **Actions > Rescan Library**.

The new system and its games appear in that rescan. Removing the pak and
rescanning removes the system. The player's ROMs, images, saves, and states stay.

## My pak installs but doesn't add its system or core

Open its Pak Rat detail page. Leaf shows what the installed manifest says it
provides and the newest matching catalog diagnostic. The same diagnostics are in
`.umrk/<platform>/catalog/diagnostics.json`.

Common failures are:

- a declared file is missing, not regular, or not executable;
- the pak declares a `frontend` and Leaf is older than the release that supports
  it;
- a path is absolute, traverses with `..`, or escapes through a symlink;
- the pak is under `Apps/shared/` or on a secondary card;
- a system/core id, ROM folder, image folder, config folder, or `.info` filename
  collides with Leaf or another pak;
- a system's `default_core` was rejected or does not exist.

Leaf drops only the refused contribution, logs the reason, and continues with a
valid catalog. The reference covers the [path rules](/develop/content-pak-reference/#path-rules)
and [what counts as a collision](/develop/content-pak-reference/#merge-ownership).
