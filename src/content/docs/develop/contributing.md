---
title: Contributing
description: How to contribute to Leaf - where to start and the project's conventions.
---

Contributions are welcome. Leaf is cooked up in the open at the
[Utility-Muffin-Research-Kitchen](https://github.com/Utility-Muffin-Research-Kitchen).

## Where to start

1. Find the right repository for your change in the
   [repository table](/develop/architecture/#repositories). Keep changes in the
   owning repo: launcher logic in Jawaka, UI-toolkit changes in Catastrophe, the
   boot and install mechanism in miniloong-launcher-switcher.
2. Read that repo's README and any plans or docs it carries.
3. See [Building from source](/develop/building/) to get a build going.

## House conventions

- Write C. Reach for C++ only when it materially simplifies a subsystem.
- Catastrophe names are `cat_` (public), `cat__` (internal), and `CAT_`
  (macros, constants, enums). Jawaka uses `jw_` and `jw__`. Use descriptive
  variable names: `screen_w`, not `sw`.
- Spawn processes with `fork`/`exec`. Don't call `system()`.
- Keep SD content FAT32-safe: no symlinks or desktop-only filesystem assumptions
  in shared launcher or runtime behavior.
- Use the runtime path contract. Don't hardcode SD, launcher, app, or data roots;
  use the shared environment variables.

## Pull requests

- Keep changes scoped to one concern and one repo where possible.
- Build the affected component before opening the PR.
- Open the PR against the owning repo. A maintainer reviews and merges.
