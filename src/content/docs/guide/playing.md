---
title: Playing games
description: 'The in-game menu, hotkeys, save states, the game switcher, and per-game performance while a game is running on Leaf.'
---

Leaf adds a few things to a running game: a menu, hotkeys, save states, a game
switcher, and per-game performance. Controls that belong to one emulator are in
[Systems and emulators](/guide/systems/).

## The in-game menu

![Leaf's in-game menu over a dimmed, paused game: Continue, Save State, Load State, Reset, Performance, RetroArch Settings, and Save & Quit, with the highlighted save slot showing a thumbnail of that saved moment](/screenshot-ingame-menu.png)

Press **MENU** while a game is running to open Leaf's in-game menu. The game pauses
behind it.

- **Continue** - close the menu and resume the game. **B** does this too.
- **Save State** - save your exact spot to a slot.
- **Load State** - jump back to a saved spot.
- **Reset** - restart the game from the beginning.
- **Performance** - change how hard the device works for this game. See
  [Per-game performance](#per-game-performance).
- **Shader** - pick a filter or scanline effect. See
  [RetroArch shaders](/guide/shaders/).
- **RetroArch Settings** - open RetroArch's own menu. See
  [RetroArch settings](/guide/retroarch-settings/) for which changes are kept.
- **Save & Quit** - save a state and return to the launcher. Press **Left / Right**
  on this row to switch it to a plain **Quit** that discards unsaved progress.

Standalone emulators replace or drop a few rows. Standalone Nintendo 64, for
example, has no **RetroArch Settings** row.

## Hotkeys

Leaf's shortcuts are **MENU** held with a second button. The second button is yours
to change in **Settings > Hotkeys & Rumble > Hotkeys**.

| Action | Default |
| --- | --- |
| [Game switcher](#the-game-switcher) | **MENU + SELECT** |
| [Screenshot](/guide/screenshots/) | **MENU + L1** |
| [Recording](/guide/screenshots/#recording) | **MENU + R1** |

Press **A** on a shortcut to open the list of buttons, pick one, and press **A**
again. A button another action already uses is greyed out with that action's name
beside it. Press **X** on the row to clear the shortcut.

## RetroArch hotkeys

RetroArch has its own hotkeys, separate from Leaf's. Each one is **MENU + the button
you bound it to**. RetroArch calls the **MENU** part **Hotkey Enable**.

To add or change one, open **MENU > RetroArch Settings > Settings > Input >
Hotkeys**, bind it to a button no Leaf shortcut uses, then leave the game normally
so the change is saved.

The **Hotkey Enable** row on that screen moves the modifier to another button.
Whatever button you choose stops reaching the game while you hold it, so **SELECT**
breaks any game that asks you to hold **SELECT**. If you clear the row, every
hotkey you've bound fires on its own button in the middle of a game.

RetroArch's own **Quit** hotkey always stays unbound. Use **Save & Quit** in the
in-game menu instead.

### When Leaf and RetroArch want the same button

If you bind a RetroArch hotkey to a button a Leaf shortcut is using, Leaf's shortcut
runs and RetroArch never sees it. Move one of them, or turn the Leaf shortcut off.

A Leaf shortcut that has nothing to do passes the chord to RetroArch. That happens
with the screenshot shortcut while screenshots are off, and with the game switcher
outside a RetroArch game.

## Save states

A save state captures the exact moment you're in. It's separate from the game's own
saves.

- **Save State** and **Load State** use numbered slots. Highlight the row, press
  **Left / Right** to pick a slot, then **A** to save or load it. Each slot shows a
  thumbnail of what's in it.
- **Save & Quit** writes a state before returning to the launcher, so you can resume
  from the [game switcher](#the-game-switcher) or by loading it.
- States are written to `States/` on your SD card. The game's own saves are written
  to `Saves/`. You can back up both from a computer.

## The game switcher

Press **MENU + SELECT** during a RetroArch game to open the game switcher, a
carousel of your recent games laid over the current one. On the home screen,
**SELECT** opens it.

![The game switcher: a carousel of recent games shown as box art, the centered one named below, with remove, back, and resume hints along the bottom](/screenshot-switcher.png)

- **Left / Right** - browse your recent games. The tile for the game you're in shows
  a live snapshot of it.
- **A** - switch to the selected game. Leaf saves your current spot first.
- **B** - close the switcher and go back to the current game.
- **Y** - remove a game from the recents list. You can't remove the running game.

When you return to the launcher, it reopens on the same tab and game.

Standalone Nintendo 64 uses **MENU + SELECT** too, but the chord is fixed there and
isn't controlled by **Hotkeys**. Leaf saves the N64 state, returns to the launcher,
and opens the switcher there. Press **A** on a game to resume it.

## Per-game performance

Choose **Performance** in the in-game menu to change how hard the device runs while
you play. A change here lasts until you quit the game. To keep a profile for a game
or a whole system, set it in that game's or system's **Options**: press **X** on it
in the launcher (see [Options menu](/guide/games/#options-menu)).

The line at the top shows the profile in use and how warm the chip is.

- **Profile** - **Balanced**, **Performance**, **Battery Saver**, or **Custom**. It
  starts on the profile in use, whether that comes from **Settings > Games > Game
  Performance** or from the game's or system's **Options**.
- **CPU**, **GPU**, and **DMC** (memory) - leave each one automatic or pin it to a
  fixed speed. Changing any of them switches **Profile** to **Custom**. Raising them
  can smooth out a heavy 3D game at the cost of battery and heat.
- **Reset Override** - drop the change you made here and go back to the game's usual
  profile.

There's no **Auto** in this list. For a running game, Auto has already become
Balanced or Performance, so **Profile** shows that one.

If a game runs slowly, try **Performance** here first.
