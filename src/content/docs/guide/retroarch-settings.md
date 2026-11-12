---
title: RetroArch settings
description: 'When your RetroArch changes are saved, which settings Leaf sets for you, and how to reset them.'
---

Leaf lets you change nearly all of RetroArch's own settings. Read this page if a
setting you changed didn't stick.

## One configuration for every game

Leaf keeps one RetroArch configuration and uses it for every game and for the
RetroArch app tile. Turn on rewind in a Mega Drive game and the next Game Boy game
starts with rewind on. Core options, input remaps, and overrides are stored
separately.

The file is `.umrk/mlp1/retroarch/retroarch.cfg` on your primary SD card.

## When your changes are saved

Your changes are saved when RetroArch quits normally:

- leave a game with **MENU > Save & Quit**, or
- in the RetroArch app tile, use **Main Menu > Quit RetroArch**.

### My changes disappeared after powering off

A hard power cut can lose the settings you changed in that session. That includes
holding the power button until the device dies and letting the battery run flat.

Leaf's **Power Off** and **Reboot** save the RetroArch app tile's settings before
the device goes down. If RetroArch hangs or the write fails, those changes may
not be saved. A running game is different: powering off or restarting with
a game open can lose that session's settings and your recent in-game progress.
Leave the game with **MENU > Save & Quit** first.

## Settings Leaf sets on every launch

Leaf sets a few RetroArch settings each time a game starts. If you change one of
them in RetroArch's menus, it lasts for that session only.

| Setting | Where to change it instead |
| --- | --- |
| Audio output | **Settings > Display & Sound** |
| Refresh rate and Black Frame Insertion | **Settings > Display & Sound** |
| Menu language | **Settings > System > Language** |
| RetroAchievements account | **Settings > Games > Accounts** |
| Recording on or off | **Settings > Hotkeys & Rumble > Hotkeys > Recording**. See [Recording](/guide/screenshots/#recording) |
| Player count and controller order | Set from the controllers connected when the game starts. See [Controllers](/guide/controllers/) |
| Aspect ratio and integer scaling | No Leaf setting. Save a core override, as described [below](#aspect-ratio-and-integer-scaling) |
| Quit hotkey | Always unbound. Use **Save & Quit** in the in-game menu |
| **Video Shaders** switch | Turning it off lasts for the session. Remove the saved preset instead; see [RetroArch shaders](/guide/shaders/) |
| **Configuration File** menu | Hidden. See [Alternate configurations](#alternate-configurations) |

Leaf also sets the save, save-state and screenshot folders, the video and audio
drivers, the menu's look and OK/Cancel button order, and save-state thumbnails.
There's no Leaf setting for those.

Everything else is yours and persists normally, including rewind, run-ahead,
overlays, cheats, per-core options, and input remaps.

## Aspect ratio and integer scaling

Leaf sets the aspect ratio to **Core provided** and turns **Integer Scale** off on
every launch. To keep integer scaling, save it as a per-core override. Overrides
load after Leaf's values, so they survive relaunches:

1. Start a game on the core you want it for.
2. Open **MENU > RetroArch Settings**, then **Settings > Video > Scaling**, and turn
   **Integer Scale** on.
3. Back out to RetroArch's Quick Menu and choose **Overrides > Save Core
   Overrides**.

The setting now applies to every game on that core. **Save Game Overrides** and
**Save Content Directory Overrides** in the same menu do the same for one game or
one folder, and **Remove Core Overrides** deletes the one in use. Override files are
kept on your primary card under
`.umrk/mlp1/retroarch/.config/retroarch/config/<Core Name>/`.

While an override is loaded, RetroArch stops saving the shared configuration on
exit, so other settings you change on that core won't persist. Make your ordinary
settings changes first and save the override afterwards.

## Alternate configurations

RetroArch can normally keep several configuration files and switch between them
from its **Configuration File** menu. Leaf supports one configuration and hides
that menu. Core, folder, and game overrides still work.

An alternate config on your card under `.umrk/mlp1/retroarch/.config/retroarch/`
is ignored. Copy values across by hand if you need them.

## Reset the RetroArch config

**Settings > Games > Reset RetroArch Config** replaces the shared configuration with
Leaf's defaults. Use it when RetroArch is misbehaving and you'd rather start clean
than find the setting that caused it.

It erases everything kept in that file, including the active shader setting,
rewind, overlays, and the rest of RetroArch's own menus. It doesn't touch your
games, saves, or save states, and it doesn't remove saved shader presets,
configuration overrides, per-core options, or input remaps.

A saved shader preset can apply again after the reset. Remove it from
[RetroArch shaders](/guide/shaders/). Remove a configuration override through
**Quick Menu > Overrides**.

## A setting still won't stick

1. Check the table above. If Leaf sets it, change it from the Leaf setting named
   there.
2. Quit with **MENU > Save & Quit**, or **Quit RetroArch** in the app tile. Don't
   power off from inside RetroArch.
3. Check whether a core, folder, or game override is loaded. It can replace the
   shared value and stop RetroArch saving the shared configuration on exit.
4. If none of these explains it, see [Troubleshooting](/guide/troubleshooting/).
