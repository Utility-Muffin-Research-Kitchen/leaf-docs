---
title: Joe's Calibrage
description: 'Calibrate the Miniloong Pocket 1 analog stick so games see its full range.'
---

Joe's Calibrage measures what your analog stick actually does and saves a profile so
Leaf can remap it back to the full range games expect. If your stick feels like it
will not push all the way (characters walk when they should run, or aiming feels
clipped), this is the fix.

![Joe's Calibrage on the Calibrate screen: a circular target with a live dot tracking the analog stick, the captured range and sample count below, and cancel, reset, and next hints](/joes-calibrage.png)

## Using it

Open Joe's Calibrage from the **Apps** tab. It has a few screens:

- **Test Stick** - move the stick and watch the dot. This shows what games see, so
  you can check whether calibration is needed and confirm it afterward.
- **Calibrate** - the main two-step flow:
  1. **Roll the stick all the way around the edge** a few times so it can learn the
     real maximum reach on both axes, then press **A** to continue.
  2. **Let the stick center** so it can measure the resting position and a small
     deadzone, then press **Y** to save.
- **Center Stick** - a quick fix for drift. If only the resting position has wandered
  (the dot does not sit at center when you let go), this re-centers the stick at the
  driver level without a full recalibration.
- **View Values** - shows the saved profile, for reference.
- **Restore Backup** - reverts to the original factory calibration. Joe's Calibrage
  backs that up the first time you save, so you can always go back.

## How it is applied

Your profile is saved to your user data on the SD card and read by Leaf at startup,
so once you calibrate, every game and the launcher itself see the corrected stick.
There is nothing to turn on per game.

## Notes

- Built for the **Miniloong Pocket 1** and its single stick.
- Recalibrate if you ever replace the stick, or if its reach shrinks over time. For a
  resting-position drift, **Center Stick** is the faster fix.

Joe's Calibrage is open source (MIT).
