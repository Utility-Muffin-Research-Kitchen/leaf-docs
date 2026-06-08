---
title: Architecture
description: How Leaf is put together — the run-on-top-of-stock model and the launcher's component split.
---

import { Aside } from '@astrojs/starlight/components';

<Aside type="caution" title="In progress">
This page is a stub and will be filled in soon.
</Aside>

This page will explain how Leaf is built, including:

- **Run-on-top-of-stock** — the boot hook that takes over before the stock home
  screen, the session supervisor, and the automatic fallback to stock.
- **The launcher stack** — the daemon, launcher, in-game menu, OSD, and LED
  components, and how they communicate.
- **Catastrophe** — the shared SDL2-based UI toolkit the launcher and apps are
  built on.
- **The appearance contract** — how the launcher exports its theme to apps so
  they match it.
- **Platform abstraction** — how device-specific code is isolated for future
  hardware.
