---
title: Features tour
description: 'A walkthrough of the Leaf launcher: appearance, status bar, lighting, networking, performance, and built-in apps.'
---

A quick tour of what Leaf adds on top of your games. Most of this lives in
**Settings**, reachable from the launcher.

## Appearance

Make the launcher yours from **Settings → Appearance**:

- **Color schemes** - pick a curated palette. Six dark schemes (**Leaf**, the
  soft-green default, plus Aurora, Ember, Orchid, Slate, and Rosé) and five
  lighter ones (**Meadow**, Sky, Blush, Sand, and Lavender). You can also hand-tune
  individual colors, which switches the scheme to "Custom."
- **List style** - choose how the selection highlight looks (rounded, soft, square,
  or the directional **Leaf** pill).
- **Fonts** - pick a font family (Nunito by default, with eight more) and adjust
  the font size.

## Status bar

A configurable bar across the top (**Settings → Appearance → Status Bar**):

- **Clock** - with style options.
- **Battery** - animated while charging, with a low-battery warning.
- **Wi-Fi** - connection state and signal strength.
- **Bluetooth** - shown when the radio is on, highlighted when a device is connected.
- **Volume** - the current system volume.

Each indicator can be toggled. You can also hide the button hints footer; with
hints off, content expands to fill the screen, and apps built on Leaf's toolkit
follow the same setting.

## Lighting (RGB ring)

The stick has an RGB ring you can drive from Settings:

- Solid, breathing, and rainbow modes, plus a few animated effects.
- A breathing-green glow is the default Leaf identity.
- Toggle the ring on/off with a stick click.

## Networking

- **Wi-Fi** (**Settings → Network**) - scan, connect, and turn the radio on or off.
  Your choice persists across reboots.
- **Bluetooth** (**Settings → Bluetooth**) - scan for and pair headsets and
  controllers; game and system audio follows a connected headset automatically.

## Achievements

Sign in to RetroAchievements once (**Settings → Accounts**) and RetroArch logs
you in at every game launch; achievements and progress show up in supported
cores. See [Settings → Accounts](/leaf-docs/guide/settings/#accounts).

## Performance

**Settings → General → Game Performance** lets you pick how hard the device works
during gameplay:

- **Auto** - light systems run efficiently; heavier systems automatically boost.
- **Balanced** / **Performance** / **Battery Saver** - pick a fixed behavior.

Leaf keeps the launcher itself in a low-power state and ramps up the CPU, GPU, and
memory only when a game launches, then winds back down on exit. There's also a
live performance panel in the in-game menu for tuning while a game runs.

## Menu button

On the launcher home, the **Menu** button opens the **System** menu: a library
rescan, **System Update**, **About**, and the session and power actions (sleep,
reboot, power off, exit to stock). See
[Settings → System menu](/leaf-docs/guide/settings/#system-menu-menu-button).

While a game is running, the same button opens the **in-game menu** instead -
quick actions (resume, save and load states, the performance panel, quit back to
the launcher) without leaving the game.

## Apps

Leaf ships with a few built-in apps (under the **Apps** tab):

- **Central Scrutinizer** - manage your library over Wi-Fi from a web browser:
  upload ROMs and box art, manage saves and BIOS files, and browse the SD card,
  all without pulling the card. See
  [Managing your library with Central Scrutinizer](#managing-your-library-with-central-scrutinizer)
  below.
- **Fugazi** - a live CRT-shader tuner. Dial in a retro look (scanlines, screen
  curvature, a phosphor mask, glow, and more) against a full-screen preview, then
  install it as the global shader so it applies to every game. See
  [CRT shaders with Fugazi](#crt-shaders-with-fugazi) below.
- **SSH Server** - start an SSH server to reach the device over the network.
- **File manager** - browse and manage files on the device.

## Box art

Press **X** on a game or system to open its **Options** menu, where you can rename
it, pick a core, set a performance profile, or scrape box art. Leaf downloads art
from ScreenScraper.fr (sign in under **Settings → Accounts**), and it runs in the
background while you keep browsing or playing. You can always drop images into
`Images/` by hand instead. See [Adding games → Box art](/leaf-docs/guide/games/#box-art).

## Managing your library with Central Scrutinizer

Open **Central Scrutinizer** from the **Apps** tab to manage the SD card from any
computer or phone on the same Wi-Fi network - no card-pulling, no cables.

To connect:

1. Put the device on Wi-Fi (**Settings → Network**).
2. Launch Central Scrutinizer. It serves a small web manager and shows the
   address to reach it at.
3. Open that address in a browser on a computer or phone on the same network.

From the browser you can:

- Upload ROMs straight into the right system folder, and box art into `Images/`.
- Manage your saves, save states, and BIOS files.
- Browse the SD card and tidy up files.

It's the over-the-air alternative to filling the folders by hand; either way the
layout is the same (see [Adding games & ROMs](/leaf-docs/guide/games/)). A few
things to know:

- Both ends have to be on the same network. The address is local only - it isn't
  reachable from the public internet.
- The manager runs while the app is open; exit it on the device to stop serving.

## CRT shaders with Fugazi

Open **Fugazi** from the **Apps** tab to give games a CRT look. It renders a
live, full-screen preview, so you can see exactly what each setting does before
committing to it.

The workflow:

1. Move through the settings with **Up/Down** and adjust the highlighted one with
   **Left/Right** for fine steps, or **L1/R1** for coarse jumps.
2. Press **X** to swap in a built-in test pattern - a clean image makes
   scanlines, curvature, and the mask easy to judge; press **Y** to clear it.
3. When you like the look, press **A** to install it.

Installing bakes your values into a RetroArch shader preset on the SD card and
registers it as RetroArch's global preset. Because it's the global preset, the
shader is used by every core the next time you launch a game - there's no
per-game or per-system setup. To change the look later, reopen Fugazi, tune, and
install again; the new preset replaces the old one.

A couple of things to keep in mind:

- The preview is representative, but the final look over a real game also depends
  on that core's output resolution and the panel, so it's worth tuning with a
  game in mind.
- Heavier settings (a fine phosphor mask, strong glow) cost more GPU time. On 8-
  and 16-bit systems that's usually free, but on demanding cores it can eat into
  your headroom - ease off the mask if a game struggles.

## Recents & saves

- **Recents** shows what you've been playing; you can remove entries you don't
  want.
- In-game saves and save states are written to the SD card (`Saves/`,
  `States/`).

:::note[Reviewer note]
Confirm exact menu paths and wording against the shipped build before release.
:::
