---
title: ScummVM
description: Add ScummVM games to Leaf with the optional content pak, which includes the libretro core and the standalone ScummVM.
---

ScummVM runs many classic point-and-click adventures and other supported game
engines. Leaf's optional ScummVM content pak adds a dedicated **ScummVM** system,
two emulators that run it, artwork, and scraper metadata. Games start on the
libretro core, and you can switch any game or the whole system to the standalone
ScummVM. The pak does not add an app to the **Apps** tab.

:::note[Requires content-pak support]
The ScummVM pak requires Leaf 0.11, including compatible 0.11 beta builds, or
newer. Leaf 0.10 and earlier do not offer it in Pak Rat because they cannot
activate its system and core safely. Pak Rat offers each newer version of the pak
only to Leaf versions that can run it.
:::

## Install

On a compatible Leaf release, press **Menu**, open **Actions → Pak Rat**, choose
**ScummVM**, and install it over Wi-Fi. The package is large because it contains
both emulators. When installation finishes, **ScummVM** appears with the other
systems rather than in **Apps**.

The pak is open source and independently packaged in the
[ScummVM-pak repository](https://github.com/Utility-Muffin-Research-Kitchen/ScummVM-pak).
It does not include any games.

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

The hook contains only the id, such as `kq1`; it does not contain an absolute
path. Keeping it beside the game data lets the same card work whichever MLP1 SD
mount point is active after a reboot. Both emulators read the same hook.

Press **MENU**, then choose **Actions → Rescan Library** after copying games. Leaf scans subdirectories,
so every per-game hook appears as its own title. Put artwork at
`Images/SCUMMVM/Kings Quest 1.png` for the example above, using the hook
filename without its extension. You can also download artwork with Leaf's
scraper when the game is recognized.

You can find game IDs in the
[ScummVM compatibility database](https://www.scummvm.org/compatibility/) or in
ScummVM's own detection output. The ID is not necessarily the same as the game
folder name. Use a game ID for a hook beside the data; a configured ScummVM
target instead depends on a saved path in `scummvm.ini`.

## Choose the standalone emulator

Games start on **ScummVM (Libretro)**. The pak also includes
**ScummVM (Standalone)**, the full ScummVM program with its own options menu,
button mapping, and virtual keyboard.

To use it for one game, press **X** on that game, choose **Core**, then choose
**ScummVM (Standalone)**. To use it for every ScummVM game, do the same on the
**ScummVM** system. To go back, choose **ScummVM (Libretro)**, or use
**Reset Overrides** on a game to return it to the system's choice. See
[Adding games](/guide/games/#options-menu) for the options menu.

### Standalone controls

- **A** clicks or interacts, and **B** right-clicks.
- **Start** opens ScummVM's menu, where you save, load, change options, and quit.
- **Select** opens the virtual keyboard, for example to name a save.
- **X** and **Y** do different things in each game. In Flight of the Amazon
  Queen, **X** opens the journal, which also skips the current scene, and **Y**
  switches fast mode. To change a game's buttons, press **Start** and open
  **Options → Keymaps**.
- **Menu** asks **Return to Leaf?**. Press **Menu** again to leave the game.
  Leaving this way doesn't save, so save from ScummVM's menu first.
- **Return to Launcher** in ScummVM's menu opens ScummVM's own game list. Choose
  **Quit** there, or press **Menu**, to get back to Leaf.

## Saves and limitations

The two emulators keep their saves and settings separate. A save made in one does
not appear in the other, so switch back to the emulator that made a save rather
than moving files between them.

- **ScummVM (Libretro)** writes saves under Leaf's normal `Saves/ScummVM/` data
  area. The packaged core reports no RetroArch savestate support, so use each
  game's normal ScummVM save menu instead of the Leaf savestate actions.
- **ScummVM (Standalone)** writes saves under `Saves/ScummVM-Standalone/` on the
  card the game is on, one folder per game. Its settings live in
  `.userdata/mlp1/scummvm-standalone/scummvm.ini` on your main card. Options you
  change in ScummVM's menu apply to every game, and each game's own options and
  button changes are kept for that game. Leaf's in-game menu and save states
  don't apply to the standalone; save from ScummVM's menu.

Removing the content pak removes the system and emulators on the next rescan. It
does not remove your files under `Roms/`, `Images/`, `Saves/`, `States/`, or
`.userdata/`.
