---
title: Video From Hell
description: 'A local video player for Leaf: one library across both SD cards and your recorded gameplay, hardware-decoded playback, resume, a queue, and subtitles.'
---

![Video From Hell's video library on the Recently Added tab, showing a list of videos with thumbnails and durations on the left and a preview panel on the right with the selected video's poster, title, and length](/videofromhell.png)

Video From Hell plays the films and episodes on your SD cards and the gameplay
you recorded. It plays H.264 and HEVC up to 1080p, and other formats when the
device can open them. It is named after Frank Zappa's home-video release.

## Install

Install **Video From Hell** from Pak Rat; see
[installing an app](/app-store/introduction/#installing-an-app). It appears in
your **Apps** tab.

## Adding videos

Put videos in a `Videos` folder at the root of your SD card, organized
however you like. Subfolders are scanned several levels deep. Press **SELECT**
in the browser to rescan after adding files.

These extensions are recognized: `.mp4`, `.m4v`, `.mkv`, `.mov`, `.avi`, `.webm`, `.ts`,
`.m2ts`, `.mts`, `.mpg`, `.mpeg`, `.3gp`, `.flv`.

If you run two SD cards, the `Videos` folder on both is merged into one library.
Folders with the same name join up, and anything ambiguous is labelled **SD1**
or **SD2**.

For artwork, drop an image beside the film with the same name (`Film.jpg`,
`Film.png`), or a `poster.jpg` in a folder holding a single video, or a
`folder.jpg` to give a whole folder a cover. With none of those, Video From Hell
uses artwork embedded in the file, or a frame from the film.

Leaf's [recordings](/guide/screenshots/#recording) appear as a
**Recorded Gameplay** folder. A recording that is still being written stays
hidden until you rescan.

## Subtitles

External SubRip (`.srt`) sidecars are supported, with UTF-8 text. Name the file
after the video; case doesn't matter:

```text
Film.mkv
Film.srt
Film.en.srt
```

When a sidecar is found, subtitles start switched on, and **SELECT** toggles
them during playback. Embedded subtitle tracks, ASS/SSA styling, a choice of
audio track, and playback speed aren't supported.

## Watching

The browser has three views. **Continue Watching** has whatever you left part
way through, **Recently Added** puts the newest files first, and **Folders**
shows the card as you organized it.

Your position is saved as you watch and restored when you come back. The first
30 seconds don't count, and past 90% a video is marked watched. The backlight
stays on while a video plays.

Seeking, pausing, or skipping brings up the title, elapsed and total time, a
scrub bar, and the current audio output for about three seconds. Press **Y** to
pin that display, which makes it interactive. The d-pad moves between the
transport row - previous, rewind, play / pause, forward, next - and a second row
of **Queue**, **Subtitles**, **Aspect**, **More**, and **Video Information**.

- **Queue** opens the list you have lined up, where **A** plays an entry, **X**
  removes one, **Y** reorders, and **SELECT** clears it after a confirmation.
  The queue is kept when you quit the app.
- **More** holds chapters when the file has them.
- **Video Information** shows the file, container, codecs, resolution, and where
  the sound is going.

At the end of a video, Video From Hell asks whether to play the next queued
video, replay this one, or go back to the library.

## Controls

| Button | Browser | Playing |
|---|---|---|
| **Up** / **Down** | move in the list | move between rows of the pinned display |
| **Left** / **Right** | jump by letter | seek back / forward 10 seconds, or move along the pinned display |
| **A** | open a folder, play a video | play / pause, or activate the focused control |
| **B** | back up one level | close a submenu, unpin the display, or return to the library |
| **X** | item actions (play, queue, information, history) | play / pause |
| **Y** | - | show or pin the on-screen display |
| **L1** / **R1** | switch view | previous / next, following the queue |
| **L2** / **R2** | - | hold to seek |
| **SELECT** | rescan the library | toggle subtitles |
| Stick click | - | cycle Fit / Fill / Stretch |
| **MENU** | quit | quit |

## Credits

Video From Hell is open source
([MIT](https://github.com/Utility-Muffin-Research-Kitchen/VideoFromHell)).
To install by hand, download `VideoFromHell.pak.zip` from its
[releases page](https://github.com/Utility-Muffin-Research-Kitchen/VideoFromHell/releases/latest).
