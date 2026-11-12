---
title: Screenshots and recording
description: Capture a screenshot or record video of a game on the Miniloong Pocket 1 with a button combo, saved straight to the SD card.
---

A button combo saves a screenshot or records video of a game, straight to the SD
card, without Wi-Fi or a computer. Screenshots work in the launcher, Leaf menus,
5-Game Mode, and RetroArch games. Recording works in RetroArch games.

## Turning them on

Both are off by default. Go to **Settings > Hotkeys & Rumble > Hotkeys** and turn on
the **Screenshots** row, the **Recording** row, or both.

![The Hotkeys settings page with the Screenshots row highlighted and set to Off, above a Screenshot Hotkey row reading Menu + L1, alongside Game Switcher, Recording, and the recording options](/screenshot_settings.png)

The **Screenshot Hotkey** and **Recording Hotkey** rows on the same page put each
shortcut on another button, or turn the shortcut off. See
[Hotkeys](/guide/playing/#hotkeys).

## Taking a screenshot

Hold **MENU** and tap **L1**.

- In the launcher, a menu, or 5-Game Mode, the screen flashes white.
- In a game, RetroArch shows **Screenshot saved** in the corner.

## Recording

Hold **MENU** and tap **R1** to start recording, and the same combo again to stop.
Neither button reaches the game, so you can record from a title screen without
pressing anything in the game itself.

A small red dot pulses in the top left corner while a recording is running. The dot
isn't in your clips.

When you leave the game, Leaf converts the clip to an MP4 that plays in Discord, a
browser, or on your phone. Converting happens in the background, so the launcher
comes straight back and the MP4 appears a few seconds later. Longer clips take
longer.

Two more rows on the **Hotkeys** page change what you get:

- **Split Over 10MB** - on by default. Discord's free upload limit is 10 MB, which
  is about 30 seconds of gameplay. A larger clip is saved as numbered parts, each
  small enough to upload. Turn it off to always get one file.
- **Keep Original** - on by default. Each clip keeps its original `.mkv` capture
  next to the `.mp4`. Turn it off to keep only the MP4. The original is deleted
  only after the MP4 has been written.

## Where files go

- Screenshots are saved as PNGs in the `Screenshots` folder at the top level of the
  SD card. Filenames include the date and time, and the game's name for a
  screenshot taken in a game.
- Clips are saved in the `Recordings` folder at the top level of the SD card.
  Filenames include the game's name and the date and time.

To get clips off the handheld, use
[Central Scrutinizer](/apps/central-scrutinizer/) to download them over Wi-Fi to a
computer or phone.

## What gets captured

- In the launcher, a menu, or 5-Game Mode, a screenshot captures the whole screen
  as you see it.
- In a game, a screenshot is the game's own picture at the game's own resolution.
- A recording is the game's picture before any shader runs. A clip of a game with
  a CRT shader won't have the scanlines you were looking at.
- Recording only works in RetroArch games. PSP, Dreamcast, and PortMaster games run
  in their own emulators, and the combo does nothing there. Standalone emulators
  also have their own screenshot controls.
