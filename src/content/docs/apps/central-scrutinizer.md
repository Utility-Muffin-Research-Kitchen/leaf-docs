---
title: Central Scrutinizer
description: 'Manage your Leaf game library from a web browser over Wi-Fi: upload ROMs, sort box art, and browse logs.'
---

Central Scrutinizer lets you manage your library from a browser on a phone, tablet,
or computer on the same Wi-Fi. You can add ROMs or fix up box art without pulling
the SD card.

![The Central Scrutinizer web dashboard in a browser: a Library workspace with Library and Tools tabs, a platform search, and cards for each console showing ROM, save, state, BIOS, and cheat counts](/central-scrutinizer-web.png)

## Connecting

1. Make sure the device is on Wi-Fi (**Settings → Wi-Fi**).
2. Open **Central Scrutinizer** from the **Apps** tab. The screen shows a **web
   address** and a **PIN**.
3. On your computer or phone, open that address in a browser.
4. Enter the PIN to pair, or press **Y** on the device to show a QR code you can
   scan. Once paired, that browser stays trusted.

## What you can do

From the browser you can:

- **Upload ROMs** - single files or whole folders, including ZIP archives. Each
  console shows as one library, and uploads land in that system's recommended
  folder.
- **Manage files** - download, rename, delete, and make folders.
- **Sort box art** - replace or tidy up game artwork.
- **Edit game info** - change the titles and descriptions the handheld shows, many
  at once if you like, and pin games and folders to the top of a list. See
  [Game Info](#game-info).
- **Browse logs** - read Leaf's app logs, with a live tail.
- **Clean up** - remove stray Mac metadata files such as `.DS_Store`.

After uploading games, run **Rescan Library** from the launcher's **MENU**, or
reboot, so the new games appear.

## Game Info

Open a console's card and choose **Game Info** to change how its games show on the
handheld. Your files are never renamed, so saves keep working. The launcher picks up
each change you save, and stays on the game you had selected.

### Titles and descriptions

Search for a game and select it to change its **Title** and **Description**.
**Reset title** and **Reset description** go back to the name and description the
game had before you changed it.

- A description you write stays when you scrape the game's artwork again.
- The handheld only shows descriptions in the **Grid** home layout, and shows line
  breaks as spaces.
- A description can be up to 1,199 bytes. That's fewer characters in Chinese,
  Japanese, or Korean, which take 3 bytes each.

### Changing many titles at once

**Find and replace** and **Strip region and version tags** change every game in the
list below them, so search first to narrow the list. **Find and replace** can use a
regular expression, and can match case.

Neither one saves straight away. **Preview changes** shows every title that would
change, with a checkbox for each, and **Apply changes** saves the ones you leave
ticked. The preview also warns you about titles that more than one game would share.

To edit titles and descriptions in a spreadsheet, choose **Export CSV**, edit the
file, and bring it back with **Import CSV**. Keep the `source` and `rom_relpath`
columns, since they say which game each row is. The import goes through the same
preview. An empty cell resets that title or description. Rows that match no game, or
belong to a different second card, are listed and left out.

**Undo last bulk change** reverses the last change you applied with find and replace,
tag stripping, a CSV, or **Save order**. It only covers the latest one, and only on
that console's page. Saving one game's title or description doesn't replace it. A
game you've changed since, or whose card is out, is left alone and listed.

### Order

The **Order** tab pins games and folders to the top of a list on the handheld.
Pinned rows come first, in the order you set, and everything else stays sorted.

- **Pin** moves a row into the **Pinned** section, and **Unpin** takes it out.
- Drag a pinned row by its handle to move it, with a finger or a mouse, or use its
  up and down buttons.
- **Save order** saves the list, and **Discard changes** goes back to what's saved.
- Folders show the way the handheld groups them with **Show Folders** on. Open one to
  arrange what's inside. With **Show Folders** off on the handheld, you get one list.

This is the only place to pin a folder or change the order of your pins. On the
handheld, a game's **Options** menu can only pin or unpin it. See
[Pinning a game](/guide/games/#pinning-a-game).

## Supported file formats

Central Scrutinizer only uploads files that will show up as games. When you open a
console's **ROMs**, it lists the accepted formats under the toolbar, for example:

> Supported: .chd, .cso, .iso, .pbp

If you pick a file that system can't use, such as a `.zip` for PSP, it tells you
before anything transfers and leaves the file out.

Most cartridge consoles, arcade, and Neo Geo read `.zip` files directly, so their
format list includes `.zip`. For the rest, mostly disc-based systems, use
**Upload ZIP** to extract a supported file from the archive.

A console's card only appears when an emulator for it is installed. Opening **BIOS**
on a card browses the folder that system's emulator reads, and BIOS uploads land
there. See [BIOS files](/guide/bios-and-cores/) for the files each system needs.

For Atomiswave and Naomi, the check stops at the extension. A set can upload and
appear in the launcher and still not run. Keep the original set names and layout
described in [Naomi and Atomiswave arcade
sets](/guide/systems/#naomi-and-atomiswave-arcade-sets). For other systems with
their own rules, such as PC-98 and Amiga, see
[Systems and emulators](/guide/systems/).

Central Scrutinizer is open source (MIT).
