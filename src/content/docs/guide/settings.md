---
title: Settings reference
description: A reference for the Leaf launcher's Settings menu, grouped by section.
---

A reference for the Settings menu. Open Settings from the launcher; the sections
below mirror its top-level list.

:::note[Reviewer note]
This page is the most likely to drift as the UI evolves — confirm section names,
row labels, and available options against the shipped build before release.
:::

## Appearance

Theme and layout, under **Settings → Appearance**.

- **Theme** — a curated color-scheme picker: **Leaf** (default), Aurora, Ember,
  Orchid, Slate, Rosé. Selecting one sets all color roles at once.
- **Colors** — fine-tune individual color roles (accent, background, text,
  selection, hints, button label, button background) with a color picker. Editing
  any color switches the theme to "Custom."
- **Layout** — **List Style** (Rounded, Soft, Square, or the directional Leaf
  pill), **Font** family, and **Font Size**.
- **Status Bar** — toggle the **Button Hints** footer and each status indicator:
  **Clock** (with style options), **Battery**, **Wi-Fi**, **Bluetooth**, and
  **Volume**. With Button Hints off, content expands to fill the screen.

## Display & Sound

- **Brightness** — screen backlight level.
- **Output** — audio routing: **Speaker**, **Headphones**, or a connected
  **Bluetooth** device.
- **Volume** — system volume (also adjustable with the hardware volume keys, which
  show an on-screen overlay).

## Network

Wi-Fi management: scan for and join networks, see connection status, signal
strength, and IP address, and turn the radio on or off. The on/off state persists
across reboots. (Developers will also find an ADB-over-network toggle here.)

## Bluetooth

Scan for, pair, connect, and unpair Bluetooth devices such as headsets and
controllers. (Route game/system audio to a connected device from
**Display & Sound → Output**.)

## Lighting

Control the RGB ring around the stick:

- **Mode** — solid, breathing, and rainbow, plus a few animated effects.
- **Color**, **Brightness**, and **Speed**.

A breathing-green glow is the default Leaf identity; the ring can also be toggled
with a stick click.

## Library

- **Reset RetroArch Config** — restore RetroArch to its defaults.
- **Unmount Secondary SD** — safely eject a second SD card before removing it.

## Accounts

Sign-ins for external services (ScreenScraper, RetroAchievements). These are
placeholders for now; sign-in is coming in a later release.

## Behavior

- **Startup Tab** — which tab the launcher opens on.
- **Auto Sleep** — idle timeout before the device sleeps (can be turned off).
- **Boot Splash** — show or hide the Leaf boot animation.
- **Game Performance** — how hard the device works during gameplay: **Auto**,
  **Balanced**, **Performance**, or **Battery Saver**. See
  [Features → Performance](/leaf-docs/guide/features/).
- **Time Zone** — set your local time zone so the clock is correct.

## System Update

Check for, download, and install updates over the air. See
[Updating (OTA)](/leaf-docs/guide/updating/).

## About

The installed Leaf version plus system info (OS, kernel, hardware, and network
addresses).
