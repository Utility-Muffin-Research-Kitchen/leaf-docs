---
title: RetroArch settings
description: 'How Leaf stores RetroArch settings, when your changes are saved, which settings Leaf owns, and how to reset them.'
---

RetroArch has hundreds of settings of its own, and Leaf lets you change nearly
all of them. This page explains where those settings live, when a change is
written down, and why a handful of them go back to Leaf's values every time you
launch something.

You do not need any of this to play games. Read it if a setting you changed did
not stick.

## One shared base configuration

Leaf keeps a single RetroArch configuration and shares it across every game and
the RetroArch app tile. It lives on your primary SD card at:

```
.umrk/mlp1/retroarch/retroarch.cfg
```

Turn on rewind while playing a Mega Drive game and the next Game Boy game
starts with rewind on, unless a configuration override changes it. Core
options, input remaps, and overrides have their own files; the shared config
is the starting point for each session.

Aspect ratio and a few others are exceptions. See
[Settings Leaf owns](#settings-leaf-owns) below.

### The per-launch working copy

Every time RetroArch starts, Leaf builds it a fresh working copy in temporary
storage, named after the process that owns it:

```
/tmp/jawaka-runtime/retroarch-current-1234.cfg
```

RetroArch reads and writes that file for the length of the session. When it
exits, Leaf copies your changes back into the shared config above and deletes
the working copy.

**A new number in that filename on every launch is normal.** It is not a sign
that anything failed to save. The file is temporary, and the number is just the
process ID. The file Leaf actually keeps is `retroarch.cfg`.

## When your changes are saved

Leaf turns on RetroArch's **Save Configuration on Quit**, so your changes are
saved when RetroArch quits normally. You do not have to save by hand:

- Exit a game through **MENU → Save & Quit**, or
- in the RetroArch app tile, use **Main Menu → Quit RetroArch**.

Leaf hides the **Configuration File** menu. Quit normally to save the shared
configuration; see [Alternate configurations](#alternate-configurations).

### My changes disappeared after powering off

Pulling the power while RetroArch is running cannot be made safe. A hard power
cut, such as holding the power button until the device dies or letting the
battery run flat, stops the device before anything in memory reaches the card.
Settings changed in that session may be lost.

Leaf's own **Power Off** and **Reboot** handle the **RetroArch app tile**
properly: they ask RetroArch to quit, wait for it to save, and copy the config
back before the device goes down. If RetroArch hangs or the write fails, those
changes may not be saved. A failed copy leaves the previous shared config
intact; check for an error when you next return to the launcher.

**A running game is different.** Powering off or restarting with a game open
stops its process without the app tile's graceful quit sequence. Settings changed
during that session can be lost, and so can recent in-game progress: RetroArch
writes a game's save data when the game closes, so a game that never gets to
close may not have written it yet.

Leave a game with **MENU → Save & Quit** before powering off. That closes the
game through the normal save-and-quit sequence. A core must support the
kind of save you are using, and the SD card must be writable.

## Settings Leaf owns

A small number of RetroArch settings are set by Leaf on every launch. If you
change one of these in RetroArch's menus it will apply for the rest of that
session and then return to Leaf's value the next time you start a game.

This is deliberate. Each one is either wired to a Leaf setting that would
otherwise disagree with it, or it is part of how Leaf talks to RetroArch at all.

| What Leaf owns | Why, and where to change it instead |
| --- | --- |
| Save, save-state, system, and screenshot folders; per-core save sorting | Leaf decides where saves and states live, including for games on a second SD card. |
| Core and core-info folders, controller autoconfig folder | Set from the installed core and Leaf's packaged controller profiles. |
| Save-on-exit, the network command port, and pause-when-inactive | How Leaf saves your settings and drives RetroArch's menu, save states, and clean quit. Turning these off would break the in-game menu. |
| Audio device, driver, latency, and block size | Choose the output in **Settings → Display & Sound**. Leaf fixes the driver and buffering values. |
| Video driver, graphics context, threaded video | The working renderer for this device. |
| Refresh rate, black frame insertion | **Settings → Display & Sound**. |
| Aspect ratio, force aspect, integer scaling | Pinned to the core's own aspect with integer scaling off. There is no Leaf setting for these; see [Aspect ratio and integer scaling](#aspect-ratio-and-integer-scaling) below. |
| Menu driver, menu scale, menu theme, OK/Cancel button order, load-content animation | Device-appropriate defaults; OK/Cancel is matched to the console's own button layout. |
| Menu language | **Settings → General → Language**. |
| Autoconfig and config-override notifications | Suppressed so Leaf's own messages are not buried. |
| Configuration File menu | Hidden. See [Alternate configurations](#alternate-configurations) below. |
| Quit hotkey | Unbound. Quit through Leaf's in-game menu. The **Hotkey Enable** modifier is yours to change and defaults to **MENU**. |
| Automatic shader preset directory and loading | Leaf fixes the automatic-preset directory and enables shader loading on each launch. Remove an unwanted saved preset at its scope; disabling **Video Shaders** lasts only for the session. |
| Player count and per-player controller order | Set from the controllers connected at launch. See [Controllers](/guide/controllers/). |
| Save-state compression and thumbnails | Compression is off and thumbnails are on for Leaf's state browser. |
| Recording driver, preset, quality, and output folder | **Settings → Controls & Feedback → In-game Shortcuts → Recording** controls whether recording is enabled; Leaf fixes the remaining values. See [Recording](/guide/recording/). |
| Firmware check, built-in image viewer and media player, dummy core on shutdown | Device compatibility. |
| RetroAchievements enablement, account, password, and token | **Settings → Accounts**. Leaf hands these to RetroArch per session and keeps your password off the SD card. |

Settings outside this list, including rewind, run-ahead, overlays, cheats,
per-core options, and input remaps, are yours and persist normally. Shaders are
a separate case: a shader can be active for only the current session, while an
automatic shader preset has its own game, folder, core, and global precedence.
See [RetroArch shaders](/guide/shaders/) for how to save and remove those
presets.

## Aspect ratio and integer scaling

Leaf pins RetroArch's aspect ratio to **Core provided**, leaves **Force Aspect
Ratio** on, and leaves **Integer Scale** off, on every launch. Unlike the other
rows in the table above, these are not wired to a Leaf setting: there is nothing
in **Display & Sound** or anywhere else in Leaf that changes them. Turning
**Integer Scale** on in **Settings → Video → Scaling** works for the rest of that
session and is back off the next time you start a game.

If you want integer scaling for crisp pixels, save it as a **per-core override**.
Overrides are loaded after Leaf's values and win, so they survive relaunches:

1. Start a game on the core you want it for.
2. **MENU → RetroArch Settings**, then **Settings → Video → Scaling**, and turn
   **Integer Scale** on.
3. Back out to RetroArch's Quick Menu and choose **Overrides → Save Core
   Overrides**.

The setting now applies every time you play anything on that core. **Save Game
Overrides** and **Save Content Directory Overrides** in the same menu do the same
thing for one game or one folder. The files are kept on your primary card under
`.umrk/mlp1/retroarch/.config/retroarch/config/<Core Name>/`, and **Remove Core
Overrides** in that menu deletes the one in use.

One thing to know before you do this: while an override is loaded, RetroArch
stops writing the shared config on exit. That is RetroArch's own behaviour, and
it protects the shared config from absorbing the override's values. Other
RetroArch settings you change during a session on that core will not persist, so
make your ordinary settings changes first and save the override afterwards.

## Alternate configurations

RetroArch can normally keep several configuration files and switch between them
from its **Configuration File** menu. Leaf does not support that, and hides the
menu.

The reason is that **Save Main Configuration** and **Load Configuration** point
RetroArch at a different file. Leaf would go on copying back the one it handed
RetroArch at launch, so the session's changes would look saved and then vanish.
Rather than leave a menu that quietly loses work, Leaf removes it and saves your
changes automatically on exit instead.

This is only about whole alternate config files. The per-core overrides
described above are a different mechanism and still work.

If an older Leaf version left an alternate config on your card under
`.umrk/mlp1/retroarch/.config/retroarch/`, it is ignored. Leaf will not import
it for you, because picking the right one among several is guesswork and the
wrong pick would overwrite the settings you are using. Copy values across by
hand if you need them.

## Reset the RetroArch config

**Settings → General → Reset RetroArch Config** replaces the shared config with
Leaf's packaged defaults.

This erases the settings kept in that file, including the active shader setting,
rewind, overlays, and the rest of RetroArch's own menus. It does not remove
automatic shader preset files, so a saved game, folder, core, or global preset
can apply again after the reset. Use [RetroArch shaders](/guide/shaders/) to
remove those presets. Configuration overrides, per-core options, and input remaps are
stored in separate files and are not erased. Remove a configuration override
through **Quick Menu → Overrides** if you want to clear it too. Your games,
saves, and save states are untouched. Use this when RetroArch is misbehaving
and you would rather start clean than find the setting that caused it. See
[Troubleshooting](/guide/troubleshooting/).

## A setting still won't stick

1. Check the table above. If Leaf owns it, change it from the Leaf setting named
   there instead. For aspect ratio and integer scaling there is no Leaf setting -
   save a core override instead, as described in
   [Aspect ratio and integer scaling](#aspect-ratio-and-integer-scaling).
2. Quit properly with **MENU → Save & Quit**, or use **Quit RetroArch** in the
   app tile. Do not power off from inside RetroArch.
3. Check whether a core, folder, or game override is loaded. It can replace the
   shared value and prevents RetroArch from saving the shared config on exit.
4. If none of these explains it, report which setting changed and exactly how
   you left RetroArch.
