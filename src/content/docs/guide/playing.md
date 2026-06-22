---
title: Playing games
description: 'The in-game menu, save states, the game switcher, and per-game performance, while a game is running on Leaf.'
---

Once a game is running it is handled by RetroArch (or a standalone emulator), but
Leaf adds a few things on top: a menu, save states, fast switching between games,
and per-game performance.

## The in-game menu

Press **MENU** while a game is running to open Leaf's in-game menu. It pauses the
game and floats over a dimmed snapshot of where you were. The options are:

- **Continue** - close the menu and resume the game (the **B** button does this too).
- **Save State** - save your exact spot to a slot.
- **Load State** - jump back to a saved spot.
- **Reset** - restart the game from the beginning.
- **Performance** - tune how hard the device works for this game (see below).
- **RetroArch Settings** - open RetroArch's own menu for advanced options.
- **Quit** - leave the game and return to the launcher.

## Save states

Save states capture the exact moment you are in, separate from a game's own
in-cartridge saves. They are the quickest way to stop and pick back up later.

- **Save State** and **Load State** each use numbered slots. Highlight the row and
  press **Left / Right** to pick a slot, then **A** to save or load it. Each slot
  shows a thumbnail so you can see what is in it.
- States are written to **`States/`** on your SD card, so they survive reboots and
  you can back them up from a computer.
- **Quit** defaults to **Save & Quit**, which writes a state automatically before
  returning to the launcher, so you can resume later from the [game switcher](#the-game-switcher)
  or by loading it. Press **Left / Right** on the Quit row to switch it to a plain
  **Quit** that discards unsaved progress.

In-cartridge saves (a game's own save feature) are written to **`Saves/`** and work
as they always have. Save states are an extra layer on top.

## The game switcher

Press **SELECT** during a game to bring up the game switcher: a carousel of your
recent games laid over the current one.

- **Left / Right** browse your recent games; the tile for the game you are in shows
  a live snapshot of it.
- **A** switches to the selected game. Leaf saves your current spot first, so you can
  hop between two or three games without losing progress.
- **B** closes the switcher and drops you back into the current game.
- **Y** removes an entry from the recents list (you cannot remove the running game).

When you do return to the launcher, it reopens exactly where you left off, on the
same tab and game.

## Per-game performance

Pick **Performance** in the in-game menu to set how hard the device runs for the
game you are playing. The choice is remembered per game.

- **Profile** - **Auto**, **Balanced**, **Performance**, **Battery Saver**, or
  **Custom**. Auto is a good default; it runs light systems efficiently and boosts
  for demanding ones.
- **Custom** reveals individual **CPU**, **GPU**, and **DMC** (memory) controls, each
  of which can be left automatic or pinned to a fixed speed. Raising these can smooth
  out a heavy 3D game at the cost of battery and heat.
- **Reset Override** clears the per-game setting and returns the game to your global
  profile (set in **Settings → General → Game Performance**).

If a game runs slowly, try **Performance** here first. See also
[BIOS & cores](/guide/bios-and-cores/) for which systems are demanding on this hardware.
