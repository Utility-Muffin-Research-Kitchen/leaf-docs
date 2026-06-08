# leaf-docs

Documentation site for **Leaf** — custom firmware for the Miniloong Pocket 1 (MLP1).

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).
Deployed to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

## Develop

```sh
npm install      # once
npm run dev      # local dev server at http://localhost:4321/leaf-docs/
npm run build    # production build to dist/
npm run preview  # serve the built site locally
```

## Content

Pages live in `src/content/docs/`:

- `guide/` — end-user docs (install, updating, games, BIOS, features, …)
- `develop/` — contributor docs (architecture, repo map, building, contributing)

The sidebar order is defined explicitly in `astro.config.mjs`. Add a page by
creating the Markdown file and adding it to the matching sidebar group.

Stubs are real pages with a short "in progress" note; fill them in by editing
the Markdown — no structural change needed.

## Deploy URL & custom domain

The site currently builds for the GitHub Pages project path:

```
https://utility-muffin-research-kitchen.github.io/leaf-docs/
```

To move to a custom domain later:

1. In `astro.config.mjs`, set `site` to the domain and `base` to `'/'`.
2. Rewrite the in-content absolute links (hero actions + body links use the
   `/leaf-docs` base path) with one search-replace:
   ```sh
   grep -rl '/leaf-docs/' src | xargs sed -i '' 's#/leaf-docs/#/#g'   # macOS sed
   ```
3. Add the domain in the GitHub Pages settings and point DNS (CNAME) at Pages.

Sidebar/nav links use Starlight slugs and already follow `base` automatically;
only the hand-written in-content links need the rewrite in step 2.

## Branding

The header logo is `src/assets/leaf.png` (the current Leaf wordmark). Swap that
file when the final brand logo lands. The Leaf green/dark theme is in
`src/styles/leaf.css`, matched to the launcher's `#7FB069` scheme.
