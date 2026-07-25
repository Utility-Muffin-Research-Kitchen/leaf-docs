---
title: Rumble
description: Haptic feedback on the Miniloong Pocket 1. Feel the interface as you move through it, and let games drive the rumble motor.
---

:::caution[Coming soon]
Rumble is not in the current release yet. This page previews a feature that is on
the way. Join the [Discord](https://discord.gg/q5F7cZ7KRp) to hear when it lands.
:::

The Pocket 1 has a rumble motor inside it. Leaf uses it two ways: short taps that
give the interface a physical response, and real in-game rumble driven by the game
you are playing.

## Turning it on

Everything lives under **Settings > Controls & Feedback**.

- **Rumble** - the master switch. On by default. Turn this off and the motor stays
  silent everywhere, including in games.
- **Strength** - how hard the motor runs, from weak to full. Press **Left** and
  **Right** to adjust it, and the device taps as you go so you can feel each level
  rather than guessing from a number.
- **Navigation Tick** - a small tap every time the cursor moves. Off by default,
  because it fires constantly while you scroll. Turn it on if you like the
  interface to feel clicky.
- **Game Rumble** - lets the game itself drive the motor. On by default.
- **Screenshots** - the **Menu + L1** capture hotkey, which lives here alongside
  the other feel-of-the-device settings. See [Screenshots](/guide/screenshots/).

The rest of the rumble settings do nothing while **Rumble** is off, and show a
dash instead of a value to make that clear.

## What the taps mean

Leaf does not buzz at random. The number of taps tells you what happened, so you
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

This works for games running under RetroArch, which covers most systems. The
standalone emulators (PPSSPP for PSP, DraStic for DS, standalone Mupen64Plus for
N64, and standalone Flycast for Dreamcast) do not drive the motor yet.

Changing **Game Rumble** takes effect the next time you start a game, so it will
not interrupt one you are already playing.

## If you would rather not feel it

Turn **Rumble** off for silence everywhere. If you only dislike it in one place,
you do not have to give up the rest: leave **Rumble** on and switch off
**Game Rumble** to keep the interface taps without games buzzing, or leave
**Navigation Tick** off to keep confirmations while scrolling stays quiet.
