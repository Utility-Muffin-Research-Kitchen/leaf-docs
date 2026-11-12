---
title: Flycastrophe
description: Add a faster Dreamcast, Naomi and Atomiswave core to Leaf on the Miniloong Pocket 1.
---

Flycastrophe runs your Dreamcast, Naomi and Atomiswave games with speed changes
ported from Deadcast. It trades some accuracy for speed, so a game that looks
or sounds wrong here may work better in Flycast.

## Install

Install **Flycastrophe** from Pak Rat; see
[installing an app](/app-store/introduction/#installing-an-app). It adds an
emulator choice, so there's no app to open and no new system tile. The pak
includes no games or BIOS files.

## Choose it for a game

Use **Core** in a Dreamcast, Naomi or Atomiswave system's or game's options to
select **Flycastrophe**. Your games stay where they are, and your BIOS files stay
in `BIOS/dc/`.

## Saves and states

Your save states and game saves go in `States/Flycastrophe/` and
`Saves/Flycastrophe/`. Your existing Flycast states don't appear here.

Flycastrophe keeps its own shared VMUs in `BIOS/dc/flycastrophe/`. To bring over
a Flycast save, back up both VMU files first, then copy `vmu_save_A1.bin` into
that folder while no game is running.

You can delete the `.blocks` files under `Saves/Flycastrophe/`; they're rebuilt
as you play.

## A game looks or sounds wrong

Open RetroArch's **Core Options** from the in-game menu. The speed options are
on by default. Restart the game after changing **Threaded Audio**,
**Parse Thread**, **Fast Vector Math** or **Idle Loop Skip**.

- Turn off **Threaded Audio** if sound or timing goes wrong.
- Turn off **Fast Vector Math** if geometry jitters.
- Turn off **Idle Loop Skip** if a game hangs or runs at the wrong speed.
- Turn on **Audio DSP** if reverb or other sound effects are missing. It costs
  some speed.
- Set **Auto Skip Frame** to **Disabled** if you want every frame drawn. The
  default, **Maximum**, can skip up to two frames in a row.

If these options don't help, choose another Flycast core for that game.

## Credits

Flycast is by [flyinghead and contributors](https://github.com/flyinghead/flycast),
and Deadcast is by [tyrannotorus](https://github.com/tyrannotorus/emulator-dreamcast-deadcast).
[Helaas packages Flycastrophe](https://github.com/Helaas/Flycastrophe-pak) for
Leaf.
