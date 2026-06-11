---
title: Install Leaf
description: Install Leaf on a Miniloong Pocket 1 from an SD card, using the device's built-in update mechanism. No PC tools required.
---

Leaf installs from an **SD card** using the Miniloong Pocket 1's own built-in
update mechanism. You don't need ADB, a custom flasher, or any PC-side tooling:
just extract the release to a card and let the device install it.

:::caution[Read the release notes first]
Leaf is pre-1.0. Open the [latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases)
and read its notes before installing; some dev releases are explicitly marked
not for general use.
:::

## What you need

- A Miniloong Pocket 1.
- An SD card (FAT32 or ext4). A backup of anything already on it; installing
  works on the card you boot from.
- The Leaf install ZIP from the
  [Leaf releases page](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases):
  `leaf-mlp1-sd-<release_id>.zip`.

## Steps

1. **Prepare the card.** Format the SD card as **FAT32** (or ext4) if it isn't
   already.
2. **Extract the ZIP to the card root.** Unzip `leaf-mlp1-sd-<release_id>.zip`
   directly to the **top level** of the SD card, not into a subfolder. You
   should see the install files and folders sitting at the card's root.
3. **Insert and boot.** Put the card in the powered-off device and turn it on.
4. **Let it install.** The device's **stock update screen** detects the
   installer and runs it. Wait for it to finish; don't power off mid-install.
5. **Power off** when the installer reports it's done.
6. **Boot into Leaf.** Turn the device back on normally. The Leaf boot animation
   plays and you land on the Leaf launcher.

That's it: the device is now running Leaf, with stock still intact underneath
for [recovery](/leaf-docs/guide/recovery/).

## After installing

- **Connect to Wi-Fi** so you can update and (later) scrape art: open
  **Settings → Network**.
- **Add your games** — see [Adding games & ROMs](/leaf-docs/guide/games/).
- **Add BIOS files** for the systems that need them — see
  [BIOS & cores](/leaf-docs/guide/bios-and-cores/).
- **Check for updates** from the launcher — see [Updating](/leaf-docs/guide/updating/).

## Notes

- **Your stock data is preserved.** Leaf runs on top of stock and doesn't wipe
  the original OS. It only takes over the boot once installed.
- **Crash safety.** If Leaf ever fails to start cleanly several times in a row,
  the device falls back to the stock interface automatically so you're never
  stuck.
- **Removing Leaf / going back to stock** is covered in
  [Recovery](/leaf-docs/guide/recovery/).

:::note[Reviewer note]
Confirm the exact stock update-screen wording/behavior and any on-device button
prompts during install, and whether the user must trigger the update screen or
it appears automatically on boot with the card present.
:::
