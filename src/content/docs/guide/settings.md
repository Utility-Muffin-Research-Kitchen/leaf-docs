---
title: Settings reference
description: A reference for the Leaf launcher's Settings menu, grouped by section.
---

A reference for the Settings menu. Press the **MENU** button to open the **System**
page. It opens on the **Settings** tab, whose sections are listed below. The other two
tabs, **Actions** and **Info**, are covered under
[The System page](#the-system-page-menu-button) at the end.

![The Settings tab of the System page, listing the sections: Appearance, Home Screen, Display & Sound, Lighting, Wi-Fi, Bluetooth, Games, Hotkeys & Rumble, and System](/settings-home.png)

## Appearance

![Leaf's fourteen color schemes - seven dark and seven light, paired by spectrum color](/theme-swatches.png)

- **Color Scheme** - seven dark schemes and seven light ones, one of each per color
  of the spectrum. **Leaf**, a soft green, is the default.
- **Colors** - change individual colors (accent, background, text, selection, hints,
  button label, button background) with a color picker. Editing any color switches
  the scheme to "Custom."
- **Theme** - a theme from the `Themes` folder on the SD card, or **None**. A theme
  restyles Grid view and Cover Flow with its own wallpaper, colors, and system art.
  See [Themes](/guide/pak-rat-themes/).
- **Font** - the font family, Nunito by default, with eight more to choose from.
  Some languages swap in another font or lock this row. See
  [Language](/guide/language/#what-changes).
- **Font Size** - Small, Default, Large, or Extra Large.
- **List Style** - Rounded, Soft, Square, or the directional Leaf pill.
- **Round Cover Art** - off by default, so box art in your game lists, **Recents**,
  **Favorites**, and search has square corners. Turn it on to round the art to match
  **List Style**. System icons stay square, and Grid tiles keep their own corners.
- **Status Bar** - toggle the **Button Hints** footer and each status indicator:
  **Clock** (with style options), **Battery**, **Wi-Fi**, **Bluetooth**, and
  **Volume**. With Button Hints off, content expands to fill the screen.

## Home Screen

- **Home Layout** - **Tabs** (the default list-and-tabs view), **Coverflow** (a
  box-art carousel with console icons; press **X** on a game for search and its
  Options), or **Grid** (a page of tiles).
- **Grid Size** - how many tiles Grid view fits on a page: **2 x 2**, **3 x 2**,
  **4 x 3**, **5 x 3**, **5 x 4**, **6 x 4**, **6 x 5**, or **8 x 6**.
  **Automatic** follows the active theme's suggestion, or **4 x 3** when it makes
  none. The row reads a dash while Home Layout isn't **Grid**.
- **System Icons** - which built-in system artwork Leaf draws: **Automatic**,
  **Flat**, or **Photographic**. A theme's own icons win where it has them.
- **Tab Switching** - Glide for a sliding page transition, or Snap for an instant
  cut.
- **Startup Tab** - which tab the launcher opens on: Recents, Favorites, Games, or
  Apps. Only tabs you have left visible are offered.
- **Home Tabs** - hide the tabs you don't use and reorder the rest. **A** switches a
  tab off or on in place, and **X** grabs a row so Up/Down moves it. At least one
  tab always stays visible.

## Display & Sound

![The Display & Sound settings page: Brightness and Volume sliders, Refresh Rate set to 100 Hz, Black Frame Insertion reading "On (50 fps)", HDMI Output grayed out as Not connected, Audio Output on Speaker, and a Test Sound row](/settings-display.png)

- **Brightness** - screen backlight level. At a very low setting, the screen brightens
  slightly while the charger is plugged in and returns to your setting when you
  unplug.
- **Refresh Rate** - **60**, **100**, or **120 Hz**. **60** and **120** suit 60fps
  (NTSC) games, and **100** suits 50fps (PAL) games: 100 divides evenly by 50, so
  every frame stays on screen for the same time and scrolling doesn't stutter the
  way it does at 60. 120 shows less motion blur than 60, and 60 uses the least
  power. With **Game Performance** on **Auto**, every game gets the Performance
  profile at 100 or 120 Hz. If a demanding game runs at full speed at 60 Hz but
  slows down at 120, play it at 60. The panel only advertises 60 Hz;
  [Measuring the refresh rate](/panel-refresh-measurement/) shows how the higher
  rates were confirmed. On a TV this setting also picks the HDMI mode. See
  [Playing on a TV](#playing-on-a-tv).
- **Black Frame Insertion** - inserts a black frame between game frames to cut
  motion blur in fast-scrolling games. It needs **120 Hz** for 60fps games and
  **100 Hz** for 50fps (PAL) games. At 60 Hz the row is grayed out as "100/120 Hz
  only". The row names the frame rate it's set up for, such as "On (50 fps)". It's
  one setting for every game, so match it to what you're playing: a 60fps game left
  at 100 Hz runs slow. It applies to RetroArch games, on the built-in screen or a
  120 Hz TV, and dims the picture, so turn Brightness up. If you see flicker at
  100 Hz, turn it off.
- **HDMI Output** - **Off** keeps everything on the built-in screen. **4:3** sends
  the TV a correctly proportioned image with black bars on the sides, and
  **Stretch** fills a 16:9 TV edge to edge. Leaf switches to the TV when you plug a
  cable in and back when you unplug, and the sound follows the picture. The row is
  grayed out as "Not connected" until a TV is plugged in.
- **Volume** - system volume. The hardware volume keys change it too and show an
  on-screen overlay.
- **Audio Output** - **Speaker**, **Headphones**, a connected **Bluetooth** device,
  or **HDMI** when a TV is connected. Use the left and right buttons to switch.
- **Test Sound** - plays a short clip on the current output.

### Playing on a TV

With a TV connected, **Refresh Rate** offers **60** and **120 Hz**:

- **60 Hz** sends **720p**. The 4:3 image isn't scaled, so this is the sharpest
  picture, and it works on every HDMI TV.
- **120 Hz** sends **1080p at 120 Hz** when the TV supports it. Motion is smoother
  and **Black Frame Insertion** becomes available on the TV, but the image is scaled
  up and looks slightly softer. If the TV tops out at 60 Hz, the picture stays at
  720p.

A TV can't be sharp and smooth at once: TVs only offer 120 Hz at 1080p or higher,
and the 4:3 image is only pixel-perfect at 720p.

A 1080p120 signal needs a high-speed (HDMI 2.0 or newer) cable. When Leaf switches to
it, it shows a short prompt. Once you can see the picture on the TV, press **L1 then
R1** to keep the mode. If you can't, wait or press **B**, and Leaf goes back to 720p
after a few seconds.

Dreamcast, Nintendo 64, and Saturn games in their standalone emulators follow
**HDMI Output** too:

- Dreamcast and Nintendo 64 games are upright and use the TV's mode. On **4:3**
  they're centered, and on **Stretch** they fill the screen.
- Saturn games are upright on the TV.
- With **HDMI Output** on **Off** and a cable plugged in, these games stay on the
  built-in screen.
- If you plug in or unplug the cable during one of these games, the game stays where
  it is, and Leaf switches when you quit.

Screenshots and the paused game behind the in-game menu are upright on a TV too.
If you unplug the TV during a RetroArch game, RetroArch closes the game within a
few seconds and keeps your in-game save.

## Lighting

![The Lighting settings page: Enable on, Mode set to Breath, a green Color swatch, Brightness 5, and Speed 5](/settings-lighting.png)

Control the RGB ring around the stick:

- **Mode** - solid, breathing, and rainbow, plus a few animated effects, and
  [Battery Level](#battery-level), which shows how much charge is left.
- **Color**, **Brightness**, and **Speed**.

The default is a breathing green glow. Clicking the stick turns the ring on or off.

### Battery Level

![The Lighting settings page with Mode set to Battery Level: Color reads Automatic and Speed reads Fixed, while Brightness can still be changed](/settings-lighting-battery.png)

With **Mode** set to **Battery Level**, the ring's color follows the battery, in
games as well as in the launcher:

- **Blue** - 81 to 100%
- **Green** - 61 to 80%
- **Orange** - 41 to 60%
- **Red** - 21 to 40%
- **Flashing red** - 20% and below

The ring changes within about 5 seconds of the charge moving into a new band, and
straight away when the device wakes from sleep. Charging uses the same colors. If
the battery can't be read, the ring stays dark until it can.

In this mode **Color** reads **Automatic** and **Speed** reads **Fixed**.
**Brightness** still works, and 0 keeps the ring dark, flash included. Your chosen
color comes back when you switch to any other mode.

Low-battery warnings and shutdown work the same in every mode.

## Wi-Fi

Scan for and join networks, see connection status, signal strength, and IP
address, and turn the radio on or off. The on/off state persists across reboots.
The page also has an ADB-over-network toggle for developers.

## Bluetooth

Pair and connect headsets and controllers. Press **X** to scan, then connect or pair
the device you want. Leaf doesn't scan in the background. For controllers, see
[Controllers](/guide/controllers/).

- One audio device connects at a time. A game controller can stay connected
  alongside a headset.
- Game and system audio follows the connected headset. You can still pick the output
  under **Display & Sound > Audio Output**.
- Reconnect a paired device from this page whenever you want it. **Y** unpairs it.

## Games

Artwork comes from ScreenScraper.fr. Sign in first under [Accounts](#accounts).

- **Scrape Artwork** - start a scrape for **All Systems** or a single system. Each
  row shows how many of that system's games are missing art. **Y** switches between
  **Missing** (only games without art) and **Replace All** (re-fetch everything);
  **A** starts the scrape and drops you on the Scrape Queue to watch it. For one
  game, press **X** on it in the launcher instead. See
  [Adding games > Box art](/guide/games/#box-art).
- **Scrape Queue** - the live list of scrape jobs and their progress. **A** opens a
  finished job's result, **Y** filters the list, and **X** stops everything or
  clears finished rows.
- **Artwork Priority** - the order Leaf prefers artwork types (box art, title
  screen, in-game shot, and so on). It saves the first type a game has available.
- **Region Priority** - the order Leaf prefers regions when a game has art for
  several. On each list, **A** includes or excludes an entry, and **X** grabs an
  entry so Up/Down reorders it.
- **Game Performance** - how hard the device works during gameplay: **Auto**,
  **Balanced**, **Performance**, or **Battery Saver**. See
  [Playing games](/guide/playing/#per-game-performance).
- **Save Before Power Off** - off by default. When it's on and you hold the power
  button to shut down during a RetroArch game, Leaf asks you to release the button,
  saves the game to its quick-save slot, and then powers off. The save only starts
  after you let go. Resume from Recents or the Game Switcher, or at startup with
  **Resume Game on Boot**. Standalone emulators and apps don't save. Miniloong
  Pocket 1 only.
- **Resume Game on Boot** - off by default, and needs **Save Before Power Off**. The
  next time you turn the device on after one of those saves, Leaf opens the game
  where you left off. Hold **B** while Leaf starts to go to the launcher instead; the
  save stays where it is. If the save can't be loaded (the game's core changed, its
  SD card is missing, or RetroAchievements hardcore mode refuses it), Leaf opens the
  launcher with a notice, and you can try again from Recents or the Game Switcher.
  Miniloong Pocket 1 only.
- **Reset RetroArch Config** - restore RetroArch to its defaults. This erases
  settings stored in the shared config, but leaves per-core options, input remaps,
  games, and saves untouched. See
  [RetroArch settings](/guide/retroarch-settings/).
- **Accounts** - opens the sign-ins below.
- **Show Folders** - off by default. Turn it on to see a system's ROM subfolders as
  folders you open with **A**, instead of one list of every game. See
  [Folders in your lists](/guide/games/#folders-in-your-lists).
- **Hidden Games** - every game you hid with **Hide Game**, by name, with its card
  and path. Press **A** to unhide the selected game. A game whose file is no longer
  on the card reads **Not in your library**, and unhiding it clears it from the
  list. To delete a hidden game, unhide it, then choose **Delete Game** from its
  **Options**. See [Hiding a game](/guide/games/#hiding-a-game).

### Accounts

Press **A** on a row to enter your credentials with the on-screen keyboard, and
**Y** to sign out.

- **RetroAchievements** - signs RetroArch into retroachievements.org at every
  game launch, so achievements appear in supported cores. Use your account
  username, not your email address.
- **ScreenScraper.fr** - signs Leaf into screenscraper.fr so it can download
  artwork. The row reads "Saved" until the first scrape verifies the login, then
  "Signed in as &lt;user&gt;" with your thread allowance and daily quota.

## Hotkeys & Rumble

- **UI Rumble** - the short buzz the interface makes as you move around it.
- **Game Rumble** - rumble inside games, handed to the emulator.
- **Strength** - how strong both are, from 0 to 100 percent in steps of 5. See
  [Rumble](/guide/rumble/).
- **Hotkeys** - the **MENU** button chords: the game switcher, and screenshots and
  game recording with the button each one answers to. See
  [Hotkeys](/guide/playing/#hotkeys).

## System

- **Language** - the language Leaf draws itself in. See
  [Language](/guide/language/).
- **Time Zone** - set your local time zone so the clock is correct.
- **Auto Sleep** - idle timeout before the device sleeps, or **Never**.
- **Force Off Hold** - how long you hold the power button before the hardware
  cuts power regardless of what is running: **6**, **8**, **10**, or **12 sec**,
  10 by default. A normal power off is still a 2 second hold. A longer hold gives
  Leaf more time to finish writing to the SD card. Miniloong Pocket 1 only.
- **Boot Splash** - show or hide the Leaf boot animation.
- **SD Cards** - lists both cards, and offers to check, repair, or safely unmount
  one. Repair needs the charger connected and no game running. See
  [My SD card is read-only](/guide/sd-card-read-only/).
- **Services** - background helpers an app installed, with what each one is doing
  and whether it starts with Leaf. The row appears only when something is
  installed.

## The System page (MENU button)

Press the **MENU** button anywhere in the launcher to open the System page, and press
it again to go back to where you were. **B** steps back within System but doesn't
leave it. **L1 / R1** switch between its three tabs:

![The System page on its Actions tab, with Settings, Actions, and Info tabs across the top, a list of actions like Search, Pak Rat, System Update, and Rescan Library, and a live count of games, systems, and apps](/screenshot-system-menu.png)

- **Settings** - everything above. This tab opens first.
- **Actions**:
  - **Search** - search your whole library.
  - **Pak Rat** - the on-device store. See [App store](/app-store/introduction/).
  - **System Update** - check for, download, and install updates over Wi-Fi. See
    [Updating](/guide/updating/).
  - **Rescan Library** - re-index games and apps. The game and app counts show
    beside the row.
  - **Sleep**, **Exit to Stock**, **Reboot**, and **Power Off**.
- **Info** - read-only pages about your device and library:
  - **Device** - the installed Leaf version, system info (OS, kernel, hardware, and
    network addresses), and the open-source components Leaf is built on, each with
    its license. The full license text for every bundled emulator is also on the
    card under `licenses/`.
  - **Library** - total games, systems, and apps, favorites, box-art coverage, and a
    per-system breakdown.
  - **Playtime** - total time, games played, your most-played titles, and a
    per-system breakdown.
