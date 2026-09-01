---
title: RetroArch shaders
description: "Choose Leaf's qualified GLSL presets, save them at the right scope, and recover safely from custom shader or Fugazi conflicts."
---

Leaf includes qualified GLSL shader presets for RetroArch games. Nothing turns
on by itself. A fresh install shows the original picture until you choose a
preset.

Shaders only affect games running through RetroArch. Standalone emulators like
DraStic, PPSSPP, Mupen64Plus, and Flycast have their own video settings.

## Choose a Leaf recommendation

1. Launch a game that uses RetroArch.
2. Press **MENU**, then open **Shader**.
3. Move through the recommendations to preview them over the paused game.
4. Select one and save it for **This game** unless you deliberately want a
   broader scope.
5. Use **Advanced RetroArch menu** only when you need the full preset browser.

Press **B** before saving to restore the shader that was active when you opened
the picker. **Off** disables shaders for this session. A session choice ends
when RetroArch reloads content or exits.

The picker shows only recommendations that Leaf qualified for the active
system, so you won't see all thirteen at once:

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

The installed manifest is authoritative if this list changes in a later Leaf
release.

### Refresh rate and BFI caveats

All thirteen recommendations passed Leaf's visual and performance checks on the
MLP1, but a few combinations need care:

- Keep Black Frame Insertion off with **GBA Color** and **Game Boy Advance LCD**
  when using mGBA. The no-shader mGBA control already falls below full speed at
  120 Hz with BFI, so the picker shows that warning instead of blaming the
  shader.
- Keep BFI off with **CRT Lite**. A PlayStation test at 120 Hz with BFI measured
  about 50 fps, while the 60 Hz and 120 Hz tests with BFI off ran at full speed.
- Scanlines, LCD grids, and BFI all reduce brightness. Combining them reduces it
  further.

The picker detail pane shows the most relevant constraint for the selected
preset. If a game runs below full speed, turn BFI off before changing the
shader.

## Save at the right scope

After a successful preview, Leaf offers these scopes:

| Scope | What it affects |
| --- | --- |
| **This game** | Only the current game. This is the default and safest choice |
| **This folder** | Games launched from the same content folder |
| **This core** | Every game using the active libretro core |
| **All RetroArch** | Every RetroArch game. Leaf asks for confirmation because this can replace Fugazi |
| **This session** | The running content only. Reloading content or exiting RetroArch ends it |

Within Leaf's canonical automatic-preset directory, RetroArch checks game,
folder, core, then global, from most specific to least specific. A more specific
preset wins.

There is one legacy exception. RetroArch searches automatic-preset directories
in order before it tries every specificity. A global preset in an earlier old
or fallback directory can therefore beat a game preset in a later directory.
If the result looks impossible, remove the legacy preset instead of adding more
overrides.

### Three saves that do different jobs

- **Save Main Configuration** stores general RetroArch settings. It does not
  create an automatic shader preset.
- **Save Override** stores core, folder, or game configuration changes. A config
  override does not carry the active shader.
- **Save Shader Preset** creates the automatic shader preset that persists the
  shader.

Saving a config override while a shader is visible does not save that shader.
A loaded global shader also keeps returning until you remove it or save a more
specific shader preset.

## Turn a saved shader off

Choosing **Off > This session** clears only the running session. A saved shader
can return after a content reload.

To remove it permanently, choose **Off > Remove saved preset**, then select the
same scope that owns it. Removing a game preset does not remove a core or global
preset. A broader preset may become active on the next content launch, and Leaf
says so instead of creating a fake no-shader preset.

## Fugazi and global presets

[Fugazi](/apps/fugazi/) is the specialized global CRT tuner. The Leaf shader
picker is the common path for recommendations; use Fugazi when you want to tune
its CRT effect across every RetroArch game.

- **Reset** changes Fugazi's tuner values only. It does not uninstall anything.
- **Apply** installs Fugazi globally. If another global preset is active,
  Fugazi asks before replacing it and preserves that preset as one backup.
- **Remove** disables Fugazi and restores the preserved preset when one exists.
- If Fugazi finds another current global preset while it still holds a backup,
  choose **Keep current**, **Restore previous**, or **Cancel**. Do not delete the
  files by hand.

Saving another **All RetroArch** shader can replace Fugazi later. If that leaves
a current preset and Fugazi backup together, Fugazi shows the resolver the next
time you open it.

## Browse advanced presets

Choose **Advanced RetroArch menu**, then open **Quick Menu > Shaders**. The
**`leaf-bundled/`** folder holds the qualified advanced presets that Leaf's
recommendations reference. Everything there loads and renders correctly, but
it may not suit every core or game.

Four formerly reported candidates are now stable recommendation names:
**LCD Grid**, **LCD Grid Fast**, **CRT Sharp**, and **CRT Curved**.
`zfast-composite` remains advanced-only because its measured audio underrun was
much higher than the alternatives even though its frame-rate counter stayed at
60 fps. **CRT Lottes Fast** also remains advanced-only after measuring about
34 fps on a lightweight test scene.

The bundle includes work from
**[PT SkyWalker541](https://github.com/SkyWalker541/PT-SkyWalker541)** and
**[Sharp Shimmerless](https://github.com/Woohyun-Kang/Sharp-Shimmerless-Shader)**,
along with lightweight CRT shaders from the libretro collection.

## Download the full RetroArch collection

::::caution[Official does not mean qualified]
The official GLSL collection is not guaranteed to be compatible or fast on
every OpenGL ES driver. Leaf qualifies only **`leaf-recommended/`** for the
MLP1.
::::

RetroArch's **Online Updater > Update GLSL Shaders** downloads the complete
official libretro GLSL collection into **`shaders_glsl/`**. The updater tree is
complete and byte-identical to upstream; it is not a broken or partial Leaf
copy. Its presets simply have not passed Leaf's MLP1 performance and visual
checks.

The folders have separate owners:

- **`leaf-recommended/`** and **`leaf-bundled/`** are refreshed by Leaf updates.
- **`shaders_glsl/`** is refreshed by RetroArch's updater.
- **`custom/`** is yours.

Leaf updates preserve the updater and custom folders. Updating GLSL shaders
does not overwrite Leaf's pinned dependencies.

## Add your own shaders

Custom shader files go on the primary SD card under:

```text
.umrk/mlp1/retroarch/.config/retroarch/shaders/custom/
```

With one card this is usually below `/mnt/sdcard/`. With two cards, Linux may
mount the Leaf card at `/media/sdcard1` instead. Treat the relative `.umrk/`
path as the real answer and do not hardcode a mount point.

Keep the dependency folder structure exactly as you found it. A `.glslp` file
often references `.glsl` passes, LUT images, or other presets next to it.
Copying only the `.glslp` file can leave the preset visible in the browser but
unable to compile.

Leaf's RetroArch build supports GLSL `.glslp` presets and `.glsl` passes.
Slang/Vulkan (`.slangp`, `.slang`) and Cg (`.cgp`, `.cg`) packs do not work on
MLP1. Because `.umrk` begins with a dot, macOS and Linux file managers hide it
by default.

Leave `.system/leaf/platforms/mlp1/shaders/` alone. It is Leaf's
manifest-validated source bundle and is replaced during an update. The browser,
updater collection, and personal shaders live in durable `.umrk/` state.

## A custom or updater shader fails

First find out whether it compiled. A link failure silently falls back to the
plain picture even while RetroArch still shows the preset as loaded. The Leaf
picker reports that failure directly for recommendations and restores the
previous shader.

For an advanced preset:

1. Confirm it is GLSL and suitable for an OpenGL ES driver.
2. Restore its complete dependency tree.
3. Reproduce it from **Advanced RetroArch menu** with verbose RetroArch logging
   enabled if support asks for evidence.

Do not replace `zfast_crt_geo` by hand. Use Leaf's **CRT Curved** preset, which
contains a guarded local compatibility patch. The same unpatched shader also
fails on the stock OS, so stock is not a working fallback.

## Recovery messages

| Message or symptom | What to do |
| --- | --- |
| A recommendation is missing | Update or reinstall Leaf. Do not use the updater pack as a substitute |
| The shader could not compile or link | The previous shader was restored. Use another recommendation or troubleshoot the advanced preset's driver support and dependencies |
| RetroArch did not confirm the shader | Reopen **Shader** or restart the game before saving another scope |
| The previous shader could not be restored | Reopen the game, then use **RetroArch Settings** to inspect the active shader |
| A shader returns after reload | Remove the saved preset at its owning scope and check Fugazi or another global preset |
| Fugazi says the state needs attention | Deliberately choose **Keep current**, **Restore previous**, or **Cancel** |

## If the preset browser is empty

An older Leaf release may predate the shader bundle. Update Leaf first.

If the browser is still empty, check **Settings > Directory > Video Shaders**.
It should point to the durable
`.umrk/mlp1/retroarch/.config/retroarch/shaders/` root, not one of its child
folders. Fully exit and relaunch the game so Leaf can refresh the path after an
SD mount swap.

As a last resort, **Settings > System > Reset RetroArch Config** restores the
default shader directory, but it also resets your other RetroArch settings.
