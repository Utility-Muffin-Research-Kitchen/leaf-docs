---
title: BIOS & cores
description: What cores and BIOS files are, why Leaf never ships BIOS, and how to add the BIOS files some systems need.
---

Two things make a game run: a **core** (the emulator) and, for some systems, a
**BIOS** (the console's original startup firmware). Leaf handles cores for you;
**BIOS files you must supply yourself.**

## Cores (the emulators)

A *core* is the emulator for a given system. Leaf ships with a set of cores, so
most systems are ready to play out of the box. A system shows up in the
launcher once its core is present on the device.

Under the hood:

- **RetroArch cores** handle the bulk of systems. Leaf's cores are built downstream
  of [libretro-super](https://github.com/libretro/libretro-super) (the same source
  the wider libretro ecosystem uses), so they track upstream rather than being
  hand-maintained forks.
- **Standalone emulators** are used for a few heavy systems where a dedicated build
  performs better than a RetroArch core, for example **PPSSPP** (PSP), **Flycast**
  (Dreamcast), and a standalone **Nintendo 64** emulator.

Because Leaf runs **upstream RetroArch**, features that upstream adds (including
**RetroAchievements** with compatible cores) come along for the ride rather than
needing to be reimplemented.

:::note
The heaviest systems (PSP, Dreamcast, N64) are demanding on this hardware. Whether
a given game runs at full speed varies by title; treat these as "best effort,"
not guaranteed.
:::

## BIOS (you supply these)

A *BIOS* is the copyrighted firmware from the original console. **Leaf never
includes BIOS files, and it can't legally distribute them.** This is standard
across all emulation projects: you provide your own, ideally dumped from
hardware you own.

### Where BIOS files go

Put them in the **`BIOS/`** folder at the root of the SD card:

```text
BIOS/
  neogeo.zip
  ...
```

### Systems that need a BIOS

- **Neo Geo** — requires **`neogeo.zip`** in `BIOS/`. Without it, Neo Geo games
  appear but won't launch.
- **Arcade (FinalBurn Neo / FBNeo)** — many arcade games depend on a BIOS or a
  parent ROM set (for example, CPS systems need their BIOS). These also live in
  `BIOS/` or alongside the game set.

Handheld systems like **Neo Geo Pocket / Color** need **no BIOS**; plain ROMs
just work.

## Arcade & Neo Geo: extra rules

Arcade emulation is the fussiest part of any handheld. Three things matter:

1. **Match the ROM-set version.** Arcade cores only load ROM sets that match the
   core's expected version. A set from the wrong version silently fails to load
   even when the game name looks right. Use a set that matches the core.
2. **Keep them zipped.** Arcade games load from their `.zip` by exact filename;
   do **not** unzip or rename them (the opposite of some other systems).
3. **Parents & BIOS.** Clones reference their parent set (both must be present),
   and `neogeo.zip` acts as the shared BIOS for the whole Neo Geo library.

## A note on the hardware

The Miniloong Pocket 1's CPU comfortably handles 8- and 16-bit systems and
handhelds. Heavier systems (e.g. anything approaching 3D-era consoles) are
demanding on this class of hardware; expect mixed results even with the right
core and BIOS in place.
