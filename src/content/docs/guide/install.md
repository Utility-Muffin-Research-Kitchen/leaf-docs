---
title: Install Leaf
description: Install Leaf on a Miniloong Pocket 1 from an SD card, using the device's built-in update mechanism. No PC tools required.
---

Leaf installs from an SD card through the Miniloong Pocket 1's own updater. You
unzip the release onto a card, and the device installs it.

## What you need

- A Miniloong Pocket 1 on stock firmware 1.3.0.32 or newer. A brand-new
  device can ship on an older stock OS that can't start the installer, so boot
  the stock OS and run its **system update** at least once. Let it finish and
  report it's up to date.
- An SD card, FAT32 or ext4. Back up anything already on it before you format
  it.
- The install ZIP, `leaf-mlp1-sd-<release_id>.zip`, from the
  [latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases/latest).
  Read the release notes on that page first.

## Steps

:::caution[Unzip onto the card itself, not onto your computer]
Nearly everything in the release sits in a folder named `.system`, and the
leading dot hides it in **Finder** and, by default, in Windows **File Explorer**.
Unzip somewhere else and drag the contents over, and only the visible files make
the trip. The card looks like it has the release on it, the device finds nothing
to install, and no error explains why.

Drag the ZIP onto the card first, then unzip it there. Before ejecting, show
hidden files (**Command-Shift-Period** in Finder) and check that `.system` is at
the card's top level, or run `ls -a /Volumes/YOURCARD`.
:::

1. Format the card as FAT32 with a **Master Boot Record** partition scheme,
   if it isn't already. On macOS, open **Disk Utility**, select the card, choose
   **Erase**, and pick **MS-DOS (FAT)** - that is FAT32 - with **Master Boot
   Record** as the scheme. In Terminal:

   ```sh
   diskutil eraseDisk FAT32 LEAF MBRFormat /dev/diskN
   ```

   Don't pick **ExFAT**. The device can't read an ExFAT card, so the install
   never starts. Cards larger than 32 GB usually arrive formatted ExFAT, so
   check even a brand-new card. ext4 also works, but only on a partitioned
   card - a whole-disk ext4 filesystem with no partition table is never mounted.
2. Unzip the ZIP onto the card. Put the contents at the card's top level,
   not in a subfolder, following the caution above.
3. Insert and boot. Put the card in the powered-off device and turn it on.
   The Miniloong Pocket 1 has two microSD slots: use the main slot for the
   install card. The second slot is optional extra game storage. If the stock
   update screen never appears, the card may be in the second slot - move it to
   the other one and try again.
4. Let it install. The device's stock update screen detects the installer
   and runs it. Don't power off mid-install.
5. Power off when the installer reports it's done.
6. Boot into Leaf. Turn the device back on normally. The Leaf boot animation
   plays and you land on the Leaf launcher.

## After installing

- Connect to Wi-Fi so you can update and scrape box art: open
  **Settings > Wi-Fi**.
- Add your games - see [Adding games](/guide/games/).
- Add BIOS files for the systems that need them - see
  [BIOS files](/guide/bios-and-cores/).
- Check for updates from the launcher - see [Updating](/guide/updating/).

## What reinstalling keeps

Your games, saves, states, and app data sit at the top level of the card
(`Roms/`, `Saves/`, `States/`, and the `.userdata/` and `.umrk/` folders),
separate from Leaf itself. Installing again or [updating](/guide/updating/)
over an existing card refreshes Leaf and leaves all of that alone. The stock OS
isn't wiped either.

To carry your data to a different card, see
[Moving to a new SD card](/guide/moving-to-a-new-card/). To go back to stock for
good, see [Recovery](/guide/recovery/).

## The install won't start

Check these in order:

- The stock firmware is 1.3.0.32 or newer.
- The card is FAT32 or partitioned ext4, not ExFAT.
- `.system` is at the card's top level.
- The card is in the main slot.

If it still won't start, or the device doesn't boot into Leaf afterwards, ask
in the [Leaf Discord](https://discord.gg/q5F7cZ7KRp).
