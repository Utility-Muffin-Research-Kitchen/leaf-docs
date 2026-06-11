---
title: Troubleshooting
description: Fixes for common issues with Leaf on the Miniloong Pocket 1.
---

Common issues and how to resolve them. If something here doesn't help, please
[open an issue](https://github.com/Utility-Muffin-Research-Kitchen).

## A system folder isn't showing up

A system only appears in the launcher once its **core** is present. If you added
games to, say, `Roms/PS/` but PlayStation isn't listed, the core for that system
likely isn't installed. See [BIOS & cores](/leaf-docs/guide/bios-and-cores/).

## A game won't launch

- **Missing BIOS.** Some systems need a BIOS file you supply (e.g. Neo Geo needs
  `neogeo.zip` in `BIOS/`). The game appears but won't start without it.
- **Arcade ROM-set mismatch.** Arcade games must match the core's expected ROM-set
  version and stay **zipped** — don't unzip or rename them. A wrong-version set
  silently fails to load.
- **Wrong folder.** Make sure the game is in the correct `Roms/<SYSTEM>/` folder.

See [Adding games & ROMs](/leaf-docs/guide/games/) and
[BIOS & cores](/leaf-docs/guide/bios-and-cores/).

## Wi-Fi connects but there's no internet

The network can associate without finishing address setup, especially on
mixed-security (WPA2/WPA3) routers. Try:

1. Toggling Wi-Fi off and on (**Settings → Network**), or forgetting and rejoining
   the network.
2. Rebooting the device.

## Updates won't download

- Confirm Wi-Fi is connected and has working internet (**Settings → Network**).
- Make sure you're on a published release channel — a dev/test build may report
  "up to date" when no public release is newer.

See [Updating (OTA)](/leaf-docs/guide/updating/).

## The device booted to stock instead of Leaf

This is Leaf's **crash-safety fallback** — if the launcher fails to start cleanly a
few times in a row, the device drops to the stock interface so you're never stuck.
Your games and settings are untouched.

**Fix:** just **reboot**. Leaf resumes on the next normal boot. See
[Recovery](/leaf-docs/guide/recovery/).

## A game feels slow or laggy

Set **Settings → Behavior → Game Performance** to **Performance** (or leave it on
**Auto**, which boosts heavier systems automatically). Note that the most demanding
systems are at the edge of what this hardware can do — see the note in
[BIOS & cores](/leaf-docs/guide/bios-and-cores/).

## The device sleeps or powers off on its own

Check the auto-sleep setting under **Settings → Behavior**. If it's enabled and set
short, lengthen it or turn it off.

## Bluetooth audio sounds low-quality

Try re-pairing the device, or testing with a different pair of earbuds/headphones to
narrow down whether it's the codec or the specific device.

:::note[Reviewer note]
Confirm exact Settings paths and add any device-specific gotchas surfaced during
release testing.
:::
