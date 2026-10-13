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

:::note[Requires Leaf 0.13]
This version of the pak needs Leaf 0.13 or newer. On Leaf 0.12, Pak Rat offers
the earlier version instead. In that version **Menu** opens RetroArch's
own menu, and Leaf's in-game menu, the Game Switcher, and **Menu** hotkeys aren't
available. Releases older than 0.12 don't offer the pak at all.
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

The face buttons follow the shape of a Saturn pad. **Y**, **B**, and **A**, left
to right around your thumb, are the Saturn's A, B, and C buttons, and **L1**,
**X**, and **R1** are its X, Y, and Z:

| Saturn | MLP1 |
| --- | --- |
| A, B, C | **Y**, **B**, **A** |
| X, Y, Z | **L1**, **X**, **R1** |
| L, R | **L2**, **R2** |
| Start | **Start** |

To move a button for one game or for all of them, open **RetroArch Settings**
in the in-game menu, change it in **Quick Menu > Controls**, and save a remap
file there.

Everything else matches Leaf's other RetroArch cores.

- **Menu** opens Leaf's in-game menu over the game, with save states, reset, and
  the rest; see [The in-game menu](/guide/playing/#the-in-game-menu). Choose
  **Quit** there to leave the game. RetroArch's own menu is under **RetroArch
  Settings**, and core options are in its **Quick Menu**.
- **Menu** held with another button works as it does on other cores. By default,
  **Menu + Select** opens the [Game Switcher](/guide/playing/#the-game-switcher),
  **Menu + L1** takes a screenshot, and any RetroArch hotkey you've bound works
  the same way. See [Hotkeys](/guide/features/#hotkeys) and
  [RetroArch hotkeys](/guide/playing/#retroarch-hotkeys).
- With a controller connected, it's player 1, as everywhere else in Leaf, and
  its Guide or Home button opens Leaf's in-game menu.

## Saves and states

- In-game saves go to `Saves/Yabadabadoo/` on the game's card. They're written a
  moment after the game saves, so a crash or a flat battery doesn't lose them.
- Save states go to `States/Yabadabadoo/` on the game's card. Each slot in
  Leaf's in-game menu shows a thumbnail.
- Saving a state when you hold the power button, and resuming after power-off,
  work as they do on other cores.
- RetroArch settings, core options, and remaps for Yabadabadoo are kept with the
  rest of Leaf's RetroArch settings, in `.umrk/mlp1/retroarch/` on your main
  card.

These are the same save and state folders the earlier version of the pak used,
so your existing saves and states carry over. The first time it starts, the new
version also copies the earlier version's core options, overrides, and remaps
from `.userdata/mlp1/Yabadabadoo/config/` to their new place.

Yabadabadoo's saves and states are separate from YabaSanshiro's, so switch back
to the core that made a save rather than moving files between them.

Removing the pak removes the core on the next rescan. It doesn't remove your
files under `Roms/`, `BIOS/`, `Saves/`, `States/`, or `.userdata/`.

## Settings

Yabadabadoo runs with the same RetroArch settings as Leaf's other cores, so a
change you made in **RetroArch Settings** for another game applies here too. Leaf
still sets a few things itself on every launch; see
[RetroArch settings](/guide/retroarch-settings/).

A change you make from inside Yabadabadoo's RetroArch is saved to Leaf's shared
settings only when its RetroArch is the same version as Leaf's. If a change
doesn't carry over to your other games, make it from a game on another core.

## Limits

Recording and Bluetooth audio aren't available with this core.

## How it works

Most of Yabadabadoo's speed comes from its recompiler, which turns Saturn code
into ARM code as the game runs. That recompiler only exists for 32-bit ARM. The
MLP1 can run 32-bit programs, but Leaf and its RetroArch are 64-bit, so the pak
brings its own 32-bit RetroArch and every library it needs, including a 32-bit
build of the MLP1's graphics driver. It doesn't need PortMaster or any other pak.

Leaf runs that RetroArch in place of its own, with the same settings, and controls
it the way it controls its own. That's why the in-game menu, the Game Switcher,
and hotkeys work, and why this version needs Leaf 0.13.
