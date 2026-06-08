---
title: Updating (OTA)
description: Check for and install Leaf updates over the air, straight from the launcher.
---

Leaf can update itself **over the air (OTA)** — it checks GitHub for new
releases, downloads and verifies them, and hands off to the device's installer,
all from inside the launcher. No SD swapping or PC tools needed for updates.

## Before you start

- **Connect to Wi-Fi.** Open **Settings → Wi-Fi** and join a network. Updates
  download over the internet.
- Make sure the battery is reasonably charged — the device reboots to install.

## Update from the launcher

1. Open **Settings → About → System Update**.
2. Leaf checks the [Leaf releases feed](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases)
   and tells you whether a newer version is available.
3. If there is one, choose to **download** it. Leaf fetches the release over a
   secure (HTTPS) connection and **verifies its SHA-256 checksum** before doing
   anything with it.
4. Choose to **install**. Leaf stages the update and reboots into the device's
   installer to apply it, then reboots back into the new version.
5. After it comes back up, you can confirm the running version under
   **Settings → About**.

No account or credentials are required — updates use the public releases feed.

## How it works (briefly)

- **Discovery:** Leaf reads the public GitHub Releases feed for the Leaf repo and
  parses the release's update manifest.
- **Verified download:** the artifact is downloaded over HTTPS and checked
  against a published SHA-256 sum. Leaf ships its own trusted-certificate bundle,
  so secure downloads work even though it's running on top of stock.
- **Install handoff:** on the MLP1, Leaf stages the update and reuses the stock
  installer to apply it on the next boot — the same safe path used for a fresh
  [SD install](/leaf-docs/guide/install/).

## Troubleshooting

- **"Up to date" but you expected a release?** Make sure you're not on a
  dev/test channel and that the release was actually published.
- **Download fails / network error:** re-check Wi-Fi connectivity
  (**Settings → Wi-Fi**) and try again.
- **A bad release?** You can always reinstall a known-good version from an
  [SD card](/leaf-docs/guide/install/), or restore stock via
  [Recovery](/leaf-docs/guide/recovery/).

:::note[Reviewer note]
Confirm the exact menu path (Settings → About → System Update) and the on-screen
step wording against the shipped build, and whether a release picker / channel
selector is exposed to end users.
:::
