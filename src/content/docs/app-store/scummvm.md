---
title: ScummVM
description: Add ScummVM games to Leaf with the optional content pak and its bundled libretro core.
---

ScummVM runs many classic point-and-click adventures and other supported game
engines. Leaf's optional ScummVM content pak adds a dedicated **ScummVM** system,
the libretro core that runs it, artwork, and scraper metadata. It does not add an
app to the **Apps** tab.

:::note[Requires content-pak support]
The ScummVM pak requires Leaf 0.11, including compatible 0.11 beta builds, or
newer. Leaf 0.10 and earlier do not offer it in Pak Rat because they cannot
activate its system and core safely.
:::

## Install

On a compatible Leaf release, press **Menu**, open **Actions → Pak Rat**, choose
**ScummVM**, and install it over Wi-Fi. The package is large because it contains
the emulator core. When installation finishes, **ScummVM** appears with the
other systems rather than in **Apps**.

The pak is open source and independently packaged in the
[ScummVM-pak repository](https://github.com/Utility-Muffin-Research-Kitchen/ScummVM-pak).
It does not include any games.

## Add a game

Put each game's original data files in its own directory below
`Roms/SCUMMVM/`. In that same directory, create a small file whose extension is
`.scummvm` and whose contents are the game's ScummVM game ID.

For example:

```text
Roms/SCUMMVM/
  Kings Quest 1/
    Kings Quest 1.scummvm     contains: kq1
    ...your original game data files...
```

The hook contains only the id, such as `kq1`; it does not contain an absolute
path. Keeping it beside the game data lets the same card work whichever MLP1 SD
mount point is active after a reboot.

Press **MENU**, then choose **Actions → Rescan Library** after copying games. Leaf scans subdirectories,
so every per-game hook appears as its own title. Put artwork at
`Images/SCUMMVM/Kings Quest 1.png` for the example above, using the hook
filename without its extension. You can also download artwork with Leaf's
scraper when the game is recognized.

You can find game IDs in the
[ScummVM compatibility database](https://www.scummvm.org/compatibility/) or in
ScummVM's own detection output. The ID is not necessarily the same as the game
folder name. Use a game ID for a hook beside the data; a configured ScummVM
target instead depends on a saved path in `scummvm.ini`.

## Saves and limitations

Saves are written under Leaf's normal `Saves/ScummVM/` data area. The packaged
core currently reports no RetroArch savestate support, so use each game's normal
ScummVM save menu instead of the Leaf savestate actions.

Removing the content pak removes the system and emulator on the next rescan. It
does not remove your files under `Roms/`, `Images/`, `Saves/`, or `States/`.
