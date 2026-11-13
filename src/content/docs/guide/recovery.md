---
title: Recovery
description: Restore the Miniloong Pocket 1 to clean stock firmware, or recover automatically if Leaf fails to start.
---

Leaf leaves the stock firmware installed underneath, so you can always get back
to it. If Leaf fails to start, the device falls back to stock on its own. A
recovery card returns it to clean stock whenever you want.

## The device booted into stock

If the launcher fails to start cleanly several times in a row, Leaf falls back
to the stock interface instead of leaving you on a black screen or in a boot
loop.

When this happens:

- The device boots into the stock home screen.
- Leaf is only paused, not removed. Your games, saves, and settings are untouched.
- Leaf resumes on the next normal boot once the problem is gone, so reboot first.

## Restore to clean stock (recovery card)

To return the device to a clean stock state (for troubleshooting, to hand it on,
or to start fresh), use the recovery card:

1. Download the Leaf recovery ZIP from the
   [latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases/latest):
   `leaf-mlp1-recovery-<release_id>.zip`.
2. Unzip it onto the top level of an SD card, the same way as a fresh
   [install](/guide/install/#steps), not into a subfolder.
3. Boot the device with that card inserted and let the stock update screen run
   the recovery.
4. Power off when it finishes, then boot normally.

The device is now back on stock firmware. This is also how you remove Leaf for
good.

Neither the fallback nor a recovery card touches your games, saves, or other
data at the top level of your Leaf card - see
[What reinstalling keeps](/guide/install/#what-reinstalling-keeps).
