---
title: My SD card is read-only
description: What the read-only SD card warning means, how to repair the card on your device or a computer, and what repair can change.
---

If Leaf shows **Your SD card needs repair**, **Your SD card is read-only**, or
**Your SD card is protected**, the card has stopped accepting new files. Leaf keeps
working, and an amber **SD read-only** badge stays in the status bar, but nothing
new is saved to that card until it is checked or repaired.

## What the warning means

When the device finds a problem in the card's file system, it switches the card to
read-only on purpose. Writing to a damaged file system can make the damage worse,
so stopping is the safer choice.

While a card is read-only:

- New saves and save states on that card may not be kept. Leaf asks before a game
  starts, and you can choose **Play anyway** or **Cancel**. Save states are
  refused, so you don't lose progress to a save that can't be written.
- Scraping pauses instead of failing game by game. The queue is kept until you
  restart the device.
- Pak Rat installs, box art uploads from Central Scrutinizer, and settings changes
  that live on that card can't be saved.

The warning names the card. The **launcher SD card** is the one Leaf runs from;
the **second SD card** holds more games. Either one can go read-only on its own.

## Why it happens

The most common cause is an unexpected shutdown while the device was writing, for
example a flat battery or a hard reset during a scrape. A card can also go
read-only when it is wearing out.

- **Your SD card is protected** means your last shutdown didn't finish saving.
  Choose **Restart and check**. If the check passes, you can save files again. If
  it finds errors, the warning changes to **Your SD card needs repair**.
- **The cause couldn't be determined** means the card is read-only but the device
  couldn't tell why. Repair is still worth trying.
- **Your SD card is write-protected** means the device can't write to the card at
  all. If you use a microSD adapter with a lock switch, check that it isn't set to
  lock.

## Repair the card on your device

1. Connect your device to power, or charge the battery to at least 30 percent.
2. Open **Settings > System > SD Cards** and choose the card, or choose **Repair
   SD card** on the warning.
3. Read the confirmation and choose **Restart and repair**. On battery, confirm
   **Repair on battery** first.

Your device restarts, and a **Repairing your SD card** screen stays up while it
checks the card and repairs what it can. It can take several minutes on a large
card. Leave the card in, and keep your device connected to power if you can. On
battery, the repair won't start if the battery drops below 30 percent first.

Repair can change damaged files. A file may be shortened, shortened to nothing,
renamed, or recovered under a new name such as `FSCK0000.REC` at the root of the
card. Leaf doesn't delete recovered files, because one of them might be a save.
If a file matters to you, copy it to a computer before you repair.

When Leaf starts again it shows the result once:

- **Your card passed the file system check.** You can save files again, and your
  library updates.
- **The repair did not finish.** The card stays read-only, and Leaf won't try again
  on its own. Check the card on a computer, then choose **Check SD card** in
  **Settings > System > SD Cards**.

A clean check means the file system is consistent again. It doesn't bring back
the original contents of a file that was damaged, and it doesn't prove the card
itself is healthy.

Repair works on FAT32 cards. A card with another file system, such as exFAT, can't
be repaired on the device, so check it on a computer.

## Check the card on a computer

Back up anything important from the card first.

- **Windows:** open **File Explorer**, right-click the card, and choose
  **Properties > Tools > Check**.
- **macOS:** open **Disk Utility**, select the card, and choose **First Aid**.
- **Linux:** unmount the card, then run `fsck.fat -a` on it, for example
  `sudo fsck.fat -a /dev/sdX1`.

Safely eject the card and put it back in your device. A card repaired this way
still shows as waiting for repair until you choose **Check SD card** in
**Settings > System > SD Cards**, then **Restart and check**. Your device restarts,
shows **Checking your SD card** while it confirms the card is consistent, and
makes it writable again.

## Leaf can't start after a failed repair

If a repair didn't finish on the card Leaf runs from, your device shows **Your SD
card is still protected** instead of starting Leaf. Turn off your device, repair
the card on a computer, then put it back and turn your device on to check it again.
If you leave the screen up, the device turns itself off after 15 minutes.

The repair log stays on the device's internal storage, not on the card. If you use
ADB, you can copy it with `adb pull /userdata/umrk/storage-repair`.

## Avoid it next time

- Turn your device off from the Leaf menu instead of holding the power button.
  Leaf waits for your cards to finish saving before it powers off, and if something
  is still busy, shutdown pauses on a screen that says what it is waiting for.
- Charge before a long scrape or a large upload. When the battery runs low, Leaf
  shuts down safely on its own.
