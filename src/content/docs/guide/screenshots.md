---
title: Screenshots and recording
description: Capture a screenshot or record video of a game on the Miniloong Pocket 1 with a button combo, saved straight to the SD card.
---

Screenshots let you capture whatever is on screen with a single button combo,
saved straight to the SD card as a PNG. You can capture the launcher, Leaf
menus, RetroArch games, and the locked 5-Game Mode without Wi-Fi or a computer.

## Turning it on

Screenshots are off by default. Turn them on in **Settings → Hotkeys & Rumble →
Hotkeys**, on the **Screenshots** row. Once on, your capture hotkey works in the
launcher, Leaf menus, 5-Game Mode, and RetroArch games. Standalone emulators use
their own controls.

![The Hotkeys settings page with the Screenshots row highlighted and set to Off, above a Screenshot Hotkey row reading Menu + L1, alongside Game Switcher, Recording, and the recording options](/screenshot_settings.png)

## Taking a screenshot

Hold **MENU** and tap **L1** - the default. The **Screenshot Hotkey** row on the
same page puts it on another button, or turns the shortcut off while leaving
screenshots themselves on. See
[Hotkeys](/guide/features/#hotkeys).

- In the launcher, a menu, or 5-Game Mode, the screen gives a quick white **flash**.
- In a game, RetroArch shows its own **Screenshot saved** note in the corner.

## Where they go

Every screenshot is saved to a **`Screenshots`** folder at the top level of the SD
card, so you can browse or copy them off the card easily. Filenames include the
date and time. A screenshot taken in a game is also named after the game, so a
folder full of captures is easy to sort.

## What gets captured

- **In a game**, RetroArch captures its own video frame, so the picture is exactly
  what the game drew - crisp, at the game's own resolution.
- **In the launcher, a menu, or 5-Game Mode**, the whole screen is captured as you
  see it.

## Recording

Recording captures video of a game with a button combo, saved straight to the SD
card. When you leave the game, Leaf converts the clip to an MP4 that plays
anywhere - Discord, a browser, your phone - and splits it into pieces small enough
to post if it is long.

To get clips off the handheld, use [Central Scrutinizer](/apps/central-scrutinizer/)
to download them over Wi-Fi to a computer or phone, then post them to Discord,
Reddit, or wherever you like.

### Turning it on

Recording is off by default. Turn it on in **Settings → Hotkeys & Rumble →
Hotkeys**, on the **Recording** row. **Split Over 10MB** and **Keep Original**
stay grayed out until recording is on. **Recording Hotkey** can be changed even
while recording is off.

### Recording a game

Hold **MENU** and tap **R1** to start, and the same combo again to stop. **R1** is
the default; the **Recording Hotkey** row on the same page moves it to another
button or turns it off. See
[Hotkeys](/guide/features/#hotkeys).

Neither button reaches the game, so you can record from a title screen or a menu
without pressing anything in the game itself.

A small red dot appears in the top left corner while a recording is running, and
pulses slowly so you can tell it apart from anything in the game. It disappears the
moment you stop.

The dot is not in your clips. Recording captures the game's own picture before
anything is drawn over it, which is the same reason a shader never shows up in a
recording, so the dot stays on your screen and out of the video.

### Where clips go

Everything lands in a **`Recordings`** folder at the top level of the SD card.
Filenames include the game name and the date and time.

You will see two files for each clip. The **`.mkv`** is the original capture, and
the **`.mp4`** is the shareable version made when you left the game. Converting
happens in the background, so the launcher comes straight back and the MP4 appears
a few seconds later - longer clips take longer.

### Splitting long clips

Discord's free upload limit is 10 MB, which is about 30 seconds of gameplay at
Leaf's recording quality. Anything longer would be too big to post.

**Split Over 10MB** is on by default. When a clip is too large, it is saved as
numbered parts instead of one file, each small enough to upload. Short clips are
untouched and stay a single MP4.

Turn it off if you would rather always have one file and handle the size yourself.

### Keeping the original

**Keep Original** is on by default, which is why each clip leaves both an `.mkv` and
an `.mp4` behind. The `.mkv` holds lossless audio and is the file the MP4 is made
from.

Turn it off if you only want the shareable MP4 and would rather save the space. The
original is deleted only after the MP4 has been written successfully, so a failed
conversion never costs you the clip.

### What gets recorded

Two things are worth knowing before you record something you care about.

**Recording only works in RetroArch games.** Most systems run through RetroArch and
record normally. PSP, Dreamcast, and PortMaster games run in their own emulators,
which Leaf cannot record - the combo simply does nothing there.

**Clips do not include shaders.** Recording captures the picture the emulator draws,
before any shader runs, so a clip of a game with a CRT shader will not have the
scanlines you were looking at. The recording is a clean, sharp version of the same
image.
