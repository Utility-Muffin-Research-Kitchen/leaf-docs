---
title: RAOfflineProxy
description: 'Earn RetroAchievements while offline, and send them when you reconnect.'
---

RAOfflineProxy lets you earn RetroAchievements with no network. It caches a
game's achievement data while you are online, serves that cache to RetroArch
while you are not, and queues anything you unlock offline to send the next time
you reconnect.

:::caution[Casual only, and experimental]
Achievements earned through this pak are casual unlocks. With Hardcore
enabled, games launch directly, as they would if the pak weren't installed.

The pak is built on the Linux support in
[misantronic/RAOfflineProxy](https://github.com/misantronic/RAOfflineProxy),
which its authors describe as alpha, so expect rough edges.
:::

## Install

Install **RAOfflineProxy** from Pak Rat; see
[installing an app](/app-store/introduction/#installing-an-app).

## Before you start

Do these in order. The pak learns your account token from a game launched
through it, so the service has to be on and Hardcore has to be off first.
Nothing works offline until it has that token.

1. Sign in to RetroAchievements under **Settings > Games > Accounts**.
2. Turn off Hardcore. RetroArch turns it on by default. Start a RetroArch game,
   open **MENU > RetroArch Settings > Settings > Achievements**, and turn off
   **Hardcore Mode**. RetroArch restarts the game when you change this, so save
   first. Then exit through **MENU > Save & Quit** so the setting is kept.
3. Open RAOfflineProxy and turn the service on.
4. With a network connection, launch a game that runs in RetroArch and let it
   log in. Standalone emulators like N64, DraStic, and PPSSPP don't teach the
   pak your token.

## Turning it on

- **Service** starts or stops the proxy right now.
- **Start with Leaf** decides whether it comes back on its own after a reboot.
  It doesn't start or stop anything by itself.

Turn on both if you want it always available. Both are also in
**Settings > System > Services**.

## Preparing games for a trip

Playing a game online with the service on and Hardcore off caches it
automatically. A game you haven't played that way has no achievements offline
until you prepare it:

- **Prepare Recents and Favourites** covers everything you have played or
  favourited recently. This is the one to run before you travel.
- **Prepare one game** browses your library by console, with a search, so you
  can prepare a specific title.

The progress screen updates live. You can leave it and the work carries on in
the background; stopping is a separate action.

Some ROMs report **No RA data**. RetroAchievements has no entry for that exact
dump, and a different release of the same game may be recognised.

## Playing offline

Once a game is prepared, play as normal with the network off. Achievements
unlock and are queued. When you reconnect, the queue is sent automatically, once
each and in order. You don't need to open the pak.

Leaderboard entries aren't queued, so nothing you do offline reaches a
leaderboard.

## The pak says it has no token

If achievements work online but the pak won't prepare a game, your games are
probably launching directly. That happens when Hardcore is on or the service was
off when you launched. Follow [Before you start](#before-you-start) again, in
order.

## Nothing is cached for a game

It was never played online through the pak and never prepared. Prepare it while
you have a network.

## Achievements didn't appear after reconnecting

Open the pak. The queue is sent on its own once the network is back, and the run
status shows what is left.

## The pak says the service isn't running

Turn it on from the **Service** row.
