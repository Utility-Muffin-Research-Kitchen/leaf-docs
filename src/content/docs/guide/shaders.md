---
title: RetroArch shaders
description: 'Load Leaf’s bundled GLSL presets, add your own shaders safely, and understand how they interact with Fugazi.'
---

:::caution[Coming soon]
The bundled shader library is not in the current release yet. This page
previews a feature that is on the way. Join the
[Discord](https://discord.gg/q5F7cZ7KRp) to hear when it lands.
:::

An upcoming Leaf release adds a small, curated set of GLSL shader presets for
RetroArch games. Nothing switches on by itself. A fresh install shows the
original picture until you pick a preset.

Shaders only affect games running through RetroArch. Standalone emulators like
DraStic, PPSSPP, Mupen64Plus, and Flycast have their own video settings.

## Load a bundled preset

1. Launch a game that uses RetroArch.
2. Press **MENU**, then open **RetroArch Settings**.
3. Open **Quick Menu → Shaders** and turn **Video Shaders** on.
4. Choose **Load Preset**.
5. Open **`leaf-recommended/`** and pick a `.glslp` preset.
6. Choose **Apply Changes** to see it.

There are nine to choose from:

- **Sharp Pixels** keeps pixel art crisp at any scale, with no CRT effect. A
  good first choice if you are not sure what you want.
- **Subtle Scanlines** adds light scanlines without much of the usual darkening.
  Suits NES, SNES, Mega Drive, PC Engine, and PlayStation.
- **GBA Color** tames colors that were authored for the original Game Boy
  Advance screen, which look oversaturated on a modern panel. GBA games only.
- **GBC Color** does the same for the softer response of a Game Boy Color
  screen. GBC games only.
- **Game Boy LCD**, **Game Boy Color LCD**, and **Game Boy Advance LCD** go
  further than the color presets. Each simulates the handheld's actual display,
  with a faint backing texture and a cheap pixel grid tuned per system.
- **Sharp Shimmerless** is the one to reach for when a game lands on an awkward
  non-integer scale and scrolling starts to shimmer.
- **CRT Lite** applies a mild aperture mask and softened scanlines. Aimed at
  8-bit, 16-bit, and PlayStation-era games.

All nine passed Leaf's visual checks and a 60-second performance test on the
MLP1, but a couple carry caveats worth knowing before you save one.

**GBA Color** is cleared for 60 Hz, and for 120 Hz as long as Black Frame
Insertion is off. That is not really the shader's doing: mGBA drops below full
speed at 120 Hz with BFI even when no shader is running at all, so keep those
two apart regardless.

**CRT Lite** also wants BFI off. A PlayStation test with both enabled fell to
around 50 fps, against full speed at 60 Hz and 120 Hz with BFI off.

Worth remembering generally: scanlines and BFI each cost you some brightness,
and using both costs more.

## Going further

The **`shaders_glsl/`** folder holds the advanced presets the recommended ones
are built from. Everything there loads and renders correctly, but that is a
lower bar than the recommended set clears, and it says nothing about how a given
preset performs on a particular core or game.

The bundle also carries a few candidates kept traceable to where they came from:

- **[PT SkyWalker541](https://github.com/SkyWalker541/PT-SkyWalker541)**, a
  low-power handheld LCD and pixel-transparency shader with Game Boy, Game Boy
  Color, and Game Boy Advance modes.
- **[Sharp Shimmerless](https://github.com/Woohyun-Kang/Sharp-Shimmerless-Shader)**,
  built for sharp non-integer scaling without shimmer on small screens.
- **CRT Hyllian Fast** and **CRT Lottes Fast**, two lightweight CRT options.

The first three cleared testing against real game content and are what the
recommended presets are made from. **CRT Lottes Fast** did not. It loads safely
enough, but it managed only about 34 fps on Leaf's deliberately lightweight test
scene, so it stays in the advanced folder. Treat that as a warning about the
folder in general: try a preset on demanding content before you save it
globally.

## Add your own shaders

Custom shader files go on the primary SD card, under:

```text
.umrk/mlp1/retroarch/.config/retroarch/shaders/
```

Booting from a single card, that is:

```text
/mnt/sdcard/.umrk/mlp1/retroarch/.config/retroarch/shaders/
```

With two cards in, Linux may mount the Leaf card at `/media/sdcard1` instead, so
treat the relative `.umrk/.../shaders/` path as the real answer and do not
hardcode a mount point.

Keep each preset's folder structure as you found it. A `.glslp` file often
points at `.glsl` passes, LUT images, or other presets sitting next to it. Once
the files are in place, point **Settings → Directory → Video Shaders** at your
custom directory, then go back to **Quick Menu → Shaders → Load Preset**.

Leaf's RetroArch build reads GLSL: `.glslp` presets and `.glsl` passes.
Slang/Vulkan (`.slangp`, `.slang`) and Cg (`.cgp`, `.cg`) packs will not work.
And because `.umrk` starts with a dot, macOS and Linux file managers hide it by
default, so turn on hidden files before going looking for it.

One directory to leave alone: `.system/leaf/platforms/mlp1/shaders/` belongs to
the installed release and is replaced on every update, so anything personal you
put there is gone next time. `.umrk/` is durable user state and survives.

## Saving and removing a shader

Once a preset looks right, **Quick Menu → Shaders → Save Preset** keeps it for
the current game, the content directory, the core, or all RetroArch content.
Pick the narrowest scope that does the job. A global preset has to suit systems
with wildly different resolutions, and it will usually end up looking worse or
running slower on some of them.

To go back to the plain image, open **Quick Menu → Shaders**, turn **Video
Shaders** off, and save at the same scope you saved the preset at. Saving at a
different scope leaves the original in place.

## Fugazi and manual presets

[Fugazi](/apps/fugazi/) works by writing an automatic global CRT preset.
Applying or clearing a look there rewrites that one preset, and leaves the
bundled shaders and anything in your custom directory untouched.

So if a preset you chose by hand keeps reappearing after a relaunch, Fugazi
probably has a global look applied. Clear it there first.

## If the preset browser is empty

`No items` on an older Leaf release just means that release predates the shader
bundle. Update Leaf, or put your own GLSL files in the custom directory above.

If it is still empty after updating, check **Settings → Directory → Video
Shaders**. Fully exit and relaunch the game as well, which gives Leaf a chance
to refresh that directory if two SD cards have swapped mount points. Failing
all that, **Settings → System → Reset RetroArch Config** restores the default
shader directory, but it resets your other RetroArch settings too, so try
fixing the directory by hand first.
