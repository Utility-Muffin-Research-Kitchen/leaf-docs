---
title: BIOS & cores
description: What cores and BIOS files are, why Leaf never ships BIOS, and how to add the BIOS files some systems need.
---

Two things make a game run: a *core* (the emulator) and, for some systems, a
*BIOS* (the console's original startup firmware). Leaf handles cores for you;
BIOS files you must supply yourself.

## Cores (the emulators)

A *core* is the emulator for a given system. Every supported system's emulator
ships in the release, so games are ready to play as soon as your ROMs are in
place; a system shows up in the launcher once its emulator is present on the
device. Each emulator is the work of its own authors: the full license text and
a pointer to the source for every one ships inside the install under
`licenses/`.

Under the hood:

- **RetroArch cores** handle the bulk of systems. Leaf's cores are built with a
  core builder forked from [spruceOS](https://github.com/spruceUI)'s build lane,
  which is itself downstream of
  [libretro-super](https://github.com/libretro/libretro-super) (the same source
  the wider libretro ecosystem uses), so they track upstream rather than being
  hand-maintained forks.
- **Standalone PPSSPP** runs PSP games; a dedicated build outperforms the
  RetroArch core on this hardware. PSP ROMs can be `.chd`, `.iso`, `.cso`, or
  `.pbp`, and PSP needs no BIOS. It comes in two flavors, **PPSSPP (Vulkan)** as
  the default and **PPSSPP (GLES)** as a fallback, switchable with **Core**.
  Standalone sessions work a little differently: the Menu button opens PPSSPP's
  pause menu, and the RetroArch in-game menu and save states don't apply. Volume
  keys work as usual - see
  [PSP controls](/guide/playing/#psp-standalone-ppsspp) for the details.
- **Standalone DraStic** runs Nintendo DS games (`.nds`) from `Roms/NDS/`, and
  needs no BIOS of your own. Like PPSSPP it's a standalone session: the Menu
  button opens DraStic's own menu (save states, options, and the second-screen
  layout live there), so the RetroArch in-game menu doesn't apply. Volume keys
  work as usual. DraStic uses **MENU** as a modifier for save states, layouts, and
  the transparent second screen - see
  [Nintendo DS controls](/guide/playing/#nintendo-ds-standalone-drastic) for the
  full list. **Fun DraStic** is an alternate front end for the same emulator,
  selectable per game - see [Nintendo DS](#nintendo-ds) below.
- **Standalone N64** runs Nintendo 64 games from `Roms/N64/` through Leaf's
  packaged Mupen64Plus build. The standard RetroArch N64 core is still available
  as an alternate core, but standalone is the default because it gives Leaf more
  direct control over the video plugins, performance settings, save-and-quit
  handoff, and MLP1 display quirks.
- **Standalone Flycast** runs Dreamcast, Atomiswave, and Naomi games from
  `Roms/DC/`, `Roms/ATOMISWAVE/`, and `Roms/NAOMI/`. It is the default for all
  three systems; the RetroArch Flycast core remains an alternate, followed by
  KM Flycast Xtreme when that optional core is installed. Like the other
  standalone emulators it runs its own session: the Menu button opens Flycast's
  native menu, correctly oriented for the portrait-mounted screen, and the
  RetroArch in-game menu doesn't apply. VMU data, save states, and settings use
  the same durable Flycast locations for all three systems and survive Leaf
  updates - see [Flycast controls](/guide/playing/#dreamcast-atomiswave-and-naomi-standalone-flycast).
- **Standalone YabaSanshiro** is an optional, faster Saturn route for directly
  launched `.ccd`, `.chd`, `.cue`, `.iso`, and `.mds` games. RetroArch
  YabaSanshiro remains the default because its playlists, compressed-game
  handling, menu, and disc controls are more complete. The standalone emulator
  uses its own native menu and save-state format; see
  [Saturn controls](/guide/playing/#saturn-optional-standalone-yabasanshiro).
- **Neko Project II kai** runs NEC PC-98 software from `Roms/PC98/` through
  RetroArch. It supports disk control for multi-disk software and uses firmware
  from `BIOS/np2kai/` when supplied.
- **PUAE 2021** runs Amiga OCS/ECS, AGA, CDTV, and CD32 content from
  `Roms/AMIGA/` through RetroArch. **PUAE** is available as an alternate through
  **Core**. Both support disk control and use model-specific Kickstart firmware
  from `BIOS/puae/`.

Because Leaf runs upstream RetroArch, features that upstream adds (including
RetroAchievements with compatible cores) come along for the ride rather than
needing to be reimplemented.

When a system has more than one emulator, you don't need a second ROM folder for
it. Keep all of that console's games in its one folder and switch emulators with
the **Core** option (press **X** on a game or system; see
[Adding games](/guide/games/#options-menu)). For example, Game Boy Advance games
all live in `Roms/GBA/` whichever core you pick.

### Game Boy Advance: mGBA vs gpSP

Leaf keeps **mGBA** as the default because it has the broader compatibility and
accuracy. **gpSP** is available as a faster alternate: on the MLP1 it delivered
about 1.86 times mGBA's fast-forward rate in a matched reference test scene.
Normal-speed play, zipped games, in-game saves, and save states all work through
the gpSP path.

To try gpSP for one game, press **X** on that game, choose **Core**, then choose
**gpSP**. To return to mGBA, choose **mGBA**, or use **Reset Overrides** to clear
the game's custom core and return to the system default.

The two cores keep their saves and save states separate. A save made in one core
does not appear in the other, and their save-state formats are not compatible.
Do not copy or move save states between mGBA and gpSP; switch back to the core
that created the state instead.

Use mGBA when a title fails under gpSP. For example, the homebrew game *Glory
Hunters* exits under the current gpSP build but works in mGBA. A commercial game
with an in-game clock works with gpSP's default automatic RTC setting, but a
strict RTC test ROM fails there and passes in mGBA, so mGBA is also the safer
choice for RTC homebrew, test software, and ROM hacks. No manual gpSP RTC setting
is normally needed.

### Nintendo 64: standard vs standalone

Leaf lists Nintendo 64 as one system, with one ROM folder: `Roms/N64/`.
The difference is the emulator selected by the **Core** option:

- **Mupen64Plus Standalone** is Leaf's default. It is a native Mupen64Plus
  package with Rice and GLideN64 video plugins, plus a Leaf-themed overlay for
  save states, per-game settings, and save-and-quit resume.
- **Mupen64Plus Next** is the standard RetroArch/libretro N64 core. Choose it if
  a specific game behaves better there, or if you specifically need RetroArch's
  own in-game menu, shaders, or RetroAchievements path for that title.

We default to standalone because N64 is one of the hardest systems for the MLP1:
the native package gives us tighter control over rendering, display rotation,
and game-specific settings than the generic RetroArch core path. That makes it
the better baseline for the device, while keeping the RetroArch core available
as a compatibility fallback.

### Saturn: RetroArch vs standalone

Leaf keeps **YabaSanshiro** in RetroArch as the Saturn default. It provides the
normal Leaf and RetroArch menus and is the route used for `.m3u` playlists and
`.zip` files.

**YabaSanshiro Standalone** is an optional faster route for direct `.ccd`,
`.chd`, `.cue`, `.iso`, and `.mds` launches. Pick it with **Core** for a
compatible game. It is not offered for `.m3u` or `.zip` entries because those
formats fail in the standalone frontend.

The two routes use different save-state formats, which are not compatible. Standalone uses `Saves/YabaSanshiro/` and
`States/YabaSanshiro/`; switch back to the emulator that created a state rather
than moving states between them.

:::note
The heaviest systems (PSP, Dreamcast, N64) are demanding on this hardware. Whether
a given game runs at full speed varies by title; treat these as "best effort,"
not guaranteed.
:::

### Nintendo DS

Leaf lists Nintendo DS as one system, with one ROM folder: `Roms/NDS/`. Two front
ends are available through the **Core** option:

- **DraStic** is the default, using [Steward Fu](https://github.com/steward-fu/nds)'s
  front end. It's what the [Nintendo DS controls](/guide/playing/#nintendo-ds-standalone-drastic)
  describe.
- **Fun DraStic** is by [tenlevels](https://github.com/tenlevels): a redesigned
  menu, screen overlays, extra screen layouts, and themes.

Both run the same closed-source DraStic emulator binary. Choose the front end
whose menus, layouts, and controls you prefer; the alternate interface does
not provide a newer emulator core.

To move a game across, press **X** on it, choose **Core**, and pick the other
one. To put it back on the default, choose **Core** again and pick **DraStic**, or
use **Reset Override** to clear the per-game choice entirely.

Your in-game saves are shared, so a game keeps its progress whichever front end
you play it in. Save states and settings are not shared: each front end keeps its
own, and a save state you made in one won't be there in the other. Save in-game
before you switch.

Neither one needs a BIOS file of your own; both include DraStic's own free
replacement BIOS, and most games run on it with no setup at all.

If you need original Nintendo files, for example for encrypted ROMs, supply
your own dumps using these names and sizes:

| File | Size |
| --- | --- |
| `nds_bios_arm7.bin` | 16 KB (16,384 bytes) |
| `nds_bios_arm9.bin` | 4 KB (4,096 bytes) |
| `nds_firmware.bin` | 256 KB (262,144 bytes) |

The two front ends read them from different places on your primary card:

- **Fun DraStic** reads them directly from `BIOS/`.
- **DraStic** reads them from `.umrk/mlp1/drastic/system/`, which is its durable
  runtime data folder.

Putting them in `BIOS/NDS/` does not make them available to both front ends.
Neither location above is replaced by a Leaf update. Your DS username,
birthday, favourite colour, and language are emulator settings; supplying
`nds_firmware.bin` does not import those settings from your console.

Both front ends accept `.nds` files, and `.zip` and `.7z` archives containing
one.

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
