---
title: Systems and emulators
description: Which emulator runs each system on Leaf, how to switch, and the controls and setup that are specific to one system.
---

Most systems need nothing beyond a game in the right folder. This page covers the
ones with their own emulator choices, controls or setup. For where games go, see
[Adding games](/guide/games/). For BIOS files, see [BIOS files](/guide/bios-and-cores/).

## Choosing an emulator

Each system has a default emulator, and some have alternates. To switch, press
**X** on a game or a system, choose **Core**, and pick one (see the
[Options menu](/guide/games/#options-menu)). The games stay in the same folder
whichever emulator runs them.

| System | Default | You can switch to |
| --- | --- | --- |
| Game Boy Advance | mGBA | gpSP |
| Nintendo 64 | Mupen64Plus Standalone | Mupen64Plus Next (RetroArch) |
| Nintendo DS | DraStic | Fun DraStic; DSperate and DSperate TATE from Pak Rat |
| Saturn | YabaSanshiro (RetroArch) | YabaSanshiro Standalone; Yabadabadoo from Pak Rat |
| Dreamcast, Atomiswave, Naomi | Flycast (standalone) | Flycast (RetroArch); KM Flycast Xtreme, when that optional core is installed; Flycastrophe from Pak Rat |
| PSP | PPSSPP (Vulkan) | PPSSPP (GLES) |
| Amiga | PUAE 2021 | PUAE |
| PICO-8 | FAKE-08 | Native PICO-8 from Pak Rat |

A system appears in the launcher once its emulator is on the device.

Nintendo 64, Nintendo DS, PSP, Dreamcast, Atomiswave, Naomi and the optional
Saturn standalone run as standalone emulators. In a standalone session **MENU**
opens the emulator's own menu, where its save states and settings live. Leaf's in-game menu, RetroArch
save states and the game switcher don't apply unless the system's section below
says so. Volume keys work as usual.

PSP, Dreamcast and Nintendo 64 are demanding on this hardware. Whether a game
runs at full speed varies by title, even with the right emulator and BIOS in
place.

Leaf's RetroArch cores are built with a core builder forked from
[spruceOS](https://github.com/spruceUI)'s, which follows
[libretro-super](https://github.com/libretro/libretro-super).

## Game Boy Advance

Game Boy Advance games run in **mGBA**. **gpSP** is a faster alternate. Zipped
games, in-game saves and save states all work in gpSP.

To try gpSP for one game, press **X** on that game, choose **Core**, then choose
**gpSP**. To return to mGBA, choose **mGBA**, or use **Reset Game Overrides**.

The two cores keep their saves and save states separate, and their save states
aren't compatible. Don't copy states between them; switch back to the core that
made the state.

Use mGBA when a game fails under gpSP. Games with an in-game clock work in gpSP
with no setup, but mGBA is the safer choice for clock-based homebrew and ROM
hacks.

## Nintendo 64

Nintendo 64 games run in **Mupen64Plus Standalone**, which has Rice and GLideN64
video plugins and a Leaf overlay for save states, per-game settings and
save-and-quit resume. **Mupen64Plus Next** is the RetroArch core. Choose it if a
game behaves better there, or if you want RetroArch's in-game menu, shaders or
RetroAchievements for that game.

In the standalone, these controls are fixed. They aren't the configurable
[hotkeys](/guide/playing/#hotkeys):

- **MENU** - open the Leaf N64 overlay. Renderer and N64 options live there;
  **RetroArch Settings** doesn't appear.
- **MENU + SELECT** - save the current state and open Leaf's game switcher.
- **A** from the game switcher or recents - resume the saved state.

### D-pad or stick

Some N64 games only read the analog stick. **Input Mode** decides what the d-pad
does:

- **D-Pad**, the default, sends the N64 d-pad.
- **Joystick** steers the N64 analog stick with the d-pad.

Press **MENU** during a game and change it in **Options > Controls > Input Mode**,
or bind **Options > Shortcuts > Toggle Input Mode** to a button. Each game keeps
its own mode.

You can also bind a d-pad direction to any N64 button, such as the C buttons. In
**Options > Controls**, pick **C-Up**, press **A**, then press up on the d-pad. In
**D-Pad** mode that direction then sends C-Up instead of the d-pad, and **R2 + X**
still works too. In **Joystick** mode the d-pad steers the stick and these bindings
rest.

[AlexL](https://github.com/dapass5) made **Input Mode** work on this device.

## Nintendo DS

Nintendo DS games (`.nds`, or a `.zip` or `.7z` containing one) run in
**DraStic**, a standalone emulator, through
[Steward Fu](https://github.com/steward-fu/nds)'s front end. The two-screen
layouts, the transparent overlay and the button shortcuts below all come from
his open-source SDL2 wrapper for DraStic, which Leaf forks and builds on - most
of the heavy lifting here is his work.

You can switch a game or the whole system to another choice with **Core**:

- **Fun DraStic**, by [tenlevels](https://github.com/tenlevels), is a different
  front end for the same DraStic emulator: a redesigned menu, screen overlays,
  more screen layouts and themes.
- **DSperate** and **DSperate TATE** are a separate emulator you add from Pak
  Rat.

To go back, choose **DraStic** again, or use **Reset Game Overrides**.

DraStic and Fun DraStic share your in-game saves, so a game keeps its progress
in either. Save states and settings aren't shared. Save in-game before you
switch.

Neither front end needs a BIOS of your own. To use original Nintendo files, see
[BIOS files](/guide/bios-and-cores/#nintendo-ds).

### DraStic controls

The default front end uses **MENU** as a modifier you hold with another button. These shortcuts are fixed
and belong to DraStic. They aren't the configurable
[hotkeys](/guide/playing/#hotkeys), and **MENU + L1** quits DraStic whatever your Leaf
screenshot shortcut is.

| Buttons | What it does |
| --- | --- |
| **MENU** (tap and release), or **MENU + SELECT** | Open DraStic's own menu: save and load states, options and the screen-layout picker |
| **MENU + START** | Open the Steward Fu menu for the see-through second screen: its size, position, transparency and border |
| **MENU + A** | Flip between your two saved screen layouts. By default that's the stacked view and a transparent second screen in the corner |
| **MENU + Left / Right** | Cycle through all the screen layouts |
| **L2** | Switch the D-pad between the game and the DS touch pointer. In pointer mode the D-pad moves the stylus and **A** taps the screen |
| **R2** | Swap the two DS screens, for games that put the action on the bottom screen |
| **MENU + L2** | Save state |
| **MENU + R2** | Load state |
| **MENU + R1** | Fast-forward (hold) |
| **MENU + L1** | Quit back to the launcher |
| **MENU + B** | Toggle the picture between sharp pixels and smoothing |
| **MENU + Y** | Cycle the menu background art or, in pointer mode, the stylus cursor |

**MENU + Up** does nothing on the Pocket 1.

Inside DraStic's own menu and the Steward Fu menu, use the **D-pad** to move,
**Left / Right** to change a value, **A** to confirm, and **B** to go back or
close.

### Fun DraStic

Fun DraStic is [tenlevels](https://github.com/tenlevels)'s work: the menus,
overlays, screen layouts and presentation. You can read
[Fun DraStic's source and credits](https://github.com/Utility-Muffin-Research-Kitchen/Fun-Drastic-src);
the front end uses the PolyForm Noncommercial 1.0.0 license.

- **MENU** opens Fun DraStic's own menu, which is laid out differently from the
  default one. The **MENU + button** shortcuts above belong to the Steward Fu
  front end and don't carry over.
- The menu follows your Leaf language when that's Spanish or Chinese, and is in
  English otherwise, thanks to [AlexL](https://github.com/dapass5).
- The **Cheats** page lists the cheats in Fun DraStic's bundled database for the
  game you're playing.

### DSperate

[DSperate](https://github.com/beebono/DSperate), by
[beebono](https://github.com/beebono), is an independent Nintendo DS emulator.
Install the
[DSperate content pak](https://github.com/Utility-Muffin-Research-Kitchen/DSperate-pak)
from [Pak Rat](/app-store/introduction/#installing-an-app). It adds two cores to
the Nintendo DS system: **DSperate** and **DSperate TATE**. DSperate keeps its
saves separate from both DraStic front ends.

**DSperate TATE** stacks the two screens down the long side of the screen, so
they're about a third bigger. Turn the MLP1 a quarter clockwise, with the d-pad
at the top: the d-pad, face buttons and stick turn with it. To play TATE on a TV,
turn the TV a quarter clockwise instead and hold the MLP1 as usual. TATE uses
DSperate's saves, save states and settings, so you can switch between the two in
the middle of a game. It doesn't use the RetroAchievements account saved in Leaf
yet; plain DSperate does.

DSperate reads `.nds` and `.zip` files. Launching a `.7z` shows a warning:
extract it to `.nds`, or choose another Nintendo DS emulator.

DSperate 3 can't load save states made in DSperate 2.x. In-game saves carry
over, so save in the game before you update the pak.

## Pokémon mini

Pokémon mini games run through the PokeMini RetroArch core. The console's
buttons map to the Pocket 1 like this:

- **D-pad**, **A**, and **B** - the same buttons on the Pokémon mini.
- **R1** - the **C** button.
- **L1** - **Shake**, for games that react to you shaking the console, such as
  nudging the table in Pokémon Pinball Mini.
- **X** - **A** with turbo.
- **SELECT** - the console's **Power** button. Pressing it switches the
  emulated Pokémon mini off, which leaves a blank screen; press **SELECT**
  again to switch it back on.

The first time you start a game it asks you to set the clock. The game keeps
that, along with your progress, in its own save file in `Saves/PokeMini/`, which
is written when you quit the game.

## Saturn

Saturn games run in **YabaSanshiro** through RetroArch. YabaSanshiro is developed
by [devMiyax](https://github.com/devmiyax/yabause). There are two alternates:

- **YabaSanshiro Standalone** is faster. It's offered for directly launched
  `.ccd`, `.chd`, `.cue`, `.iso` and `.mds` games. `.m3u` playlists and `.zip`
  files always use RetroArch.
- **[Yabadabadoo](/app-store/yabadabadoo/)** is an experimental core you add
  from Pak Rat. It needs a real BIOS in `BIOS/SATURN/` and keeps its own saves
  and states.

In RetroArch, the face buttons follow the shape of a Saturn pad. **Y**, **B**,
and **A**, left to right around your thumb, are the Saturn's A, B, and C
buttons, and **L1**, **X**, and **R1** are its X, Y, and Z:

| Saturn | MLP1 |
| --- | --- |
| A, B, C | **Y**, **B**, **A** |
| X, Y, Z | **L1**, **X**, **R1** |
| L, R | **L2**, **R2** |
| Start | **START** |

To move a button for one game or for all of them, open **RetroArch Settings**
in the in-game menu, change it in **Quick Menu > Controls**, and save a remap
file there.

### YabaSanshiro Standalone

- **MENU** opens YabaSanshiro's own menu, where you can resume, manage its save
  states, change emulator settings, or exit.
- In-game saves are kept under `Saves/YabaSanshiro/` and `.yss` states under
  `States/YabaSanshiro/`. They aren't compatible with RetroArch save states or
  Leaf's state browser, so switch back to the emulator that made a state
  instead of moving it.
- It starts without a BIOS file by default. To use a real one, set **Saturn
  BIOS** in the game or system **Options** menu. See
  [Saturn: choosing a BIOS](/guide/bios-and-cores/#saturn-choosing-a-bios).
- Its **Open/Close CD Tray** picker doesn't read `.m3u` playlists and can miss
  discs that are in the folder. Use RetroArch for multi-disc games.

## Dreamcast, Atomiswave and Naomi

Dreamcast, Atomiswave and Naomi games run in **standalone Flycast**. With
**Core** you can switch to the RetroArch Flycast core, to KM Flycast Xtreme when
that optional core is installed, or to
[Flycastrophe](/app-store/flycastrophe/) from Pak Rat. Each system keeps its own
ROM folder (`Roms/DC/`, `Roms/ATOMISWAVE/` or `Roms/NAOMI/`); Naomi, Naomi
GD-ROM and Naomi 2 all share `Roms/NAOMI/`. BIOS files for all three go in
`BIOS/dc/` (see [BIOS files](/guide/bios-and-cores/)).

| Button | What it does |
| --- | --- |
| **MENU** | Open Flycast's own menu: save states, video and controller settings, and exit |
| **SELECT** | Insert a coin in Atomiswave and Naomi games |
| **A**, **B**, **L1**, **X**, **Y**, **R1** | Arcade buttons 1 through 6. Metal Slug 6 uses L1 for grenades |
| **L2 / R2** | Dreamcast left and right analog triggers. Crazy Taxi uses L2 for brake and reverse, R2 to accelerate |

VMU data and saves are kept under `Saves/Flycast/`, and Flycast's save states
under `States/Flycast/`. All three systems share these folders, and they survive
Leaf updates along with your Flycast settings.

### Naomi and Atomiswave arcade sets

A `.zip` in `Roms/NAOMI/` or `Roms/ATOMISWAVE/` is a MAME/Flycast ROM set, and
its filename is the ID Flycast identifies the game by. Don't rename it to the
friendly title. Leaf shows the friendly title for you, so `doa2m.zip` appears as
**Dead or Alive 2 Millennium**.

A cartridge set is one archive, alongside the matching BIOS:

```text
Roms/NAOMI/doa2m.zip
BIOS/dc/naomi.zip
```

A Naomi GD-ROM set uses its shortname ZIP as the entry you launch and keeps the
CHD in a subfolder with the same shortname:

```text
Roms/NAOMI/ikaruga.zip
Roms/NAOMI/ikaruga/gdl-0010.chd
BIOS/dc/naomi.zip
```

Launch `ikaruga.zip`, not the CHD. Split sets may also need their parent ZIP.
Keep every archive, parent, subfolder and media filename exactly as a compatible
MAME/Flycast set supplies it. Renaming an incompatible dump doesn't make it
compatible.

To look up a title's shortname,
[Flycast's upstream Naomi compatibility list](https://github.com/libretro/flycast/issues/136?timeline_page=1)
has a `romset` column. Its compatibility results come from an older core, so use
it for the names only.

## PSP

PSP games run in **PPSSPP**, a standalone emulator. There are two versions to
pick from with **Core**:

- **PPSSPP (Vulkan)** - the default, and the faster of the two.
- **PPSSPP (GLES)** - a fallback for anything that misbehaves on Vulkan.

Both read the same `Roms/PSP/` folder, and PSP needs no BIOS.

**MENU** opens PPSSPP's own pause menu. Save states, graphics and control
settings, and exiting the game are all in there. Those menus follow Leaf's
language, so setting Leaf to 中文 puts PPSSPP in Simplified Chinese as well. See
[Language](/guide/language/).

The analog stick uses the calibration from
[Joe's Calibrage](/apps/introduction/#joes-calibrage). If the stick drifts or
doesn't reach full tilt in PSP games, calibrate it there instead of inside
PPSSPP.

## NEC PC-98

PC-98 games run through the Neko Project II kai RetroArch core. Leaf turns on
the core's **Arrows** joypad mode, so games that ask you to press a key work
from the handheld without a keyboard:

| Button | Keyboard key |
| --- | --- |
| **D-pad** | Arrow keys |
| **A / B** | **X / Z** |
| **X / Y** | **Space / Left Ctrl** |
| **L1 / R1** | **Backspace / Right Shift** |
| **SELECT / START** | **Escape / Return**. Press **START** at a typical "press any key" prompt |

For a mouse-driven game, open **MENU > RetroArch Settings > Quick Menu > Core
Options** and change **Joypad D-pad to Mouse/Keyboard/Joypad Mapping** to
**Mouse**. The D-pad then moves the pointer, **B** left-clicks, and **A**
right-clicks. Switch it back to **Arrows** for keyboard-driven games.

Change disks from RetroArch's **Disc Control** menu. PC-98 firmware and fonts go
in `BIOS/np2kai/` (see [BIOS files](/guide/bios-and-cores/)).

### PC-98 games that need two disks at startup

Some PC-98 software expects Disk A in the first floppy drive and Disk B in the
second as soon as it starts. Launching Disk A by itself can produce a **Not
ready** message. Keep the images together and add a UTF-8 `.cmd` file in the same
folder, for example:

```text
Dragon Knight 4 Special Disk.cmd
Dragon Knight 4 Special Disk (Disk 1 of 2)(Disk A).fdd
Dragon Knight 4 Special Disk (Disk 2 of 2)(Disk B).fdd
```

The `.cmd` file contains one line. Quote every filename that contains spaces:

```text
np2kai "Dragon Knight 4 Special Disk (Disk 1 of 2)(Disk A).fdd" "Dragon Knight 4 Special Disk (Disk 2 of 2)(Disk B).fdd"
```

The first image is mounted in FDD1 and the second in FDD2. Launch the `.cmd`
entry. Leaf hides the disk files it names, so the game appears only once.

## Amiga

Amiga games run through **PUAE 2021** in RetroArch. You can choose **PUAE**
instead with **Core**. Both come from the
[UAE and libretro teams](https://github.com/libretro/libretro-uae). They keep
separate save and state folders, so return to the same core to continue your
progress. Kickstart ROMs go in `BIOS/puae/` (see
[BIOS files](/guide/bios-and-cores/#amiga-kickstart-files)).

| Button | What it does |
| --- | --- |
| **D-pad** | Joystick |
| **B / A** | Fire buttons 1 / 2 |
| **Left or right analog stick** | Mouse |
| **L2 / R2** | Left / right mouse button |
| **X** | Space |
| **SELECT** (short press) | Toggle PUAE's virtual keyboard. In the keyboard, use the **D-pad** to move, **B** to press a key, **A** for transparency, **X** for Space, and **START** for Return |

Some Amiga games expect a mouse instead of a joystick. Open the virtual keyboard
and choose **J/M**, or change **Quick Menu > Core Options > RetroPad
Joystick/Mouse**.

PUAE 2021 keeps saves under `Saves/PUAE 2021/` and states under
`States/PUAE 2021/`. PUAE uses `Saves/PUAE/` and `States/PUAE/`. These survive
Leaf updates.

### Amiga archives and multiple disks

Keep every Amiga family in `Roms/AMIGA/`: A500, A600, A1200, A4000, CDTV and
CD32. PUAE picks the machine from the content type and from tags in the path
such as `AGA`, `CDTV` or `CD32`. For example, put `CDTV` in the filename or a
parent folder's name when a CD has to boot as CDTV instead of CD32.

- Leaf passes a game's `.zip` or `.7z` to PUAE as it is. If you download a
  collection ZIP holding many per-game ZIPs, unpack the outer one on your
  computer and copy the individual archives across.
- Don't unpack a preinstalled WHDLoad `.lha`; launch the LHA directly.
- Anything a game writes inside a ZIP isn't written back to the archive. When a game has to
  save to disk, use an uncompressed disk image, a dedicated save disk, or a
  WHDLoad LHA.
- `.ipf` files and loose `.slave` or `.info` files aren't listed.

For a multi-disk game, create a text `.m3u` file with one disk per line and
launch that playlist. Leaf shows the playlist as the game and hides the disks it
names, including entries with labels such as `Disk 1.adf|Game Disk` or ZIP
members such as `Game.zip#Disk 1.adf`. PUAE also understands `#SAVEDISK:Label`
in a playlist. Change disks with **MENU > RetroArch Settings > Quick Menu > Disc
Control**.

## RPG Maker 2000 and 2003

**EasyRPG Player** runs games made with RPG Maker 2000 and 2003 from
`Roms/EASYRPG/`. An RPG Maker game is a whole folder of files, so give each game
its own folder and copy the folder across as it is:

```text
Roms/EASYRPG/Yume Nikki/RPG_RT.ldb
Roms/EASYRPG/Yume Nikki/RPG_RT.lmt
Roms/EASYRPG/Yume Nikki/Map0001.lmu
Roms/EASYRPG/Yume Nikki/CharSet/
...
```

Leaf lists the game under its folder name, so name the folder after the game.
It launches the game through `RPG_RT.ldb`, which has to stay in that folder with
the rest of the game's files. Don't rename it.

Your progress from the game's own save menu is written into the game's folder,
next to `RPG_RT.ldb` (`Save01.lsd` and so on). Keep those files if you replace
the folder with a newer version of the game. EasyRPG has no save states.

A game packed as a `.zip` or an `.easyrpg` file also works as a single file in
`Roms/EASYRPG/`, and is listed under its filename. EasyRPG can't write inside
those, so the game saves to a folder next to it, such as `Yume Nikki.zip.save`.
Prefer a folder or a `.zip`: ScreenScraper rarely recognizes `.easyrpg` names,
so those games seldom get box art.

For box art, name the image after the folder: `Images/EASYRPG/Yume Nikki.png`.
**Scrape Artwork** searches ScreenScraper by the folder name too, so a folder
named with the game's plain title finds its art most often.

### The RPG Maker RTP

Many RPG Maker games rely on the **RTP** (Run Time Package), the shared graphics,
music, and sound that RPG Maker installed on the player's PC. A game that ships
all of its own files doesn't need it. Without the RTP, a game that does need it
shows blank graphics, plays without music, or stops with an error about a missing
file.

The RTP isn't included with Leaf. Install the RPG Maker 2000 or 2003 RTP on a
Windows PC, then copy the folders it installs (`Backdrop`, `Battle`, `CharSet`,
`ChipSet`, `Music`, `Sound`, and the rest) into a folder named after its version
in `BIOS/rtp/`:

```text
BIOS/rtp/2000/CharSet/
BIOS/rtp/2000/Music/
...
BIOS/rtp/2003/CharSet/
BIOS/rtp/2003/Music/
...
```

EasyRPG works out which version a game was made with and looks in the matching
folder, so you can keep both. Games on a second SD card use that card's `BIOS/`
folder, so give that card its own copy.

## Arcade and Neo Geo

Arcade games are stricter about files than other systems:

- Pick the right folder: `Roms/ARCADE/` for the normal FinalBurn Neo arcade
  library, `Roms/NEOGEO/` for all Neo Geo sets, home (AES) and arcade (MVS)
  together, and `Roms/MAME/` only if you maintain a MAME 03+ set.
- Match the ROM-set version. A set built for a different version of the core
  fails to load without an error, even when the game name looks right.
- Keep sets zipped. Arcade games load from their `.zip` by exact filename, so
  don't unzip or rename them.
- Keep parents and BIOS. A clone needs its parent set beside it, and every Neo
  Geo game needs `neogeo.zip` in `BIOS/`.

Leaf shows arcade games under their real titles. See
[Arcade names](/guide/games/#arcade-names) to override one.

For the home-console (AES) version of a Neo Geo game, open the RetroArch in-game
menu while it's running, go to **Core Options**, and set **Neo-Geo mode** to
AES. A BIOS that contains the Universe BIOS also lets you pick console and
region at boot.

`.neo` files (the NeoSD / Darksoft flashcart format) aren't supported. FinalBurn
Neo needs the original zipped ROM sets.

## PICO-8

PICO-8 carts in `Roms/PICO8/` run in the bundled FAKE-08.
[Native PICO-8](/guide/pico-8/) is an optional integration that plays the same
carts in a PICO-8 runtime you buy separately.

## Standalone emulators from content paks

An emulator installed by a content pak can use **MENU** for its own menu. Tap
and release **MENU** to open it. If the pak has no menu, **MENU** shows **Return
to Leaf?** instead. Tap **MENU** again within four seconds to quit, or let the
prompt disappear to keep playing.

If a session is stuck, release the other controls, centre the stick, and hold
the handheld's **MENU** button alone for three seconds. Leaf asks the emulator
to quit. If it stays open, keep holding for another two seconds to force it to
stop. Unsaved progress can be lost, and nothing appears on screen
during the hold. Releasing **MENU**, or touching any other button, the D-pad,
the stick, **Volume** or **Power**, cancels it. Release **MENU** before you try
again.

**MENU** held with another button never opens the emulator's menu, and **MENU +
Volume** still changes brightness.

On an external controller, **Guide** goes straight to the emulator and can't do
the escape hold. If the pak has no menu, **Guide** shows **Return to Leaf?** and
a second press quits. If the emulator stays open, confirm again at least two
seconds later to force it to stop.
