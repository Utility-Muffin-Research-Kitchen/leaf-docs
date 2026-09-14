---
title: Rumble
description: Haptic feedback on the Miniloong Pocket 1. Feel the interface as you move through it, and let games drive the rumble motor.
---

The Pocket 1 has a rumble motor inside it. Leaf uses it two ways: short taps that
give the interface a physical response, and real in-game rumble driven by the game
you are playing.

## Turning it on

Everything lives under **Settings > Controls & Feedback**. Rumble is two separate
switches that share one strength, so you can have either one without the other.

- **UI Rumble** - every tap the interface makes: a tap each time the cursor moves,
  and the taps for selecting, confirming, and blocked actions. Off by default,
  because the cursor tap fires constantly while you scroll. The device taps once
  when you turn it on.
- **Game Rumble** - lets the game itself drive the motor. On by default. The device
  taps once when you turn it on.
- **Strength** - how hard the motor runs, from weak to full, for both the interface
  and games. Press **Left** and **Right** to adjust it, and the device taps as you
  go so you can feel each level rather than guessing from a number. It shows a
  dash while both switches are off.
- **In-game Shortcuts** - opens a separate page for the **MENU** chords: the game
  switcher, screenshots, and recording, and which button each one uses. See
  [In-game shortcuts](/guide/features/#in-game-shortcuts).

If you are updating from a Leaf version that had a single **Rumble** switch, your
choice carries over. With that switch off, both new switches start off. With it
on, **UI Rumble** takes your old **Cursor Movement** setting and **Game Rumble**
keeps its own.

## What the taps mean

With **UI Rumble** on, Leaf does not buzz at random. The number of taps tells you what happened, so you
can often tell the outcome without looking:

- **One tap** - you selected something, or the cursor moved.
- **Two taps** - you confirmed something and it went through.
- **Three taps** - that action was not available.

The pattern is fixed; **Strength** scales how hard all of them feel.

## Rumble in games

With **Game Rumble** on, games that support rumble drive the motor themselves,
with the force the game asks for. A gentle engine idle feels gentle, a crash feels
like a crash.

**Strength** acts as the ceiling here rather than a fixed level. The game still
controls the moment-to-moment force; your setting caps how strong the loudest
moment gets.

This works for games running under RetroArch, which covers most systems, and for
the standalone Dreamcast and N64 emulators.

Two systems are not covered, for different reasons. The PSP had no rumble motor
of its own, so there is nothing for a PSP game to ask for. DS rumble came from a
Rumble Pak in the GBA slot, which very few games used, and DraStic has not been
tested for it.

Changing **Game Rumble** takes effect the next time you start a game, so it will
not interrupt one you are already playing.

## If you would rather not feel it

Turn both switches off for silence everywhere. If you only dislike it in one place,
you do not have to give up the other: turn off **UI Rumble** to keep games rumbling
with quiet menus, or turn off **Game Rumble** to keep the interface taps without
games buzzing.
