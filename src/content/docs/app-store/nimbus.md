---
title: Nimbus
description: 'A weather app for Leaf: current conditions, a forecast, hourly weather, and sun and moon details, with big glanceable type and theme-matched weather glyphs.'
---

![Nimbus on a Miniloong Pocket 1, showing the current temperature with a large weather glyph](/nimbus.png)

Nimbus is a weather app built for a screen you glance at, not one you study. A big
temperature, a bold weather glyph, and the few numbers that matter, all in your Leaf
color scheme. It covers current conditions, a three-day forecast, an hourly
timeline, and sun and moon details.

There is nothing to set up. Nimbus uses [Open-Meteo](https://open-meteo.com) for
weather, so it needs no account and no API key. Open it and it finds your location
and shows the weather.

## Download

Nimbus is a standalone app, not bundled with Leaf. Open the
**[latest release](https://github.com/Utility-Muffin-Research-Kitchen/Nimbus/releases/latest)**,
download `Nimbus.pak.zip` from there, unzip it, and copy the `Nimbus.pak` folder into `Apps/mlp1/`
on your SD card. It appears in your Apps list next boot. Nimbus is open source
([MIT](https://github.com/Utility-Muffin-Research-Kitchen/Nimbus)).

## Features

- **Four views** - **Current**, a three-day **Forecast**, an **Hourly** timeline,
  and **Astro** for sunrise, sunset, day length, and the moon phase. Switch views
  with **L1 / R1**.
- **Big and glanceable** - a large weather glyph beside a huge temperature, then the
  stats that matter. Built for the handheld, not shrunk down from a phone.
- **Looks like Leaf** - it inherits your color scheme, font, and selection style, and
  the weather glyphs pick up your theme color.
- **Many places** - search by city or postal code, or let it find you automatically.
  Flip between your saved locations with **Left / Right**.
- **Instant, then fresh** - it shows your last weather right away and refreshes in the
  background, so it never makes you wait on the network.
- **Works offline** - the last forecast is cached, and you can switch between
  Fahrenheit and Celsius any time.

## Locations

Press **Y** for the menu, then **Locations**, to manage your places. **X** adds a new
one (search by city or postal code), and **A** opens options to set a location as home
or delete it. Your home location is what Nimbus opens to.

## Controls

| Button | Action |
|---|---|
| L1 / R1 | switch view (Current, Forecast, Hourly, Astro) |
| Left / Right | switch saved location |
| Up / Down | scroll the view |
| Y | open the menu (Units, Locations, About) |
| B | quit |

Units, locations, and the About page all live under the **Y** menu. Weather data is
by [Open-Meteo](https://open-meteo.com) (CC-BY 4.0).
