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

Leaf's nine recommended presets are:

- **Sharp Pixels** — a broadly useful scaling filter that keeps pixel art crisp
  without adding a CRT effect.
- **Subtle Scanlines** — lightweight, reduced-darkness scanlines for NES,
  SNES, Mega Drive, PC Engine, and PlayStation-era games.
- **GBA Color** — tones down colors authored for the original Game Boy Advance
  screen. Use it only for GBA games.
- **GBC Color** — approximates the softer color response of a Game Boy Color
  screen. Use it only for GBC games.
- **Game Boy LCD**, **Game Boy Color LCD**, and **Game Boy Advance LCD** — fuller
  PT SkyWalker541 display simulations with a subtle backing texture, low-cost
  pixel grid, and system-specific tuning.
- **Sharp Shimmerless** — a sharper alternative for awkward non-integer scales
  where scrolling shimmer is visible.
- **CRT Lite** — a mild aperture mask and softened scanlines for 8-bit, 16-bit,
  and PlayStation-era games.

These presets passed Leaf's visual checks and 60-second MLP1 performance tests.
GBA Color is qualified at 60 Hz and at 120 Hz with Black Frame Insertion off.
Do not combine mGBA with 120 Hz BFI: the core falls below full speed in that
mode even with no shader active. Keep BFI off with CRT Lite; its PS1 test
measured 50.282 FPS with BFI, versus full speed at 60 and 120 Hz with BFI off.
Scanlines and BFI both reduce brightness.

The **`shaders_glsl/`** folder contains the underlying advanced presets. Each
qualified preset passed Leaf's load and render checks, but it is not
necessarily a performance recommendation for every core or game. The upcoming
bundle also carries a small candidate set traced directly to its original
upstreams:

- **[PT SkyWalker541](https://github.com/SkyWalker541/PT-SkyWalker541)** — a
  low-power handheld LCD and pixel-transparency shader with modes for Game Boy,
  Game Boy Color, and Game Boy Advance.
- **[Sharp Shimmerless](https://github.com/Woohyun-Kang/Sharp-Shimmerless-Shader)** —
  sharp non-integer scaling designed to avoid shimmer on low-resolution
  handheld screens.
- **CRT Hyllian Fast** and **CRT Lottes Fast** — lightweight CRT candidates.

PT SkyWalker541, Sharp Shimmerless, and CRT Hyllian Fast passed the full
game-content gates and back the recommended presets above. CRT Lottes Fast
loads safely but remains advanced-only: it measured 34.017 FPS even on Leaf's
lightweight visual fixture. Test demanding content before saving any other
advanced preset globally.

## Add your own shaders

Put custom shader files on the primary SD card under:

```text
.umrk/mlp1/retroarch/.config/retroarch/shaders/
```

On a normal single-card boot, the full device path is:

```text
/mnt/sdcard/.umrk/mlp1/retroarch/.config/retroarch/shaders/
```

With two cards inserted, Linux may mount the Leaf card at `/media/sdcard1`
instead. Treat the relative `.umrk/.../shaders/` path on the Leaf card as
canonical rather than hardcoding its current mount point.

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
Video Shaders**. Completely exit and relaunch the game after an update so Leaf
can refresh that directory if two SD cards changed mount points. As a last
resort, use **Settings → System → Reset RetroArch Config** to restore Leaf's
default shader directory. This resets other RetroArch settings too, so try
correcting the directory first.
