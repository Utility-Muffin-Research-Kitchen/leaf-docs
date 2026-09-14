---
title: My SD card is read-only
description: What the read-only SD card warning means, how to repair the card on your device or a computer, and what repair can change.
---

If Leaf shows **Your SD card needs repair** or **Your SD card is read-only**, the
card has stopped accepting new files. Leaf keeps working, but nothing new is saved
to that card until it is repaired.

## What the warning means

When the device finds a problem in the card's file system, it switches the card to
read-only on purpose. Writing to a damaged file system can make the damage worse,
so stopping is the safer choice.

While a card is read-only:

- New saves and save states on that card may not be kept. Leaf warns you before a
  game starts, and you can choose **Play anyway** or **Cancel**.
- Scraping pauses instead of failing game by game. The queue is kept until you
  restart the device.
- Pak Rat installs, box art uploads from Central Scrutinizer, and settings changes
  that live on that card can't be saved.

The warning names the card. The **launcher card** is the one Leaf runs from; the
**second card** holds more games. Either one can go read-only on its own.

## Why it happens

The most common cause is an unexpected shutdown while the device was writing, for
example a flat battery or a hard reset during a scrape. A card can also go
read-only when it is wearing out.

If the warning says **The cause couldn't be determined**, the card is read-only
but the device couldn't tell why. Repair is still worth trying. If you use a
microSD adapter with a lock switch, check that it isn't set to lock.

## Repair the card on your device

1. Connect your device to power. Repair won't start on battery.
2. Open **Settings > General > SD Cards** and choose the card, or choose
   **Repair SD card** on the warning.
3. Read the confirmation and choose **Restart and repair**.

Your device restarts, checks the card before Leaf starts, and repairs what it
can. A **Checking your SD card** screen stays up while it works. It can take a
few minutes on a large card. Keep your device connected to power until Leaf
starts again.

Repair can change damaged files. A file may be shortened, shortened to nothing,
renamed, or recovered under a new name such as `FSCK0000.REC` at the root of the
card. Leaf doesn't delete recovered files, because one of them might be a save.
If a file matters to you, copy it to a computer before you repair.

When Leaf starts again it shows the result once:

- **Your card passed the file system check.** The card is writable again. Leaf
  rescans your library and offers to scrape artwork that went missing.
- **The repair did not finish.** The card stays read-only, and Leaf won't try again
  on its own. Check the card on a computer, then choose **Check SD card** in
  **Settings > General > SD Cards**.

A clean check means the file system is consistent again. It doesn't bring back
the original contents of a file that was damaged, and it doesn't prove the card
itself is healthy.

## Check the card on a computer

Back up anything important from the card first.

- **Windows:** open **File Explorer**, right-click the card, and choose
  **Properties > Tools > Check**.
- **macOS:** open **Disk Utility**, select the card, and choose **First Aid**.
- **Linux:** unmount the card, then run `fsck.fat -a` on it, for example
  `sudo fsck.fat -a /dev/sdX1`.

Put the card back in your device. A card repaired this way still shows as waiting
for repair until you choose **Check SD card** in **Settings > General > SD Cards**.
The check restarts your device, confirms the card is consistent, and makes it
writable again.

## Leaf can't start after a failed repair

If a repair didn't finish on the card Leaf runs from, your device shows **Your SD
card couldn't be repaired** instead of starting Leaf. Turn off your device and
check the card on a computer. If you leave it, the device turns itself off after
15 minutes.

The repair log stays on the device's internal storage, not on the card. If you use
ADB, you can copy it with `adb pull /userdata/umrk/storage-repair`.

## Avoid it next time

- Turn your device off from the Leaf menu instead of holding the power button.
- Charge before a long scrape or a large upload.
