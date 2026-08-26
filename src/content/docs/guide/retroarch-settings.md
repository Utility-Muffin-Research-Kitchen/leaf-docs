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

## One config, shared by everything

Leaf keeps a single RetroArch configuration and shares it across every game and
the RetroArch app tile. It lives on your primary SD card at:

```
.umrk/mlp1/retroarch/retroarch.cfg
```

Turn on rewind while playing a Mega Drive game and the next Game Boy game
starts with rewind on. There is one set of RetroArch settings on the device,
not one per system or per core.

(Aspect ratio and a few others behave differently — see
[Settings Leaf owns](#settings-leaf-owns) below.)

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
that anything failed to save — the file is meant to be temporary, and the number
is just the process id. The file Leaf actually keeps is `retroarch.cfg`.

## When your changes are saved

Leaf turns on RetroArch's **Save Configuration On Exit**, so **quitting normally
saves everything**. You do not have to save by hand:

- Exit a game through **MENU → Save & Quit**, or
- in the RetroArch app tile, use **Main Menu → Quit RetroArch**.

**Save Current Configuration** (in RetroArch's Configuration File menu, where
that menu is available) also works, and is a reasonable habit if you have just
made a change you care about.

### What is not guaranteed

Pulling the power while RetroArch is running cannot be made safe. A hard power
cut — holding the power button until the device dies, or pulling a dead
battery — stops the device before anything in memory reaches the card. Settings
changed in that session may be lost, and that is true of any device.

Leaf's own **Power off** and **Restart** handle the **RetroArch app tile**
properly: they ask RetroArch to quit, wait for it to save, and copy the config
back before the device goes down. If Leaf cannot write the settings back it says
so on screen, and the previous configuration is left intact either way.

**A running game is different.** Powering off or restarting with a game open
stops it quickly and does not wait for RetroArch to save, so settings you
changed during that session can be lost. Leave a game with **MENU → Save &
Quit** first. Your game saves and save states are not affected by this — only
RetroArch's own settings.

## Settings Leaf owns

A small number of RetroArch settings are set by Leaf on every launch. If you
change one of these in RetroArch's menus it will apply for the rest of that
session and then return to Leaf's value the next time you start a game.

This is deliberate. Each one is either wired to a Leaf setting that would
otherwise disagree with it, or it is part of how Leaf talks to RetroArch at all.

| What Leaf owns | Why, and where to change it instead |
| --- | --- |
| Save, save-state, system, core, and screenshot folders | Leaf decides where saves and states live, including for games on a second SD card. |
| Core and core-info folders, controller autoconfig folder | Set from the installed core and Leaf's packaged controller profiles. |
| Save-on-exit, the network command port, and pause-when-inactive | How Leaf saves your settings and drives RetroArch's menu, save states, and clean quit. Turning these off would break the in-game menu. |
| Audio device, driver, latency, and block size | **Settings → Display & Sound**. |
| Video driver, graphics context, threaded video | The working renderer for this device. |
| Refresh rate, black frame insertion | **Settings → Display & Sound**. |
| Aspect ratio index, force aspect, integer scaling | Follows the live display mode. |
| Menu driver, menu scale, menu theme, OK/Cancel button order, load-content animation | Device-appropriate defaults; OK/Cancel is matched to the console's own button layout. |
| Menu language | **Settings → Language**. |
| Autoconfig and config-override notifications | Suppressed so Leaf's own messages are not buried. |
| Configuration File menu | Hidden. See [Alternate configurations](#alternate-configurations) below. |
| Hotkey modifier and hotkey exit | Unbound, so **Select** stays an ordinary game button. Quit through the in-game menu. |
| Player count and per-player controller order | Set from the controllers connected at launch. See [Controllers](/guide/controllers/). |
| Save-state compression | Fixed so states stay compatible with Leaf's save-state previews. |
| Recording driver, preset, quality, and output folder | **Settings → Recording**. See [Recording](/guide/recording/). |
| Firmware check, built-in image viewer and media player, dummy core on shutdown | Device compatibility. |
| RetroAchievements account and password | **Settings → Accounts**. Leaf hands these to RetroArch per session and keeps your password off the SD card. |

Everything else — shaders, rewind, run-ahead, overlays, cheats, per-core
options, input remaps, and the rest of RetroArch's menus — is yours, and
persists normally.

## Alternate configurations

RetroArch can normally keep several configuration files and switch between them
from its **Configuration File** menu. Leaf does not support that, and hides the
menu.

The reason is that **Save Main Configuration** and **Load Configuration** point
RetroArch at a different file. Leaf would go on copying back the one it handed
RetroArch at launch, so the session's changes would look saved and then vanish.
Rather than leave a menu that quietly loses work, Leaf removes it and saves your
changes automatically on exit instead.

If an older Leaf version left an alternate config on your card under
`.umrk/mlp1/retroarch/.config/retroarch/`, it is ignored. Leaf will not import
it for you, because picking the right one among several is guesswork and the
wrong pick would overwrite the settings you are using. Copy values across by
hand if you need them.

## Reset RetroArch Config

**Settings → System → Reset RetroArch Config** replaces the shared config with
Leaf's packaged defaults.

This erases the settings kept in that file — shader choices, rewind, overlays,
and the rest of RetroArch's own menus. Per-core options and input remaps are
stored in separate files and are **not** erased; delete those by hand if you
need to. Your games, saves, and save states are untouched. It is the right move when RetroArch is misbehaving and you would
rather start clean than hunt for the setting that did it — see
[Troubleshooting](/guide/troubleshooting/).

## If a setting still will not stick

1. Check the table above. If Leaf owns it, change it from the Leaf setting named
   there instead.
2. Quit properly — **MENU → Save & Quit**, or **Quit RetroArch** in the app
   tile — rather than powering off from inside RetroArch.
3. If it is not in the table and it still reverts, that is a bug worth
   reporting. Say which setting it was and exactly how you left RetroArch.
