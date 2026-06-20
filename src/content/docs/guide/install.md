---
title: Install Leaf
description: Install Leaf on a Miniloong Pocket 1 from an SD card, using the device's built-in update mechanism. No PC tools required.
---

Leaf installs from an SD card using the Miniloong Pocket 1's own built-in
update mechanism. You don't need ADB, a custom flasher, or any PC-side tooling:
just extract the release to a card and let the device install it.

:::tip[Download Leaf]
**[Get the latest release →](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases/latest)** and grab `leaf-mlp1-sd-<release_id>.zip`. Leaf is pre-1.0, so skim the release notes on that page first, then follow the steps below.
:::

## What you need

- A Miniloong Pocket 1.
- An SD card, FAT32 (or ext4). A backup of anything already on it; installing
  works on the card you boot from.
- The Leaf install ZIP from the
  [latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases/latest):
  `leaf-mlp1-sd-<release_id>.zip`.

## Steps

1. **Prepare the card.** Format the SD card as FAT32 (or ext4) if it isn't
   already.
2. **Extract the ZIP to the card root.** Unzip `leaf-mlp1-sd-<release_id>.zip`
   directly to the top level of the SD card, not into a subfolder. You
   should see the install files and folders sitting at the card's root.
3. **Insert and boot.** Put the card in the powered-off device and turn it on.
4. **Let it install.** The device's stock update screen detects the
   installer and runs it. Wait for it to finish; don't power off mid-install.
5. **Power off** when the installer reports it's done.
6. **Boot into Leaf.** Turn the device back on normally. The Leaf boot animation
   plays and you land on the Leaf launcher.

That's it: the device is now running Leaf, with stock still intact underneath
for [recovery](/leaf-docs/guide/recovery/).

## After installing

- **Connect to Wi-Fi** so you can update and (later) scrape art: open
  **Settings → Network**.
- **Add your games** - see [Adding games & ROMs](/leaf-docs/guide/games/).
- **Add BIOS files** for the systems that need them - see
  [BIOS & cores](/leaf-docs/guide/bios-and-cores/).
- **Check for updates** from the launcher - see [Updating](/leaf-docs/guide/updating/).

## Notes

- **Your stock data is preserved.** Leaf runs on top of stock and doesn't wipe
  the original OS. It only takes over the boot once installed.
- **Your data lives at the card root.** Games, saves, states, and app data sit at
  the top level of the card (`Roms/`, `Saves/`, `States/`, and the `.userdata/` and
  `.umrk/` folders), separate from the firmware. Re-installing or
  [updating](/leaf-docs/guide/updating/) over an existing card refreshes Leaf
  itself but leaves all of that untouched.
- **Crash safety.** If Leaf ever fails to start cleanly several times in a row,
  the device falls back to the stock interface automatically so you're never
  stuck.
- **Removing Leaf.** Going back to stock for good is covered in
  [Recovery](/leaf-docs/guide/recovery/).

