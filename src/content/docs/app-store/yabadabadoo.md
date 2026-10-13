---
title: Yabadabadoo
description: Add Yabadabadoo, an experimental Sega Saturn core built for handhelds, as an alternate core with the optional Pak Rat pak.
---

Yabadabadoo is a Sega Saturn core tuned for low-power handhelds. The optional
Yabadabadoo pak adds it as an alternate core for the **Saturn** system, next to
YabaSanshiro, which stays the default. The pak doesn't add a system, and nothing
appears in the **Apps** tab.

Yabadabadoo is by
[ProRapSuperstarOriginalMaster](https://github.com/ProRapSuperstarOriginalMaster),
a fork of the libretro port of Yabause built to make Saturn games playable on the
Miyoo Mini. The pak packages its
[releases](https://github.com/ProRapSuperstarOriginalMaster/Yabadabadoo/releases)
for Leaf.

:::caution[Experimental]
Yabadabadoo is early work, and its author describes it as largely AI-assisted.
Expect some games to glitch, run slowly, or not start at all, and keep
YabaSanshiro for the games it already runs well. The
[upstream release notes](https://github.com/ProRapSuperstarOriginalMaster/Yabadabadoo/releases)
list the games known to have problems.
:::

:::note[Requires Leaf 0.12]
The pak needs Leaf 0.12 or newer. Older releases don't offer it in Pak Rat.
:::

## Install

Open **System** with the **Menu** button, go to **Actions**, then choose
**Pak Rat**. Pick **Yabadabadoo** and install it over Wi-Fi. The download is
about 33 MB, and the pak takes about 71 MB on the card. Most of that is a 32-bit
graphics driver; see [How it works](#how-it-works).

The pak is open source and independently packaged in the
[Yabadabadoo-pak repository](https://github.com/Utility-Muffin-Research-Kitchen/Yabadabadoo-pak).
It doesn't include any games or BIOS files.

## Play a game on Yabadabadoo

To play one game on Yabadabadoo, press **X** on that game, choose **Core**, then
choose **Yabadabadoo (experimental)**. To use it for every Saturn game, do the
same on the **Saturn** system. To go back, choose **YabaSanshiro**, or use
**Reset Overrides** on a game to return it to the system's choice. See the
[Options menu](/guide/games/#options-menu).

Yabadabadoo runs `.chd`, `.cue`, `.iso`, `.mds`, `.ccd`, `.m3u`, and `.zip`
games from `Roms/SATURN/`.

## BIOS

Yabadabadoo needs a real Saturn BIOS. Put one of these in `BIOS/SATURN/` on the
card the game is on:

- `sega_101.bin` - Japan v1.01
- `mpr-17933.bin` - USA and Europe v1.00
- `saturn_bios.bin` - either of the above, renamed

It picks the BIOS that matches the game's region on its own. Without one, it
shows a screen asking for a BIOS instead of starting the game. The **Saturn
BIOS** option applies to YabaSanshiro Standalone only.

## Controls

- **Menu** opens RetroArch's menu. Save states and core options are in
  **Quick Menu**. To leave the game, choose **Quit RetroArch** from the main
  menu.
- Hold **Menu** for three seconds to leave the game straight away. Your in-game
  saves are kept.
- With a controller connected, it's player 1, as everywhere else in Leaf, and
  its Guide or Home button opens RetroArch's menu instead.

Leaf's in-game menu, the Switcher, save states on power hold, and resuming after
power-off aren't available with Yabadabadoo, because it runs in its own
RetroArch rather than Leaf's.

## Settings

The button mapping and display settings you choose in Leaf's **RetroArch
Settings**, such as aspect ratio and the FPS counter, apply to Yabadabadoo too.
Hotkeys you set there don't, because Yabadabadoo has no hotkey button. Settings
you save from inside Yabadabadoo's RetroArch menu aren't kept, but core options
and remaps are.

## Saves and states

- In-game saves go to `Saves/Yabadabadoo/` on the game's card. They're written a
  moment after the game saves, so a crash or a flat battery doesn't lose them.
- Save states go to `States/Yabadabadoo/` on the game's card.
- RetroArch settings, core options, and remaps for Yabadabadoo live in
  `.userdata/mlp1/Yabadabadoo/` on your main card.

Yabadabadoo's saves and states are separate from YabaSanshiro's, so switch back
to the core that made a save rather than moving files between them.

Removing the pak removes the core on the next rescan. It doesn't remove your
files under `Roms/`, `BIOS/`, `Saves/`, `States/`, or `.userdata/`.

## How it works

Most of Yabadabadoo's speed comes from its recompiler, which turns Saturn code
into ARM code as the game runs. That recompiler only exists for 32-bit ARM. The
MLP1 can run 32-bit programs, but Leaf and its RetroArch are 64-bit, so the pak
brings its own 32-bit RetroArch and every library it needs, including a 32-bit
build of the MLP1's graphics driver. It doesn't need PortMaster or any other pak.
