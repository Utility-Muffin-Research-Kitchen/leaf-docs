---
title: Features tour
description: A walkthrough of the Leaf launcher — appearance, status bar, lighting, networking, performance, and built-in apps.
---

A quick tour of what Leaf adds on top of your games. Most of this lives in
**Settings**, reachable from the launcher.

## Appearance

Make the launcher yours from **Settings → Appearance**:

- **Colour schemes** — pick a curated palette: **Leaf** (the soft-green default),
  Aurora, Ember, Orchid, Slate, or Rosé. You can also hand-tune individual colours,
  which switches the scheme to "Custom."
- **List style** — choose how the selection highlight looks (rounded, soft, square,
  or the directional **Leaf** pill).
- **Fonts** — pick a font family and adjust the font size.

## Status bar

A configurable bar across the top (**Settings → Appearance → Status Bar**):

- **Clock** — with style options.
- **Battery** — animated while charging, with a low-battery warning.
- **Wi-Fi** — connection state and signal strength.

Each indicator can be toggled. You can also hide the **button hints** footer; with
hints off, content expands to fill the screen — and apps built on Leaf's toolkit
follow the same setting.

## Lighting (RGB ring)

The stick has an RGB ring you can drive from Settings:

- Solid, breathing, and rainbow modes, plus a few animated effects.
- A breathing-green glow is the default Leaf identity.
- Toggle the ring on/off with a stick click.

## Networking

- **Wi-Fi** (**Settings → Wi-Fi**) — scan, connect, and turn the radio on or off.
  Your choice persists across reboots.
- **Bluetooth** (**Settings → Bluetooth**) — pair headsets and controllers.

## Performance

**Settings → Behavior → Game Performance** lets you pick how hard the device works
during gameplay:

- **Auto** — light systems run efficiently; heavier systems automatically boost.
- **Balanced** / **Performance** / **Battery Saver** — pick a fixed behaviour.

Leaf keeps the launcher itself in a low-power state and ramps up the CPU, GPU, and
memory only when a game launches, then winds back down on exit. There's also a
live performance panel in the in-game menu for tuning while a game runs.

## In-game menu

While a game is running, the in-game menu gives you quick actions — resume, save
and load states, the performance panel, and quit back to the launcher — without
leaving the game.

## Apps

Leaf ships with a few built-in apps (under the **Apps** tab):

- **SSH Server** — start an SSH server to reach the device over the network.
- **File manager** — browse and manage files on the device.
- **Fugazi** — a live CRT-shader tuner.

## Recents & saves

- **Recents** surfaces what you've been playing for quick access; you can remove
  entries you don't want.
- In-game **saves** and **save states** are written to the SD card (`Saves/`,
  `States/`).

:::note[Reviewer note]
Some of these areas (Bluetooth, the performance panel, the game switcher) are
actively being polished — confirm exact menu paths and wording against the shipped
build before release.
:::
