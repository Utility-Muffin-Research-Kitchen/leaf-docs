---
title: RetroArch shaders
description: "Choose one of Leaf's shader presets, save it for a game, a folder or every game, and fix a shader that fails or keeps coming back."
---

Leaf includes shader presets for RetroArch games: sharper pixels, scanlines, CRT
masks, and handheld LCD looks. Nothing turns on by itself. You see the original
picture until you choose a preset.

Shaders only affect games running through RetroArch. Standalone emulators like
DraStic, PPSSPP, Mupen64Plus, and Flycast have their own video settings.

## Choose a Leaf recommendation

1. Launch a game that uses RetroArch.
2. Press **MENU**, then open **Shader**.
3. Use **Up** and **Down** to browse the recommendations over a frozen still of
   your game. Nothing is applied while you browse.
4. Use **Left** and **Right** to choose **This game** (the default), **This
   folder**, or **All RetroArch**.
5. Select a recommendation, or **Save current shader**. Leaf applies or saves it
   at that scope and resumes the game.

Press **B** to leave without applying anything. The picker lists only the
recommendations tested for the current system, so you won't see all thirteen at
once.

- **Sharp Pixels** keeps pixel art crisp without adding a CRT effect.
- **Sharp Shimmerless** keeps non-integer scaling sharp while reducing shimmer
  during scrolling.
- **Subtle Scanlines** adds lightweight scanlines for 8-bit, 16-bit, and
  PlayStation-era games.
- **CRT Lite** adds a mild aperture mask and softened scanlines without
  curvature.
- **CRT Sharp** combines crisp scaling, scanlines, and a flat aperture mask.
- **CRT Curved** adds curvature, rounded corners, scanlines, and an aperture
  mask. It crops slightly at the screen edges.
- **GBA Color** and **GBC Color** approximate the softer color response of the
  original handheld screens.
- **Game Boy LCD**, **Game Boy Color LCD**, and **Game Boy Advance LCD** add a
  stronger display simulation with a backing texture and pixel grid.
- **LCD Grid** adds a fine RGB handheld pixel grid.
- **LCD Grid Fast** is a lighter grid with softer cell edges.

### Shaders and Black Frame Insertion

- Keep **Black Frame Insertion** off with **GBA Color** and **Game Boy Advance
  LCD** when the game runs on mGBA, and with **CRT Lite**.
- Scanlines, LCD grids, and Black Frame Insertion each reduce brightness.
  Combining them reduces it further.

The picker's detail pane shows the warning that applies to the selected preset. If
a game runs below full speed, turn Black Frame Insertion off before you change the
shader.

## Save at the right scope

| Scope | What it affects |
| --- | --- |
| **This game** | The current game with its current core. This is the default |
| **This folder** | Games launched from the same folder with the same core |
| **All RetroArch** | Every RetroArch game. Leaf asks you to confirm, because this can replace Fugazi |

When more than one saved preset matches, the most specific wins: game, then folder,
then core, then global. Core presets can only be saved from RetroArch's own shader
screen.

A shader is only saved by the picker or by RetroArch's **Shaders > Manage Presets**.
Quitting RetroArch saves your other settings but not the shader, and **Save Core
Overrides**, **Save Content Directory Overrides** and **Save Game Overrides** don't
carry it either.

## Turn a shader off

Choose **Off** in the picker. It clears the running shader and removes the saved
preset at the selected scope. A preset saved at a broader scope can become active
the next time you start the game. Remove that one at its own scope too.

## Fugazi and global presets

[Fugazi](/apps/fugazi/) tunes one CRT effect and applies it to every RetroArch
game. It and an **All RetroArch** shader both use the global scope, so saving one
can replace the other. Fugazi asks before it replaces a global preset and keeps
that preset as a backup. If it later finds both a newer global preset and its
backup, it asks you to choose **Keep current**, **Restore previous**, or **Cancel**
the next time you open it. Don't delete the files by hand.

## Edit and save advanced presets

Choose **Advanced RetroArch menu** in the picker to open RetroArch's own **Shaders**
screen. The `leaf-bundled/` folder there holds the presets Leaf's recommendations
are built from. The scope you chose with **Left / Right** in the picker doesn't
carry into this screen.

1. Choose **Load Preset**.
2. If you edit its shader passes, choose **Apply Changes**.
3. Open **Manage Presets** and choose **Save Game Preset**, **Save Content Directory
   Preset**, **Save Core Preset**, or **Save Global Preset**.
4. Press **MENU** to return to the game.

**Save Current Preset** overwrites the preset file you loaded. It doesn't choose a
scope.

The bundle includes PT SkyWalker541 by
[SkyWalker541](https://github.com/SkyWalker541/PT-SkyWalker541), Sharp Shimmerless
by [Woohyun-Kang](https://github.com/Woohyun-Kang/Sharp-Shimmerless-Shader),
and lightweight CRT shaders from the
[libretro shader contributors](https://github.com/libretro/glsl-shaders).

## Download the full RetroArch collection

RetroArch's **Online Updater > Update GLSL Shaders** downloads the complete libretro
GLSL collection into `shaders_glsl/`. Let the download finish before you browse it.
These presets haven't all been tested on the Pocket 1, and some may not compile or
may run slowly.

Each shader folder is updated by something different:

- `leaf-recommended/` and `leaf-bundled/` are replaced by Leaf updates.
- `shaders_glsl/` is replaced by RetroArch's updater. Leaf updates leave it alone.
- `custom/` is yours. Leaf updates leave it alone too.

## Add your own shaders

Put your shader files on the primary SD card under:

```text
.umrk/mlp1/retroarch/.config/retroarch/shaders/custom/
```

`.umrk` begins with a dot, so macOS and Linux file managers hide it by default.

Copy a preset's whole folder. A `.glslp` file often points at `.glsl` passes, LUT
images, or other presets next to it, and without them it shows in the browser but
can't compile.

Only GLSL works: `.glslp` presets and `.glsl` passes. Slang (`.slangp`, `.slang`)
and Cg (`.cgp`, `.cg`) packs don't.

## A custom or downloaded shader does nothing

A shader that fails to compile falls back to the plain picture, even while RetroArch
still shows the preset as loaded.

1. Check that it's a GLSL preset.
2. Copy its complete folder again, with every file it points at.
3. Don't replace `zfast_crt_geo` by hand. Use **CRT Curved**, which is Leaf's
   working version of it.

## A shader won't apply or keeps coming back

| Message or symptom | What to do |
| --- | --- |
| A recommendation is missing | Update or reinstall Leaf. The downloaded collection isn't a substitute |
| The shader could not compile or link | The previous shader was restored. Choose another recommendation |
| RetroArch did not confirm the shader | Reopen **Shader**, or restart the game, before saving at another scope |
| The previous shader could not be restored | Restart the game, then check the active shader in **RetroArch Settings** |
| A shader returns after you reload | Remove the saved preset at the scope it was saved at, then check Fugazi and any other global preset |
| Fugazi says the state needs attention | Choose **Keep current**, **Restore previous**, or **Cancel** |

## The preset browser is empty

Check **Settings > Directory > Video Shaders** in RetroArch. It should point to
`.umrk/mlp1/retroarch/.config/retroarch/shaders/` and not one of the folders inside
it. Quit the game fully and start it again so Leaf can refresh the path.

As a last resort, **Settings > Games > Reset RetroArch Config** restores the
default shader directory. It also resets your other RetroArch settings; see
[RetroArch settings](/guide/retroarch-settings/#reset-the-retroarch-config).
