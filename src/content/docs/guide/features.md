---
title: Features tour
description: 'A walkthrough of the Leaf launcher: appearance, status bar, display, lighting, networking, performance, and built-in apps.'
---

A quick tour of what Leaf adds on top of your games. Most of this lives in
**Settings**, reachable from the launcher.

## Appearance

![The launcher in a light lavender color scheme](/screenshot-theme-light.png)

Make the launcher yours from **Settings → Appearance**:

- **Color schemes** - pick from fourteen curated palettes: a full spectrum in dark
  and the same spectrum in light, led by **Leaf** (the soft-green default). You can
  also hand-tune individual colors, which switches the scheme to "Custom."
- **List style** - choose how the selection highlight looks (rounded, soft, square,
  or the directional **Leaf** pill).
- **Fonts** - pick a font family (Nunito by default, with eight more) and adjust
  the font size.

## Status bar

A configurable bar across the top (**Settings → Appearance → Status Bar**):

- **Clock** - with style options.
- **Battery** - animated while charging, with a low-battery warning.
- **Wi-Fi** - connection state and signal strength.
- **Bluetooth** - shown when the radio is on, highlighted when a device is connected.
- **Volume** - the current system volume.

Each indicator can be toggled. You can also hide the button hints footer; with
hints off, content expands to fill the screen, and apps built on Leaf's toolkit
follow the same setting.

## Display

The Pocket 1 panel is rated for 60Hz, but Leaf drives it faster
(**Settings → Display & Sound**):

- **90 or 120Hz refresh** - a smoother launcher and smoother games on a screen the
  stock firmware runs at 60. Games launched through RetroArch inherit the higher
  rate too. 60Hz stays available for the longest battery life.
- **Black Frame Insertion** - an optional extra at 120Hz that flashes a black frame
  between game frames to cut LCD motion blur, for a sharper, more CRT-like image in
  fast-scrolling games. It works in RetroArch cores and is best with 60fps titles.
  It trades some brightness for the clarity, so turn brightness up to compensate.
  See [Settings → Display & Sound](/guide/settings/#display--sound).

## Lighting (RGB ring)

The stick has an RGB ring you can drive from Settings:

- Solid, breathing, and rainbow modes, plus a few animated effects.
- A breathing-green glow is the default Leaf identity.
- Toggle the ring on/off with a stick click.

## Networking

- **Wi-Fi** (**Settings → Network**) - scan, connect, and turn the radio on or off.
  Your choice persists across reboots.
- **Bluetooth** (**Settings → Bluetooth**) - scan for and pair headsets and
  controllers; game and system audio follows a connected headset automatically.

## Achievements

Sign in to RetroAchievements once (**Settings → Accounts**) and RetroArch logs
you in at every game launch; achievements and progress show up in supported
cores. See [Settings → Accounts](/guide/settings/#accounts).

## Performance

**Settings → General → Game Performance** lets you pick how hard the device works
during gameplay:

- **Auto** - light systems run efficiently; heavier systems automatically boost.
- **Balanced** / **Performance** / **Battery Saver** - pick a fixed behavior.

Leaf keeps the launcher itself in a low-power state and ramps up the CPU, GPU, and
memory only when a game launches, then winds back down on exit. There's also a
live performance panel in the in-game menu for tuning while a game runs.

## Menu button

In the launcher, the **Menu** button opens the **System** page - everything about
the device, kept apart from your games. It's tab-driven (**L1 / R1**): **Settings**,
**Actions** (Search, **System Update**, a library rescan, and the session and power
actions), and **Info** (a **Device** page plus **Library** and **Playtime** stats).
The Menu button toggles between your games and System, so press it again to drop
back to where you were. See
[The System page](/guide/settings/#the-system-page-menu-button).

While a game is running, the same button opens the **in-game menu** instead -
quick actions (resume, save and load states, the performance panel, quit back to
the launcher) without leaving the game. See [Playing games](/guide/playing/) for
the full in-game menu, save states, and per-game performance.

![The in-game menu over a paused game, with a save-state thumbnail and button hints](/screenshot-ingame-menu.png)

## Apps

![The Apps tab listing Central Scrutinizer, Disco Boy, File Explorer, Fugazi, RetroArch, and SSH Server](/screenshot-apps.png)

Leaf ships with a few built-in apps (under the **Apps** tab). Each has its own page
under [Built-in apps](/apps/introduction/):

- **[Central Scrutinizer](/apps/central-scrutinizer/)** - manage your library over
  Wi-Fi from a web browser: upload ROMs and box art, manage saves and BIOS files, and
  browse the SD card, all without pulling the card.
- **[Fugazi](/apps/fugazi/)** - a live CRT-shader tuner. Dial in a retro look
  (scanlines, screen curvature, a phosphor mask, glow, and more) against a full-screen
  preview, then install it as the global shader so it applies to every game.
- **[Joe's Calibrage](/apps/joes-calibrage/)** - calibrate the analog stick so games
  see its full range.
- **[SSH Server](/apps/ssh-server/)** - start an SSH server to reach the device over
  the network.
- **[File manager](/apps/file-manager/)** - browse and manage files on the device.

## Box art

Press **X** on a game or system to open its **Options** menu, where you can rename
it, pick a core, or set a performance profile; on a game you can also scrape its
box art. To scrape a whole system or every system at once, use **Settings → Game
Art → Scrape Artwork**. Leaf downloads art from ScreenScraper.fr (sign in under
**Settings → Accounts**), and it runs in the background while you keep browsing or
playing. You can always drop images into `Images/` by hand instead. See
[Adding games → Box art](/guide/games/#box-art).

## Game switcher

![The game switcher carousel showing recent games as cover tiles, Final Fantasy Tactics centered](/screenshot-switcher.png)

Press **SELECT** anywhere on the home screen to open the game switcher - a focused
carousel of your recent games for jumping back in fast.

| Button | Action |
|---|---|
| Left / Right | move through recent games |
| A | resume the highlighted game |
| Y | remove the highlighted game from Recents |
| B or SELECT | close the switcher |

The currently running game shows a live snapshot of where you left off; others show
their box art, or a placeholder card with the system name when there's no art yet.

## Recents & saves

- **Recents** shows what you've been playing; you can remove entries you don't
  want.
- In-game saves and save states are written to the SD card (`Saves/`,
  `States/`).

