---
title: Troubleshooting
description: Fixes for common issues with Leaf on the Miniloong Pocket 1.
---

Common issues and how to resolve them. If something here doesn't help, please
[open an issue](https://github.com/Utility-Muffin-Research-Kitchen).

## A system folder isn't showing up

A system only appears in the launcher once its core is present. If you added
games to, say, `Roms/PSX/` but PlayStation isn't listed, the core for that system
likely isn't installed. See [BIOS & cores](/guide/bios-and-cores/).

## I have the same console in two folders

Some consoles have older alias folder names (for example `Roms/FC` for NES,
`Roms/MD` for Genesis, `Roms/PS` for PlayStation, `Roms/TG16` for PC Engine).
Leaf still reads those, and combines them with the recommended folder into one
console in the launcher and in Central Scrutinizer - you won't get duplicate
entries. Going forward, add new games and box art to the recommended folder
listed in [Adding games & ROMs](/guide/games/#system-folders); you can move the
older folder's files there whenever you like, or just leave them.

## A game won't launch

- **Missing BIOS.** Some systems need a BIOS file you supply (e.g. Neo Geo needs
  `neogeo.zip` in `BIOS/`). The game appears but won't start without it.
- **Arcade ROM-set mismatch.** Arcade games must match the core's expected ROM-set
  version and stay zipped; don't unzip or rename them. For Atomiswave and Naomi,
  preserve the required shortname and any CHD subfolder. A wrong-version or
  renamed set silently fails to load.
- **Wrong folder.** Make sure the game is in the correct `Roms/<SYSTEM>/` folder.

See [Naomi and Atomiswave arcade sets](/guide/games/#naomi-and-atomiswave-arcade-sets),
[Adding games & ROMs](/guide/games/), and
[BIOS & cores](/guide/bios-and-cores/).

## Wi-Fi connects but there's no internet

The network can associate without finishing address setup, especially on
mixed-security (WPA2/WPA3) routers. Try:

1. Toggling Wi-Fi off and on (**Settings → Network**), or forgetting and rejoining
   the network.
2. Rebooting the device.

## Updates won't download

- Confirm Wi-Fi is connected and has working internet (**Settings → Network**).
- Make sure you're on a published release channel; a dev/test build may report
  "up to date" when no public release is newer.

See [Updating (OTA)](/guide/updating/).

## The device booted to stock instead of Leaf

This is Leaf's crash-safety fallback: if the launcher fails to start cleanly a
few times in a row, the device drops to the stock interface so you're never stuck.
Your games and settings are untouched.

**Fix:** just reboot. Leaf resumes on the next normal boot. See
[Recovery](/guide/recovery/).

## A game feels slow or laggy

Set **Settings → General → Game Performance** to **Performance** (or leave it on
**Auto**, which boosts heavier systems automatically). The most demanding systems
are at the edge of what this hardware can do; see the note in
[BIOS & cores](/guide/bios-and-cores/).

## The device sleeps or powers off on its own

Check the auto-sleep setting under **Settings → General**. If it's enabled and set
short, lengthen it or turn it off.

## Bluetooth audio stutters or cuts out

Wi-Fi and Bluetooth share one radio on this device, so heavy Wi-Fi use can interrupt
Bluetooth audio. For the cleanest listening, turn **Wi-Fi off** (**Settings →
Network**) while using Bluetooth headphones. If it still sounds rough, try re-pairing,
or test a different pair of earbuds to tell whether it's the device or the codec.

## A Bluetooth device won't reconnect

Open **Settings → Bluetooth** and connect it again. If it still won't, unpair it
(**Y**) and pair fresh. Some earbuds (Apple AirPods in particular) are reluctant to
reconnect to non-Apple hardware automatically and may need a manual reconnect each time.

## The stick doesn't reach full tilt

If characters walk when you push the stick all the way (or aiming feels clipped), the
stick's range needs calibrating. Open **Joe's Calibrage** from the **Apps** tab and run
**Calibrate**. See [Joe's Calibrage](/apps/joes-calibrage/).

## Black Frame Insertion is grayed out

Black Frame Insertion needs a refresh rate that is twice the game's frame rate, so that
every frame gets one lit refresh and one black one. At 60 Hz there is no spare refresh to
blank and the row shows "100/120 Hz only". Set **Settings → Display & Sound → Refresh
Rate** to **120** for 60fps games or **100** for 50fps (PAL) games, and the toggle becomes
available. The row then names the frame rate it is set up for, such as "On (50 fps)" -
match that to what you are playing, or a 60fps game running at 100 Hz will be paced down
to 50 and run slow. See [Settings → Display & Sound](/guide/settings/#display--sound).

## A RetroArch setting goes back after every launch

A short list of RetroArch settings is set by Leaf on each launch, so changing
one inside RetroArch only lasts for that session. Some correspond to Leaf
settings for audio, language, refresh rate, or recording. Others are fixed so
Leaf can work with RetroArch. [RetroArch settings](/guide/retroarch-settings/)
lists every one and explains whether you can change it elsewhere. Aspect ratio
and **Integer Scale** are on that list, and the same page shows how to keep them
per core with a RetroArch override.

If the setting is not on that list, quit properly (**MENU → Save & Quit**, or
**Main Menu → Quit RetroArch** in the app tile) rather than powering off from
inside RetroArch, and try again.

## A shader is missing, broken, or keeps returning

| Symptom | First action |
| --- | --- |
| A Leaf recommendation is missing | Update or reinstall Leaf. Do not use the Online Updater pack as a substitute for `leaf-recommended/` |
| An updater or custom shader fails | Check whether it compiled. A link failure falls back to the plain picture while RetroArch can still show the preset as loaded. Then restore its complete dependency tree |
| An Advanced shader disappears after restarting the game | **Load Preset** or **Apply Changes** alone does not create an automatic preset. Open **Manage Presets** and choose **Save Game Preset** or another matching scope before leaving the **Shaders** screen |
| A shader returns after reloading | Open **MENU > Shader**, choose **Off** at the scope that owns the saved preset, and let Leaf explain that a broader preset may return. Check Fugazi or another global preset too. A config override does not save or remove a shader |
| Fugazi says the state needs attention | Open its resolver and choose **Keep current**, **Restore previous**, or **Cancel**. Do not delete the preset files by hand |
| Leaf could not confirm the shader after a timeout | Reopen **Shader** or restart the game before saving another scope |

For a short recovery pass:

1. Open **MENU > Shader** and note what is active.
2. If Fugazi owns the global preset, open Fugazi and choose **Remove**.
3. Resolve **State needs attention** before applying Fugazi again.
4. Choose **Off** at the game, folder, or global scope that owns the old
   choice. For a native core preset, use RetroArch's **Manage Presets → Remove
   Core Preset**. You can also browse a Leaf recommendation over the frozen still.
5. Use **Advanced RetroArch menu** only for a custom or updater preset, or when
   support asks for verbose evidence. Use **Manage Presets > Save Game Preset**
   or the matching native automatic scope before leaving if the Advanced choice
   should persist.

See [RetroArch shaders](/guide/shaders/) for recommendation constraints,
automatic-preset precedence, custom dependency folders, and the difference
between a config override and a saved shader preset.

## Games, saves, or box art don't stick after a reboot

This is almost always a confused SD card, usually from losing power without a clean
shutdown. To avoid it, power the device down with **MENU → Power Off** rather than
yanking the charger or holding the power button. If files seem to be missing or the
launcher behaves oddly, put the card in a computer and let it repair the volume (on
Windows, "check disk"; on macOS, Disk Utility's "First Aid"), then reinsert it.
