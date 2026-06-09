---
title: Recovery
description: Restore the Miniloong Pocket 1 to clean stock firmware, or recover automatically if Leaf fails to start.
---

Because Leaf runs **on top of** the stock OS rather than replacing it, recovery is
low-stakes — and in most cases automatic. The stock firmware is always still there
underneath.

## Automatic fallback (you usually don't have to do anything)

Leaf has a built-in crash-safety guard. If the launcher fails to start cleanly
several times in a row, Leaf **automatically falls back to the stock interface**
instead of leaving you stuck on a black screen or a boot loop.

When this happens:

- The device boots into the **stock home screen**.
- Leaf is only *paused*, not removed — your games, saves, and settings are untouched.
- Once the underlying issue is resolved (often just a reboot), Leaf resumes on the
  next normal boot.

So if you ever land on the stock interface unexpectedly, the first thing to try is
simply **rebooting the device**.

## Restore to clean stock (recovery card)

If you want to return the device to a clean, stock state — for troubleshooting, to
hand it on, or to start fresh — use the **recovery card**:

1. Download the Leaf **recovery** ZIP from the
   [releases page](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/releases):
   `leaf-mlp1-recovery-<release_id>.zip`.
2. Extract it to the **root** of an SD card (same as a fresh
   [install](/leaf-docs/guide/install/) — not into a subfolder).
3. Boot the device with that card inserted and let the **stock update screen** run
   the recovery.
4. Power off when it finishes, then boot normally.

The device is now back on stock firmware.

## Removing Leaf

The recovery card above is also how you fully remove Leaf and go back to stock for
good. Nothing about Leaf is permanent — it's an additive layer on top of the
device's original OS.

:::note[Reviewer note]
Confirm the recovery ZIP name/flow and whether there's a lighter "uninstall"
(marker-off) path worth documenting separately from a full stock restore.
:::
