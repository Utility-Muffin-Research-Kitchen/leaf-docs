---
title: Introduction
description: What Leaf is, the device it runs on, and how it stays safe by riding on top of the stock OS.
---

**Leaf** is a custom firmware (CFW) for the **Miniloong Pocket 1 (MLP1)** handheld.
It replaces the stock home screen with a fast, themeable launcher and adds
emulation, apps, and over-the-air updates — without overwriting the device's
original operating system.

## The big idea: run on top of stock

Most custom firmware *replaces* the stock OS. Leaf doesn't. Instead it **hooks
into the device's normal boot and takes over before the stock home screen
appears**, while leaving stock LoongOS intact underneath.

This has two practical benefits:

- **Safety.** If Leaf ever fails to start, the device automatically falls back to
  the stock interface instead of bricking. A [recovery card](/leaf-docs/guide/recovery/)
  can also restore the device to a clean stock state at any time.
- **Compatibility.** Leaf reuses the stock display, audio, Wi-Fi, and power
  systems rather than reinventing drivers, so it behaves like a native part of
  the device.

## The device

| | |
|---|---|
| **Model** | Miniloong Pocket 1 (MLP1) |
| **SoC** | Rockchip RK3566 — quad Cortex-A55 @ 1.8 GHz |
| **GPU** | Mali-G52 |
| **RAM** | 1 GB LPDDR4X |
| **Display** | 4" IPS, 720×960 (shown as 960×720 landscape) |
| **Battery** | 4000 mAh |
| **Connectivity** | Wi-Fi + Bluetooth |

## What you get

- **A themeable launcher** — colour schemes, list styles, fonts, an animated
  status bar (clock, battery, Wi-Fi), and a configurable RGB stick-ring.
- **Emulation** — RetroArch with per-system folders for ROMs, box art, saves,
  and states. You provide the games and any required BIOS files.
- **Apps** — an SSH server, a file manager, and **Fugazi**, a live CRT-shader
  tuner, with more to come.
- **Over-the-air updates** — check for and install new releases right from the
  launcher. See [Updating](/leaf-docs/guide/updating/).

## Project status

Leaf is **pre-1.0 and under active development**. Releases are published on
GitHub; read each release's notes before installing. It currently targets the
Miniloong Pocket 1 only.

Leaf is open source, developed in the
[Utility-Muffin-Research-Kitchen](https://github.com/Utility-Muffin-Research-Kitchen)
organization. See [Contributing](/leaf-docs/develop/contributing/) if you'd like
to help.

## Next steps

- **[Install Leaf](/leaf-docs/guide/install/)** — get it running on your device.
- **[Adding games & ROMs](/leaf-docs/guide/games/)** — fill your library.
- **[BIOS & cores](/leaf-docs/guide/bios-and-cores/)** — what some systems need
  to run.
