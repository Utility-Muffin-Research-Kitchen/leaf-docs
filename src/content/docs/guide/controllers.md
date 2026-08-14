---
title: Controllers
description: Pair a wireless controller to the Miniloong Pocket 1, how player order works, and what you need for three or more players.
---

:::caution[Coming soon]
Wireless controllers are available to test in the **beta** channel now. They have not
shipped in a stable release yet.
:::

Leaf plays multiplayer games with wireless controllers alongside the Pocket 1's own
controls. Up to four players: three wireless controllers plus the handheld itself.

The Xbox Wireless Controller is the one we test against. Other controllers that SDL
recognises generally work, but they are best-effort.

## Pairing

Go to **Settings > Bluetooth**, put your controller into pairing mode, and pick it
from the list.

On an Xbox controller, pairing mode is the small button on the top edge next to the
USB-C port. Hold it for about three seconds until the Xbox button flashes quickly.
A slow blink means the controller is on but not connected to anything; a steady light
means it is connected.

Once paired, the controller reconnects on its own when you turn it on.

## Who is which player

Wireless controllers take the first player slots, in the order they connected. The
handheld's own controls are always the **last** player.

| Connected | Player 1 | Player 2 | Player 3 |
| --- | --- | --- | --- |
| Nothing | Handheld | | |
| One controller | Controller | Handheld | |
| Two controllers | Controller 1 | Controller 2 | Handheld |

This is deliberate. Handing someone a controller should make them player 2, not
demote whoever is holding the device. The handheld never loses its slot either: if
you somehow connect a fourth controller, that one is ignored rather than pushing the
built-in controls out.

**Player order is decided when the game starts.** Connect everyone's controllers
first. A controller switched on mid-game will not join until you quit and start the
game again.

## Three or more players

Most of the consoles Leaf emulates only had **two controller ports**. Games that
supported four or five players did it with a *multitap* - an accessory that plugged
into one port and split it several ways. The Mega Drive called its versions the Team
Player and the 4-Way Play.

Emulation works the same way. For a third player you have to switch on the console's
multitap in RetroArch first, or the third controller simply does nothing.

Leaf does not turn it on for you. Plenty of games behave badly with a multitap
plugged in - some ignore it, some misread the extra ports, a few will not boot at all
- so it stays your choice, per game, rather than something that silently changes how
every game sees its controllers.

To enable it, open the RetroArch menu in-game and set the controller type for the
port your game expects the multitap on. Where exactly this lives depends on the
console, so check what your game supports.

:::note
If you have two controllers connected and the handheld controls seem dead, this is
almost certainly why. The handheld is player 3, and without a multitap the console
has nowhere to put a third player. Disconnect one controller and the handheld becomes
player 2 again straight away.
:::

## The Xbox button

The **Xbox button** does the same thing as the Pocket 1's own **Menu** button. Press
it to open the Leaf menu over your game, or the menus inside PPSSPP, DraStic, Flycast
and the N64 emulator when you are playing through those.

That means whoever is holding a controller can reach the menu without asking for the
device back.

## If a controller disconnects

Turn it back on and it reconnects by itself. Input picks up again within a couple of
seconds.

If it was connected when the game started, it keeps its player slot. If it was not,
it joins from the next launch.

Battery is worth ruling out first if a controller keeps dropping - a low Xbox
controller disconnects rather than warning you.
