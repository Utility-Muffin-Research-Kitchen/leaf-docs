---
title: Moving to a new SD card
description: Put a clean Leaf install on a fresh SD card and bring your games, box art, saves, and library across from the old one - including the DS and PSP saves that don't live in Saves/.
---

Sooner or later you'll want a bigger card, or a clean start on a card that has
been through a few beta builds. Leaf keeps everything you own at the card's top
level, separate from the firmware, so moving to a new card is really just two
jobs: put a fresh Leaf on the new card, then copy your folders over.

:::caution[Your DS and PSP saves are not in `Saves/`]
Nintendo DS runs in DraStic and PSP runs in PPSSPP, and both keep their own save
data in their own folders rather than the shared `Saves/` folder. If you copy
only `Roms/`, `Images/`, `Saves/`, and `States/`, **your DS and PSP progress does
not come with you**. The lists below include everything, so follow them as
written and you won't lose anything.
:::

## What's Leaf, and what's yours

Only these come from the install ZIP. You never need to copy them - a fresh
download replaces them all:

```text
.system/        loong_upgrade        LEAF-INSTALL.txt
launcher_probe.bin                   umrk-launcher-install.sh
```

Everything else at the card's top level is yours:

| Folder | What's in it |
|---|---|
| `Roms/` | your games |
| `Images/` | box art |
| `Saves/` | in-game saves for RetroArch cores, N64, and Dreamcast/Naomi |
| `States/` | save states for the same |
| `BIOS/` | BIOS files you supplied |
| `Cheats/` | cheat files |
| `Apps/` | apps you installed from the app store |
| `Music/` `Videos/` | media for Disco Boy and Video From Hell |
| `Screenshots/` `Recordings/` | captures you've taken |
| `.userdata/` | **hidden** - PSP saves and memory stick, PortMaster data, app settings, logs |
| `.umrk/` | **hidden** - your library (favorites, recents, playtime, box-art links, per-game core and performance choices), DraStic's DS saves and save states, RetroArch settings, custom shaders |

The last two are the important ones, and the easy ones to miss.

:::caution[Show hidden files before you copy anything]
`.userdata` and `.umrk` start with a dot, which hides them in **Finder** and, by
default, in Windows **File Explorer**. Drag a card's contents across without
showing them and the copy looks complete while quietly leaving your DS saves,
PSP saves, favorites, and playtime behind.

In Finder press **Command-Shift-Period**. In File Explorer turn on
**View → Show → Hidden items**. This is the same trap as the hidden `.system`
folder in [Install](/guide/install/#steps).
:::

## 1. Back up the old card

Put the old card in a computer and copy *everything* off it first, hidden files
included. Even if the move goes perfectly you'll be glad to have this.

On macOS or Linux:

```sh
rsync -a --progress /Volumes/OLDCARD/ ~/leaf-card-backup/
```

On Windows, show hidden items and copy the whole card into a folder.

## 2. Format the new card

Format it **FAT32**, with a **Master Boot Record** partition scheme. On macOS
open **Disk Utility**, select the card, choose **Erase**, and pick **MS-DOS
(FAT)** - that is FAT32 - with **Master Boot Record** as the scheme. In Terminal:

```sh
diskutil eraseDisk FAT32 LEAF MBRFormat /dev/diskN
```

Do not pick **ExFAT**. The device's stock updater ignores exFAT media, so the
install simply never starts and nothing explains why. Cards larger than 32 GB
usually arrive formatted exFAT, so this step matters even on a brand-new card.

ext4 also works for the card Leaf boots from, but it has to be a *partitioned*
card - a whole-disk ext4 filesystem with no partition table is never mounted.
FAT32 is the safe choice unless you have a specific reason.

## 3. Put a fresh Leaf on it

Download `leaf-mlp1-sd-<release_id>.zip` from the
[latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases/latest),
drag the ZIP **onto the card**, and unzip it there. Don't unzip it on your
desktop and drag the result across - almost all of the installer lives in the
hidden `.system` folder and a drag-and-drop leaves it behind.

Check it landed before moving on:

```sh
ls -a /Volumes/LEAF
```

You should see `.system`, `loong_upgrade`, and `umrk-launcher-install.sh`.

## 4. Copy your data across

Do this now, while both cards' contents are still on the computer, so the device
only has to boot once at the end. Copying your folders in before the install is
safe: the installer only refreshes Leaf itself and never touches your data.

```sh
for d in Roms Images Saves States BIOS Cheats Apps Music Videos \
         Screenshots Recordings .userdata .umrk; do
  [ -e "$HOME/leaf-card-backup/$d" ] && rsync -a --progress \
    "$HOME/leaf-card-backup/$d" /Volumes/LEAF/
done
```

Finder or File Explorer works just as well - select every folder in the table
above, hidden ones included, and drag them to the new card's top level.

On macOS, running `dot_clean /Volumes/LEAF` afterwards clears out the `._`
companion files macOS scatters on FAT32 cards. Leaf ignores them when it scans,
so this is tidiness rather than a fix.

## 5. Boot once

Eject the card properly, put it in the powered-off device's **main** slot, and
turn it on. The stock update screen runs the Leaf installer; let it finish and
reboot on its own, then boot normally.

You land in Leaf with your games, box art, saves, save states, favorites,
recents, playtime, and per-game settings exactly as they were. Leaf identifies a
game by its folder and filename rather than by which physical card it sat on, so
as long as your `Roms/` layout is unchanged, everything reconnects.

## Starting genuinely fresh, but keeping your saves

If the whole point of the new card is to clear out a misbehaving install, leave
`.umrk/` and `.userdata/` behind - but copy these three back, or your DS and PSP
progress goes with them:

```text
.umrk/mlp1/drastic/backup/       DS in-game saves
.umrk/mlp1/drastic/savestates/   DS save states
.userdata/mlp1/ppsspp/           PSP memory stick, saves, and states
```

Starting fresh this way costs you your favorites, recents, playtime, per-game
core and performance choices, and your RetroArch settings and custom shaders.
Box art itself is safe - the image files live in `Images/`, and Leaf pairs them
back up with your games on the first scan.

## Things worth knowing

- **FAT32 caps a single file at 4 GB.** Moving from an ext4 card to FAT32, large
  CHDs and PSP ISOs may refuse to copy. Convert them to CHD, or keep the card
  ext4 (partitioned, as above).
- **A second card is unaffected.** Games on the second card keep their own
  `Roms/`, `Images/`, `Saves/`, and `States/` on that card, so leave it alone
  entirely - only `.umrk/` and `.userdata/` live on the card Leaf boots from.
  See [A second SD card](/guide/games/#a-second-sd-card).
- **Power off before pulling a card.** Leaf keeps your library in a database on
  the card. Shut down properly (or use **Settings → General → Unmount Secondary
  SD** for the second card) so nothing is copied mid-write.
- **Keep the old card until you're happy.** Nothing here modifies it, so it stays
  a working fallback: put it back in and you're exactly where you started.

:::tip[Need help?]
If something doesn't come across, ask in the
**[Leaf Discord](https://discord.gg/q5F7cZ7KRp)** before you reformat the old
card - it's much easier to recover while the original is still intact.
:::
