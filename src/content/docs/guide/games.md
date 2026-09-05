---
title: Adding games & ROMs
description: Where to put ROMs, box art, saves, and states on the SD card so Leaf finds them.
---

Leaf reads your library from a set of clearly named folders on the SD card. Drop
files into the right folder and they show up in the launcher; there's no database
to manage by hand. You can fill the folders by putting the SD card in your
computer, or over Wi-Fi with the Central Scrutinizer app (see
[Features → Apps](/guide/features/#apps)).

:::caution[Bring your own games]
Leaf does not include any games. Only add ROMs you are legally entitled to use.
:::

## Folder layout

At the root of the SD card you'll find these user-facing folders:

```text
Roms/<SYSTEM>/      your game files, one folder per system
Images/<SYSTEM>/    box art, matching each game's filename
Saves/              in-game saves
States/             save states
BIOS/               BIOS files some systems need (see BIOS & cores)
```

- **`Roms/<SYSTEM>/`** - put each game in the folder for its system, e.g.
  `Roms/SNES/Chrono Trigger.sfc` or `Roms/GBA/Metroid Fusion.gba`. Games can sit
  loose in the system folder or tucked into subfolders (a folder per game, or your
  own grouping) - Leaf scans down into them, so
  `Roms/PSX/Final Fantasy VII/Final Fantasy VII.cue` works just as well.
- **`Images/<SYSTEM>/`** - put box art next to the matching system folder, named
  to match the game. For `Roms/SNES/Chrono Trigger.sfc`, use
  `Images/SNES/Chrono Trigger.png`.
- **`Saves/` and `States/`** - created and managed for you as you play. See
  [Playing games](/guide/playing/) for how in-game saves and save states work.

## System folders

Each console gets **one** `Roms/` subfolder, grouped by maker below - one folder
per system, not one per emulator. Different emulators or compatibility modes for
the same console are a **Core** choice (see Options below), not separate folders.

Folder names are not case-sensitive, and most systems accept a few aliases
(`Roms/NES`, `Roms/FC`, and `Roms/FAMICOM` all land in the same place), so the
name shown is just the recommended one. Older alias folders keep working if you
already have them, but new games and box art should go in the recommended folder.

**Nintendo**

| Folder | System |
|---|---|
| `NES` | Nintendo Entertainment System |
| `FDS` | Famicom Disk System |
| `SNES` | Super Nintendo / Super Famicom |
| `N64` | Nintendo 64 |
| `GB` / `GBC` / `GBA` | Game Boy / Color / Advance |
| `NDS` | Nintendo DS |
| `VB` | Virtual Boy |
| `GW` | Game & Watch |

**Sega**

| Folder | System |
|---|---|
| `MS` | Master System |
| `GG` | Game Gear |
| `GENESIS` | Genesis / Mega Drive |
| `SEGACD` | Sega CD |
| `32X` | Sega 32X |
| `SATURN` | Saturn |
| `DC` | Dreamcast |
| `ATOMISWAVE` | Atomiswave |
| `NAOMI` | Sega Naomi, Naomi GD-ROM, and Naomi 2 |

**NEC**

| Folder | System |
|---|---|
| `PCE` | PC Engine / TurboGrafx-16 |
| `PCECD` | PC Engine CD / TurboGrafx-CD |
| `PC98` | NEC PC-98 |

**SNK**

| Folder | System |
|---|---|
| `NEOGEO` | Neo Geo - home (AES) and arcade (MVS) share this folder; needs a BIOS, see below |
| `NGP` / `NGPC` | Neo Geo Pocket / Color |

**Sony**

| Folder | System |
|---|---|
| `PSX` | PlayStation |
| `PSP` | PlayStation Portable |

**Atari**

| Folder | System |
|---|---|
| `ATARI2600` | Atari 2600 |
| `A7800` | Atari 7800 |
| `LYNX` | Atari Lynx |

**Other**

| Folder | System |
|---|---|
| `WS` / `WSC` | WonderSwan / Color |
| `COLECO` | ColecoVision |
| `VECTREX` | Vectrex |
| `PICO8` | Pico-8 |
| `DOS` | MS-DOS |
| `EASYRPG` | EasyRPG (RPG Maker 2000/2003) |
| `ARCADE` | Arcade (FBNeo, recommended for most arcade sets; Neo Geo sets go in `NEOGEO`) |
| `PORTS` | Ports (native game ports) |

Advanced arcade users can also use `Roms/MAME/` for MAME 03+ zipped ROM sets.
Use that only when your set is built for that core; otherwise put arcade games
in `Roms/ARCADE/`. The one exception is Neo Geo: FinalBurn Neo runs those too,
but they belong in `Roms/NEOGEO/` so they get their own system in the launcher.

Naomi, Naomi GD-ROM, and Naomi 2 are one system in Leaf. Put content from all
three hardware families in `Roms/NAOMI/`; do not create separate GD-ROM or
Naomi 2 folders. Their BIOS archives stay separate by hardware generation:
`BIOS/dc/naomi.zip` serves base Naomi and Naomi GD-ROM, while
`BIOS/dc/naomi2.zip` serves Naomi 2.

### Supported game formats

These are the accepted game-file formats per folder:

| Folder | Supported formats | Notes |
|---|---|---|
| `NES` | `.fds`, `.nes`, `.unf`, `.unif`, `.7z`, `.zip` |  |
| `FDS` | `.fds`, `.nes`, `.7z`, `.zip` |  |
| `SNES` | `.bs`, `.bsx`, `.dx2`, `.fig`, `.gd3`, `.gd7`, `.sfc`, `.smc`, `.st`, `.swc`, `.7z`, `.zip` |  |
| `N64` | `.n64`, `.v64`, `.z64`, `.7z`, `.zip` |  |
| `GB` | `.bin`, `.dmg`, `.gb`, `.gbc`, `.7z`, `.zip` |  |
| `GBC` | `.bin`, `.dmg`, `.gb`, `.gbc`, `.7z`, `.zip` |  |
| `GBA` | `.bin`, `.gba`, `.7z`, `.zip` |  |
| `NDS` | `.nds`, `.7z`, `.zip` |  |
| `VB` | `.vb`, `.vboy`, `.7z`, `.zip` |  |
| `GW` | `.mgw`, `.7z`, `.zip` |  |
| `MS` | `.32x`, `.68k`, `.bin`, `.chd`, `.gen`, `.iso`, `.md`, `.smd`, `.sms`, `.7z`, `.zip` |  |
| `GG` | `.bin`, `.gg`, `.7z`, `.zip` |  |
| `GENESIS` | `.32x`, `.68k`, `.bin`, `.chd`, `.gen`, `.iso`, `.md`, `.smd`, `.sms`, `.7z`, `.zip` |  |
| `SEGACD` | `.chd`, `.cue`, `.iso`, `.7z`, `.zip`, `.m3u` |  |
| `32X` | `.32x`, `.68k`, `.bin`, `.chd`, `.gen`, `.iso`, `.md`, `.smd`, `.sms`, `.7z`, `.zip` |  |
| `SATURN` | `.ccd`, `.chd`, `.cue`, `.iso`, `.mds`, `.zip`, `.m3u` |  |
| `DC` | `.cdi`, `.chd`, `.cue`, `.dat`, `.gdi`, `.iso`, `.m3u` | `.zip` is not accepted directly |
| `ATOMISWAVE` | `.cdi`, `.chd`, `.cue`, `.dat`, `.gdi`, `.iso`, `.zip`, `.m3u` | Keep zipped sets at their original shortnames |
| `NAOMI` | `.cdi`, `.chd`, `.cue`, `.dat`, `.gdi`, `.iso`, `.zip`, `.m3u` | Keep zipped sets at their original shortnames |
| `PCE` | `.ccd`, `.chd`, `.cue`, `.img`, `.iso`, `.pce`, `.7z`, `.zip` |  |
| `PCECD` | `.ccd`, `.chd`, `.cue`, `.img`, `.iso`, `.m3u` | `.zip` is not accepted directly |
| `PC98` | `.2hd`, `.88d`, `.98d`, `.cmd`, `.d88`, `.d98`, `.dup`, `.fdd`, `.fdi`, `.hdd`, `.hdi`, `.hdm`, `.hdn`, `.nhd`, `.tfd`, `.thd`, `.xdf`, `.zip` | Use `.cmd` when multiple images must be mounted together |
| `NEOGEO` | `.7z`, `.zip` | `neocd.zip`, `neocdz.zip`, and `neogeo.zip` are BIOS/ignored as games |
| `NGP` | `.ngc`, `.ngp`, `.7z`, `.zip` |  |
| `NGPC` | `.ngc`, `.ngp`, `.7z`, `.zip` |  |
| `PSX` | `.cbn`, `.chd`, `.cue`, `.img`, `.iso`, `.mdf`, `.pbp`, `.toc`, `.m3u` | `.zip` is not accepted directly |
| `PSP` | `.chd`, `.cso`, `.iso`, `.pbp` | `.zip` is not accepted directly |
| `ATARI2600` | `.a26`, `.bin`, `.7z`, `.zip` |  |
| `A7800` | `.a78`, `.bin`, `.7z`, `.zip` |  |
| `LYNX` | `.lnx`, `.zip` |  |
| `WS` | `.pc2`, `.ws`, `.wsc`, `.7z`, `.zip` |  |
| `WSC` | `.pc2`, `.ws`, `.wsc`, `.7z`, `.zip` |  |
| `COLECO` | `.bin`, `.col`, `.rom`, `.7z`, `.zip` |  |
| `VECTREX` | `.bin`, `.vec`, `.7z`, `.zip` |  |
| `PICO8` | `.p8`, `.png` |  |
| `DOS` | `.bat`, `.com`, `.conf`, `.dosz`, `.exe`, `.ima`, `.img`, `.ins`, `.iso`, `.jrc`, `.tc`, `.vhd`, `.zip`, `.m3u`, `.m3u8` |  |
| `EASYRPG` | `.easyrpg`, `.ldb`, `.zip` | `RPG_RT.ldb` is the expected project entry file |
| `ARCADE` | `.zip` | `neocd.zip`, `neocdz.zip`, and `neogeo.zip` are BIOS/ignored as games |
| `PORTS` | `.sh` |  |
| `MAME` | `.zip` | Optional advanced folder for MAME 03+ sets |

### Naomi and Atomiswave arcade sets

A `.zip` in either of these folders is a MAME/Flycast ROM set, not a generic
compressed game. Its filename before `.zip` is a machine-readable game ID. Do
not replace that shortname with the friendly title: Flycast will not identify
the game. Leaf shows the friendly title automatically, so `doa2m.zip` appears
as **Dead or Alive 2 Millennium** without changing the file on disk.

On the SD card, a cartridge example keeps its set archive alongside the
matching BIOS:

```text
Roms/NAOMI/doa2m.zip
BIOS/dc/naomi.zip
```

A Naomi GD-ROM set uses its shortname ZIP as the launchable entry and keeps the
CHD in a same-shortname subfolder:

```text
Roms/NAOMI/ikaruga.zip
Roms/NAOMI/ikaruga/gdl-0010.chd
BIOS/dc/naomi.zip
```

Launch `ikaruga.zip`, not the CHD. Split sets may also require their parent ZIP.
Keep every archive, parent, subfolder, and media filename exactly as supplied by
a compatible MAME/Flycast set. Renaming an incompatible dump does not convert it
into a compatible set.

For a wider title-to-shortname lookup, [Flycast's upstream Naomi compatibility
list](https://github.com/libretro/flycast/issues/136?timeline_page=1) includes a
`romset` column. Its compatibility results were collected against an older core,
so use the names as a lookup aid rather than a Leaf compatibility guarantee.

### PC-98 games that need multiple disks at startup

Some PC-98 software expects Disk A in the first floppy drive and Disk B in the
second drive immediately at startup. Launching Disk A by itself can produce a
**Not ready** message. Keep the images together and add a UTF-8 `.cmd` file in
the same folder, for example:

```text
Dragon Knight 4 Special Disk.cmd
Dragon Knight 4 Special Disk (Disk 1 of 2)(Disk A).fdd
Dragon Knight 4 Special Disk (Disk 2 of 2)(Disk B).fdd
```

The `.cmd` file contains one line. Quote every filename that contains spaces:

```text
np2kai "Dragon Knight 4 Special Disk (Disk 1 of 2)(Disk A).fdd" "Dragon Knight 4 Special Disk (Disk 2 of 2)(Disk B).fdd"
```

The first floppy image is mounted in FDD1 and the second in FDD2. Launch the
`.cmd` entry from Jawaka; Jawaka hides the disk files referenced by that command
so the game appears only once. Unreferenced images remain visible as normal.
Use RetroArch's **Disc Control** later if the software asks for another disk.

A system appears in the launcher once its emulator core is available on the
device. If a folder's system isn't showing up, its core may not be installed;
see [BIOS & cores](/guide/bios-and-cores/).

## A second SD card

The Pocket 1 has **two** microSD slots. The card Leaf boots from is the
**Primary**; a card in the second slot is picked up automatically as an extra
**Secondary** source of games.

Give the second card the same folder layout as the first - `Roms/<SYSTEM>/`,
`Images/<SYSTEM>/`, and so on at its root. Leaf merges both cards into one
library, so a system's games from either card appear together under that one
system, and you don't need to browse per card.

:::caution[Format it FAT32]
The second card must be partitioned and formatted **FAT32**. Leaf mounts it as a
`vfat` volume, so an exFAT card (which is how most cards over 32 GB come
formatted out of the box) will not mount at all. Reformat it as FAT32 first.
:::

You can add or remove the second card while the device is running: Leaf notices
the change and rescans on its own. Before pulling it out, use
**Settings → General → Unmount Secondary SD** so nothing is mid-write.

Removing the second card doesn't throw away anything Leaf knows about its games.
Those games become temporarily unavailable and disappear from the lists, but
their favorites, recents, playtime, artwork, and per-game settings are kept.
Put the card back and the same entries return. That also holds if the two cards
change places or content moves between them, because Leaf identifies a game by
its card and its path within that card rather than by wherever it happened to be
mounted.

## Box art

You can add box art two ways: drop it in yourself, or let Leaf fetch it.

**Add it yourself.** Name each image to match its game file (same name, image
extension) and place it in `Images/<SYSTEM>/`. For `Roms/SNES/Chrono Trigger.sfc`,
use `Images/SNES/Chrono Trigger.png`. Leaf pairs them up automatically and shows
the art in the game list.

**Let Leaf fetch it.** Leaf can download box art from
[ScreenScraper.fr](https://www.screenscraper.fr/). Sign in once under
**Settings → Accounts → ScreenScraper.fr**, then start a scrape. For a single
game, press **X** on it and choose **Scrape Artwork**. To do whole systems at once
(or every system), use **Settings → Game Art → Scrape Artwork**, which lists **All
Systems** plus each system with its missing-art count. Fetched art lands in
`Images/<SYSTEM>/` exactly as if you had added it by hand, and appears in the list
as soon as each download finishes. Which image type and region it picks is set
under **Settings → Game Art** (Artwork Priority and Region Priority).

PC-98, Atomiswave, and the complete Naomi family are supported by live scraping.
For a Naomi title, Leaf tries the base Naomi catalog first, then Naomi GD-ROM,
then Naomi 2. It computes the game hash once and stops as soon as the correct
family matches; no extra setup is needed. Artwork still lands at
`Images/<SYSTEM>/<game-name>.png`, including `Images/NAOMI/` for every Naomi
family.

A Naomi miss can query all three family catalogs, so scraping a large unmatched
Naomi set can use more of ScreenScraper's daily request allowance than a
single-catalog system.

## Options menu

Press **X** on a game or a system in the launcher to open its **Options** menu.
This is where per-item actions live, so they stay out of the main list:

- **Display Name** - rename how the game or system shows in the launcher.
- **Core** - choose which emulator core runs this game or system, when more than
  one is available.
- **Saturn BIOS** - appears only when **YabaSanshiro Standalone** is the emulator
  in force. Choose **Default**, **HLE**, or one of your own BIOS files. See
  [Saturn BIOS selection](/guide/bios-and-cores/#saturn-choosing-a-bios).
- **Performance** - set a per-game or per-system performance profile that
  overrides the global default.
- **Scrape Artwork** - on a game, fetch and replace its box art. While that scrape
  is queued the row reads **Cancel Scraping**. To scrape a whole system or every
  system at once, use **Settings → Game Art → Scrape Artwork** instead.
- **Reset Overrides** - clear the custom name, core, performance, and Saturn BIOS
  settings you set above.

Scraping runs in the background, so you can leave the menu, keep browsing, or
even play a game while art downloads.

## Multi-disc games

Leaf handles multi-disc games (PlayStation, Sega CD, and the like) for you. Name
the disc files with the usual `(Disc 1)`, `(Disc 2)` tags, drop them in the system
folder - loose or in a subfolder of their own - and Leaf groups them into a single
`.m3u` playlist automatically. The game then shows up once instead of once per
disc, and RetroArch reads that playlist to swap discs from its in-game menu.

Prefer to manage it yourself? Add your own `.m3u` listing the disc files and Leaf
uses it as-is - it never overwrites a playlist you made by hand.

## Arcade names

Arcade ROMs are named by their short internal ID (`mslug`, `1942`, `sf2ce`)
rather than the full title. Leaf recognizes these for arcade and Neo Geo sets and
shows the friendly name instead, so `mslug` reads as **Metal Slug** and your
arcade list looks like the rest of your library. There's nothing to switch on; it
happens as your games are scanned.

To override a name, drop a `map.txt` in that system's folder (for example
`Roms/ARCADE/map.txt`) with one `romname = Your Title` line per game - the
`romname` is the zip's name without its extension. Your entries win over the
built-in list.

## BIOS-dependent systems

Some systems need a BIOS file you provide yourself (Neo Geo, for example, needs
`neogeo.zip` in `BIOS/`). Arcade games are also picky about ROM-set versions.
See [BIOS & cores](/guide/bios-and-cores/) for the details.
