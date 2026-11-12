---
title: Moving to a new SD card
description: Put a clean Leaf install on a fresh SD card and bring your games, box art, saves, and library across from the old one - including the DS and PSP saves that don't live in Saves/.
---

Leaf keeps everything you own at the card's top level, separate from Leaf
itself. To move to a new card, put a fresh Leaf on it, then copy your folders
over.

:::caution[Your DS and PSP saves are in hidden folders]
Nintendo DS runs in DraStic and PSP runs in PPSSPP, and both keep their saves in
their own folders inside `.umrk/` and `.userdata/`, not in the shared `Saves/`
folder. Those two start with a dot, which hides them in **Finder** and, by
default, in Windows **File Explorer**. Copy only the folders you can see and
your DS saves, PSP saves, favorites, and playtime stay behind.

Show hidden files before you copy anything. In Finder press
**Command-Shift-Period**. In File Explorer turn on
**View → Show → Hidden items**.
:::

## What to copy

These come from the install ZIP. You never need to copy them - a fresh download
replaces them all:

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
| `.userdata/` | hidden - PSP saves and memory stick, PortMaster data, app settings, logs |
| `.umrk/` | hidden - your library (favorites, recents, playtime, box-art links, per-game core and performance choices), DraStic's DS saves and save states, RetroArch settings, custom shaders |

A second card needs nothing. Games on it keep their own `Roms/`, `Images/`,
`Saves/`, and `States/` on that card, and only the card Leaf boots from holds
`.umrk/` and `.userdata/`. See
[A second SD card](/guide/games/#a-second-sd-card).

## 1. Back up the old card

Shut the device down properly before you take the card out, so nothing is
copied mid-write. Then put the old card in a computer and copy everything off
it, hidden files included.

On macOS or Linux:

```sh
rsync -a --progress /Volumes/OLDCARD/ ~/leaf-card-backup/
```

On Windows, show hidden items and copy the whole card into a folder.

## 2. Format the new card

Format it FAT32 with a Master Boot Record partition scheme, as in step 1 of
[Install](/guide/install/#steps). Do this even on a brand-new card: cards
larger than 32 GB usually arrive formatted ExFAT, which the device can't read.

## 3. Put a fresh Leaf on it

Download `leaf-mlp1-sd-<release_id>.zip` from the
[latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases/latest),
drag the ZIP onto the card, and unzip it there, following the caution in
[Install](/guide/install/#steps).

Check it landed before moving on:

```sh
ls -a /Volumes/LEAF
```

You should see `.system`, `loong_upgrade`, and `umrk-launcher-install.sh`.

## 4. Copy your data across

Do this now, before the device boots the new card. The installer only refreshes
Leaf itself and doesn't touch your data.

```sh
for d in Roms Images Saves States BIOS Cheats Apps Music Videos \
         Screenshots Recordings .userdata .umrk; do
  [ -e "$HOME/leaf-card-backup/$d" ] && rsync -a --progress \
    "$HOME/leaf-card-backup/$d" /Volumes/LEAF/
done
```

Finder or File Explorer works too - select every folder in the table above,
hidden ones included, and drag them to the new card's top level.

## 5. Boot once

Eject the card properly, put it in the powered-off device's **main** slot, and
turn it on. The stock update screen runs the Leaf installer. Let it finish and
reboot on its own, then boot normally.

You land in Leaf with your games, box art, saves, save states, favorites,
recents, playtime, and per-game settings as they were. Everything reconnects as
long as your `Roms/` folders and filenames are unchanged.

Keep the old card until you're happy. Nothing here modifies it, so you can put
it back in at any time. If something doesn't come across, ask in the
[Leaf Discord](https://discord.gg/q5F7cZ7KRp) before you reformat it.

## Starting fresh, but keeping your saves

If you're moving to clear out a misbehaving install, leave `.umrk/` and
`.userdata/` behind - but copy these three back, or your DS and PSP progress
goes with them:

```text
.umrk/mlp1/drastic/backup/       DS in-game saves
.umrk/mlp1/drastic/savestates/   DS save states
.userdata/mlp1/ppsspp/           PSP memory stick, saves, and states
```

Starting fresh this way costs you your favorites, recents, playtime, per-game
core and performance choices, and your RetroArch settings and custom shaders.
Box art is safe - the image files live in `Images/`, and Leaf pairs them back up
with your games on the first scan.

## A large file won't copy to the new card

FAT32 can't hold a single file larger than 4 GB. If the old card was ext4, a
large CHD or PSP ISO may refuse to copy. Convert it to CHD, or format the new
card as partitioned ext4 instead.
