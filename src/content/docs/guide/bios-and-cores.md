---
title: BIOS & cores
description: What cores and BIOS files are, why Leaf never ships BIOS, and how to add the BIOS files some systems need.
---

Two things make a game run: a *core* (the emulator) and, for some systems, a
*BIOS* (the console's original startup firmware). Leaf handles cores for you;
BIOS files you must supply yourself.

## BIOS (you supply these)

A *BIOS* is the copyrighted firmware from the original console. Leaf never
includes BIOS files, and it can't legally distribute them. This is standard
across all emulation projects: you provide your own, ideally dumped from
hardware you own.

### Where BIOS files go

Put them in the `BIOS/` folder at the root of the SD card:

```text
BIOS/
  puae/
    kick34005.A500
    kick40068.A1200
    kick34005.CDTV
    kick40060.CD32
    kick40060.CD32.ext
  SATURN/
    sega_101.bin
    mpr-17933.bin
  dc/
    dc_boot.bin
    awbios.zip
    naomi.zip
    naomi2.zip
  np2kai/
    font.bmp
  neogeo.zip
  bios.min
  ...
```

### Systems that need a BIOS

- **Neo Geo** - requires `neogeo.zip` in `BIOS/`. Without it, Neo Geo games
  appear but won't launch. The file must be named exactly `neogeo.zip` -
  files like `aes.zip` are not used, so don't drop them into your ROM
  folders (they would show up as a broken "game").
- **Arcade (FinalBurn Neo / FBNeo)** - many arcade games depend on a BIOS or a
  parent ROM set (for example, CPS systems need their BIOS). These also live in
  `BIOS/` or alongside the game set.
- **Saturn** - put Sega Saturn BIOS files in `BIOS/SATURN/`. The RetroArch
  YabaSanshiro core uses this folder automatically. Provide a standard Saturn
  BIOS, for example `sega_101.bin`
  (Japanese) or `mpr-17933.bin` (US / European). Without one, Saturn games appear
  in the launcher but won't launch. **YabaSanshiro Standalone** is different: it
  starts without a BIOS by default, and you pick one per game or per system - see
  [Saturn: choosing a BIOS](#saturn-choosing-a-bios).
- **Pokémon mini** - optional. The PokeMini core boots every game with its own
  built-in BIOS. If you have a dump of the real one, name it `bios.min` (4 KB)
  and put it directly in `BIOS/`, not in a subfolder; PokeMini uses it
  instead. Central Scrutinizer's Pokémon mini card has no BIOS view because
  of that root location, so copy the file with **Files** or straight onto
  the card.
- **PlayStation** - games generally run without one, but a real BIOS in `BIOS/`
  (for example `scph5501.bin` for US titles) improves compatibility.
- **NEC PC-98** - put np2kai firmware in `BIOS/np2kai/`. Provide either
  `font.bmp` or `FONT.ROM` for text rendering. Optional firmware dumps such as
  `bios.rom`, `itf.rom`, and `sound.rom` go in the same folder and can improve
  compatibility. Optional YM2608 rhythm samples (`2608_BD.WAV`, `2608_SD.WAV`,
  `2608_TOP.WAV`, `2608_HH.WAV`, `2608_TOM.WAV`, and `2608_RIM.WAV`) belong
  there too. Preserve the filenames expected by np2kai.
- **Amiga (PUAE)** - put every Kickstart ROM and related file in `BIOS/puae/`.
  Both packaged cores use this subfolder rather than root-level `BIOS/` or
  `BIOS/AMIGA/`. Use the lowercase spelling on a case-sensitive filesystem. PUAE has a limited built-in AROS fallback,
  but model-specific firmware gives much better compatibility. Common official
  filenames and accepted Amiga Forever alternatives are:

  | Hardware | PUAE filename | Amiga Forever filename | Raw size |
  |---|---|---|---|
  | A1000 Kickstart 1.1 NTSC | `kick31034.A1000` | `amiga-os-110-ntsc.rom` | 256 KB |
  | A1000 Kickstart 1.1 PAL | `kick32034.A1000` | `amiga-os-110-pal.rom` | 256 KB |
  | A500 Kickstart 1.2 | `kick33180.A500` | `amiga-os-120.rom` | 256 KB |
  | A500 Kickstart 1.3 | `kick34005.A500` | `amiga-os-130.rom` | 256 KB |
  | A600 Kickstart 2.05 | `kick37350.A600` | `amiga-os-205-a600.rom` | 512 KB |
  | A600 Kickstart 3.1 | `kick40063.A600` | `amiga-os-310-a600.rom` | 512 KB |
  | A1200 Kickstart 3.0 | `kick39106.A1200` | `amiga-os-300-a1200.rom` | 512 KB |
  | A1200 Kickstart 3.1 | `kick40068.A1200` | `amiga-os-310-a1200.rom` | 512 KB |
  | A4000 Kickstart 3.0 | `kick39106.A4000` | `amiga-os-300-a4000.rom` | 512 KB |
  | A4000 Kickstart 3.1 | `kick40068.A4000` | `amiga-os-310-a4000.rom` | 512 KB |
  | CDTV extended ROM | `kick34005.CDTV` | `amiga-os-130-cdtv-ext.rom` | 256 KB |
  | CD32 Kickstart | `kick40060.CD32` | `amiga-os-310-cd32.rom` | 512 KB |
  | CD32 extended ROM | `kick40060.CD32.ext` | `amiga-os-310-cd32-ext.rom` | 512 KB |
  | CD32 combined Kickstart + extended ROM | `kick40060.CD32` | N/A | 1 MB |

  These sizes describe raw ROM images; an encrypted Amiga Forever file may
  include a header. Check the upstream hashes as well as the size.

  A500/OCS games normally use Kickstart 1.3, while A1200/AGA content normally
  uses Kickstart 3.1. CDTV needs its extended ROM plus an applicable base
  Kickstart. CD32 needs both CD32 files, unless you have the accepted combined
  ROM image. If your legally obtained Amiga Forever ROMs are encrypted, place
  their `rom.key` in `BIOS/puae/` too. PUAE may create user-owned WHDLoad files
  in this folder; Leaf updates leave them in place. The complete upstream BIOS
  table, including hashes, is in the
  [official PUAE documentation](https://docs.libretro.com/library/puae/#bios).
- **Dreamcast** - `BIOS/dc/dc_boot.bin` is optional but recommended for the real
  Dreamcast boot firmware. Current Flycast creates and maintains its own writable
  NVRAM, so `dc_flash.bin` is not required.
- **Atomiswave and Naomi** - put Flycast's arcade BIOS archives in `BIOS/dc/`.
  Atomiswave uses `awbios.zip`. Base Naomi and Naomi GD-ROM use `naomi.zip`;
  Naomi 2 uses the separate `naomi2.zip`. A few games also need the corresponding
  game-specific archive, such as `airlbios.zip`, `f355bios.zip`, `f355dlx.zip`,
  or `hod2bios.zip`.

`BIOS/dc/` is the canonical folder for Dreamcast, Atomiswave, base Naomi, Naomi
GD-ROM, and Naomi 2. Central Scrutinizer's BIOS upload view targets this same
shared folder. Standalone and RetroArch Flycast both use `BIOS/dc/`.

All firmware and arcade BIOS archives are user-supplied. Leaf does not bundle,
download, or redistribute them.

Handheld systems like Neo Geo Pocket / Color need no BIOS; plain ROMs
just work.

RPG Maker 2000 and 2003 games need no BIOS either, but many need the RPG Maker
**RTP**, which goes in `BIOS/rtp/2000/` or `BIOS/rtp/2003/`. See
[The RPG Maker RTP](/guide/systems/#the-rpg-maker-rtp).

### Saturn: choosing a BIOS

**YabaSanshiro Standalone** can start a Saturn game two ways: with **HLE**, a
built-in stand-in for the console firmware, or with a real Saturn **BIOS** file
you supply. Neither is right for every game. Some titles only start with a real
BIOS; others only start under HLE. So the choice is yours, per game and per
system, rather than a global switch.

This applies only to **YabaSanshiro Standalone**. Select it with **Core** first
(press **X** on a Saturn game or on the Saturn system); the **Saturn BIOS** row
appears right below **Core** once it is in force. The RetroArch YabaSanshiro core
also uses `BIOS/SATURN/`, but it has no BIOS row because it selects its expected
firmware filename itself.

**Saturn BIOS** offers:

- **Default** - on a game, inherit whatever the Saturn system is set to. On the
  system, go back to HLE.
- **HLE** - no BIOS file. Use this to opt one game out of a BIOS you selected for
  the whole system.
- **Any BIOS file you have staged** - browse to it and press **A**.

Browsing starts at each installed SD card's `BIOS/SATURN/` folder. You do not
need a particular filename or extension for the standalone emulator: a regional
or renamed dump is fine, and subfolders below `SATURN/` are yours to organize.
Nothing is moved, renamed, or copied - Leaf only remembers which file you chose.

Only files of exactly 512 KiB are offered, because that is the size of a Saturn
BIOS image. That is a shape check, not a verification: a 512 KiB file could
belong to another console entirely, and even a genuine Saturn BIOS is not
guaranteed to work with every game. If a game misbehaves, try the other setting.

A game's own choice wins over the system's. **Reset Overrides** clears the BIOS
choice along with the core, name, and performance settings, at whichever level
you opened the menu.

#### Two cards, and files that go missing

If you run two SD cards, both cards' `BIOS/SATURN/` folders are offered, and Leaf
remembers *which card* your file came from. Two files with the same name on
different cards stay two different choices, and a system-wide selection keeps
pointing at the one file you picked no matter which card a given game lives on.

If the file you selected is later renamed, deleted, or is on a card that isn't
in the device, Leaf will **not** quietly fall back to HLE or to some other file.
The **Saturn BIOS** row says the selection is unavailable, and starting the game
is refused with an explanation, so you can put the file back or choose another
one. Nothing changes behind your back.

Switching **Core** to the RetroArch YabaSanshiro core keeps your standalone BIOS
choice on file: the row disappears and the choice is ignored for those launches,
including when the file is missing, and it comes back when you switch to the
standalone again.

## Arcade & Neo Geo: extra rules

Arcade emulation is the fussiest part of any handheld. A few things matter:

1. **Pick the right folder.** Leaf organizes arcade games by folder:
   - `Roms/ARCADE/` - the normal FinalBurn Neo arcade library.
   - `Roms/NEOGEO/` - all Neo Geo sets, arcade ones included. FinalBurn Neo
     treats Neo Geo as arcade, but Leaf gives Neo Geo its own system
     (see below).
   - `Roms/MAME/` - only if you intentionally maintain a MAME 03+ set.
2. **Match the ROM-set version.** Arcade cores only load ROM sets that match
   the core's expected version. A set from the wrong version silently fails to
   load even when the game name looks right.
3. **Keep them zipped.** Arcade games load from their `.zip` by exact filename;
   do not unzip or rename them (the opposite of some other systems).
4. **Parents & BIOS.** Clones reference their parent set (both must be present),
   and `neogeo.zip` acts as the shared BIOS for the whole Neo Geo library.

Once they load, Leaf shows arcade games under their real titles rather than the
cryptic ROM-set names - see
[Arcade names](/guide/games/#arcade-names) for how that works and how to override it.

### AES vs MVS: one Neo Geo folder

Leaf has no separate folders for the Neo Geo home console (AES) and arcade
cabinet (MVS) - they are one system. Put all Neo Geo games, home or arcade, in
`Roms/NEOGEO/`, zipped, with their original set names. Both are emulated by
FinalBurn Neo with the same `neogeo.zip` BIOS.

If you specifically want the home-console (AES) experience, that's a runtime
setting rather than a folder: while a Neo Geo game is running, open the
RetroArch in-game menu, go to **Core Options**, and set **Neo-Geo mode** to
AES. A BIOS containing the Universe BIOS also lets you pick console/region at
boot.

Note that `.neo` files (the NeoSD / Darksoft flashcart format) are not
supported: FinalBurn Neo needs the original zipped ROM sets instead.

## A note on the hardware

The Miniloong Pocket 1's CPU comfortably handles 8- and 16-bit systems and
handhelds. Heavier systems (e.g. anything approaching 3D-era consoles) are
demanding on this class of hardware; expect mixed results even with the right
core and BIOS in place.
