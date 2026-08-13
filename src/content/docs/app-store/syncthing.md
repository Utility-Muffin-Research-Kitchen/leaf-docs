---
title: Syncthing
description: 'Keep game saves and optional save states in sync between Leaf, computers, servers, NAS devices, and Android handhelds.'
---

:::caution[Coming soon]
This feature is built but has not shipped in a release yet. This page describes what
is coming.
:::

Syncthing keeps a card's game saves in sync with your other devices. The other
device can be another Leaf handheld, a computer, a NAS, a home server, a VPS, or
an Android handheld running a compatible Syncthing app.

Leaf manages the fiddly parts on the handheld: it binds folders to physical SD
cards, protects the first sync, pauses Syncthing while a game is using its files,
and follows a card if its mount point changes after a reboot.

## What Leaf syncs

- **Saves** are the normal in-game save files. Start here.
- **States** are emulator snapshots. They are optional and less portable.

Syncthing is not used for ROMs or BIOS files. It is also **not a backup**: a
deletion or damaged file can sync to every device. Keep backups or enable file
versioning on an always-on computer, NAS, or server.

:::note[Folder names and folder IDs]
`ra-saves` is only a descriptive label. Syncthing decides whether two folders are
the same share by their **folder ID**. Two folders can have the same label and still
be completely separate. To join an existing share, wait for its folder offer and
choose **Join offered folder**.
:::

## A good multi-device layout

The simplest setup uses one always-on device as a hub:

1. Run Syncthing on a computer, NAS, home server, or VPS.
2. Enable file versioning or backups there.
3. Connect each Leaf or Android handheld to that hub.
4. Explicitly share each Saves or States folder with every device that needs it.

Devices can also sync directly with each other. A hub is easier to reason about,
is more likely to be online when you finish playing, and gives you one place for
version history and backups.

## Install and start Syncthing

When Syncthing ships, install it with **Menu → Actions → Pak Rat**. It will appear
in the **Apps** tab.

Opening the app does not start the service by itself. If the main screen says
**Stopped**, that is a normal state:

1. Choose **Run Syncthing**.
2. Turn on **Start with Leaf** if you want it available after every boot.
3. Open **Guided setup**.

The screen refreshes automatically as the service starts, stops, or discovers new
devices and offers. You do not need to leave and reopen it.

## Guided setup

Guided setup is resumable. It shows the next unfinished action rather than making
you repeat completed steps. Before setup is complete it appears near the top of
the main screen; afterward it moves to the bottom.

### Choose a card

Choose the writable SD card whose Saves folder you want to sync. Leaf gives the
physical card a durable identity. It does not rely on names such as `/mnt/sdcard`,
which can swap between cards after a reboot.

If a card is missing, read-only, or has a duplicate identity, Leaf pauses its
managed folders rather than guessing and writing to the wrong place.

### Connect a device

Open **Devices** and show **My Syncthing Device** to display Leaf's device ID and
QR code. On the other device, add that ID. You can also add the other device's ID
on Leaf and accept the request there.

The Devices screen updates while it is open. When Guided setup sends you there,
it returns automatically after the peer is accepted or added.

:::caution[Adding a device does not share any folders]
This is normal Syncthing behavior. A connected device will not see `ra-saves`,
`ra-states`, or any other existing folder until that folder is explicitly shared
with it.
:::

If the peer is on the same network, leave **Network** set to **LAN-only**. To reach
a VPS or a device away from home, choose **Network**, enable **Sync Anywhere**, and
confirm the warning. Sync Anywhere may use internet discovery, relay services,
router port mappings, more radio time, and more battery.

### Set up Saves

There are two different paths.

#### Join an existing Saves folder

On the computer, server, NAS, Android device, or other Leaf that already has the
folder:

1. Edit that folder in its own Syncthing app.
2. Open **Sharing**.
3. Select this Leaf device and save the change.
4. Return to Guided setup on Leaf.

Leaf will show **Waiting for folder offer** until the remote device shares the
folder. When the offer arrives, choose **Join offered folder**. This keeps the
existing folder ID and is the recommended choice.

#### Create a new Saves folder

Choose **Create new Saves folder instead** only when this is genuinely a new
share. Leaf warns before doing this because the new folder receives a different
folder ID. It cannot join an existing remote folder merely by using the same
`ra-saves` label.

After creating it, use **Folders → Sharing** on Leaf to include the other devices,
then accept the folder on each of them and choose a writable local path there.

When you add a new peer later, Leaf can ask whether to share existing folders.
Every folder defaults to **Exclude** so a new device never receives Saves or States
silently.

### Choose the direction

The direction is described from Leaf's point of view.

| Choice | Use it when |
| --- | --- |
| **Merge both devices (recommended)** | Both sides should send and receive changes. |
| **Only send Leaf's files** | Leaf is the source and the other device should not write back. |
| **Only receive the other device's files** | The other device is authoritative and Leaf should not upload changes. |

A two-way merge can create Syncthing conflict files if both sides already contain
different versions of the same save. Check both devices before the first sync and
keep the version you intend to use.

### Review first-sync safety

Leaf does not immediately let a new receive-capable folder overwrite the card.
It first creates a safety copy on the same physical card, then keeps the folder
paused until you explicitly start the sync.

Before continuing:

- Stop games and do not edit Saves with **File explorer** while the safety copy is
  being made.
- Make sure the card has enough free space for the existing Saves tree.
- Enable versioning or backups on the receiving hub first.
- Read the direction and included-device summary, then confirm **Start**.

If there is not enough room for the safety copy, receiving is blocked. Free some
space or use **Only send Leaf's files** instead.

Setup is complete only after Leaf has no files left to receive and every included
device reports the folder as current. An offline, paused, or not-sharing peer is
shown as an action to resolve, not treated as success.

### Add States, if you want them

After Saves is current, Guided setup offers States as an optional second folder.
If the remote device has already shared `ra-states`, review and join that offer.
You can also deliberately ignore an unwanted offer and restore it later.

:::caution[Save states are not portable saves]
A state depends on the exact ROM, emulator, core, and often the core version that
created it. A state can sync perfectly and still fail to load on another device.
Use normal in-game Saves whenever possible.
:::

## Multiple cards

It is **one Saves folder and one States folder per physical card**, not one folder
total per card.

| Leaf storage | Managed Syncthing folders |
| --- | --- |
| Card 1 | One Saves folder and one optional States folder |
| Card 2 | One Saves folder and one optional States folder |

A two-card Leaf can therefore have four managed folders. Set up each card
separately. Each share has its own folder ID, and a hub should accept them into
different local directories.

:::note[Why the folder path is read-only on Leaf]
Leaf owns the local Saves and States paths so it can keep them bound to the correct
physical card. Do not try to replace them with a mount-point path. If the operating
system swaps card mount points after a reboot, Leaf moves the Syncthing binding to
the correct card automatically.

Paths on a computer, NAS, VPS, or Android device are local to that device and are
chosen there when it accepts the folder.
:::

## Playing while Syncthing is enabled

Launching or resuming a game uses a safe handoff. Leaf shows the current stage at
the bottom of the screen:

- **Checking saves**
- **Syncing N items**
- **Making saves safe**
- **Starting game**

If files are still arriving, wait for them or press **Menu** for **Start now**.
Starting now stops Syncthing before launching; it never lets the emulator and
Syncthing write the same files at once. Canceling leaves Syncthing running so it
can finish.

There can be a short delay while Leaf verifies that Syncthing has fully stopped.
After the game exits, Syncthing starts again and uploads the new save. Launching
from **Recents** uses the same protection.

If Leaf cannot match the game to the card's configured folders, it shows a card
setup warning. **Cancel** lets you inspect **Cards** and **Folders**. **Stop & Play**
is a safe fallback: Leaf skips the unavailable sync check but still verifies that
Syncthing has stopped before starting the game.

## Read-only web view

Leaf includes a browser view for status and diagnostics. It is deliberately not a
second settings interface: make all changes in the handheld app.

1. Open **Read-only web view**.
2. Scan the QR code or open the HTTPS address from a device on the same LAN.
3. The first visit may show a self-signed certificate warning. Compare the
   certificate fingerprint with the one on Leaf before proceeding.
4. The QR link pairs that browser automatically. When entering the address by
   hand, use the four-digit PIN shown on Leaf.

A new pairing code lasts two minutes. Press **A** for **New code** if it expires.
Leaving with **B** closes the view. After pairing at least one browser, press **X**
to keep the status view available for 15 minutes. Press **Y** to revoke every
trusted browser and close it immediately.

The dashboard carries a read-only warning. Some upstream Syncthing controls may
still be visible, but Leaf blocks changes made through this gateway.

## Day-to-day management

- **Status** shows whether folders are current, syncing, paused, offline, or not
  shared by a remote device. Select it to read the suggested next action.
- **Cards** shows the physical cards Leaf recognizes and whether each is safe to
  use.
- **Folders** lets you inspect, pause, resume, rescan, rename, share, review
  conflicts and history, or stop syncing a folder on this Leaf.
- **Devices** adds, accepts, and removes peers. A device must be removed from each
  folder's Sharing list before Leaf will forget it.
- **Issues** appears only when the local controller has a real issue to report.
- **Settings & Recovery** contains diagnostics, retained snapshots and versions,
  and reset tools.

**Stop syncing on Leaf** removes only the local Syncthing folder configuration and
card binding. It does not delete the live Saves or States tree. Retained safety
snapshots and version history are managed separately.

Pause a folder before making manual changes with **File explorer**. Resume and
rescan it afterward. Editing while Syncthing is active can create conflicts.

## Troubleshooting

### The folder offer never appears

Confirm all of the following:

- Both devices have accepted each other's device ID.
- The device holding the existing folder explicitly includes Leaf under that
  folder's **Sharing** tab.
- Both Syncthing services are running and the peer is not paused.
- **Sync Anywhere** is enabled on Leaf when the peer is not on the local network.

Merely adding Leaf as a device on the remote system is not enough. If Guided setup
says **Waiting for folder offer**, it is safe to leave and return later.

### I accidentally created another `ra-saves`

The matching label does not make it the same share. In **Folders**, choose the
mistaken folder and **Stop syncing on Leaf**. The live files remain. Then explicitly
share the original remote folder with Leaf and join the new offer.

Before removing anything on the other device, verify which folder ID contains the
files you want to keep.

### Leaf says the offer uses unsupported encryption

Leaf cannot join Syncthing's **Receive Encrypted** or untrusted-device folder
offers. On the device offering the folder:

1. Edit the Leaf device and make it a normal trusted device, not **Untrusted**.
2. Share the folder with Leaf without a folder encryption password.
3. Remove the old encrypted share or offer, then share it again.

Normal Syncthing connections still encrypt data in transit; this setting controls
whether files remain encrypted on an untrusted receiving device. See Syncthing's
[Untrusted (Encrypted) Devices](https://docs.syncthing.net/users/untrusted.html)
documentation for the distinction.

### A folder is Stopped on the computer or VPS

Open that device's own Syncthing interface and read its notice. An error such as
`failed to create folder root` or `permission denied` means its **local** folder
path is invalid or is not writable by the account running Syncthing.

Choose a real directory intended for Syncthing data and give the Syncthing service
account permission to use it. A username such as `kevin` is not, by itself, a
folder path. If that Syncthing installation will not let you change an accepted
folder's path, remove only the broken folder configuration on that device and
accept the same folder ID again with the correct path. Do not delete the directory
that contains the copy you want to keep.

### Sync appears stuck at 95% or 0 B

Check the notices on **every** device. A remote folder can be stopped by a path,
permission, disk-space, or database error while Leaf has no local issue to display.
Also confirm that the remote folder is still shared with Leaf and that neither the
device nor folder is paused.

### Status says Needs attention

Select **Status** to see the reason and next action. Common causes are an offline
peer, a paused folder, or a remote device that has stopped sharing it. The **Issues**
row is reserved for local controller problems, so it may be absent when the action
must be taken on another device.

### A synced state will not load

Use the same ROM revision, emulator, core, and core version on both devices. If
that is not possible, use the game's normal save instead. Successful file transfer
does not guarantee state compatibility.

### Leaf says the card setup needs attention

Open **Cards** and **Folders**. Reinsert an absent card, clear a read-only condition,
or resolve a duplicate card identity. Leaf normally follows cards across swapped
mount points automatically, so do not edit paths to match the current mount name.

You can choose **Stop & Play** when you need to launch immediately. Leaf first stops
Syncthing and verifies it is gone, but the newest remote save may not have arrived.

### An Android handheld keeps going offline

Syncthing clients vary, but Android may stop background work to save power. Allow
the app to run in the background, keep its persistent notification enabled when
offered, and check its run conditions. Accept each folder on Android and choose a
writable local directory; adding the device alone does not accept its folders.

### Syncthing is stopped

Open the app and choose **Run Syncthing**. Enable **Start with Leaf** if it should
start at boot. A stopped service is not an error, and opening the app never starts
it without your choice.

## Resetting Syncthing

Use **Settings & Recovery → Recovery** only when ordinary folder or device controls
cannot repair the setup. Read the confirmation carefully:

- **Reset index only** rebuilds Syncthing's derived database while keeping the
  configuration, identity, Saves, States, snapshots, and versions.
- **Reset Syncthing** clears the local Syncthing setup and creates a new device
  identity. Every enrolled card must be present.
- **Reset available state only** is the recovery choice when not every enrolled
  card is currently available.

The reset tools do not delete live Saves, States, or ROMs, but a new device identity
must be accepted and shared with again on every peer.
