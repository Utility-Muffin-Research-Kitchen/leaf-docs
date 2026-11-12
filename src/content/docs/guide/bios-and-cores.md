---
title: BIOS files
description: Which systems need BIOS files, what to name them, and where to put them on the SD card. Leaf never ships BIOS files.
---

Some systems need a *BIOS*, the console's original startup firmware. It's
copyrighted, so Leaf never includes, downloads or redistributes BIOS files. You
supply your own, ideally dumped from hardware you own.

For which emulator runs each system, see
[Systems and emulators](/guide/systems/).

## Where BIOS files go

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

## Systems that need a BIOS

- **Neo Geo** - needs `neogeo.zip` in `BIOS/`. Without it, Neo Geo games appear
  but won't launch. The file has to be named exactly `neogeo.zip`. Files like
  `aes.zip` aren't used, and in a ROM folder they show up as a broken game.
- **Arcade (FinalBurn Neo)** - many arcade games depend on a BIOS or a parent
  ROM set. CPS games need their BIOS, for example. These go in `BIOS/` or
  alongside the game set. See
  [Arcade and Neo Geo](/guide/systems/#arcade-and-neo-geo).
- **Saturn** - put a Saturn BIOS in `BIOS/SATURN/`, for example `sega_101.bin`
  (Japanese) or `mpr-17933.bin` (US / European). Without one, Saturn games
  appear in the launcher but won't launch. **YabaSanshiro Standalone** starts
  without a BIOS and lets you pick one per game or per system. See
  [Saturn: choosing a BIOS](#saturn-choosing-a-bios).
- **Dreamcast** - `BIOS/dc/dc_boot.bin` is optional but recommended.
  `dc_flash.bin` isn't needed.
- **Atomiswave and Naomi** - put Flycast's arcade BIOS archives in `BIOS/dc/`.
  Atomiswave uses `awbios.zip`. Naomi and Naomi GD-ROM use `naomi.zip`, and
  Naomi 2 uses `naomi2.zip`. A few games also need their own archive, such as
  `airlbios.zip`, `f355bios.zip`, `f355dlx.zip`, or `hod2bios.zip`.
- **PlayStation** - games generally run without one, but a real BIOS in `BIOS/`
  (for example `scph5501.bin` for US games) improves compatibility.
- **NEC PC-98** - put np2kai firmware in `BIOS/np2kai/`. It needs `font.bmp` or
  `FONT.ROM` to draw text. Optional dumps such as `bios.rom`, `itf.rom`, and
  `sound.rom` go in the same folder and can improve compatibility, as do the
  YM2608 rhythm samples (`2608_BD.WAV`, `2608_SD.WAV`, `2608_TOP.WAV`,
  `2608_HH.WAV`, `2608_TOM.WAV`, and `2608_RIM.WAV`). Keep the filenames np2kai
  expects.
- **Amiga** - put Kickstart ROMs in `BIOS/puae/`. See
  [Amiga Kickstart files](#amiga-kickstart-files).
- **Pokémon mini** - optional. PokeMini boots every game with its built-in
  BIOS. If you have a dump of the real one, name it `bios.min` (4 KB) and put
  it directly in `BIOS/`, not in a subfolder, and PokeMini uses it. Central Scrutinizer has no BIOS
  view for Pokémon mini, so copy the file with **Files** or straight onto the
  card.
- **Nintendo DS** - optional. See [Nintendo DS](#nintendo-ds).

Standalone and RetroArch Flycast both read `BIOS/dc/`, and Central Scrutinizer's
BIOS upload for Dreamcast, Atomiswave and Naomi puts files there.

Neo Geo Pocket and Neo Geo Pocket Color need no BIOS. RPG Maker 2000 and 2003
games need none either, but many need the RPG Maker RTP, which goes in
`BIOS/rtp/2000/` or `BIOS/rtp/2003/`. See
[The RPG Maker RTP](/guide/systems/#the-rpg-maker-rtp).

## Amiga Kickstart files

Put every Kickstart ROM and related file in `BIOS/puae/`. Both Amiga cores read
that subfolder, and neither reads `BIOS/` itself or `BIOS/AMIGA/`. Spell it in
lowercase on a case-sensitive card. PUAE has a limited built-in fallback, but
the right Kickstart for the machine gives much better compatibility. These are
the common filenames, and the Amiga Forever names PUAE also accepts:

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

These are the sizes of raw ROM images. An encrypted Amiga Forever file may
include a header, so check the hashes in the
[PUAE documentation](https://docs.libretro.com/library/puae/#bios) as well as
the size.

- A500 games normally use Kickstart 1.3, and A1200 (AGA) games Kickstart 3.1.
- CDTV needs its extended ROM plus a base Kickstart.
- CD32 needs both CD32 files, or the combined image.
- If your Amiga Forever ROMs are encrypted, put their `rom.key` in `BIOS/puae/`
  too.

PUAE may create WHDLoad files of its own in this folder. Leaf updates leave them
in place.

## Nintendo DS

DraStic and Fun DraStic include DraStic's own free replacement BIOS, and most
games run on it with no setup. If you need original Nintendo files, for example
for encrypted ROMs, supply your own dumps with these names and sizes:

| File | Size |
| --- | --- |
| `nds_bios_arm7.bin` | 16 KB (16,384 bytes) |
| `nds_bios_arm9.bin` | 4 KB (4,096 bytes) |
| `nds_firmware.bin` | 256 KB (262,144 bytes) |

The two front ends read them from different places on your primary card:

- **Fun DraStic** reads them directly from `BIOS/`.
- **DraStic** reads them from `.umrk/mlp1/drastic/system/`.

`BIOS/NDS/` isn't read by either. A Leaf update doesn't replace files in either
location.

## Saturn: choosing a BIOS

The RetroArch YabaSanshiro core picks its BIOS from `BIOS/SATURN/` by filename,
so it has no setting for it. **YabaSanshiro Standalone** can start a game with
**HLE**, a built-in stand-in for the console firmware, or with a real BIOS file
you supply. Some games only start with a real BIOS and others only under HLE, so
you choose per game or per system.

Select **YabaSanshiro Standalone** with **Core** first (press **X** on a Saturn
game or on the Saturn system). The **Saturn BIOS** row then appears below
**Core** and offers:

- **Default** - on a game, use whatever the Saturn system is set to. On the
  system, go back to HLE.
- **HLE** - no BIOS file. Use this to opt one game out of a BIOS you selected for
  the whole system.
- **A BIOS file of your own** - browse to it and press **A**.

Browsing starts at each SD card's `BIOS/SATURN/` folder. The file can have any
name or extension, and you can organize it in subfolders. Only files of exactly
512 KiB are listed, because that's the size of a Saturn BIOS image. Leaf
remembers which file you chose and doesn't move or rename it. If a game
misbehaves, try the other setting.

A game's own choice wins over the system's. **Reset Game Overrides** or **Reset
System Overrides** clears the BIOS choice along with the core, name, and
performance settings.

If the file you chose is renamed, deleted, or on a card that isn't in the
device, the **Saturn BIOS** row says the selection is unavailable and the game
won't start until you put the file back or choose another. Leaf doesn't fall
back to HLE on its own. With two SD cards, a file with the same name on each
card counts as two different choices.

Switching **Core** to the RetroArch core keeps your standalone choice for when
you switch back.
