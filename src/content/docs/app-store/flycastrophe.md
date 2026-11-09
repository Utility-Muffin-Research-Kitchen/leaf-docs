---
title: Flycastrophe
description: Add a faster Dreamcast, Naomi and Atomiswave core to Leaf on the Miniloong Pocket 1.
---

Flycastrophe runs your Dreamcast, Naomi and Atomiswave games with speed changes
ported from Deadcast. It trades some accuracy for speed, so a game that looks
or sounds wrong here may work better in Flycast.

You need **Leaf 0.14.0 or newer** on a **Miniloong Pocket 1**. The download is
about 4.3 MB and uses about 30.3 MB on your card, plus space for saves and caches.

## Install and choose it

Press **MENU**, open **Actions → Pak Rat**, choose **Flycastrophe**, and install
it over Wi-Fi. Then use **Core** in a Dreamcast, Naomi or Atomiswave system's or
game's options to select **Flycastrophe**.

There's no app to open and no new system tile. Flycastrophe runs in Leaf's
RetroArch, alongside the other Flycast choices. Your games stay where they are,
and your BIOS files stay in `BIOS/dc/`. The pak includes no games or BIOS files.

## Saves and settings

Your save states and game saves go in `States/Flycastrophe/` and
`Saves/Flycastrophe/`. Your existing Flycast states don't appear here.
Flycastrophe keeps its own shared VMUs in `BIOS/dc/flycastrophe/`. To bring over
a Flycast save, back up both VMU files first, then copy `vmu_save_A1.bin` into
that folder while no game is running.

Files ending in `.blocks` under `Saves/Flycastrophe/` cache translated game code
to reduce stalls when you resume. You can safely delete them; Flycastrophe
rebuilds them as you play.

Removing the pak removes its emulator choice. Your ROMs, BIOS files, saves and
states stay on the card.

## A game looks or sounds wrong

Open RetroArch's **Core Options** from the in-game menu. The speed shortcuts
are on by default; restart the game after changing **Threaded Audio**,
**Parse Thread**, **Fast Vector Math** or **Idle Loop Skip**.

- Turn off **Threaded Audio** if sound or timing goes wrong.
- Turn off **Fast Vector Math** if geometry jitters.
- Turn off **Idle Loop Skip** if a game hangs or runs at the wrong speed.
- Turn on **Audio DSP** if reverb or other sound effects are missing. It costs
  some speed.
- Set **Auto Skip Frame** to **Disabled** if you want every frame drawn. The
  default, **Maximum**, can skip up to two frames in a row to keep game and
  audio timing at full speed.

Transparency sorting defaults to **Per-strip**. Per-pixel sorting isn't
available. Daytona USA 2001 uses per-triangle sorting so the car decals show.
If these options don't help, choose another Flycast core for that game.

This first release has passed boot and clean-exit checks in 17 games and
benchmarks in Crazy Taxi and Sonic Adventure 2. Full hands-on play, per-game
state checks and the complete launcher lifecycle checklist remain incomplete.
You can find the test scope and exact build in the
[release notes](https://github.com/Helaas/Flycastrophe-pak/releases/tag/v0.1.0).

Flycast is by [flyinghead and contributors](https://github.com/flyinghead/flycast),
and Deadcast is by [tyrannotorus](https://github.com/tyrannotorus/emulator-dreamcast-deadcast).
[Helaas packages Flycastrophe](https://github.com/Helaas/Flycastrophe-pak) for
Leaf. The release includes the core's corresponding source and build recipe.
