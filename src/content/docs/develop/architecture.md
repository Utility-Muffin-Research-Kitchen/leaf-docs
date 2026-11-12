---
title: How Leaf is built
description: How Leaf is put together - the run-on-top-of-stock model, the launcher's components, and what each repository does.
---

A high-level look at how Leaf is built. (Contributor docs are a work in progress -
expect this to deepen over time.)

![Leaf's architecture as a stack: the Leaf launcher (jawakad daemon spawning jawaka-launcher, jawaka-menu, jawaka-osd, and an LED helper, all built on Catastrophe) sits on top of a boot hook, which sits on top of intact stock LoongOS (Weston, kernel and drivers, audio, Wi-Fi/BT, power) running on the Miniloong Pocket 1 hardware](/architecture.svg)

## Run on top of stock

Leaf's defining choice is that it does not replace the stock OS. A boot hook
inserted into the device's normal startup takes over before the stock home screen
appears, and runs the Leaf launcher instead - while leaving stock LoongOS intact
underneath.

Consequences of this model:

- **Crash-safety fallback.** A guard counts launcher startups in a short window; if
  Leaf fails to start cleanly several times in a row, the device falls back to the
  stock interface instead of bricking or boot-looping.
- **Reuse, not reinvention.** Leaf uses the stock display server, audio, Wi-Fi, and
  power systems rather than shipping its own drivers.
- **Recoverable by design.** Because stock is always present, a
  [recovery card](/guide/recovery/) can restore the device fully.

## The launcher stack

The launcher is several cooperating processes:

- **`jawakad`** - the daemon. Owns the launch lifecycle, sleep/wake, platform
  actions, performance profiles, and coordination with the in-game menu.
- **`jawaka-launcher`** - the on-screen launcher UI.
- **`jawaka-menu`** - the main menu and in-game menu.
- **`jawaka-osd`** - on-screen overlays (volume/brightness).
- A small LED helper drives the RGB ring.

The daemon is the normal entry point; the UI binaries are spawned by it. The
daemon and UI communicate over a local IPC channel (used for things like
performance changes and in-game menu actions).

## Catastrophe (the UI toolkit)

The launcher and Leaf-native apps are built on Catastrophe, a small C UI
toolkit. The launcher exports its appearance (colors, list/pill style, fonts,
hint visibility) to apps through environment variables, so any app built on
Catastrophe inherits the launcher's look automatically.

## Platform abstraction

Device-specific behavior (display, audio, Wi-Fi, Bluetooth, LED, performance, and
storage) sits behind a platform layer, so the bulk of the launcher stays
device-agnostic and new hardware can be added behind the same interface.

## Graphics

The device composites through a Wayland compositor, and Leaf renders with GLES2,
the supported, working graphics path on this hardware.

## Repositories

Leaf is split across several repositories in the
[Utility-Muffin-Research-Kitchen](https://github.com/Utility-Muffin-Research-Kitchen)
organization. Each is an independent repo with its own build.

| Repo | Role |
|---|---|
| **Leaf** | Release artifacts (SD install / recovery ZIPs) and cross-repo build orchestration |
| **Jawaka** | The launcher stack - `jawakad` daemon + launcher + menu + OSD |
| **Catastrophe** | Shared C UI toolkit the launcher and apps are built on |
| **miniloong-launcher-switcher** | The on-device mechanism that boots Leaf on top of stock - boot hook, session supervisor, install/recovery payloads, device defaults |
| **mlp1-toolchain** | The Buildroot-based Docker image used to cross-compile for the device |
| **retroarch-builds** | RetroArch fetch/build/packaging |
| **Cores-spruce** | libretro core builder, forked from spruceOS's build lane (downstream of libretro-super) |
| **leaf-contracts** | Public schemas, fixtures, and normative contracts for third-party integrations |
| **ScummVM-pak** | Buildable reference content pak: adds the ScummVM system, its libretro core, and the standalone ScummVM |
| **J2ME-pak** | Content pak: adds the J2ME system for Java phone games, the FreeJ2ME-Plus libretro core, and the Java runtime it needs |
| **leaf-n64-standalone** | Standalone Mupen64Plus package for Nintendo 64 on MLP1 |
| **Yabasanshiro-standalone** | Optional standalone Saturn emulator package for MLP1, including corresponding-source publication |
| **ssh-server** | The SSH Server app (a `.pak`) |
| **Thing-File** | The file-manager app (a `.pak`) |
| **Fugazi** | The Fugazi live CRT-shader tuner app (a `.pak`) |
| **CentralScrutinizer** | Network file/ROM manager - a web UI served from the device (a bundled app) |
| **miniloong-adb-keeper** | SD payload used to enable developer access on the device |
| **leaf-docs** | This documentation site |

### How they fit together

- **Leaf** is the dispatcher: it calls each product repo's own build/package targets
  and assembles the SD payload. You build install and recovery ZIPs or stage to a
  connected device from Leaf.
- **Jawaka** depends on **Catastrophe** (header-only toolkit).
- **retroarch-builds** + **Cores-spruce** produce the RetroArch emulation stack
  that Leaf stages alongside the launcher.
- **leaf-contracts** defines the public content-pak interface; **ScummVM-pak**
  is the clean-checkout example an outside developer can clone and validate
  against it.
- **leaf-n64-standalone** produces the packaged standalone Nintendo 64 emulator
  that Leaf uses by default on MLP1.
- **Yabasanshiro-standalone** produces Leaf's optional faster Saturn emulator;
  its public source-only release accompanies the runtime shipped by Leaf.
- **miniloong-launcher-switcher** owns everything device-stock-specific (the boot
  swap and install/recovery flow).
