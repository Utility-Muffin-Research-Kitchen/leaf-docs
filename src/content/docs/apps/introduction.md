---
title: Built-in apps
description: 'The apps bundled with Leaf: Central Scrutinizer, Fugazi, Joe''s Calibrage, SSH Server, and the file manager.'
---

Leaf ships with a handful of small native apps, all sharing the launcher's look,
themes, and controls. You will find them on the **Apps** tab.

- **[Central Scrutinizer](/apps/central-scrutinizer/)** - manage your game library
  from a web browser over Wi-Fi: upload ROMs, sort box art, browse logs.
- **[Fugazi](/apps/fugazi/)** - a live CRT-shader tuner. Dial in scanlines,
  curvature, and glow, then deliberately install the look globally. Fugazi asks
  before replacing another global preset and can preserve it for restoration.
- **[Joe's Calibrage](/apps/introduction/#joes-calibrage)** - calibrate the analog stick so games
  see its full range.
- **[SSH Server](/apps/introduction/#ssh-server)** - start an SSH server to reach the device's
  shell from a computer.
- **[File manager](/apps/introduction/#file-explorer)** - browse, copy, move, and delete files on
  the device.

These are installed and updated with Leaf itself. For apps you download and add
yourself, see the [App store](/app-store/introduction/).

The optional [PICO-8 integration](/guide/pico-8/) adds Splore to **Apps** and
native playback to the PICO-8 **Core** picker. You supply its paid runtime.

## File Explorer

Leaf includes a file manager for working with files directly on the device. It uses
a classic two-pane layout: two folders side by side, so you can copy and move things
from one to the other.

![Leaf's two-pane file manager: a folder of files on the left, a folder of NES box-art images with thumbnail previews on the right, and file sizes along the bottom](/file-manager.png)

### Getting around

Open the file manager from the **Apps** tab. One pane is active at a time.

- **Up / Down** - move the cursor.
- **A** - open the highlighted folder or file.
- **B** - go up to the parent folder.
- **L1 / R1** - page up and down through long lists.
- **Select** - mark items (for acting on several at once).

### Doing things with files

- **X** opens actions on the selected item or items: **copy**, **move**, **rename**,
  **delete**, and disk-usage info. Copy and move use the other pane as the
  destination.
- **Y** opens a menu for things like **select all**, **make a new folder**, disk
  space, and quitting.

It can also view images and edit text files. Take care with **delete**: there is no
recycle bin, so removed files are gone.

## SSH Server

The SSH Server app starts a small SSH server (Dropbear) on the device so you can open
a terminal to it from a computer on the same network. It is aimed at tinkerers who
want shell access; most people will never need it.

![The SSH Server app showing the server toggled on, with its IP address and port, username, masked password, and start folder listed](/ssh-server.png)

### Starting it

1. Connect the device to Wi-Fi (**Settings → Network**).
2. Open **SSH Server** from the **Apps** tab.
3. Select **Start**. The screen shows the device's **IP address** and **port**.

The server runs until you stop it; it does not start on its own at boot.

### Connecting

From a terminal on your computer:

```sh
ssh sshadmin@<device-ip> -p 2222
```

- The default username is **`sshadmin`** and the default port is **2222**.
- You set the password from the app the first time, using the on-screen keyboard.
- The username, port, and starting folder can all be changed in the app.
- A host key is generated automatically the first time you start the server.

The bundled SSH server is Dropbear (MIT / public domain).

## Joe's Calibrage

Joe's Calibrage measures how far your analog stick actually reaches and saves a profile
so Leaf can remap it to the full range games expect.

Leaf already starts from a default range that every Miniloong Pocket 1 measured so far
reaches, so your stick works without calibrating. Calibrate if it still feels like it
will not push all the way (characters walk when they should run, or aiming feels
clipped), or to tune the full throw to your own stick.

![Joe's Calibrage on the Calibrate screen: a circular target with a live dot tracking the analog stick, the captured range and sample count below, and cancel, reset, and save hints](/joes-calibrage.png)

### Using it

Open Joe's Calibrage from the **Apps** tab. It has a few screens:

- **Test Stick** - move the stick and watch the dot. This shows what games see, so
  you can check whether calibration is needed and confirm it afterward.
- **Calibrate** - roll the stick all the way around the edge a few times so it can
  learn the real maximum reach on both axes, then press **A** to save. There is no
  centering step: your device re-centers the stick every time it starts.
- **Center Stick** - re-centers the stick at the driver level until the next restart.
  You rarely need it, because the stick is re-centered at every startup and Leaf
  ignores the small offset a released stick can report. Use it if the dot in
  **Test Stick** still sits off center after you let go.
- **View Values** - shows the saved profile, or the default if you have not
  calibrated, for reference.
- **Restore Backup** - reverts to the original factory calibration. Joe's Calibrage
  backs that up the first time you save, so you can always go back.

### How it is applied

Your profile is saved to your user data on the SD card and read by Leaf at startup,
so once you calibrate, every game and the launcher itself see the corrected stick.
Without a profile, Leaf uses its default range. There is nothing to turn on per game.

### Notes

- Built for the **Miniloong Pocket 1** and its single stick.
- Recalibrate if you ever replace the stick, or if its reach shrinks over time.

Joe's Calibrage is open source (MIT).
