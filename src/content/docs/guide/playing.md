---
title: Playing games
description: 'The in-game menu, save states, the game switcher, and per-game performance, while a game is running on Leaf.'
---

Once a game is running it is handled by RetroArch (or a standalone emulator), but
Leaf adds a few things on top: a menu, save states, fast switching between games,
and per-game performance.

## The in-game menu

![Leaf's in-game menu over a dimmed, paused game: Continue, Save State, Load State, Reset, Performance, RetroArch Settings, and Save & Quit, with the highlighted save slot showing a thumbnail of that saved moment](/screenshot-ingame-menu.png)

Press **MENU** while a game is running to open Leaf's in-game menu. It pauses the
game and floats over a dimmed snapshot of where you were. The options are:

- **Continue** - close the menu and resume the game (the **B** button does this too).
- **Save State** - save your exact spot to a slot.
- **Load State** - jump back to a saved spot.
- **Reset** - restart the game from the beginning.
- **Performance** - tune how hard the device works for this game (see below).
- **RetroArch Settings** - open RetroArch's own menu for advanced options.
- **Quit** - leave the game and return to the launcher.

Standalone emulators may replace or adapt a few rows. For example, Nintendo 64
standalone has Leaf save/load and settings pages, but not RetroArch Settings,
because it is not running inside RetroArch.

For filters and scanline effects, see [RetroArch shaders](/guide/shaders/). For
where RetroArch's own settings are stored, when they are saved, and the few
Leaf sets on every launch, see
[RetroArch settings](/guide/retroarch-settings/).

## RetroArch hotkeys

RetroArch has its own hotkeys, separate from Leaf's. They are held behind a
modifier button so they cannot fire by accident while you play: on Leaf that
modifier is **MENU**, and RetroArch calls it **Hotkey Enable**.

So a RetroArch hotkey is **MENU + the button you bound it to**. Pressing that
button on its own does nothing but play the game.

To change or add one, open **MENU → RetroArch Settings → Settings → Input →
Hotkeys**. Bind a hotkey to a button that does not clash with a Leaf shortcut, then
leave RetroArch normally so the change is saved.

### Changing the modifier

The **Hotkey Enable** row in that same screen sets the modifier itself. You can
move it to another button, and your choice is remembered across quitting a game,
restarting, and updating Leaf.

Two things are worth knowing before you change it:

- **Whatever you choose stops reaching the game while you hold it.** That is how
  RetroArch prevents a hotkey chord from also pressing something in the game, and
  it applies to any button you pick. **MENU** is the default because it is not a game control. Choosing
  **SELECT**, for instance, breaks any game that asks you to hold **SELECT**.
- **You can clear it**, which makes every hotkey you have bound fire directly, with
  no modifier. That is a legitimate choice and Leaf will not undo it - but be
  deliberate, because those buttons will then do their hotkey job in the middle of
  a game. Leaf does not silently rebind or clear your hotkeys to compensate.

Quitting is the one exception Leaf keeps for itself: RetroArch's own **Quit** hotkey
stays unbound, so no button can drop you out of a game unexpectedly, even if you
clear the modifier. Use **Quit** in the in-game menu instead.

### Where Leaf's shortcuts and RetroArch's overlap

Leaf's own hotkeys also use **MENU**. These are the **defaults** - the
second button is yours to change, or turn off, in **Settings → Hotkeys & Rumble
→ Hotkeys**:

| Leaf action | Default |
| --- | --- |
| [Game switcher](#the-game-switcher) | **MENU + SELECT** |
| Screenshot | **MENU + L1** |
| Recording | **MENU + R1** |

If both use **MENU** and you bind a RetroArch hotkey to a button a Leaf shortcut
is using, Leaf wins and RetroArch never sees the chord. Move one of them, or turn the Leaf shortcut
off.

Leaf only wins when it actually does something. A screenshot shortcut with
screenshots turned off, or the game switcher outside a RetroArch game, hands the
whole chord to RetroArch instead - so using a button for a Leaf shortcut does
not reserve it in every situation. See
[Hotkeys](/guide/features/#hotkeys).

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

Press **MENU + SELECT** during a RetroArch game to bring up the game switcher: a
carousel of your recent games laid over the current one. That chord is the
default - **Settings → Hotkeys & Rumble → Hotkeys** puts it on
another button, or turns it off.

![The game switcher: a carousel of recent games shown as box art, the centered one named below, with remove, back, and resume hints along the bottom](/screenshot-switcher.png)

- **Left / Right** browse your recent games; the tile for the game you are in shows
  a live snapshot of it.
- **A** switches to the selected game. Leaf saves your current spot first, so you can
  hop between two or three games without losing progress.
- **B** closes the switcher and drops you back into the current game.
- **Y** removes an entry from the recents list (you cannot remove the running game).

When you do return to the launcher, it reopens exactly where you left off, on the
same tab and game.

Standalone Nintendo 64 uses **MENU + SELECT** too, but there the chord is fixed
- it is not controlled by **Hotkeys**. It also works a little differently: Leaf saves the current N64
state, returns to the launcher, and opens the same switcher/recents flow there.
Press **A** on the selected game to resume from that saved state.

## Per-game performance

Pick **Performance** in the in-game menu to change how hard the device runs while
you play. A change here lasts until you quit the game. To keep a profile for a game
or a whole system, set it in that game's or system's **Options** instead: press
**X** on it in the launcher (see [Options menu](/guide/games/#options-menu)).

The line at the top shows the profile in use and how warm the chip is.

- **Profile** - **Balanced**, **Performance**, **Battery Saver**, or **Custom**. It
  starts on the profile in use, whether that comes from **Settings → Games → Game
  Performance** or from the game's or system's **Options**.
- **CPU**, **GPU**, and **DMC** (memory) - leave each one automatic or pin it to a
  fixed speed. Changing any of them switches **Profile** to **Custom**. Raising these
  can smooth out a heavy 3D game at the cost of battery and heat.
- **Reset Override** - drop the change you made here and go back to the game's usual
  profile.

There's no **Auto** in this list. For a game that is already running, Auto always
means either Balanced or Performance, so **Profile** shows that one instead. Auto is
still there in **Settings** and in a game's or system's **Options**. Leaf 0.11.0
still lists **Auto** here, and its **Profile** row shows your **Settings** choice
rather than the one in use.

If a game runs slowly, try **Performance** here first. See also
[BIOS & cores](/guide/bios-and-cores/) for which systems are demanding on this hardware.
