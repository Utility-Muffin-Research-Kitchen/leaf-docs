---
title: Built-in apps
description: 'The apps bundled with Leaf: Central Scrutinizer, Fugazi, File Explorer, SSH Server, and Joe''s Calibrage.'
---

Leaf comes with a handful of small apps that share the launcher's look, themes,
and controls. You'll find them on the **Apps** tab.

- **[Central Scrutinizer](/apps/central-scrutinizer/)** - manage your game library
  from a web browser over Wi-Fi: upload ROMs, sort box art, browse logs.
- **[Fugazi](/apps/fugazi/)** - tune a CRT shader against a live preview and apply
  it to every RetroArch game.
- **[File Explorer](#file-explorer)** - browse, copy, move, and delete files on the
  device.
- **[SSH Server](#ssh-server)** - reach the device's shell from a computer.
- **[Joe's Calibrage](#joes-calibrage)** - calibrate the analog stick so games see
  its full range.

These are installed and updated with Leaf itself. For apps you add yourself, see
the [App store](/app-store/introduction/).

## File Explorer

File Explorer lets you work with files on the device. It shows two folders side by
side, so you can copy and move things from one to the other.

![Leaf's two-pane file manager: a folder of files on the left, a folder of NES box-art images with thumbnail previews on the right, and file sizes along the bottom](/file-manager.png)

One pane is active at a time.

| Button | Action |
| --- | --- |
| **Up / Down** | Move the cursor |
| **A** | Open the highlighted folder or file |
| **B** | Go up to the parent folder |
| **L1 / R1** | Page up and down |
| **SELECT** | Mark items, to act on several at once |
| **X** | Copy, move, rename, delete, or show disk usage for the selection |
| **Y** | Select all, make a new folder, show disk space, or quit |

Copy and move use the other pane as the destination. File Explorer can also view
images and edit text files.

There's no recycle bin. A file you delete is gone.

## SSH Server

SSH Server lets you open a terminal to the device from a computer on the same
network.

![The SSH Server app showing the server toggled on, with its IP address and port, username, masked password, and start folder listed](/ssh-server.png)

1. Connect the device to Wi-Fi (**Settings > Wi-Fi**).
2. Open **SSH Server** from the **Apps** tab.
3. Select **Start**. The screen shows the device's **IP address** and **port**.
4. From a terminal on your computer, connect:

   ```sh
   ssh sshadmin@<device-ip> -p 2222
   ```

The default username is `sshadmin` and the default port is 2222. You set the
password in the app the first time, with the on-screen keyboard. You can change the
username, port, and starting folder there too.

The server runs until you stop it, and doesn't start on its own at boot.

The bundled SSH server is Dropbear (MIT / public domain).

## Joe's Calibrage

Joe's Calibrage measures how far your analog stick reaches and saves a profile, so
every game and the launcher see its full range.

Your stick works without calibrating. Calibrate if it won't push all the way -
characters walk when they should run, or aiming feels clipped - or after you
replace the stick.

![Joe's Calibrage on the Calibrate screen: a circular target with a live dot tracking the analog stick, the captured range and sample count below, and cancel, reset, and save hints](/joes-calibrage.png)

- **Test Stick** - move the stick and watch the dot. This is what games see, so use
  it to check whether you need to calibrate, and to confirm the result afterward.
- **Calibrate** - roll the stick around the edge a few times, then press **A** to
  save. There's no centering step: the device re-centers the stick every time it
  starts.
- **Center Stick** - re-centers the stick until the next restart. Use it if the dot
  in **Test Stick** sits off center after you let go.
- **View Values** - shows the saved profile, or the default if you haven't
  calibrated.
- **Restore Backup** - goes back to the factory calibration, which Joe's Calibrage
  backs up the first time you save.

Joe's Calibrage is open source (MIT).
