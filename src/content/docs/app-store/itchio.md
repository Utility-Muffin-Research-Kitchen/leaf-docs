---
title: Itch.io
description: 'Browse itch.io and add compatible homebrew games and soundtracks directly to Leaf.'
---

![The Itch.io app browsing Game Boy homebrew, with a game list, cover art, title, author, and Catastrophe button hints](https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak/v0.2.0/docs/screenshots/main-list.png)

The Itch.io app brings compatible console homebrew into Leaf without a computer.
Browse or search the public catalog, read a game's description and look at its
screenshots, then download supported ROMs and artwork to your library.

:::caution[Unofficial client]
This app is maintained by Utility Muffin Research Kitchen. It is not affiliated
with or endorsed by itch.io. Support questions belong in the
[Leaf issue tracker](https://github.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak/issues)
or [Leaf Discord](https://discord.gg/q5F7cZ7KRp), not with itch.io.
:::

## Install

Install **Itch.io** from Pak Rat; see
[installing an app](/app-store/introduction/#installing-an-app). It appears in
the **Apps** tab.

## What you can download

- Games for Game Boy, Game Boy Color, Game Boy Advance, NES, Mega Drive, Pico-8,
  and PlayStation.
- Standalone ROMs plus ZIP and 7z archives, including multi-file Pico-8 and
  PlayStation CUE/BIN sets.
- Free downloads without an account, and paid games you own once you
  [sign in](#sign-in).
- Soundtracks, if you turn on [music downloads](#soundtracks).

A download shows its itch.io title in your library. A name you set in Leaf wins,
and resetting it goes back to the itch.io title.

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

## Choosing where downloads go

With **ROM Location** set to **Auto**, downloads go to the primary card's system
folder. Set it to **Ask** to choose either card and, if you like, a subfolder
below that card's ROM folder. A second card that isn't inserted is shown as
unavailable. Artwork goes on the same card as its ROM.

![The Itch.io destination picker showing the mounted primary and secondary SD-card choices](https://raw.githubusercontent.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak/v0.2.0/docs/screenshots/dual-sd-destination.png)

## Soundtracks

**Music Download** is **Off** by default. Set it to **Auto** or **Ask** before
downloading soundtrack files; it picks a card the same way **ROM Location**
does. Soundtracks are saved below that card's `Music` folder.

The Itch.io app doesn't play music. Install
[Disco Boy](/app-store/disco-boy/), then open or relaunch it so it picks up the
new files.

## Sign in

Browsing and free downloads need no account. Sign in to download paid games you
own:

1. Open **Start → Settings → itch.io Account**, or press **A** on a paid game.
2. Read and accept the physical-access warning (first time only).
3. Scan the QR code with your phone. The code expires after a few minutes;
   press **A** for a new one.
4. Check that itch.io shows the same short code as the handheld, then approve
   Leaf. The app loads the games you own and shows your account name.

itch.io gives the app a key, which is stored on the SD card without encryption,
so anyone who has the card can copy it. **Sign Out** clears the key and the list
of games you own without deleting installed games. The app can't revoke the key
on itch.io, so delete it from your itch.io account's API keys if you lose the
card.

## Content warnings

A content warning asks you to confirm before you continue; it doesn't hide the
game. Adult/suggestive, heavy theme, and substance-use warnings default to on;
queer/LGBTQ+ warnings default to off. Change the category and individual tag
behavior under **Settings → Content Moderation**. itch.io authors control their
own tags, so these advisories are best effort.

## Credits

The app is a fork of
[Carroarmato0's NextUI-Itchio-Pak](https://github.com/carroarmato0/NextUI-Itchio-Pak),
under the same MIT license. The
[source and releases](https://github.com/Utility-Muffin-Research-Kitchen/Leaf-Itchio-Pak)
are public.
