---
title: Architecture
description: How Leaf is put together - the run-on-top-of-stock model and the launcher's components.
---

A high-level look at how Leaf is built. (Contributor docs are a work in progress -
expect this to deepen over time.)

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
  [recovery card](/leaf-docs/guide/recovery/) can restore the device fully.

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

:::note[Reviewer note]
Keep this conceptual and public-safe. Avoid documenting the exact boot-hook
internals, exploit/ADB-enablement details, or any reverse-engineering of stock
firmware here.
:::
