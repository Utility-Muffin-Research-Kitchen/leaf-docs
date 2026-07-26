---
title: RetroArch shaders
description: 'Load Leaf’s bundled GLSL presets, add your own shaders safely, and understand how they interact with Fugazi.'
---

:::caution[Coming soon]
The bundled shader library is not in the current release yet. This page
previews a feature that is on the way. Join the
[Discord](https://discord.gg/q5F7cZ7KRp) to hear when it lands.
:::

An upcoming Leaf release includes a small, curated set of GLSL shader presets
for RetroArch games. Nothing is enabled automatically: an unmodified install
keeps the original picture until you choose a preset.

Shaders apply only to games running through RetroArch. Standalone emulators such
as DraStic, PPSSPP, standalone Mupen64Plus, and standalone Flycast have their own
video settings.

## Load a bundled preset

1. Launch a game that uses RetroArch.
2. Press **MENU**, then open **RetroArch Settings**.
3. Open **Quick Menu → Shaders** and turn **Video Shaders** on.
4. Choose **Load Preset**.
5. Open **`leaf-recommended/`** and select a `.glslp` preset.
6. Use **Apply Changes** to preview it.

Leaf's four recommended presets are:

- **Sharp Pixels** — a broadly useful scaling filter that keeps pixel art crisp
  without adding a CRT effect.
- **Subtle Scanlines** — lightweight, reduced-darkness scanlines for NES,
  SNES, Mega Drive, PC Engine, and PlayStation-era games.
- **GBA Color** — tones down colors authored for the original Game Boy Advance
  screen. Use it only for GBA games.
- **GBC Color** — approximates the softer color response of a Game Boy Color
  screen. Use it only for GBC games.

These presets passed Leaf's visual checks and 60-second MLP1 performance tests.
GBA Color is qualified at 60 Hz and at 120 Hz with Black Frame Insertion off.
Do not combine mGBA with 120 Hz BFI: the core falls below full speed in that
mode even with no shader active. Scanlines and BFI both reduce brightness.

The **`shaders_glsl/`** folder contains the underlying advanced presets. Each
one passed Leaf's load and render checks, but it is not necessarily a
performance recommendation for every core or game. Test demanding content
before saving an advanced or multipass preset globally.

## Add your own shaders

Put custom shader files on the primary SD card under:

```text
.umrk/mlp1/retroarch/.config/retroarch/shaders/
```

The full device path is:

```text
/mnt/sdcard/.umrk/mlp1/retroarch/.config/retroarch/shaders/
```

Keep each preset's relative folder structure intact: a `.glslp` file may refer
to `.glsl` passes, LUT images, or other presets beside it. After copying the
files, set **Settings → Directory → Video Shaders** in RetroArch to that custom
directory, then return to **Quick Menu → Shaders → Load Preset**.

Leaf's RetroArch build accepts GLSL `.glslp` presets and `.glsl` shader passes.
Slang/Vulkan (`.slangp`/`.slang`) and Cg (`.cgp`/`.cg`) packs are not
compatible. Because `.umrk` is hidden on macOS and Linux, enable hidden-file
visibility in your file manager before browsing to it.

Do not add personal files under
`.system/leaf/platforms/mlp1/shaders/`. That directory belongs to the installed
Leaf release and is replaced during updates. The `.umrk/` directory is durable
user state and survives updates.

## Saving and removing a shader

After applying a preset, use **Quick Menu → Shaders → Save Preset** to save it
for the current game, content directory, core, or all RetroArch content. Use
the narrowest scope you need; a global preset can make systems with very
different resolutions look worse or run more slowly.

To return to the unfiltered image, open **Quick Menu → Shaders**, turn
**Video Shaders** off, and save the change at the same scope where the preset
was saved.

## Fugazi and manual presets

[Fugazi](/apps/fugazi/) creates an automatic global CRT preset. Applying or
clearing a look in Fugazi changes that automatic global preset; it does not
delete the bundled shaders or files you placed in your custom shader directory.

If a manually selected preset seems to come back on the next launch, check
whether Fugazi has a global look applied and clear it there first.

## If the preset browser is empty

`No items` on an older Leaf release means that release did not include the
shader bundle. Update Leaf, or install compatible GLSL files in the durable
custom directory above.

If the browser is still empty after updating, check **Settings → Directory →
Video Shaders**. As a last resort, use **Settings → System → Reset RetroArch
Config** to restore Leaf's default shader directory. This resets other
RetroArch settings too, so try correcting the directory first.
