---
title: Updating (OTA)
description: Check for and install Leaf updates over the air, straight from the launcher.
---

Leaf can update itself over the air (OTA): it checks GitHub for new
releases, downloads and verifies them, and hands off to the device's installer,
all from inside the launcher. You don't need to swap SD cards or touch a PC.

## Before you start

- **Connect to Wi-Fi.** Open **Settings → Network** and join a network. Updates
  download over the internet.
- **Charge up.** Make sure the battery is reasonably charged; the device reboots
  to install.

## Update from the launcher

1. Press the **Menu** button to open the System page, switch to the **Actions** tab
   (**L1 / R1**), and choose **System Update**.
2. Leaf checks the releases feed for your selected [Update channel](#update-channel-stable-or-beta)
   (Stable or Beta) and tells you whether a newer version is available.
3. If there is one, choose to download it. Leaf fetches the release over a
   secure (HTTPS) connection and verifies its SHA-256 checksum before doing
   anything with it.
4. Choose to install. Leaf stages the update and reboots into the device's
   installer to apply it, then reboots back into the new version.
5. After it comes back up, you can confirm the running version on the **Info** tab's
   **Device** page (**Menu → Info → Device**).

No account or credentials are required; updates use the public releases feed.

## Update channel (Stable or Beta)

At the top of the **System Update** page is an **Update Channel** cycler. Press
**Left / Right** (or **A**) to switch it.

- **Stable** (the default) tracks the normal Leaf releases. This is what you want
  unless you are actively helping test.
- **Beta** tracks tester preview builds. They land earlier so you can try new
  features before they are finalized, but they may be unstable or change quickly.
  Back up anything you care about before running one.

Switching **to Beta** asks you to confirm, and the channel then shows **Beta** in
an amber tint so it is clear which track you are on. Switching back to **Stable**
is immediate. Beta builds also carry a `-beta` version number, so you can always
tell what you are running on the **Info -> Device** page. Changing the channel
re-checks for updates against that channel right away.

## Manual update (from an SD card)

If you would rather not update over Wi-Fi, or you are moving between dev builds,
you can update the same way you [install](/guide/install/):

1. Download `leaf-mlp1-sd-<release_id>.zip` from the
   [latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases/latest).
2. Extract it to the **root** of an SD card (not into a subfolder). Unzip onto
   the card itself rather than unzipping on your computer and copying the files
   across: the update lives in a hidden `.system` folder, so a drag-and-drop in
   **Finder** or **File Explorer** silently leaves it behind. There is more on
   this, including how to check the card, in
   [Install](/guide/install/#steps).
3. Boot the device with that card inserted. The stock update screen applies it
   and reboots into the new version.

A manual update is safe to run over an existing install. It refreshes only the
release-managed firmware and **never touches your data**: your games, saves,
states, and app data live at the card's root (`Roms/`, `Saves/`, `States/`, and
the `.userdata/` and `.umrk/` folders) and are left exactly as they were.

## How it works (briefly)

- **Discovery:** Leaf reads the public GitHub Releases feed for your selected
  channel (the Leaf repo for Stable, the Leaf-beta repo for Beta) and parses the
  release's update manifest.
- **Verified download:** the artifact is downloaded over HTTPS and checked
  against a published SHA-256 sum. Leaf ships its own trusted-certificate bundle,
  so secure downloads work even though it's running on top of stock.
- **Install handoff:** on the MLP1, Leaf stages the update and reuses the stock
  installer to apply it on the next boot, the same safe path used for a fresh
  [SD install](/guide/install/).

## Troubleshooting

- **"Up to date" but you expected a release?** Check the **Update Channel** at
  the top of the page (Stable vs Beta) and make sure the release was actually
  published on that channel.
- **Download fails or network error?** Re-check Wi-Fi connectivity
  (**Settings → Network**) and try again.
- **A bad release?** You can always reinstall a known-good version from an
  [SD card](/guide/install/), or restore stock via
  [Recovery](/guide/recovery/).

