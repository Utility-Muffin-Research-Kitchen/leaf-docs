---
title: How Leaf is built
description: How Leaf is put together - the run-on-top-of-stock model, the launcher's components, and what each repository does.
---

Leaf is a launcher that runs on top of the Miniloong Pocket 1's stock OS. This page
covers that model, the launcher's processes, and the repositories they live in.

![Leaf's architecture as a stack: the Leaf launcher (jawakad daemon spawning jawaka-launcher, jawaka-menu, jawaka-osd, and an LED helper, all built on Catastrophe) sits on top of a boot hook, which sits on top of intact stock LoongOS (Weston, kernel and drivers, audio, Wi-Fi/BT, power) running on the Miniloong Pocket 1 hardware](/architecture.svg)

## Run on top of stock

Leaf doesn't replace the stock OS. A boot hook in the device's normal startup takes
over before the stock home screen appears and runs the Leaf launcher, leaving stock
LoongOS intact underneath.

- A guard counts launcher startups in a short window. If Leaf fails to start
  cleanly several times in a row, the device falls back to the stock interface.
- Leaf uses the stock display server, audio, Wi-Fi, and power systems, and ships no
  drivers of its own.
- Stock is always present, so a [recovery card](/guide/recovery/) can restore the
  device fully.

## The launcher stack

The launcher is several cooperating processes:

- **`jawakad`** - the daemon. Owns the launch lifecycle, sleep/wake, platform
  actions, performance profiles, and coordination with the in-game menu.
- **`jawaka-launcher`** - the on-screen launcher UI.
- **`jawaka-menu`** - the main menu and in-game menu.
- **`jawaka-osd`** - on-screen overlays (volume/brightness).
- A small LED helper drives the RGB ring.

The daemon is the normal entry point and spawns the UI binaries. The daemon and UI
talk over a local IPC channel, used for things like performance changes and in-game
menu actions.

## Catastrophe (the UI toolkit)

The launcher and Leaf-native apps are built on Catastrophe, a small C UI toolkit.
The launcher exports its appearance (colors, list/pill style, fonts, hint
visibility) to apps through environment variables, so an app built on Catastrophe
takes on the launcher's look.

## Platform and graphics

Device-specific behavior (display, audio, Wi-Fi, Bluetooth, LED, performance, and
storage) sits behind a platform layer, so most of the launcher is device-agnostic
and new hardware can be added behind the same interface.

The device composites through a Wayland compositor, and Leaf renders with GLES2.

## Repositories

Leaf is split across several repositories in the
[Utility-Muffin-Research-Kitchen](https://github.com/Utility-Muffin-Research-Kitchen)
organization. Each is an independent repo with its own build.

| Repo | Role |
|---|---|
| **Leaf** | Release artifacts (SD install / recovery ZIPs) and cross-repo build orchestration. It calls each repo's own build and package targets, assembles the SD payload, and stages to a connected device |
| **Jawaka** | The launcher stack - `jawakad` daemon + launcher + menu + OSD. Depends on Catastrophe |
| **Catastrophe** | Shared header-only C UI toolkit the launcher and apps are built on |
| **miniloong-launcher-switcher** | The on-device mechanism that boots Leaf on top of stock - boot hook, session supervisor, install/recovery payloads, device defaults |
| **mlp1-toolchain** | The Buildroot-based Docker image used to cross-compile for the device |
| **retroarch-builds** | RetroArch fetch/build/packaging |
| **Cores-spruce** | libretro core builder, forked from [spruceOS](https://github.com/spruceUI)'s build lane (downstream of [libretro-super](https://github.com/libretro/libretro-super)) |
| **leaf-contracts** | Public schemas, fixtures, and normative contracts for third-party integrations, including the content-pak interface |
| **ScummVM-pak** | Buildable reference content pak: adds the ScummVM system, its libretro core, and the standalone ScummVM. The clean-checkout example to clone and validate against leaf-contracts |
| **J2ME-pak** | Content pak: adds the J2ME system for Java phone games, the FreeJ2ME-Plus libretro core, and the Java runtime it needs |
| **Yabadabadoo-pak** | Content pak: adds the Yabadabadoo Saturn core |
| **DSperate-pak** | Content pak: adds the DSperate Nintendo DS cores |
| **leaf-n64-standalone** | Standalone Mupen64Plus package for Nintendo 64, Leaf's default N64 emulator on MLP1 |
| **Yabasanshiro-standalone** | Optional standalone Saturn emulator package for MLP1, including corresponding-source publication |
| **ssh-server** | The SSH Server app (a `.pak`) |
| **Thing-File** | The File Explorer app (a `.pak`) |
| **Fugazi** | The Fugazi live CRT-shader tuner app (a `.pak`) |
| **CentralScrutinizer** | Network file/ROM manager - a web UI served from the device (a bundled app) |
| **DiscoBoy** | The Disco Boy music player, installed from Pak Rat |
| **VideoFromHell** | The Video From Hell video player, installed from Pak Rat |
| **Nimbus** | The Nimbus weather app, installed from Pak Rat |
| **Leaf-Itchio-Pak** | The Itch.io client, installed from Pak Rat |
| **leaf-themes** | Community themes and the submission flow that publishes them to Pak Rat |
| **miniloong-adb-keeper** | SD payload used to enable developer access on the device |
| **leaf-docs** | This documentation site |
