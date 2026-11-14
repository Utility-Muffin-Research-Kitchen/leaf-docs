---
title: Introduction
description: What Leaf is, what it adds to the Miniloong Pocket 1, and what happens to the stock OS when you install it.
---

Leaf is custom firmware for the Miniloong Pocket 1 (MLP1) handheld. It replaces
the stock home screen with a themeable launcher and adds emulation, apps, and
over-the-air updates. The device's original operating system stays installed
underneath.

## Leaf runs on top of stock

Leaf takes over at boot, before the stock home screen appears, and leaves stock
LoongOS in place. If Leaf ever fails to start, the device falls back to the
stock interface on its own, and a [recovery card](/guide/recovery/) returns it
to clean stock whenever you want.

## What you get

![The Leaf launcher browsing a Sega Genesis game list, with box art shown alongside](/screenshot-games.png)

- A launcher you can restyle - two home layouts (classic Tabs or a Coverflow
  box-art carousel), color schemes, list styles, fonts, a status bar, and an RGB
  ring around the stick. See the [Features tour](/guide/features/).
- Emulation - RetroArch with one folder per system for ROMs, box art, saves, and
  states. You provide the games and any required BIOS files.
- Apps - Central Scrutinizer (manage games and files over Wi-Fi from your
  browser), Fugazi (a live CRT-shader tuner), Joe's Calibrage (analog-stick
  calibration), an SSH server, and a file manager. See
  [Built-in apps](/apps/introduction/).
- Over-the-air updates - check for and install new releases from the launcher.
  See [Updating](/guide/updating/).

## Project status

Leaf is stable and released often, and runs on the Miniloong Pocket 1 only.
Every release is published on GitHub with release notes.

Leaf is open source, baked in the
[Utility-Muffin-Research-Kitchen](https://github.com/Utility-Muffin-Research-Kitchen).
See [Contributing](/develop/contributing/) if you'd like to help.

## Next steps

- [Install Leaf](/guide/install/) - get it running on your device.
- [Adding games](/guide/games/) - fill your library.
- [BIOS files](/guide/bios-and-cores/) - what some systems need to run.
