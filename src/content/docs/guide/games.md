---
title: Adding games
description: Where to put ROMs, box art, saves, and states on the SD card so Leaf finds them.
---

Leaf reads your library from folders on the SD card. Put a game in the folder
for its system and it shows up in the launcher. You can fill the folders with
the SD card in your computer, or over Wi-Fi with
[Central Scrutinizer](/apps/central-scrutinizer/).

Leaf doesn't include any games. Only add ROMs you're legally entitled to use.

## Folder layout

At the root of the SD card you'll find these folders:

```text
Roms/<SYSTEM>/      your game files, one folder per system
Images/<SYSTEM>/    box art, matching each game's filename
Saves/              in-game saves
States/             save states
BIOS/               BIOS files some systems need
```

- `Roms/<SYSTEM>/` - put each game in the folder for its system, such as
  `Roms/SNES/Chrono Trigger.sfc` or `Roms/GBA/Metroid Fusion.gba`. Games can sit
  loose in the system folder or in subfolders, so
  `Roms/PSX/Final Fantasy VII/Final Fantasy VII.cue` works too. To browse those
  subfolders in the launcher, see
  [Folders in your lists](#folders-in-your-lists).
- `Images/<SYSTEM>/` - box art, named to match the game. See
  [Box art](#box-art).
- `Saves/` and `States/` - created and managed for you as you play. See
  [Playing games](/guide/playing/).
- `BIOS/` - see [BIOS files](/guide/bios-and-cores/).

## System folders

Each console has one folder under `Roms/`. When a console has more than one
emulator, you pick between them with **Core** in the
[Options menu](#options-menu), and the games stay in the same folder. See
[Systems and emulators](/guide/systems/) for the choices and for setup that's
specific to one system.

Folder names aren't case-sensitive, and most systems accept a few aliases:
`Roms/NES`, `Roms/FC`, and `Roms/FAMICOM` all land in the same place. Alias
folders you already have keep working, but put new games and box art in the
folder named in the
[formats table](#supported-game-formats). Pokémon mini also accepts `Roms/POKE/` and
`Roms/PKM/`.

- Naomi, Naomi GD-ROM, and Naomi 2 are one system. Put all three in
  `Roms/NAOMI/`.
- Neo Geo sets go in `Roms/NEOGEO/`, not `Roms/ARCADE/`, so they get their own
  system in the launcher. Use `Roms/MAME/` only for a set built for MAME 03+.
  See [Arcade and Neo Geo](/guide/systems/#arcade-and-neo-geo).
- Content paks from Pak Rat add systems with folders of their own.
  [ScummVM](/app-store/scummvm/) uses `Roms/SCUMMVM/`, and
  [J2ME](/app-store/j2me/) uses `Roms/J2ME/`. These folders work once the pak is
  installed.
- `Roms/PICO8/` serves both the bundled FAKE-08 and
  [native PICO-8](/guide/pico-8/).

If a folder's system isn't showing up in the launcher, its emulator may not be
installed.

### Supported game formats

Each folder, its system, and the game files it accepts:

| Folder | System | Game files | Notes |
|---|---|---|---|
| `NES` | Nintendo Entertainment System | `.fds`, `.nes`, `.unf`, `.unif`, `.7z`, `.zip` |  |
| `FDS` | Famicom Disk System | `.fds`, `.nes`, `.7z`, `.zip` |  |
| `SNES` | Super Nintendo / Super Famicom | `.bs`, `.bsx`, `.dx2`, `.fig`, `.gd3`, `.gd7`, `.sfc`, `.smc`, `.st`, `.swc`, `.7z`, `.zip` |  |
| `N64` | Nintendo 64 | `.n64`, `.v64`, `.z64`, `.7z`, `.zip` |  |
| `GB` | Game Boy | `.bin`, `.dmg`, `.gb`, `.gbc`, `.7z`, `.zip` |  |
| `GBC` | Game Boy Color | `.bin`, `.dmg`, `.gb`, `.gbc`, `.7z`, `.zip` |  |
| `GBA` | Game Boy Advance | `.bin`, `.gba`, `.7z`, `.zip` |  |
| `NDS` | Nintendo DS | `.nds`, `.7z`, `.zip` |  |
| `VB` | Virtual Boy | `.vb`, `.vboy`, `.7z`, `.zip` |  |
| `GW` | Game & Watch | `.mgw`, `.7z`, `.zip` |  |
| `POKEMINI` | Pokémon mini | `.min`, `.7z`, `.zip` | A `bios.min` here isn't listed as a game |
| `MS` | Master System | `.32x`, `.68k`, `.bin`, `.chd`, `.gen`, `.iso`, `.md`, `.smd`, `.sms`, `.7z`, `.zip` |  |
| `GG` | Game Gear | `.bin`, `.gg`, `.7z`, `.zip` |  |
| `GENESIS` | Genesis / Mega Drive | `.32x`, `.68k`, `.bin`, `.chd`, `.gen`, `.iso`, `.md`, `.smd`, `.sms`, `.7z`, `.zip` |  |
| `SEGACD` | Sega CD | `.chd`, `.cue`, `.iso`, `.7z`, `.zip`, `.m3u` |  |
| `32X` | Sega 32X | `.32x`, `.68k`, `.bin`, `.chd`, `.gen`, `.iso`, `.md`, `.smd`, `.sms`, `.7z`, `.zip` |  |
| `SATURN` | Saturn | `.ccd`, `.chd`, `.cue`, `.iso`, `.mds`, `.zip`, `.m3u` | `.zip` and `.m3u` always run in RetroArch |
| `DC` | Dreamcast | `.cdi`, `.chd`, `.cue`, `.dat`, `.gdi`, `.iso`, `.m3u` | `.zip` isn't accepted |
| `ATOMISWAVE` | Atomiswave | `.cdi`, `.chd`, `.cue`, `.dat`, `.gdi`, `.iso`, `.zip`, `.m3u` | Keep zipped sets at their original shortnames |
| `NAOMI` | Sega Naomi, Naomi GD-ROM, and Naomi 2 | `.cdi`, `.chd`, `.cue`, `.dat`, `.gdi`, `.iso`, `.zip`, `.m3u` | Keep zipped sets at their original shortnames |
| `PCE` | PC Engine / TurboGrafx-16 | `.ccd`, `.chd`, `.cue`, `.img`, `.iso`, `.pce`, `.7z`, `.zip` |  |
| `PCECD` | PC Engine CD / TurboGrafx-CD | `.ccd`, `.chd`, `.cue`, `.img`, `.iso`, `.m3u` | `.zip` isn't accepted |
| `PC98` | NEC PC-98 | `.2hd`, `.88d`, `.98d`, `.cmd`, `.d88`, `.d98`, `.dup`, `.fdd`, `.fdi`, `.hdd`, `.hdi`, `.hdm`, `.hdn`, `.nhd`, `.tfd`, `.thd`, `.xdf`, `.zip` | Use a `.cmd` when two disks have to be mounted together |
| `NEOGEO` | Neo Geo, home (AES) and arcade (MVS) | `.7z`, `.zip` | Needs `neogeo.zip` in `BIOS/`. `neocd.zip`, `neocdz.zip`, and `neogeo.zip` aren't listed as games |
| `NGP` | Neo Geo Pocket | `.ngc`, `.ngp`, `.7z`, `.zip` |  |
| `NGPC` | Neo Geo Pocket Color | `.ngc`, `.ngp`, `.7z`, `.zip` |  |
| `PSX` | PlayStation | `.cbn`, `.chd`, `.cue`, `.img`, `.iso`, `.mdf`, `.pbp`, `.toc`, `.m3u` | `.zip` isn't accepted |
| `PSP` | PlayStation Portable | `.chd`, `.cso`, `.iso`, `.pbp` | `.zip` isn't accepted |
| `ATARI2600` | Atari 2600 | `.a26`, `.bin`, `.7z`, `.zip` |  |
| `A7800` | Atari 7800 | `.a78`, `.bin`, `.7z`, `.zip` |  |
| `LYNX` | Atari Lynx | `.lnx`, `.zip` |  |
| `AMIGA` | Amiga (OCS/ECS/AGA, CDTV, and CD32) | `.adf`, `.adz`, `.dms`, `.fdi`, `.raw`, `.hdf`, `.hdz`, `.lha`, `.cue`, `.ccd`, `.chd`, `.nrg`, `.mds`, `.iso`, `.uae`, `.rp9`, `.zip`, `.7z`, `.m3u` |  |
| `WS` | WonderSwan | `.pc2`, `.ws`, `.wsc`, `.7z`, `.zip` |  |
| `WSC` | WonderSwan Color | `.pc2`, `.ws`, `.wsc`, `.7z`, `.zip` |  |
| `COLECO` | ColecoVision | `.bin`, `.col`, `.rom`, `.7z`, `.zip` |  |
| `VECTREX` | Vectrex | `.bin`, `.vec`, `.7z`, `.zip` |  |
| `PICO8` | Pico-8 | `.p8`, `.png` |  |
| `DOS` | MS-DOS | `.bat`, `.com`, `.conf`, `.dosz`, `.exe`, `.ima`, `.img`, `.ins`, `.iso`, `.jrc`, `.tc`, `.vhd`, `.zip`, `.m3u`, `.m3u8` |  |
| `EASYRPG` | EasyRPG (RPG Maker 2000/2003) | `.easyrpg`, `.ldb`, `.zip` | One folder per game, launched through its `RPG_RT.ldb`. See [RPG Maker 2000 and 2003](/guide/systems/#rpg-maker-2000-and-2003) |
| `ARCADE` | Arcade (FinalBurn Neo) | `.zip` | For most arcade sets. `neocd.zip`, `neocdz.zip`, and `neogeo.zip` aren't listed as games |
| `PORTS` | Ports (native game ports) | `.sh` |  |
| `MAME` | Arcade (MAME 03+) | `.zip` | Only for sets built for MAME 03+ |

## A second SD card

The Pocket 1 has two microSD slots. The card Leaf boots from is the **Primary**.
A card in the second slot is picked up automatically as a **Secondary** source of
games.

Give the second card the same folder layout as the first, with
`Roms/<SYSTEM>/`, `Images/<SYSTEM>/`, and so on at its root. Leaf merges both
cards into one library, so a system's games from either card appear together.

The second card has to be partitioned and formatted FAT32. An exFAT card, which is how most
cards over 32 GB come, won't mount. See [Install Leaf](/guide/install/) for
formatting.

You can add or remove the second card while the device is running, and Leaf
rescans on its own. Before pulling it out, use
**Settings > System > SD Cards** so nothing is mid-write.

A card's games leave your lists while it's out, and come back with their
favorites, recents, playtime, and per-game settings when you put it back.

### Swapping second cards

Leaf tells your second cards apart, so you can swap between several. Each card
keeps its own games, favorites, recents, playtime, per-game settings, and hidden
games. Leaf remembers the last 8 cards you took out.

- If two cards hold a game at the same path, each copy keeps its own playtime and
  settings.
- If you reformat a card, or copy its games onto a bigger one, Leaf still knows
  it as long as it has at least 16 games and at least 90% of them are in the same
  folders with the same names. A card with fewer games starts fresh.
- Two cards that hold nearly all the same games, or that were cloned from one
  image, count as one card and share their favorites, playtime, and per-game
  settings.

### Moving games off the second card

A game you move to the main card becomes a new entry, so its favorite, playtime,
and per-game settings don't follow it.

1. On a computer, copy `Roms/`, `Images/`, `Saves/`, and `States/` from the second
   card to the main card. Games on the second card keep their saves on that card,
   so the copies on the main card need them copied too.
2. Unmount the second card with **Settings > System > SD Cards** and take it out.
   Its games leave your lists.

If you put the card back with the games still on it, each one shows twice, once
from each card. Delete them from the second card first if you want to keep using
it.

## Your game lists

### Folders in your lists

A system's list shows all its games in one list, wherever they sit under
`Roms/<SYSTEM>/`. To browse your subfolders instead, turn on
**Settings > Games > Show Folders**. It's off by default.

- Each subfolder is a row. **A** opens it and **B** goes back up. Folders come
  first, then the games in that folder.
- When you quit a game, you're back in the same folder, on the same game.
- A folder that holds one game named after it, with no subfolders, shows as that
  game: `Roms/PSX/Spyro the Dragon/Spyro the Dragon (USA).cue`. A tag at the
  end such as `(USA)` doesn't matter. An RPG Maker game's folder always shows as
  the game.
- The same folder on both SD cards shows as one folder, with the games from both.
- **Favorites**, **Recents**, search, the game switcher, and the
  [5-Game Mode](/guide/five-game-mode/) picker stay as one list.

### How games are sorted

Lists sort by title, ignoring capital letters and reading numbers as numbers, so
"Mega Man 2" comes before "Mega Man 10". This goes for each system's list,
**Favorites**, **Hidden Games**, and folder names.

### Pinning a game

To keep a game at the top of its system's list, choose **Pin to Top** from its
[Options menu](#options-menu). Pinned games come first, in the order you pinned
them, and the rest of the list stays sorted. To put a game back in its place,
choose **Unpin** from the same menu.

- Pins only order a system's own list. **Favorites**, **Recents**, and search
  ignore them.
- With **Show Folders** on, a game you pin inside a folder goes to the top of that
  folder. If you turn **Show Folders** off, it rises to the top of the whole list.
- To pin a folder, or to change the order of your pins, use the **Order** tab in
  [Central Scrutinizer](/apps/central-scrutinizer/#game-info).

## Box art

### Adding it yourself

Name each image after its game file and put it in
`Images/<SYSTEM>/`. For `Roms/SNES/Chrono Trigger.sfc`, use
`Images/SNES/Chrono Trigger.png`. An RPG Maker game is named after its folder, so
`Roms/EASYRPG/Yume Nikki/` uses `Images/EASYRPG/Yume Nikki.png`.

Art can be PNG or JPEG (`.png`, `.jpg`, or `.jpeg`, in any letter case). If a
game has both, Leaf uses the PNG. On an ext4 card, file names are
case-sensitive, so match the game's name exactly: `Chrono Trigger.sfc` pairs
with `Chrono Trigger.jpg`, not `chrono trigger.jpg`.

### Letting Leaf fetch it

Leaf can download box art from
[ScreenScraper.fr](https://www.screenscraper.fr/). Sign in once under
**Settings > Games > Accounts > ScreenScraper.fr**, then start a scrape:

- For one game, press **X** on it and choose **Scrape Artwork**.
- For a whole system or every system, use **Settings > Games > Scrape Artwork**,
  which lists **All Systems** plus each system with its missing-art count.

Scraping runs in the background, so you can keep browsing or play a game while
art downloads. Fetched art lands in `Images/<SYSTEM>/` and appears in the list as
each download finishes. **Artwork Priority** and **Region Priority** under
**Settings > Games** set which image type and region it picks.

Naomi and Amiga games are looked up across their hardware families for you, and
the art still lands in the one `Images/NAOMI/` or `Images/AMIGA/` folder. A
Naomi game that isn't found takes up to three lookups from your daily
ScreenScraper allowance.

### A game isn't found

Leaf looks a game up by its file name, so a file
ScreenScraper doesn't know, such as `smb.nes` or a fan translation, can come
back with no art. Set the game's real title with **Display Name** in its
[Options menu](#options-menu), then scrape it again. If the file name still
isn't found, Leaf tries the name you set, once. If ScreenScraper doesn't
recognize that name either, the game stays without art. The art is saved under
the file's name (`smb.png`), so it keeps pairing with the game.

## Options menu

Press **X** on a game or a system in the launcher to open its **Options** menu:

- **Display Name** - rename how the game or system shows in the launcher. When
  scraping can't find a game by its file name, it tries this name too.
- **Core** - choose which emulator runs this game or system, when there's more
  than one. See [Systems and emulators](/guide/systems/).
- **Saturn BIOS** - appears only when **YabaSanshiro Standalone** is the
  emulator. See
  [Saturn: choosing a BIOS](/guide/bios-and-cores/#saturn-choosing-a-bios).
- **Performance** - set a performance profile for this game or system in place
  of the global default.
- **Scrape Artwork** - on a game, fetch and replace its box art. While that scrape
  is queued the row reads **Cancel Scraping**.
- **Reset Game Overrides** on a game, **Reset System Overrides** on a system -
  clear the custom name, core, performance, and Saturn BIOS settings you set
  above.
- **Pin to Top** - on a game in its system's list, move it to the top of that
  list. The row then reads **Unpin**. See [Pinning a game](#pinning-a-game).
- **Hide Game** - on a game, take it out of your lists without deleting anything.
  See [Hiding a game](#hiding-a-game).
- **Delete Game** - on a game, delete its files from your SD card. It isn't offered
  on every system. See [Deleting a game](#deleting-a-game).

### Hiding a game

**Hide Game** takes a game out of your library without touching its files. It
disappears right away from its system's list and game count, **Favorites**,
**Recents**, **Search**, and the game switcher, and a message tells you where to
find it again. Its file, saves, states, artwork, favorite, and **Options**
settings all stay as they were, and come back with it when you unhide it.

To bring a game back, open **Settings > Games > Hidden Games**, pick it, and press
**A** (**Unhide**). See [Settings > Games](/guide/settings/#games).

- **Hide Game** works on every system.
- Hiding is per card. A copy of the same game on your other SD card stays visible.
- A game stays hidden through rescans, and while its card is out.
- A game you already picked for [5-Game Mode](/guide/five-game-mode/) stays on the
  focus screen after you hide it, but you can't pick a hidden game.

### Deleting a game

**Delete Game** removes a game from your SD card: the file you launch, and every
file that file names. A `.m3u` playlist takes every disc it lists and each
disc's tracks, a `.cue`, `.gdi`, or `.toc` takes its tracks, and a PC-98 `.cmd`
takes the disk images it names. Any other file is deleted on its own.

:::caution[There is no undo]
Deleted files are gone, with no Trash. If two games use the same file, such as
two playlists that list the same disc, deleting one breaks the other. Read the
file list before you confirm.
:::

1. Choose **Options > Delete Game**. Leaf shows how many files the game has, how
   much space they take, and which card it's on.
2. Press **X** (**Files**) to see each file with its card and size, and **X**
   again to go back.
3. **Cancel** is selected first. Press **Right** to select **Delete Game**, then
   press **A**. Keep your cards in while Leaf deletes.

If a file can't be deleted, Leaf stops and tells you which one. The file you
launch goes last, so you can open **Delete Game** again to delete the rest.

What goes and what stays:

- The game leaves your library with its favorite, its place in **Recents** and
  5-Game Mode, and its **Options** settings. Putting the file back later doesn't
  bring them back.
- Your saves, states, and artwork stay in `Saves/`, `States/`, and `Images/`.
  Delete them from your computer if you don't want them.
- DOS, Amiga, and PC-98 games can keep your progress inside their own disk
  images, and that progress goes with the image. The confirmation warns you.
- A `.ccd`, `.mds`, `.uae`, or `.conf` file is deleted on its own and the images
  it uses stay, as does a `.sub` or `.sbi` file beside a PlayStation image.
- Folders stay, even when they end up empty.

**Delete Game** isn't in the menu for arcade systems (`ARCADE`, `MAME`,
`NEOGEO`, `NAOMI`, and `ATOMISWAVE`), **Ports**, EasyRPG, or systems a content
pak adds, such as [ScummVM](/app-store/scummvm/) and [J2ME](/app-store/j2me/).
Use **Hide Game** for those, or delete the files from your computer.

Leaf won't delete while your library is scanning, or while the game's card or
your launcher card is read-only.

## Multi-disc games

Name the disc files of a multi-disc game (PlayStation, Sega CD, and the like)
with the usual `(Disc 1)`, `(Disc 2)` tags and put them in the system folder,
loose or in a subfolder of their own. Leaf groups them into a single `.m3u`
playlist, so the game shows up once, and RetroArch uses that playlist to swap
discs from its in-game menu.

If you add your own `.m3u` listing the disc files, Leaf uses it as it is and
never overwrites it.

**Hide Game** and **Delete Game** work on the whole game, never on one disc.

## Arcade names

Arcade ROMs are named by a short internal ID (`mslug`, `1942`, `sf2ce`). For
arcade and Neo Geo sets, Leaf shows the full title instead, so `mslug` reads as
**Metal Slug**.

To override a name, put a `map.txt` in that system's folder (for example
`Roms/ARCADE/map.txt`) with one `romname = Your Title` line per game. The
`romname` is the zip's name without its extension. Your entries win over the
built-in list.
