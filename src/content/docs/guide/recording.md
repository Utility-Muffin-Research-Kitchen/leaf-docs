---
title: Recording
description: Record video of a game on the Miniloong Pocket 1 with a button combo. Clips are converted to MP4 automatically and split into pieces small enough to share.
---

Recording captures video of a game with a button combo, saved straight to the SD
card. When you leave the game, Leaf converts the clip to an MP4 that plays
anywhere - Discord, a browser, your phone - and splits it into pieces small enough
to post if it is long.

## Turning it on

Recording is off by default. Turn it on in **Settings → Controls & Feedback**, on the
**Recording** row. Two more rows sit underneath it and stay grayed out until
recording is on.

## Recording a game

Hold **MENU** and tap **R1** to start, and the same combo again to stop.

Neither button reaches the game, so you can record from a title screen or a menu
without pressing anything in the game itself.

## Where clips go

Everything lands in a **`Recordings`** folder at the top level of the SD card.
Filenames include the game name and the date and time.

You will see two files for each clip. The **`.mkv`** is the original capture, and
the **`.mp4`** is the shareable version made when you left the game. Converting
happens in the background, so the launcher comes straight back and the MP4 appears
a few seconds later - longer clips take longer.

## Splitting long clips

Discord's free upload limit is 10 MB, which is roughly 35 seconds of gameplay at
Leaf's recording quality. Anything longer would be too big to post.

**Split Over 10MB** is on by default. When a clip is too large, it is saved as
numbered parts instead of one file, each small enough to upload. Short clips are
untouched and stay a single MP4.

Turn it off if you would rather always have one file and handle the size yourself.

## Keeping the original

**Keep Original** is on by default, which is why each clip leaves both an `.mkv` and
an `.mp4` behind. The `.mkv` holds lossless audio and is the file the MP4 is made
from.

Turn it off if you only want the shareable MP4 and would rather save the space. The
original is deleted only after the MP4 has been written successfully, so a failed
conversion never costs you the clip.

## What gets recorded

Two things are worth knowing before you record something you care about.

**Recording only works in RetroArch games.** Most systems run through RetroArch and
record normally. PSP, Dreamcast, and PortMaster games run in their own emulators,
which Leaf cannot record - the combo simply does nothing there.

**Clips do not include shaders.** Recording captures the picture the emulator draws,
before any shader runs, so a clip of a game with a CRT shader will not have the
scanlines you were looking at. The recording is a clean, sharp version of the same
image. Capturing the shaded picture instead is possible, but on this hardware it
slows the game down badly enough that it is not worth doing.
