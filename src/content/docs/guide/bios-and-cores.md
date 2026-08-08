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
  full list.
- **Standalone N64** runs Nintendo 64 games from `Roms/N64/` through Leaf's
  packaged Mupen64Plus build. The standard RetroArch N64 core is still available
  as an alternate core, but standalone is the default because it gives Leaf more
  direct control over the video plugins, performance settings, save-and-quit
  handoff, and MLP1 display quirks.
- **Standalone Flycast** runs Dreamcast games from `Roms/DC/`. The RetroArch
  Flycast core is still available as an alternate core, but standalone is the
  default because it performs noticeably better on this hardware. Like the other
  standalone emulators it runs its own session: the Menu button opens Flycast's
  native menu, correctly oriented for the portrait-mounted screen, and the
  RetroArch in-game menu doesn't apply. VMU data and your Flycast settings are
  kept across Leaf updates - see
  [Dreamcast controls](/guide/playing/#dreamcast-standalone-flycast).

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

:::note
The heaviest systems (PSP, Dreamcast, N64) are demanding on this hardware. Whether
a given game runs at full speed varies by title; treat these as "best effort,"
not guaranteed.
:::

## BIOS (you supply these)

A *BIOS* is the copyrighted firmware from the original console. Leaf never
includes BIOS files, and it can't legally distribute them. This is standard
across all emulation projects: you provide your own, ideally dumped from
hardware you own.

### Where BIOS files go

Put them in the `BIOS/` folder at the root of the SD card:

```text
BIOS/
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
- **Saturn** - requires the Sega Saturn BIOS in `BIOS/`; the YabaSanshiro core
  will not boot without it. Provide the standard Saturn BIOS, for example
  `sega_101.bin` (Japanese) or `mpr-17933.bin` (US / European). Without one,
  Saturn games appear in the launcher but won't launch.
- **PlayStation** - games generally run without one, but a real BIOS in `BIOS/`
  (for example `scph5501.bin` for US titles) improves compatibility.

Handheld systems like Neo Geo Pocket / Color need no BIOS; plain ROMs
just work.

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

## A note on the hardware

The Miniloong Pocket 1's CPU comfortably handles 8- and 16-bit systems and
handhelds. Heavier systems (e.g. anything approaching 3D-era consoles) are
demanding on this class of hardware; expect mixed results even with the right
core and BIOS in place.
