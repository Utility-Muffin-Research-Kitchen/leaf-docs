---
title: Adding games & ROMs
description: Where to put ROMs, box art, saves, and states on the SD card so Leaf finds them.
---

Leaf reads your library from a set of clearly named folders on the SD card. Drop
files into the right folder and they show up in the launcher; there's no database
to manage by hand. You can fill the folders by putting the SD card in your
computer, or over Wi-Fi with the Central Scrutinizer app (see
[Features → Apps](/leaf-docs/guide/features/#apps)).

:::caution[Bring your own games]
Leaf does not include any games. Only add ROMs you are legally entitled to use.
:::

## Folder layout

At the root of the SD card you'll find these user-facing folders:

```text
Roms/<SYSTEM>/      your game files, one folder per system
Images/<SYSTEM>/    box art, matching each game's filename
Saves/              in-game saves
States/             save states
BIOS/               BIOS files some systems need (see BIOS & cores)
```

- **`Roms/<SYSTEM>/`** - put each game in the folder for its system, e.g.
  `Roms/SNES/Chrono Trigger.sfc` or `Roms/GBA/Metroid Fusion.gba`.
- **`Images/<SYSTEM>/`** - put box art next to the matching system folder, named
  to match the game. For `Roms/SNES/Chrono Trigger.sfc`, use
  `Images/SNES/Chrono Trigger.png`.
- **`Saves/` and `States/`** - created and managed for you as you play.

## System folders

Each console has its own `Roms/` subfolder. Common ones include:

| Folder | System |
|---|---|
| `NES` | Nintendo Entertainment System |
| `SNES` | Super Nintendo |
| `GB` / `GBC` / `GBA` | Game Boy / Color / Advance |
| `NDS` | Nintendo DS |
| `GENESIS` | Sega Genesis / Mega Drive |
| `MS` / `GG` | Sega Master System / Game Gear |
| `TG16` | TurboGrafx-16 / PC Engine |
| `NEOGEO` | Neo Geo (needs a BIOS; see below) |
| `NGPC` | Neo Geo Pocket Color |
| `ATARI2600` | Atari 2600 |

A system appears in the launcher once its emulator core is available on the
device. If a folder's system isn't showing up, its core may not be installed;
see [BIOS & cores](/leaf-docs/guide/bios-and-cores/).

## Box art

You can add box art two ways: drop it in yourself, or let Leaf fetch it.

**Add it yourself.** Name each image to match its game file (same name, image
extension) and place it in `Images/<SYSTEM>/`. For `Roms/SNES/Chrono Trigger.sfc`,
use `Images/SNES/Chrono Trigger.png`. Leaf pairs them up automatically and shows
the art in the game list.

**Let Leaf fetch it.** Leaf can download box art from
[ScreenScraper.fr](https://www.screenscraper.fr/). Sign in once under
**Settings → Accounts → ScreenScraper.fr**, then start a scrape from the
[Options menu](#options-menu) on a game or a whole system. Fetched art lands in
`Images/<SYSTEM>/` exactly as if you had added it by hand, and appears in the list
as soon as each download finishes. Which image type and region it picks is set
under **Settings → Game Art** (Artwork Priority and Region Priority).

## Options menu

Press **X** on a game or a system in the launcher to open its **Options** menu.
This is where per-item actions live, so they stay out of the main list:

- **Display Name** - rename how the game or system shows in the launcher.
- **Core** - choose which emulator core runs this game or system, when more than
  one is available.
- **Performance** - set a per-game or per-system performance profile that
  overrides the global default.
- **Scrape Artwork** - on a game, fetch and replace its box art. On a system,
  you get **Scrape Missing Artwork** (only games without art) and **Re-scrape All
  Artwork** (replace everything). While a scrape is queued the row reads **Cancel
  Scraping**.
- **Reset Overrides** - clear the custom name, core, and performance settings you
  set above.

Scraping runs in the background, so you can leave the menu, keep browsing, or
even play a game while art downloads.

## Multi-disc games

For multi-disc games (e.g. PlayStation/Sega CD titles), use an `.m3u`
playlist that lists the disc files, and place it in the system's `Roms/` folder.
Leaf shows the `.m3u` as a single entry so the game appears once, not once per
disc.

## BIOS-dependent systems

Some systems need a BIOS file you provide yourself (Neo Geo, for example, needs
`neogeo.zip` in `BIOS/`). Arcade games are also picky about ROM-set versions.
See [BIOS & cores](/leaf-docs/guide/bios-and-cores/) for the details.

:::note[Reviewer note]
Confirm the full canonical system-folder name list against `systems.json`.
:::
