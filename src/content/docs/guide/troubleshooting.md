---
title: Troubleshooting
description: Fixes for common issues with Leaf on the Miniloong Pocket 1.
---

If nothing here helps, ask in the [Leaf Discord](https://discord.gg/q5F7cZ7KRp)
or [open an issue](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/issues).

## A system folder isn't showing up

A system only appears in the launcher once its core is present. If you added
games to, say, `Roms/PSX/` but PlayStation isn't listed, the core for that system
likely isn't installed. See [Systems and emulators](/guide/systems/).

## I have the same console in two folders

Some consoles have older alias folder names (for example `Roms/FC` for NES,
`Roms/MD` for Genesis, `Roms/PS` for PlayStation, `Roms/TG16` for PC Engine).
Leaf still reads those and combines them with the recommended folder into one
console, in the launcher and in Central Scrutinizer. Add new games and box art
to the recommended folder listed in
[Adding games](/guide/games/#system-folders). You can move the older folder's
files there, or leave them.

## A game won't launch

- A BIOS file is missing. Some systems need a BIOS file you supply (Neo Geo
  needs `neogeo.zip` in `BIOS/`). The game appears but won't start without it.
  See [BIOS files](/guide/bios-and-cores/).
- An arcade set doesn't match. Arcade games must match the core's expected
  ROM-set version and stay zipped, so don't unzip or rename them. For Atomiswave
  and Naomi, keep the required shortname and any CHD subfolder. See
  [Naomi and Atomiswave arcade sets](/guide/systems/#naomi-and-atomiswave-arcade-sets).
- The game is in the wrong `Roms/<SYSTEM>/` folder. See
  [Adding games](/guide/games/).

## A game is missing from its list

- You hid it. Hidden games are listed in **Settings > Games > Hidden Games**.
  Pick the game and press **A** to bring it back. See
  [Hiding a game](/guide/games/#hiding-a-game).
- It's in the wrong folder or format. Check that the game is in the right
  `Roms/<SYSTEM>/` folder and uses one of the
  [supported formats](/guide/games/#supported-game-formats).
- Its card is out. Games on the second SD card leave your lists while that
  card is out, and come back when you put it back. See
  [A second SD card](/guide/games/#a-second-sd-card).
- It's in a folder. With **Settings > Games > Show Folders** on, a game in a
  subfolder is inside that folder's row. See
  [Folders in your lists](/guide/games/#folders-in-your-lists).

## My games show up twice after moving them off the second card

The second card is in the device with the old copies still on it, so Leaf lists
both. Delete the games from the second card, or take it out. See
[Moving games off the second card](/guide/games/#moving-games-off-the-second-card).

## Wi-Fi connects but there's no internet

This happens most on routers set to mixed WPA2/WPA3 security. Try:

1. Toggling Wi-Fi off and on (**Settings > Wi-Fi**), or forgetting and rejoining
   the network.
2. Rebooting the device.

## Updates won't download

- Confirm Wi-Fi is connected and has working internet (**Settings > Wi-Fi**).
- Make sure you're on a published release channel. A dev or test build may
  report "up to date" when no public release is newer.

See [Updating](/guide/updating/).

## The device booted to stock instead of Leaf

If the launcher fails to start cleanly a few times in a row, the device drops to
the stock interface. Your games and settings are untouched. Reboot, and Leaf
resumes on the next normal boot. See [Recovery](/guide/recovery/).

## A game feels slow or laggy

Set **Settings > Games > Game Performance** to **Performance**, or leave it on
**Auto**, which boosts heavier systems for you. You can also change it for one
game from the in-game menu - see [Playing games](/guide/playing/). The most
demanding systems are at the edge of what this hardware can do.

## The device sleeps or powers off on its own

Check the auto-sleep setting under **Settings > System**. If it's enabled and set
short, lengthen it or turn it off.

## Bluetooth audio stutters or cuts out

Wi-Fi and Bluetooth share one radio on this device, so heavy Wi-Fi use can interrupt
Bluetooth audio. Turn Wi-Fi off (**Settings > Wi-Fi**) while using Bluetooth
headphones. If it still sounds rough, try re-pairing, or test a different pair of
earbuds.

## A Bluetooth device won't reconnect

Open **Settings > Bluetooth** and connect it again. If it still won't, unpair it
(**Y**) and pair fresh. Some earbuds (Apple AirPods in particular) don't reconnect
to non-Apple hardware automatically and may need a manual reconnect each time.

## The stick doesn't reach full tilt

If characters walk when you push the stick all the way (or aiming feels clipped), the
stick's range needs calibrating. Open **Joe's Calibrage** from the **Apps** tab and run
**Calibrate**. See [Joe's Calibrage](/apps/introduction/#joes-calibrage).

## Black Frame Insertion is grayed out

At 60 Hz the row shows "100/120 Hz only". Set **Settings > Display & Sound > Refresh
Rate** to **120** for 60fps games or **100** for 50fps (PAL) games, and the toggle becomes
available. The row then names the frame rate it's set up for, such as "On (50 fps)".
Match that to what you're playing, or a 60fps game running at 100 Hz is paced down
to 50 and runs slow. See [Display & Sound](/guide/settings/#display--sound).

## A RetroArch setting goes back after every launch

Leaf sets a short list of RetroArch settings on each launch, so changing one of
them inside RetroArch only lasts for that session.
[RetroArch settings](/guide/retroarch-settings/) lists them and says where to
change each one instead. Aspect ratio and **Integer Scale** are on that list,
and the same page shows how to keep them per core with a RetroArch override.

If the setting isn't on that list, quit properly (**MENU > Save & Quit**, or
**Main Menu > Quit RetroArch** in the app tile) instead of powering off from
inside RetroArch, and try again.

## A shader is missing, broken, or keeps returning

- A Leaf recommendation is missing: update or reinstall Leaf.
- A shader keeps coming back: open **MENU > Shader** and choose **Off** at the
  scope that saved it (the game, the folder, or all of RetroArch). If Fugazi
  installed it, open Fugazi and choose **Remove**.
- A shader picked in **Advanced RetroArch menu** is gone after restarting the
  game: open **Manage Presets** and choose **Save Game Preset**, or another
  scope, before you leave the **Shaders** screen.
- Fugazi says the state needs attention: open its resolver and choose **Keep
  current**, **Restore previous**, or **Cancel**. Don't delete the preset files
  by hand.

For custom shaders, updater packs, and the other messages, see
[Shaders](/guide/shaders/).

## Games, saves, or box art don't stick after a reboot

The card's file system is probably damaged, usually from losing power without a
clean shutdown. Put the card in a computer and repair it - see
[Check the card on a computer](/guide/sd-card-read-only/#check-the-card-on-a-computer) -
then reinsert it.

To avoid it, power the device down with **MENU > Power Off** or a 2 second hold
of the power button, and let go when the screen changes. Holding it for the
**Force Off Hold** time (10 seconds by default) cuts power with no clean
shutdown, so keep that for a frozen device.
