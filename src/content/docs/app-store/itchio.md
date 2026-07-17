---
title: Itch.io
description: 'Browse itch.io and add compatible homebrew games and soundtracks directly to Leaf.'
---

![The Itch.io app browsing Game Boy homebrew, with a game list, cover art, title, author, and Catastrophe button hints](https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak/v0.1.0/docs/screenshots/main-list.png)

The Itch.io app brings compatible console homebrew into Leaf without needing a
computer. Browse, search, filter, and sort the public catalogue, inspect a
game's description and screenshots, then download supported ROMs and artwork to
your library.

:::caution[Unofficial client]
This app is maintained by Utility Muffin Research Kitchen. It is not affiliated
with or endorsed by itch.io. Support questions belong in the
[Leaf issue tracker](https://github.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak/issues)
or [Leaf Discord](https://discord.gg/q5F7cZ7KRp), not with itch.io.
:::

## Install

Itch.io is optional and is not bundled with Leaf. Press **Menu**, open
**Actions → Pak Rat**, choose **Itch.io**, and install it over Wi-Fi. It appears
in the **Apps** tab when installation finishes.

Manual fallback: open the
**[latest release](https://github.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak/releases/latest)**,
download `Itch-io.mlp1.pak.zip`, verify the published SHA-256, extract its
single `Itch-io.pak` folder, and copy that folder into `Apps/mlp1/` on the SD
card. Run **System → Rescan Library** afterward. Jawaka 0.5.5 or newer is
required.

## What it supports

- Game Boy, Game Boy Color, Game Boy Advance, NES, Mega Drive, Pico-8, and
  PlayStation.
- Standalone ROMs plus inspected ZIP and 7z archives, including multi-file
  Pico-8 and PlayStation CUE/BIN sets.
- Animated catalogue artwork, launcher artwork, and itch.io titles in the Leaf
  library.
- Either SD card for ROMs, artwork, and optional soundtracks.
- Free downloads without an account and owned paid downloads with an optional
  itch.io API key.
- App-managed rename, save/state rename, artwork repair, and deletion flows.

New downloads publish their itch.io title as Leaf display metadata. Your manual
Leaf name always wins, and resetting it falls back to the imported title.
Reference-sensitive PlayStation files keep their original physical names.
Existing downloads are not renamed or backfilled automatically.

## Controls

| Button | Action |
| --- | --- |
| Up / Down | move or scroll |
| Left / Right | page or jump by letter; change a selected value |
| A | open, select, toggle, or confirm |
| B | back or cancel; exit from the main list |
| Select | open Filter; apply changes inside Filter |
| Start | open Settings |
| L1 / R1 | change sort on the main list; page other long views |
| L2 / R2 | change the system category |
| X | manage a downloaded game from its detail screen |
| Y | clear staged values on the Filter screen |
| Menu | reserved for Leaf; it does not exit the app |

Search and API-key entry use the full Catastrophe keyboard.

## Both SD cards

With **ROM Location = auto**, downloads go to the primary card's canonical
system folder. Set it to **ask** to choose either mounted card and, if desired,
a safe subfolder below that card's ROM root. A configured but absent second card
is shown as unavailable and cannot be selected. Artwork remains on the same card
as its ROM.

Music uses the same source-aware picker. **Music Download** is off by default;
set it to **auto** or **ask** before downloading soundtrack files.

![The Itch.io destination picker showing the mounted primary and secondary SD-card choices](https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak/v0.1.0/docs/screenshots/dual-sd-destination.png)

## Soundtracks and Disco Boy

Soundtracks are saved below the selected card's `Music` folder. The Itch.io app
does not install or launch a player. Install
**[Disco Boy](/app-store/disco-boy/)** separately, then open or relaunch it so
its normal scan sees music on both cards.

## API key and privacy

Browsing and free downloads need no key. A key is required only for games
already owned by the account:

1. Open **Start → Settings → API Key**.
2. Read and accept the physical-access warning.
3. Enter the complete key with the Catastrophe keyboard.
4. Wait for validation before using the **Owned** filter.

The key is stored in app data on the SD card and is not encrypted. FAT32 cannot
protect it from someone with physical access to the card. Settings displays
only a short suffix after saving; editing starts blank. Local logs redact known
credentials, account identifiers, cookies, and signed download URLs. Removing
the key clears authenticated cache data without deleting installed games.

## Content warnings

Content warnings are confirmations, not hidden filters. Adult/suggestive, heavy
theme, and substance-use warnings default to on; queer/LGBTQ+ warnings default
to off. Change the category and individual tag behavior under
**Settings → Content Moderation**. itch.io authors control their own tags, so
these advisories are best effort.

## Credits and source

The app is a Leaf-only hard fork of
[Carroarmato0's NextUI-Itchio-Pak](https://github.com/carroarmato0/NextUI-Itchio-Pak).
UMRK preserves the upstream history, attribution, and MIT licence while using
Leaf runtime paths, Jawaka services, and Catastrophe for the interface. The
[UMRK source and release history](https://github.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak)
are public.
