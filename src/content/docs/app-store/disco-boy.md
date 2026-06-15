---
title: Disco Boy
description: 'A music player for Leaf: WAV, MP3, FLAC and OGG playback with album art, tags, and output that follows your headphones.'
---

![Disco Boy on a Miniloong Pocket 1, styled as a Game Boy with a disco ball glowing on the screen](/leaf-docs/discoboy.png)

Let's be honest: the mono speaker on the MLP1 is nothing to write home about, and
no-one wants to hear your device in public anyway. So put on your headphones,
[wired](/leaf-docs/guide/settings/#display--sound) or
[Bluetooth](/leaf-docs/guide/settings/#bluetooth), and rock out. Disco Boy is a
small music player that sends sound straight to whatever you are listening on.

## Features

- **Plays the common formats** - WAV, MP3, FLAC, and OGG (Vorbis), decoded on the
  device.
- **Two views** - a library with the tracklist beside the now-playing artwork, and
  a focused now-playing screen with large art and a scrubber. Press **Y** to switch
  between them.
- **Album art** - drop a `cover.png` or `folder.jpg` next to your music and Disco
  Boy shows it; without one it draws a tidy vinyl placeholder in your theme color.
- **Tags and durations** - reads title, artist, album, and year from each file's
  tags, and shows every track's length.
- **A full transport** - play and pause, scrub forward and back, skip tracks,
  shuffle, and repeat (off, all, or one).
- **Follows your output** - plays through the speaker, wired headphones, or a
  Bluetooth headset, with a label up top telling you which. Plug in or connect part
  way through a song and the sound follows.
- **Looks like Leaf** - it inherits your color scheme and matches the rest of the
  firmware.

## Adding music

Disco Boy reads from the **Music** folder on your SD card. Organize it however you
like, whether loose tracks in the folder or sorted into artist and album subfolders,
which Disco Boy scans through. For per-album artwork, put a `cover.png` or
`folder.jpg` inside each album's folder.

## Controls

| Button | Action |
|---|---|
| Up / Down | move through the tracklist |
| A | play the highlighted track, or activate the focused control on the now-playing screen |
| X | play / pause |
| Y | switch between the library and the now-playing screen |
| L1 / R1 | previous / next track |
| Left / Right | move across the transport controls (now-playing screen) |
| B | back, or quit from the library |

Volume is handled by Leaf itself, so the hardware volume keys work in Disco Boy just
like everywhere else.
