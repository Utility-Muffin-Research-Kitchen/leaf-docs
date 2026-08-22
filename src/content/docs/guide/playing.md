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

For filters and scanline effects, see [RetroArch shaders](/guide/shaders/).

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

Press **SELECT** during a RetroArch game to bring up the game switcher: a carousel
of your recent games laid over the current one.

![The game switcher: a carousel of recent games shown as box art, the centered one named below, with remove, back, and resume hints along the bottom](/screenshot-switcher.png)

- **Left / Right** browse your recent games; the tile for the game you are in shows
  a live snapshot of it.
- **A** switches to the selected game. Leaf saves your current spot first, so you can
  hop between two or three games without losing progress.
- **B** closes the switcher and drops you back into the current game.
- **Y** removes an entry from the recents list (you cannot remove the running game).

When you do return to the launcher, it reopens exactly where you left off, on the
same tab and game.

In standalone Nintendo 64, use **MENU + SELECT** instead. Leaf saves the current
N64 state, returns to the launcher, and opens the same switcher/recents flow
there. Press **A** on the selected game to resume from that saved state.

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

## Nintendo 64 (standalone Mupen64Plus)

Nintendo 64 games default to **Mupen64Plus Standalone** rather than the standard
RetroArch N64 core. Both use the same `Roms/N64/` folder; switch between them
with **Core** from a game or system's **Options** menu.

Standalone is the default because it lets Leaf tune the MLP1-specific parts that
matter most for N64: video plugin choice, display handling, performance options,
and the save-and-quit handoff back to the launcher. The RetroArch core remains
available as an alternate when a particular game behaves better there.

Controls that differ from RetroArch:

- **MENU** - open the Leaf N64 overlay.
- **MENU + SELECT** - save the current state and hand off to Leaf's game
  switcher/recents flow.
- **A** from the game switcher or recents - resume the saved N64 state.
- **RetroArch Settings** does not appear while using standalone N64; renderer and
  N64-specific options live in the standalone overlay instead.

## Nintendo DS (standalone DraStic)

Nintendo DS games run in **DraStic**, a standalone emulator rather than RetroArch,
so the in-game menu, save states, and switcher above don't apply - DraStic has its
own menu and its own controls.

DraStic itself is closed-source. The two-screen layouts, the transparent overlay,
and the button shortcuts below all come from
[Steward Fu](https://github.com/steward-fu/nds)'s open-source SDL2 wrapper for
DraStic, which Leaf forks and builds on - most of the heavy lifting here is his
work. Because the DS has two screens and a touch screen, the wrapper maps
everything onto the handheld using **MENU** as a modifier you hold together with
another button.

### Everyday controls

- **MENU** (tap and release) - open DraStic's own menu: save/load states, options,
  and the screen-layout picker.
- **MENU + Start** - open the Steward Fu menu for the see-through second screen
  (its size, position, transparency, and border).
- **MENU + A** - flip between your two saved screen layouts. By default that's the
  normal stacked view and a transparent second screen tucked into the corner.
- **MENU + Left / Right** - cycle through all of the screen layouts.
- **L2** - switch the D-pad between controlling the game and controlling the DS
  touch pointer. In pointer mode the D-pad moves the stylus and **A** taps the
  screen; press **L2** again to switch back.
- **R2** - swap the two DS screens, so the other one becomes the main view. Handy
  with the transparent overlay, or for games that put the action on the bottom
  screen.

### Save states, fast-forward, and quitting

- **MENU + L2** - save state.
- **MENU + R2** - load state.
- **MENU + R1** - fast-forward (hold).
- **MENU + L1** - quit back to the launcher.
- **MENU + Select** - also opens DraStic's own menu.

### Display tweaks

- **MENU + B** - toggle the picture between sharp pixels and smoothing.
- **MENU + Y** - cycle the menu background art (or, in pointer mode, the stylus
  cursor).

**MENU + Up** is intentionally inactive on the Pocket 1. On other devices it
toggles DraStic's microphone, but that feature relies on a recorded sample played
back into the game rather than live mic input, and the Pocket 1's 64-bit DraStic
is a closed-source build the wrapper has to drive through fragile internal entry
points. Triggering the microphone that way crashed the emulator, so the shortcut
is switched off here until it can be wired up safely.

Inside DraStic's own menu (and the Steward Fu menu), use the **D-pad** to move,
**Left / Right** to change a value, **A** to confirm, and **B** to go back or close.

## Dreamcast, Atomiswave, and Naomi (standalone Flycast)

Dreamcast, Atomiswave, and Naomi games default to **standalone Flycast** rather
than the RetroArch Flycast core, because the standalone path performs noticeably
better on this hardware. Each system keeps its own ROM folder (`Roms/DC/`,
`Roms/ATOMISWAVE/`, or `Roms/NAOMI/`), while Naomi, Naomi GD-ROM, and Naomi 2 all
share `Roms/NAOMI/`. Switch emulator with **Core** from a game or system's
**Options** menu; RetroArch Flycast remains the first compatibility fallback.

Like the other standalone emulators, it runs its own session, so the in-game
menu, save states, and switcher above don't apply:

- **MENU** - open Flycast's own menu, rotated to match the screen. Save states,
  video and controller settings, and exiting all live there.
- **SELECT** - insert a coin in Atomiswave and Naomi games.
- **L1** - Atomiswave arcade button 3, used for grenades in Metal Slug 6.
- Your VMU memory-card data and Flycast settings survive Leaf updates. VMU data
  and saves are kept under `Saves/Flycast/`, and Flycast's own save states under
  `States/Flycast/`. Dreamcast, Atomiswave, and Naomi share these durable
  locations rather than creating separate emulator copies.

## PSP (standalone PPSSPP)

PSP games run in **PPSSPP**, standalone rather than through RetroArch, because a
dedicated build is much faster on this hardware. There are two versions to pick
from with **Core** in a game or system's **Options** menu:

- **PPSSPP (Vulkan)** - the default, and the faster of the two.
- **PPSSPP (GLES)** - a fallback for anything that misbehaves on Vulkan.

Both read the same `Roms/PSP/` folder, and PSP needs no BIOS.

This is PPSSPP's own session, so Leaf's in-game menu, Leaf's save states, and the
game switcher don't apply:

- **MENU** - open PPSSPP's own pause menu. Save states, its graphics and control
  settings, and exiting the game all live in there.
- Volume keys work as usual.

Those menus follow Leaf's language, so setting Leaf to 中文 puts PPSSPP in Simplified
Chinese as well. See [Language](/guide/language/).

The analog stick uses the calibration from
[Joe's Calibrage](/apps/joes-calibrage/), so if the stick drifts or doesn't reach
full tilt in PSP games, calibrate it there rather than inside PPSSPP.

### If your face buttons or stick were wrong

Early Leaf releases shipped a default mapping with **Square** and **Triangle**
swapped, and with analog **Up** mapped to a button instead of the stick. Both are
fixed.

If you have been playing PSP games since before that fix, Leaf corrects the two
mappings once, on the next PSP launch. It only touches them if they still hold
those exact original values, so a mapping you set yourself is left alone. If you
had already worked around the swap with your own remap, that remap survives and
you may want to undo your workaround in PPSSPP's control settings.
