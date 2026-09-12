---
title: Native PICO-8 and Splore
description: Set up your purchased PICO-8 runtime, browse Splore, and play local carts on MLP1.
---

Native PICO-8 lets you browse Splore and play PICO-8 carts on your MLP1.
**PICO-8 for Leaf** is an optional integration. You supply the paid runtime
from [Joseph White / Lexaloffle](https://www.lexaloffle.com/pico-8.php).
FAKE-08 remains available and stays your default until you choose native PICO-8.

:::note[Development preview]
This integration is still being qualified and isn't available in Pak Rat yet.
The instructions below accompany the development build. Install the supporting
Leaf release before the integration when it becomes available.
:::

## Set up PICO-8

1. Purchase PICO-8 from Lexaloffle and download the **Raspberry Pi** ZIP.
2. Install **PICO-8 for Leaf** on your primary card. Its folder is
   `Apps/mlp1/PICO8.pak/`.
3. Extract `pico8_64` and `pico8.dat` from the ZIP's `pico-8` folder. Copy both
   files from the same download to `BIOS/PICO8/` on your primary card:

```text
BIOS/
  PICO8/
    pico8_64
    pico8.dat
```

Keep the names and capitalization shown above. Don't copy the enclosing
`pico-8` folder into `BIOS/PICO8/`, and don't rename `pico8_64` to `pico8`.
These are your purchased runtime files, not console BIOS dumps. The Windows,
macOS, and desktop Linux downloads won't work here. Raspberry Pi version
0.2.7 is the version tested so far.

## Browse Splore

Open **Apps > PICO-8 for Leaf**. Connect to Wi-Fi to refresh BBS lists and
download games. Select a game and press an action button to open it.

Splore's local file browser starts at your primary card's `Roms/PICO8/`.
Its `/` means that library root. It doesn't expose the whole SD card.
Use Leaf's game library to launch carts from your secondary card.

## Keep Splore favorites in Leaf

Select a game in Splore, press **START**, and choose **Favourite**. When you
exit Splore, Leaf copies your downloaded favorites into your PICO-8 game
library. Allow the library scan to finish after returning to Leaf.

Your copies live in primary `Roms/PICO8/Splore/` and initially use native
PICO-8, sharing your existing native progress. You can change their **Core**
choice later. Splore favorites and Leaf favorites stay separate.

If Splore only supplies an ID as a title, Leaf makes it readable, for example
`pilatro_35` becomes **Pilatro 35**. Numbers stay because they may belong to
the title. You can set your own display name in Leaf; imports keep that choice.

Removing a Splore favorite keeps your library copy. Whenever you exit Splore,
Leaf also updates previously imported games if Splore has downloaded newer
versions. Their library entries, playtime, and core choices stay in place.
Leaf doesn't overwrite a cart you've edited yourself. Edited carts and
filename conflicts are skipped without showing an import failure.

A favorite must finish downloading before it can be imported. Missing or
incomplete downloads are retried after your next Splore session. If you delete
an imported game while it remains a Splore favorite, Leaf imports it again.
Multi-cart games may still need an internet connection to download extra carts.

## Choose native playback for local carts

Put `.p8` or cartridge `.p8.png` files in `Roms/PICO8/` on either card.
Extract archives first. An ordinary PNG picture isn't a PICO-8 cartridge.

Press **X** on a game or on the PICO-8 system, choose **Core**, then choose
**PICO-8 (native)**. A game choice overrides the system choice. Choose
**FAKE-08** to switch back, or use **Reset Overrides** to remove a custom
choice and inherit the default.

If the native runtime is missing or can't start, Leaf uses its normal FAKE-08
launch path for local carts. Your saved core preference stays in place.
Exiting or crashing during a native session returns you to Leaf; it doesn't
start a second emulator.

## Controls and returning to Leaf

Press **MENU** to show **Return to Leaf?**, then press **MENU** again within
four seconds to quit PICO-8 normally. If you want to keep playing, let the
prompt disappear. This works in a game and in Splore, even when no cart is
selected. If PICO-8 stays frozen, wait at least two seconds and repeat the
MENU confirmation to force it to close. Unsaved progress may be lost.

Use the D-pad and action buttons to navigate and play. Press **START** for
PICO-8's native menu:

- A directly launched cart offers **Shutdown**.
- A Splore cart offers **Exit to Splore** and **Options > Shutdown PICO-8**.
- In the Splore browser, select a cart and use **START > Options > Shutdown
  PICO-8** to return to Leaf.

Volume controls work normally. RetroArch's shaders, achievements, rewind,
savestates, and Leaf's RetroArch menu don't apply to native PICO-8.

## Your progress and files

Both entry points use one native home on the primary card:
`.userdata/mlp1/pico8/`. It contains your configuration, native cartridge
progress, controller mappings, and Splore cache. Captures go to primary
`Recordings/PICO8/`. Carts that explicitly write another cart file write in
their selected ROM library.

Native progress is separate from FAKE-08 progress and savestates. Switching
emulators doesn't migrate either format. Keep multi-cart games together in
their original folder structure. A game may need further downloads even if
its first cart is already cached.

Your runtime and native home sit outside the pak and Leaf's system files.
Updating or removing the integration leaves them in place. Paths are resolved
again on each launch, including when the cards exchange mount points at boot.

For an intentional reset, stop PICO-8 and back up the file you want to reset
before removing it from the native home. PICO-8 recreates `config.txt` and
`sdl_controllers.txt` when they're absent. Your existing edits aren't replaced
on every launch.

## PICO-8 won't open

An upgrade message means your launcher doesn't provide native PICO-8 support.
Update Leaf before trying the integration again.

A setup message means you should check that both files are directly inside
primary `BIOS/PICO8/`, came from the same Raspberry Pi download, and were fully
extracted. Don't move the runtime to your secondary card when a cart lives
there; the runtime and native home always belong to the primary card.

## Splore can't download games

Check Wi-Fi and the device's date and time, then retry. New BBS games need an
internet connection. If the game list loads but a game doesn't, capture the
error and check `.userdata/mlp1/logs/umrk-leaf-session.log` on the primary
card. Keep the integration's `bin/wget` helper with the pak; it supplies the
HTTPS downloads that the stock firmware's wget can't handle.
