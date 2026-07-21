---
title: Central Scrutinizer
description: 'Manage your Leaf game library from a web browser over Wi-Fi: upload ROMs, sort box art, and browse logs.'
---

Central Scrutinizer turns your handheld into a little web server so you can manage
your library from a phone, tablet, or computer on the same Wi-Fi. It is the easy way
to add a pile of ROMs or fix up box art without pulling the SD card.

![The Central Scrutinizer web dashboard in a browser: a Library workspace with Library and Tools tabs, a platform search, and cards for each console showing ROM, save, state, BIOS, and cheat counts](/central-scrutinizer-web.png)

## Connecting

1. Make sure the device is on Wi-Fi (**Settings → Network**).
2. Open **Central Scrutinizer** from the **Apps** tab. The screen shows a **web
   address** and a **PIN**.
3. On your computer or phone, open that address in a browser.
4. Enter the PIN to pair (or press **Y** on the device to show a QR code you can
   scan). Once paired, that browser stays trusted.

## What you can do

From the browser you can:

- **Upload ROMs** - single files or whole folders, including ZIP archives. Each
  console shows as a single library, and uploads land in that system's
  recommended folder. If you have older alias folders (say both `Roms/NES` and
  `Roms/FC`), Central Scrutinizer shows them as one console with a combined
  count rather than duplicate cards.
- **Manage files** - download, rename, delete, and make folders.
- **Sort box art** - replace or tidy up game artwork.
- **Browse logs** - read Leaf's app logs, with a live tail, which is handy when
  something is not working.
- **Clean up** - remove stray Mac metadata files (`.DS_Store` and friends) that sneak
  onto SD cards.

After uploading games, run **Rescan Library** from the launcher's **MENU** (or just
reboot) so the new games appear.

## Supported file formats

Central Scrutinizer knows what each system can actually play, so it only uploads
files that will show up as games. When you open a console's **ROMs**, it lists the
accepted formats under the toolbar, for example:

> Supported: .chd, .cso, .iso, .pbp

If you pick a file a system cannot use (say a `.zip` for PSP, which wants a disc
image), it tells you **before** anything transfers, names the formats that system
accepts, and leaves the file out rather than dropping it somewhere it would never
be scanned as a game.

Most cartridge consoles, arcade, and Neo Geo read `.zip` files directly, so their
format list includes `.zip`. For systems that do not (mostly disc based ones), use
**Upload ZIP** to extract a supported file from the archive instead. Either way,
only files a rescan can turn into real games get copied to the card, so it stays
tidy.

Central Scrutinizer is open source (MIT).
