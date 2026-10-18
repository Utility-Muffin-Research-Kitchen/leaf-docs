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
  `Images/SNES/Chrono Trigger.png` or `Images/SNES/Chrono Trigger.jpg`. PNG and
  JPEG (`.jpg` or `.jpeg`) both work.
- **`Saves/` and `States/`** - created and managed for you as you play. See
  [Playing games](/guide/playing/) for how in-game saves and save states work.

## System folders

For native PICO-8 carts and Splore, see [Native PICO-8](/guide/pico-8/).
Both FAKE-08 and native playback use `Roms/PICO8/`.

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

**Commodore**

| Folder | System |
|---|---|
| `AMIGA` | Amiga (OCS/ECS/AGA, CDTV, and CD32) |

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
| `SATURN` | `.ccd`, `.chd`, `.cue`, `.iso`, `.mds`, `.zip`, `.m3u` | Standalone supports direct `.ccd`, `.chd`, `.cue`, `.iso`, and `.mds`; `.zip` and `.m3u` use RetroArch only |
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
| `AMIGA` | `.adf`, `.adz`, `.dms`, `.fdi`, `.raw`, `.hdf`, `.hdz`, `.lha`, `.cue`, `.ccd`, `.chd`, `.nrg`, `.mds`, `.iso`, `.uae`, `.rp9`, `.zip`, `.7z`, `.m3u` | One folder covers OCS/ECS, AGA, CDTV, and CD32 |
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

### Amiga games, archives, and multiple disks

Keep every supported Amiga family in `Roms/AMIGA/`: A500/OCS, A600/ECS,
A1200/A4000/AGA, CDTV, and CD32 do not use separate public folders. PUAE chooses
the machine model from the content type and familiar path tags such as `AGA`,
`CDTV`, or `CD32`. For example, include `CDTV` in the filename or a parent-folder
name when CD content must boot as CDTV rather than the normal CD32 default.

Leaf passes individual game `.zip` and `.7z` archives to PUAE intact. If you
download a large collection ZIP containing many per-game ZIPs, unpack the outer
collection once on your computer and copy only the individual game archives to
`Roms/AMIGA/`. Do not unpack a preinstalled WHDLoad `.lha`; launch the LHA
directly. Writes made inside a temporarily extracted ZIP are not repacked, so
use an uncompressed disk image, a dedicated save disk, or a WHDLoad LHA when a
game must write persistent data.

For a multi-disk game, create a text `.m3u` file with one disk per line and
launch that playlist. Leaf shows the M3U as the game and hides its referenced
members, including entries with friendly labels such as
`Disk 1.adf|Game Disk` or ZIP members such as `Game.zip#Disk 1.adf`. PUAE also
understands `#SAVEDISK:Label` in an M3U. Change media with RetroArch's **Disc
Control** menu.

Leaf deliberately does not list `.ipf`, loose `.slave`, or loose `.info` files.
IPF needs a separately packaged CAPSIMG library that this release does not ship;
preinstalled WHDLoad games should remain in `.lha` archives.

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
**Settings → System → SD Cards** so nothing is mid-write.

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

Your art can be PNG or JPEG (`.png`, `.jpg`, or `.jpeg`), and the extension's
case doesn't matter: `.jpg`, `.JPG`, and `.JpG` all work. If a game has more than
one image in the same folder, Leaf uses the PNG first, then the JPG, then the
JPEG. Where the image sits counts before its format, so art in `Images/<SYSTEM>/`
is used even when a PNG for the same game is in a folder Leaf checks after it.

On an ext4 card, file names are case-sensitive. Match the game's file name and
folder exactly, capital letters included: `Chrono Trigger.sfc` pairs with
`Chrono Trigger.jpg`, not `chrono trigger.jpg`.

**Let Leaf fetch it.** Leaf can download box art from
[ScreenScraper.fr](https://www.screenscraper.fr/). Sign in once under
**Settings → Games → Accounts → ScreenScraper.fr**, then start a scrape. For a single
game, press **X** on it and choose **Scrape Artwork**. To do whole systems at once
(or every system), use **Settings → Games → Scrape Artwork**, which lists **All
Systems** plus each system with its missing-art count. Fetched art lands in
`Images/<SYSTEM>/` exactly as if you had added it by hand, and appears in the list
as soon as each download finishes. Which image type and region it picks is set
under **Settings → Games** (Artwork Priority and Region Priority).

**When a game isn't found.** Leaf looks a game up by its file name, so a file
ScreenScraper doesn't know, such as `smb.nes` or a fan translation with a name
of its own, can come back with no art. Set the game's real title with **Display
Name** in its [Options menu](/guide/games/#options-menu), then scrape it again.
If the file name still isn't found, Leaf tries the name you set, once. It
doesn't guess at a close match, so if ScreenScraper doesn't recognize that name
either, the game stays without art. Only a name you set yourself is tried, and
the art is still saved under the file's name (`smb.png`), so it keeps pairing
with the game.

PC-98, Atomiswave, and the complete Naomi family are supported by live scraping.
For a Naomi title, Leaf tries the base Naomi catalog first, then Naomi GD-ROM,
then Naomi 2. It computes the game hash once and stops as soon as the correct
family matches; no extra setup is needed. Artwork still lands at
`Images/<SYSTEM>/<game-name>.png`, including `Images/NAOMI/` for every Naomi
family.

A Naomi miss can query all three family catalogs, so scraping a large unmatched
Naomi set can use more of ScreenScraper's daily request allowance than a
single-catalog system.

Amiga scraping follows the same pattern. Leaf tries the general Amiga catalog,
then AGA, CDTV, and CD32, stopping on the first match. You keep one
`Images/AMIGA/` artwork folder and do not need to choose the hardware family by
hand.

## Options menu

Press **X** on a game or a system in the launcher to open its **Options** menu.
This is where per-item actions live, so they stay out of the main list:

- **Display Name** - rename how the game or system shows in the launcher. When
  scraping can't find a game by its file name, it tries this name too.
- **Core** - choose which emulator core runs this game or system, when more than
  one is available.
- **Saturn BIOS** - appears only when **YabaSanshiro Standalone** is the emulator
  in force. Choose **Default**, **HLE**, or one of your own BIOS files. See
  [Saturn BIOS selection](/guide/bios-and-cores/#saturn-choosing-a-bios).
- **Performance** - set a per-game or per-system performance profile that
  overrides the global default.
- **Scrape Artwork** - on a game, fetch and replace its box art. While that scrape
  is queued the row reads **Cancel Scraping**. To scrape a whole system or every
  system at once, use **Settings → Games → Scrape Artwork** instead.
- **Reset Overrides** - clear the custom name, core, performance, and Saturn BIOS
  settings you set above.
- **Hide Game** - on a game, take it out of your lists without deleting anything.
  See [Hiding a game](#hiding-a-game).
- **Delete Game** - on a game, delete its files from your SD card. It isn't offered
  on every system. See [Deleting a game](#deleting-a-game).

Scraping runs in the background, so you can leave the menu, keep browsing, or
even play a game while art downloads.

### Hiding a game

**Hide Game** takes a game out of your library without touching its files. It
disappears right away from its system's list and game count, **Favorites**,
**Recents**, **Search**, and the game switcher, and a message tells you where to
find it again. Its file, saves, states, artwork, favorite, and **Options** settings all stay
as they were, and come back with it when you unhide it.

To bring a game back, open **Settings → Games → Hidden Games**, pick it, and press
**A** (**Unhide**). See [Settings → Games](/guide/settings/#games).

- **Hide Game** works on every system.
- Hiding is per card. A copy of the same game on your other SD card stays visible.
- A game stays hidden through rescans, and while its card is out.
- A game you already picked for [5-Game Mode](/guide/five-game-mode/) stays on the
  focus screen after you hide it, but you can't pick a hidden game.
- Leaf versions before 0.13.0 don't know about hidden games. If you go back to
  one, your hidden games show up again, and they're hidden again when you update.

### Deleting a game

**Delete Game** removes a game from your SD card: the file you launch, and every file
that file names. Use it to free space without taking the card out.

:::caution[There is no undo]
Deleted files are gone. There is no undo and no Trash. Leaf doesn't check whether
another game uses the same files, so read the file list before you confirm.
:::

Choose **Options → Delete Game** and Leaf checks the game's files, then shows you:

- how many files the game has, how much space they take, and which card it's on
- that deletion is permanent, and might not delete every file your game uses
- that your saves, states, and artwork are kept

Press **X** (**Files**) to see each file with its card and size, and **X** again to
go back. **Cancel** is selected first. To go ahead, press **Right** to select
**Delete Game**, then press **A**. Keep your cards in while Leaf deletes. When it's
done, Leaf tells you how many files it deleted. If a file can't be deleted, Leaf
stops, tells you which one, and **Files** shows what was removed. The file you
launch goes last, so you can open **Delete Game** again to delete the rest.

#### What it deletes

Leaf reads the file you launch and follows the files it names:

- A `.m3u` playlist takes every disc it lists, and each disc's tracks.
- A `.cue` takes its tracks, usually `.bin` files.
- A `.gdi` or `.toc` takes the tracks it lists.
- A PC-98 `.cmd` takes the disk images it names.
- Any other file, such as a `.chd`, `.zip`, or `.sfc`, is deleted on its own.

The game also leaves your library. Its favorite, its place in **Recents** and
5-Game Mode, and its **Options** settings go with it, and putting the file back
later doesn't bring them back.

#### What stays

- **Your saves, states, and artwork.** They stay in `Saves/`, `States/`, and
  `Images/`. Delete them from your computer if you don't want them.
- **Files the game doesn't name.** A `.sub` or `.sbi` file beside a PlayStation
  image stays. A `.ccd`, `.mds`, `.uae`, or `.conf` file is deleted on its own,
  and the images it uses stay.
- **Folders.** Leaf never removes a folder, so a game's own folder stays on the
  card, even when it's empty.

#### Shared files aren't protected

If two games use the same file, deleting one deletes that file, and the other game
stops working. For example, two playlists that list the same disc share it. The
**Files** list shows exactly what goes, so check it before you confirm.

#### Games that can't be deleted

**Delete Game** isn't in the menu for:

- arcade systems, including `ARCADE`, `MAME`, `NEOGEO`, `NAOMI`, and `ATOMISWAVE`,
  because deleting a parent ROM set breaks the clones that need it
- **Ports**, because PortMaster installs and removes those
- systems a content pak adds, such as [ScummVM](/app-store/scummvm/), because the
  pak manages its own games
- EasyRPG, because each game is a folder

Use **Hide Game** for those, or delete the files from your computer.

DOS, Amiga, and PC-98 games can store your progress inside their own disk or
hard-drive images. For those systems, the confirmation also warns that this
progress is erased with the image.

Leaf won't delete while your library is scanning, or while the game's card or your
launcher card is read-only. A read-only card gets the same SD card check and repair
offer you see elsewhere.

## Multi-disc games

Leaf handles multi-disc games (PlayStation, Sega CD, and the like) for you. Name
the disc files with the usual `(Disc 1)`, `(Disc 2)` tags, drop them in the system
folder - loose or in a subfolder of their own - and Leaf groups them into a single
`.m3u` playlist automatically. The game then shows up once instead of once per
disc, and RetroArch reads that playlist to swap discs from its in-game menu.

Prefer to manage it yourself? Add your own `.m3u` listing the disc files and Leaf
uses it as-is - it never overwrites a playlist you made by hand.

**Hide Game** and **Delete Game** work on the whole game, never on one disc.
Deleting a multi-disc game deletes its playlist and every disc in it, so a rescan
doesn't bring it back. See [Deleting a game](#deleting-a-game).

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
