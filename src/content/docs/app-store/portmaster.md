---
title: PortMaster
description: 'An unofficial PortMaster integration for Leaf that installs and runs compatible native game ports on the Miniloong Pocket 1.'
---

PortMaster is a game-port manager. On Leaf, the optional PortMaster manager
downloads the upstream PortMaster app and the compatibility files it needs, then
lets you browse and install compatible native game ports.

:::caution[Unofficial PortMaster integration]
Leaf's PortMaster integration is unofficial and is not supported by the
PortMaster project. Please do not ask for help with Leaf or the Miniloong Pocket
1 in the official PortMaster Discord. For installation, compatibility, or game
problems on Leaf, [open a Leaf GitHub issue](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/issues)
or ask in the [Leaf Discord](https://discord.gg/q5F7cZ7KRp).
:::

## Install

PortMaster is a standalone app, not bundled with Leaf. Install it on-device with
**Pak Rat**: press the **Menu** button, open **Actions → Pak Rat**, choose
**PortMaster**, and install it over Wi-Fi. It appears in the **Apps** tab when
the install finishes.

## Setting it up

Open **PortMaster** from the **Apps** tab, then choose **Install PortMaster**.
The manager downloads the upstream app and Leaf's compatibility files. When it
finishes, choose **Launch PortMaster** to browse the available ports and follow
the instructions for each one.

Some ports have additional requirements, such as game data you must provide.
PortMaster shows those requirements before you install them.

## Using two SD cards

If you run a [second SD card](/guide/games/#a-second-sd-card), the manager can
work across both.

- **Default Install Card** - choose which card new ports install to. Ports are
  large, so this is the setting to change when the boot card is filling up.
- **Manage Ports** - see what's installed on each card and move a package from
  one to the other. A move is verified with checksums, and if it's interrupted
  the manager picks it back up: the menu shows a pending-recovery count until
  it's finished.

Not every package can move. Ones that share files with another installed port,
or that the manager can't relocate safely, are marked as such and it tells you
why rather than attempting it.

## Adding ports yourself

Some ports aren't in PortMaster's list, such as a test build or a port shared by
its author. You can add those from a ZIP or from a folder.

Ports from outside PortMaster's list are supported by their authors, may need
game data you own, and aren't guaranteed to work on Leaf.

### From a ZIP

1. Open **PortMaster** from the **Apps** tab and choose **Launch PortMaster**.
   The first time, it creates an `autoinstall` folder in `Roms/PORTS/` with a
   short `README.txt`.
2. Copy the port's ZIP into `Roms/PORTS/autoinstall/` as it is, without
   extracting it.
3. Launch PortMaster again. It installs each ZIP in the folder and applies
   Leaf's compatibility changes, the same as for a port from its list.

A ZIP that installs is removed from the folder. One that fails stays there, so
you can try again. With two SD cards, use the folder on the card chosen under
**Default Install Card**.

Don't put `PortMaster.zip` in this folder. PortMaster skips it, because Leaf
handles PortMaster's own updates (see [Updates and repairs](#updates-and-repairs)).

### From a folder

If the port is already extracted, copy its `.sh` launch script and its folder
side by side into `Roms/PORTS/`, then launch it from **Ports** like any other
game. The first launch takes a few seconds longer while Leaf adapts the port to
the Miniloong Pocket 1. Later launches start straight away.

## Updates and repairs

Open the PortMaster manager from the **Apps** tab to check for a compatible
update, or choose **Repair PortMaster** if the app or its compatibility files are
missing or damaged. The repair checks the installed files and restores what Leaf
needs to launch PortMaster.

## Getting help

This integration is maintained by the Leaf project. Report problems in the
[Leaf issue tracker](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/issues)
or in the [Leaf Discord](https://discord.gg/q5F7cZ7KRp), not in the official
PortMaster Discord.
