---
title: Updating
description: Check for and install Leaf updates over Wi-Fi from the launcher, or update from an SD card.
---

Leaf updates itself over Wi-Fi. It checks for a new release, downloads it, and
restarts to install it, all from the launcher.

## Before you start

- Connect to Wi-Fi. Open **Settings > Wi-Fi** and join a network.
- Charge the battery. The device reboots to install.

## Update from the launcher

1. Press the **MENU** button to open the System page, switch to the **Actions** tab
   (**L1 / R1**), and choose **System Update**.
2. Leaf checks your [update channel](#update-channel-stable-or-beta) and tells
   you whether a newer version is available.
3. If there is one, choose to download it.
4. Choose to install. The device reboots into its installer to apply the update,
   then reboots into the new version.
5. Confirm the running version on the **Info** tab's **Device** page
   (**Menu > Info > Device**).

## Update channel (Stable or Beta)

At the top of the **System Update** page is an **Update Channel** cycler. Press
**Left / Right** (or **A**) to switch it.

- **Stable** (the default) tracks the normal Leaf releases.
- **Beta** tracks tester preview builds. They arrive earlier, and they may be
  unstable or change quickly. Back up anything you care about before running one.

Switching to **Beta** asks you to confirm, and the channel then shows **Beta** in
an amber tint. Switching back to **Stable** is immediate. Beta builds carry a
`-beta` version number on the **Device** page. Changing the channel checks for
updates on that channel right away.

## Update from an SD card

If you'd rather not update over Wi-Fi, update the same way you
[install](/guide/install/):

1. Download `leaf-mlp1-sd-<release_id>.zip` from the
   [latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases/latest).
2. Unzip it onto the top level of an SD card, not into a subfolder. The update
   sits in a hidden `.system` folder that a drag-and-drop leaves behind, so
   follow the caution in [Install](/guide/install/#steps).
3. Boot the device with that card inserted. The stock update screen applies it
   and reboots into the new version.

This is safe to run over an existing install. It refreshes Leaf and leaves your
games, saves, states, and app data alone - see
[What reinstalling keeps](/guide/install/#what-reinstalling-keeps).

## An update you expected isn't offered

Check the **Update Channel** at the top of the **System Update** page, and make
sure the release was published on that channel.

## The download fails

Check your connection in **Settings > Wi-Fi** and try again.

## A release misbehaves

Reinstall a known-good version from an [SD card](/guide/install/), or restore
stock with [Recovery](/guide/recovery/).
