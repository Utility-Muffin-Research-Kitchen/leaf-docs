# leaf-nova-og — dynamic Open Graph for the colorway studios

leaf.game is static (GitHub Pages) and each colorway studio draws client-side
from its share link, so link crawlers (Discord, Slack, iMessage) only see the
generic Leaf banner. This Cloudflare Worker sits in front of the GitHub Pages
origin and, for a studio link that carries a valid config, rewrites `og:image`
to a rendered picture of that exact build. It serves two studios:

- **Nova** — `/nova-colorways?c=<code>` → `/nova-og?c=<code>`
- **MLP1** — `/mlp1-colorways?bd=&fp=&sc=` → `/mlp1-og?bd=&fp=&sc=`
- **NextUI** — `/nextui-palettes?t=<hex>` → `/nextui-og?t=<hex>`

Everything else — the rest of the site, and a bare studio link with no config —
passes through untouched and keeps the Leaf banner. Add another studio by
appending an entry to the `STUDIOS` array in `src/index.js`.

## Cloudflare dashboard changes (done once, DONE)

The Worker cannot see traffic until the domain is proxied through Cloudflare.

1. **Proxy the domain** (leaf.game DNS record: grey cloud -> **orange cloud**).
2. **SSL/TLS -> Full** (NOT Flexible — Flexible loops with GitHub Pages HTTPS).
3. Verify: `curl -sI https://leaf.game/ | grep -i cf-ray` returns a `cf-ray`.

## Deploy (Workers Free plan is fine)

Browser Rendering ("Browser Run") is included on the Free plan with a monthly
usage allowance — no paid plan needed. The Worker screenshots the canvas as a
binary PNG (no base64), so per-request Worker CPU stays well under the free
10ms cap; the browser work itself is billed as the Browser Run allowance, and
every image is cached forever so a given `?c=` renders at most once.

```sh
cd leaf-docs/worker
npm install
npx wrangler login       # once
npx wrangler deploy      # publishes + attaches the routes and browser binding
```

The routes and the `browser` binding attach automatically from `wrangler.toml`.

## Test

```sh
curl -sI "https://leaf.game/nova-og?c=0015555550000"          # -> content-type: image/png
curl -s  "https://leaf.game/nova-colorways/?c=0015555550000" | grep og:image
curl -sI "https://leaf.game/mlp1-og?bd=white&fp=22c3a6&sc=leaf"        # -> content-type: image/png
curl -s  "https://leaf.game/mlp1-colorways/?bd=white&fp=22c3a6&sc=leaf" | grep og:image
curl -sI "https://leaf.game/nextui-og?t=ffffffff9b2257ff1e2329ffffffffff000000ffffffffff14315eff31d0ffff31d0ffff"  # -> content-type: image/png
curl -s  "https://leaf.game/nextui-palettes/?t=ffffffff9b2257ff1e2329ffffffffff000000ffffffffff14315eff31d0ffff31d0ffff" | grep og:image
```

Then paste a share link in Discord — the embed shows the built device. Each
unique config is a unique URL, so Discord scrapes it fresh (no stale-cache issue).

## How it works

- **HTML route** (`/nova-colorways*`): fetches the GitHub Pages HTML and uses
  `HTMLRewriter` to point `og:image` / `twitter:image` at `/nova-og?c=<code>`.
  Only touched when a valid `?c=` is present; otherwise returned verbatim.
- **Image route** (`/nova-og?c=<code>`): renders the studio with Browser
  Rendering, waits for `#nova-loading` to be removed (the studio drops it right
  before it composes `#nova-canvas`), pins the canvas to 1200x1200 and
  screenshots it to a binary PNG, then caches it forever.
- **Fail-soft:** any render error redirects to `/og.png`, so an embed never
  breaks — worst case it shows the default banner.

### Beating the crawler timeout

A cold browser launch is ~12s, over Discord's ~10s unfurl timeout, and with
billions of possible configs almost every share is a first-time render. Two
things keep it under the wire:

- **Session reuse.** The Worker keeps the browser alive (`keep_alive`) and
  reconnects to a free session instead of relaunching, so a warm render is
  ~1-2s instead of ~12s.
- **Warm-on-share.** The studio fires `GET /nova-og?c=<code>` the moment you
  click *Copy share link*, front-loading the render into the copy->paste gap so
  the image is cached before the crawler asks for it.

Together these cover the common case; a truly cold first render can still race a
very fast paster, in which case it self-heals on the next unfurl (now cached).
The Worker still renders straight from the public `?c=` page, so it also covers
hand-edited codes and old links.

## Rollback

Delete the Worker (or its routes) in the dashboard, or flip the DNS record back
to **DNS only**. The site returns to serving directly from GitHub Pages with the
default banner. The GitHub Pages content is unchanged either way.
