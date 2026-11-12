---
title: ScummVM
description: Add ScummVM games to Leaf with the optional content pak, which includes the libretro core and the standalone ScummVM.
---

ScummVM runs many classic point-and-click adventures and other supported game
engines. The ScummVM pak adds a **ScummVM** system. Games start on the libretro
core, and you can switch any game or the whole system to the standalone ScummVM.

## Install

Install **ScummVM** from Pak Rat; see
[installing an app](/app-store/introduction/#installing-an-app). **ScummVM**
appears with your other systems, and nothing is added to **Apps**. The pak
doesn't include any games.

## Add a game

Put each game's original data files in its own directory below
`Roms/SCUMMVM/`. In that same directory, create a small file whose extension is
`.scummvm` (or `.svm`) and whose contents are the game's ScummVM game ID.

For example:

```text
Roms/SCUMMVM/
  Kings Quest 1/
    Kings Quest 1.scummvm     contains: kq1
    ...your original game data files...
```

The file contains only the ID, such as `kq1`. You can find game IDs in the
[ScummVM compatibility database](https://www.scummvm.org/compatibility/) or in
ScummVM's own detection output. The ID is not necessarily the same as the game
folder name.

Press **MENU**, then choose **Actions > Rescan Library** after copying games.
Each `.scummvm` file appears as its own title. Put artwork at
`Images/SCUMMVM/Kings Quest 1.png` for the example above, using the `.scummvm`
filename without its extension. You can also download artwork with Leaf's
scraper when the game is recognized.

## Choose the standalone emulator

Games start on **ScummVM (Libretro)**. The pak also includes
**ScummVM (Standalone)**, the full ScummVM program with its own options menu,
button mapping, and virtual keyboard.

To use it for one game, press **X** on that game, choose **Core**, then choose
**ScummVM (Standalone)**. To use it for every ScummVM game, do the same on the
**ScummVM** system. To go back, choose **ScummVM (Libretro)**, or use
**Reset Game Overrides** on a game to return it to the system's choice. See
[Adding games](/guide/games/#options-menu) for the options menu.

## Controls

These are the standalone's controls.

| Button | Action |
| --- | --- |
| **A** | click or interact |
| **B** | right-click |
| **START** | open ScummVM's menu, where you save, load, change options, and quit |
| **SELECT** | open the virtual keyboard, for example to name a save |
| **X** / **Y** | different in each game; to change them, press **START** and open **Options > Keymaps** |
| **MENU** | ask **Return to Leaf?** |

Press **MENU** again within four seconds to leave the game, or let the prompt
disappear to keep playing. Leaving this way doesn't save, so save from ScummVM's
menu first. If ScummVM doesn't close, hold **MENU** for three seconds, and keep
holding for two more to force it.

**Return to Launcher** in ScummVM's menu opens ScummVM's own game list. Choose
**Quit** there, or press **MENU**, to get back to Leaf.

## Saves

The two emulators keep their saves and settings separate. A save made in one
doesn't appear in the other, so switch back to the emulator that made a save
rather than moving files between them.

- **ScummVM (Libretro)** writes saves under `Saves/ScummVM/`. It has no save
  states, so use each game's own ScummVM save menu.
- **ScummVM (Standalone)** writes saves under `Saves/ScummVM-Standalone/` on the
  card the game is on, one folder per game. Options you change in ScummVM's menu
  apply to every game, and each game's own options and button changes are kept
  for that game. Leaf's in-game menu and save states don't apply to the
  standalone; save from ScummVM's menu.

## Credits

The pak is open source in the
[ScummVM-pak repository](https://github.com/Utility-Muffin-Research-Kitchen/ScummVM-pak).
