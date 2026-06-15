---
title: Settings reference
description: A reference for the Leaf launcher's Settings menu, grouped by section.
---

A reference for the Settings menu. Open Settings from the launcher; the sections
below mirror its top-level list. System tools that aren't persistent settings -
About, System Update, and a library rescan - live in the **System menu** (the
Menu button), covered at the end.

:::note[Reviewer note]
This page is the most likely to drift as the UI evolves - confirm section names,
row labels, and available options against the shipped build before release.
:::

## Appearance

Theme and layout, under **Settings → Appearance**.

![Leaf's fourteen color schemes - seven dark and seven light, paired by spectrum color](/leaf-docs/theme-swatches.png)

- **Color Scheme** - a curated palette picker: seven dark schemes and seven light
  ones, one of each per color of the spectrum, with **Leaf** (the soft-green
  default) leading. Each light scheme is the hue-twin of a dark one. Selecting one
  sets every color role at once.
- **Colors** - fine-tune individual color roles (accent, background, text,
  selection, hints, button label, button background) with a color picker. Editing
  any color switches the scheme to "Custom."
- **Layout** - **List Style** (Rounded, Soft, Square, or the directional Leaf
  pill), **Font** family (Nunito by default, with eight more to choose from),
  **Font Size**, and **Tab Switching** (Glide for a sliding page transition, or
  Snap for an instant cut).
- **Status Bar** - toggle the **Button Hints** footer and each status indicator:
  **Clock** (with style options), **Battery**, **Wi-Fi**, **Bluetooth**, and
  **Volume**. With Button Hints off, content expands to fill the screen.

## Display & Sound

- **Brightness** - screen backlight level.
- **Output** - audio routing: **Speaker**, **Headphones**, or a connected
  **Bluetooth** device.
- **Volume** - system volume (also adjustable with the hardware volume keys, which
  show an on-screen overlay).

## Lighting

Control the RGB ring around the stick:

- **Mode** - solid, breathing, and rainbow, plus a few animated effects.
- **Color**, **Brightness**, and **Speed**.

A breathing-green glow is the default Leaf identity; the ring can also be toggled
with a stick click.

## Network

Wi-Fi management: scan for and join networks, see connection status, signal
strength, and IP address, and turn the radio on or off. The on/off state persists
across reboots. (Developers will also find an ADB-over-network toggle here.)

## Bluetooth

Pair and connect headsets and controllers. Bluetooth is deliberately manual: press
**X** to scan, then connect or pair the device you want - there's no background
scanning. Each entry shows a device-type icon (headset, controller, and so on)
before its name.

- One **audio** device connects at a time; a game controller can stay connected
  alongside a headset.
- Game and system audio follows the connected headset automatically - no need to
  switch the output by hand. (You can still pick the output under
  **Display & Sound → Output**.)
- Reconnect a paired device from this page whenever you want it; **Y** unpairs it.

## Game Art

How Leaf picks artwork when it downloads from ScreenScraper.fr (sign in first
under [Accounts](#accounts)). You start a scrape from a game or system's Options
menu, covered in [Adding games → Options menu](/leaf-docs/guide/games/#options-menu).

- **Artwork Priority** - the order Leaf prefers artwork types (box art, title
  screen, in-game shot, and so on). It saves the first type a game has available.
- **Region Priority** - the order Leaf prefers regions when a game has art for
  several. On each list, A includes or excludes an entry, and X grabs an entry so
  Up/Down reorders it.

## Accounts

Sign-ins for external services. Press A on a row to enter your credentials with
the on-screen keyboard; press Y to sign out. When a status line is too long to
fit, it scrolls while the row is selected.

- **RetroAchievements** - signs RetroArch into retroachievements.org at every
  game launch, so achievements appear in supported cores. Use your account
  username, not your email address. If a launch happens to miss the sign-in
  (a Wi-Fi blip), the next one retries.
- **ScreenScraper.fr** - signs Leaf into screenscraper.fr so it can download
  artwork (see [Game Art](#game-art) above, and
  [Adding games → Box art](/leaf-docs/guide/games/#box-art)). The row reads
  "Saved" until the first scrape verifies the login, then "Signed in as &lt;user&gt;"
  with your thread allowance and daily quota.

## General

- **Startup Tab** - which tab the launcher opens on.
- **Auto Sleep** - idle timeout before the device sleeps (can be turned off).
- **Boot Splash** - show or hide the Leaf boot animation.
- **Game Performance** - how hard the device works during gameplay: **Auto**,
  **Balanced**, **Performance**, or **Battery Saver**. See
  [Features → Performance](/leaf-docs/guide/features/).
- **Time Zone** - set your local time zone so the clock is correct.
- **Reset RetroArch Config** - restore RetroArch to its defaults.
- **Unmount Secondary SD** - safely eject a second SD card before removing it.

## System menu (Menu button)

Press the **Menu** button to open the **System** menu - quick actions and system
tools that sit apart from the persistent Settings:

- **System Update** - check for, download, and install updates over the air. See
  [Updating (OTA)](/leaf-docs/guide/updating/).
- **About** - the installed Leaf version, system info (OS, kernel, hardware, and
  network addresses), and the open-source components Leaf is built on, each with
  its license. The full license text for every bundled emulator also ships inside
  the install under `licenses/`.
- **Rescan Library** - re-index games and apps; the live game and app counts show
  beside the row.
- **Return to Launcher**, **Sleep**, **Exit to Stock**, **Reboot**, and
  **Power Off** - session and power actions.
