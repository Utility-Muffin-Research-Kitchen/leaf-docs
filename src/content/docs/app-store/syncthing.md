---
title: Syncthing
description: 'Keep game saves and optional save states in sync between Leaf, computers, servers, NAS devices, and Android handhelds.'
---

Syncthing keeps a card's game saves in sync with your other devices. The other
device can be another Leaf handheld, a computer, a NAS, a home server, a VPS, or
an Android handheld running a compatible Syncthing app. Leaf pauses Syncthing
while a game is using its files and starts it again when you quit.

## What Leaf syncs

- **Saves** are the normal in-game save files. Start here.
- **States** are emulator snapshots. They are optional and less portable.

Syncthing is not used for ROMs or BIOS files.

:::caution[Syncthing is not a backup]
A deletion or a damaged file can sync to every device. Keep backups or enable
file versioning on an always-on computer, NAS, or server.
:::

Syncthing decides whether two folders are the same share by their **folder ID**.
The label, such as `ra-saves`, is only a name, so two folders with the same
label can be completely separate. To join an existing share, wait for its folder
offer and choose **Join offered folder**.

## A good multi-device layout

The simplest setup uses one always-on device as a hub:

1. Run Syncthing on a computer, NAS, home server, or VPS.
2. Enable file versioning or backups there.
3. Connect each Leaf or Android handheld to that hub.
4. Explicitly share each Saves or States folder with every device that needs it.

Devices can also sync directly with each other, but a hub is more likely to be
online when you finish playing.

Folder paths are local to each device and don't need to match. On a computer,
NAS, VPS, or Android device, choose any writable folder when you accept a Leaf
folder. On another retro handheld, choose the save directory its emulator
actually uses. On Leaf, the path is always the selected card's `Saves` or
`States` directory and can't be changed.

Use a different hub directory for every physical card's Saves folder and every
optional States folder.

## Install and start Syncthing

Install **Syncthing** from Pak Rat; see
[installing an app](/app-store/introduction/#installing-an-app). It appears in
the **Apps** tab.

Opening the app doesn't start the service. If the main screen says **Stopped**:

1. Choose **Run Syncthing**.
2. Turn on **Start with Leaf** if you want it available after every boot.
3. Open **Guided setup**.

## Guided setup

Guided setup shows the next unfinished step, so you can leave and come back.

### Choose a card

Choose the writable SD card whose Saves folder you want to sync. If a card is
missing, read-only, or has a duplicate identity, Leaf pauses its folders.

### Connect to a hub and join its Saves folder (recommended)

Start the connection from the computer, server, NAS, VPS, or Android device
holding the existing Saves folder. You only show Leaf's QR or device ID and do
the typing on the other device. **Add peer by ID** on Leaf is the manual
fallback.

1. If the other device is a VPS or is outside the current network, open
   **Network** on Leaf, enable **Sync Anywhere**, and confirm the warning. Leave
   **LAN-only** enabled when both devices are on the same local network.
2. On Leaf, open **Devices > My device ID + QR**.
3. On the other device, choose **Add Remote Device** and scan the QR when its
   Syncthing app supports that, or enter Leaf's displayed device ID there.
4. Still on the other device, edit the existing Saves folder, open **Sharing**,
   select Leaf, and save. Adding Leaf as a device without sharing the folder is
   not enough.
5. Press **B** on Leaf to return to **Devices**. Select the device marked
   **Pending**, choose **Accept**, and give it a recognizable name.
6. Guided setup returns to Saves setup. Choose **Join offered folder**.

Leaf shows **Waiting for folder offer** until the other device completes its
Sharing change. Accepting a device never accepts a folder automatically.

### Create a new Saves folder

Choose **Create new Saves folder instead** only when this is a new share. The
new folder gets its own folder ID, so it can't join an existing remote folder.

After creating it, use **Folders > Sharing** on Leaf to include the other devices,
then accept the folder on each of them and choose a writable local path there.

When you add a new peer later, Leaf can ask whether to share existing folders.
Every folder defaults to **Exclude**.

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

### Match the other emulator

Leaf already points RetroArch at the managed `Saves` and `States` directories.
On another RetroArch device, check **Settings > Directory > Save Files** and
**Save States**, or its per-core directory override, before accepting a folder.
Point Saves at the normal save directory used by the matching core. Menu names
vary between RetroArch builds, so confirm by creating one test save and checking
where it appears.

### Review first-sync safety

Before a new folder can receive files, Leaf makes a safety copy on the same
card, then keeps the folder paused until you start the sync.

Before continuing:

- Stop games and don't edit Saves with
  [**File Explorer**](/apps/introduction/#file-explorer) while the safety copy
  is being made.
- Make sure the card has enough free space for the existing Saves tree.
- Enable versioning or backups on the receiving hub first.
- Read the direction and included-device summary, then confirm **Start**.

If there is not enough room for the safety copy, receiving is blocked. Free some
space or use **Only send Leaf's files** instead.

Setup is complete only after Leaf has no files left to receive and every included
device reports the folder as current. An offline, paused, or not-sharing peer is
shown as an action to resolve.

### Add States, if you want them

After Saves is current, Guided setup offers States as an optional second folder.
If the remote device has already shared `ra-states`, review and join that offer.
You can also ignore an unwanted offer and restore it later.

A state depends on the exact ROM revision, emulator, core, and often the core
version that created it, so a state can sync perfectly and still fail to load on
another device. Only share States between devices that match on all four, and
use normal in-game Saves whenever possible.

## Multiple cards

Each physical card has its own Saves folder and its own optional States folder,
so a two-card Leaf can have four. Set up each card separately. Each share has
its own folder ID, and a hub should accept them into different local
directories.

## Playing while Syncthing is enabled

When you launch or resume a game, Leaf shows the current stage at the bottom of
the screen:

- **Checking saves**
- **Syncing N items**
- **Making saves safe**
- **Starting game**

If files are still arriving, wait for them or press **MENU** for **Start now**.
Starting now stops Syncthing before launching. Canceling leaves Syncthing
running so it can finish.

There can be a short delay while Leaf checks that Syncthing has stopped. After
the game exits, Syncthing starts again and uploads the new save. Launching from
**Recents** works the same way.

If Leaf can't match the game to the card's configured folders, it shows a card
setup warning. See
[Leaf says the card setup needs attention](#leaf-says-the-card-setup-needs-attention).

## Read-only web view

Leaf includes a browser view for status and diagnostics. You can't change
anything from it; make all changes in the handheld app.

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

Some of Syncthing's own controls may still be visible in the dashboard, but
changes made there are blocked.

Revoke trusted browsers if a paired computer or phone is lost.

## Privacy and network modes

Syncthing encrypts device-to-device traffic. **LAN-only** keeps Leaf to local
discovery and direct connections on the current network. **Sync Anywhere**
additionally enables internet discovery, relays, and router traversal. That can
expose device IDs and connection metadata to discovery or relay infrastructure,
and encrypted file traffic may pass through a relay. Usage reporting is off in
both modes.

Someone with physical access to a card can copy your Syncthing identity from it.
If a card is lost or copied, reset Syncthing to create a new identity, revoke
trusted browsers, and remove the old device from every peer.

## Coming from an existing Syncthing setup

Keep the existing folder and its folder ID, but give Leaf a fresh device identity:

1. Stop and remove any community Syncthing Pak or manually started Syncthing on
   the Leaf handheld. Leaf refuses to run beside another local instance or a
   folder already managed by one.
2. Start the Leaf Syncthing Pak and open **Devices > My device ID + QR**.
3. On the existing peer, add Leaf's displayed ID and share the existing folder
   with that new Leaf device.
4. Back on Leaf, accept the **Pending** device, then choose **Join offered
   folder**.

Never copy another device's `cert.pem`, `key.pem`, `config.xml`, database, local
folder path, folder type, or marker settings onto Leaf. Cloned certificates make
two devices claim one identity, and copied local settings can bind Syncthing to
the wrong card or skip the first-sync safety copy.

## Day-to-day management

- **Status** shows whether folders are current, syncing, paused, offline, or not
  shared by a remote device. Select it to read the suggested next action.
- **Cards** shows the physical cards Leaf recognizes and whether each is safe to
  use.
- **Folders** lets you inspect, pause, resume, rescan, rename, share, review
  conflicts and history, or stop syncing a folder on this Leaf.
- **Devices** adds, accepts, and removes peers. A device must be removed from each
  folder's Sharing list before Leaf will forget it.
- **Settings & Recovery** contains diagnostics, retained snapshots and versions,
  and reset tools.

**Stop syncing on Leaf** removes only the local Syncthing folder configuration and
card binding. It does not delete the live Saves or States tree. Retained safety
snapshots and version history are managed separately.

Pause a folder before making manual changes with **File Explorer**. Resume and
rescan it afterward. Editing while Syncthing is active can create conflicts.

## Uninstalling

Removing Syncthing in Pak Rat revokes trusted web-view browsers but keeps the
Syncthing identity, configuration, index, safety snapshots, version history, and
your live Saves and States. A reinstall reconnects as the same device, with the
service turned off.

The retained Syncthing data lives under `.userdata/mlp1/Syncthing` on the
relevant card or cards. Use **Settings & Recovery** to see exact locations and
sizes and to remove retained history or reset. Don't delete a whole `.userdata`
directory: other Leaf features and apps use it.

## Troubleshooting

### The computer or VPS says Disconnected (Unused)

The other device knows Leaf's ID but does not share a folder with it yet. Edit the
intended Saves folder on that device, open **Sharing**, select Leaf, and save.
Then return to **Devices** on Leaf, select the **Pending** request, and choose
**Accept**. You don't need to enter the computer or VPS device ID on Leaf.

### The folder offer never appears

Confirm all of the following:

- Leaf accepted the device's **Pending** request, or the device was added manually
  with **Add peer by ID**.
- The device holding the existing folder explicitly includes Leaf under that
  folder's **Sharing** tab.
- Both Syncthing services are running and the peer is not paused.
- **Sync Anywhere** is enabled on Leaf when the peer is not on the local network.

If Guided setup says **Waiting for folder offer**, it is safe to leave and return
later.

### I accidentally created another `ra-saves`

In **Folders**, choose the mistaken folder and **Stop syncing on Leaf**. The live
files remain. Then share the original remote folder with Leaf and join the new
offer.

Before removing anything on the other device, verify which folder ID contains the
files you want to keep.

### Leaf says the offer uses unsupported encryption

Leaf cannot join Syncthing's **Receive Encrypted** or untrusted-device folder
offers. On the device offering the folder:

1. Edit the Leaf device and make it a normal trusted device, not **Untrusted**.
2. Share the folder with Leaf without a folder encryption password.
3. Remove the old encrypted share or offer, then share it again.

Syncthing connections still encrypt data in transit. See Syncthing's
[Untrusted (Encrypted) Devices](https://docs.syncthing.net/users/untrusted.html)
documentation for what the setting changes.

### A folder is Stopped on the computer or VPS

Open that device's own Syncthing interface and read its notice. An error such as
`failed to create folder root` or `permission denied` means its **local** folder
path is invalid or is not writable by the account running Syncthing.

Choose a real directory intended for Syncthing data and give the Syncthing service
account permission to use it. If that Syncthing installation will not let you
change an accepted folder's path, remove only the broken folder configuration on
that device and accept the same folder ID again with the correct path. Do not
delete the directory that contains the copy you want to keep.

### Sync appears stuck at 95% or 0 B

Check the notices on **every** device. A remote folder can be stopped by a path,
permission, disk-space, or database error while Leaf has no local issue to display.
Also confirm that the remote folder is still shared with Leaf and that neither the
device nor folder is paused.

### Status says Needs attention

Select **Status** to see the reason and next action. Common causes are an offline
peer, a paused folder, or a remote device that has stopped sharing it. The
**Issues** row only covers problems on this Leaf, so it may be absent when the
action must be taken on another device.

### A synced state will not load

The two devices don't match closely enough; see
[Add States, if you want them](#add-states-if-you-want-them). If you can't match
them, use the game's normal save instead.

### Leaf says the card setup needs attention

Open **Cards** and **Folders**. Reinsert an absent card, clear a read-only
condition, or resolve a duplicate card identity.

When the warning appears as you launch a game, **Cancel** lets you inspect
**Cards** and **Folders**. Choose **Stop & Play** when you need to launch
immediately. Leaf stops Syncthing before starting the game, but the newest remote
save may not have arrived.

### Leaf reports a database problem

This can happen after an unsafe power loss. Check **Status**, then use
**Reset index only**, which keeps your identity and configuration.

### An Android handheld keeps going offline

Syncthing clients vary, but Android may stop background work to save power. Allow
the app to run in the background, keep its persistent notification enabled when
offered, and check its run conditions. Accept each folder on Android and choose a
writable local directory; adding the device alone does not accept its folders.

## Resetting Syncthing

Use **Settings & Recovery > Recovery** only when ordinary folder or device controls
cannot repair the setup. Each reset asks you to confirm twice. Read both screens
carefully:

- **Reset index only** rebuilds Syncthing's database while keeping the
  configuration, identity, Saves, States, snapshots, and versions.
- **Restore fresh setup** returns Syncthing to the same local state as a fresh Pak
  setup. It clears the identity, devices, folders, index, browser trust, snapshots,
  and version history, then creates a new device identity. Every enrolled card
  must be present.
- **Reset available state only** is the recovery choice when not every enrolled
  card is currently available.

The reset tools do not delete live Saves, States, ROMs, or card enrollment, but a
new device identity must be accepted and shared with again on every peer.
