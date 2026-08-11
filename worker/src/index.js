import puppeteer from '@cloudflare/puppeteer';

// Dynamic Open Graph for the colorway studios (Retroid Pocket Nova, Miniloong
// Pocket 1, Mangmi, and TrimUI Brick NextUI palettes).
//
// leaf.game is static (GitHub Pages) and each colorway is drawn client-side from
// the share link, so crawlers (Discord/Slack/iMessage) only see the generic Leaf
// banner. This Worker sits in front of the GitHub Pages origin and, for a studio
// link that carries a valid config, rewrites og:image to a rendered picture of
// that exact build. Everything else passes through untouched, so the rest of the
// site (and a bare studio link with no config) keeps the Leaf banner.
//
// The image is produced with Browser Rendering (free monthly allowance on the
// Workers Free plan): load the real studio at the config, screenshot the composed
// canvas straight to a binary PNG -- no base64, so Worker CPU stays near zero and
// well under the free 10ms/request cap -- and cache it forever. Configs are
// immutable, so each one renders at most once.

// One entry per studio. buildConfig() validates the share params and returns the
// canonical query string used for BOTH the image URL and the immutable cache key
// (or null to pass the request through with the default banner).
const STUDIOS = [
  {
    prefix: '/nova-colorways',
    ogPath: '/nova-og',
    canvasId: 'nova-canvas',
    loadingId: 'nova-loading',
    // 8: the studio's rendering changed (per-button function colors in Real mode, the
    // shoulder-trigger fix, the new Display axis). Cards are cached immutable, so already
    // rendered links would have kept serving the pre-fix image without this bump.
    ver: 8,
    altName: 'Retroid Pocket Nova',
    card: { title: 'Nova<br>Colorway<br>Studio', sub: 'Design your<br>Retroid Pocket Nova' },
    buildConfig(p) {
      // Real photo mode uses ?m=real&rc=<base36 digits>; illustrated uses ?c=<code>.
      if (p.get('m') === 'real') {
        const rc = p.get('rc') || '';
        return /^[0-9a-z]{1,16}$/.test(rc) ? `m=real&rc=${rc}` : null;
      }
      const c = p.get('c') || '';
      return /^[0-9a-z]{1,24}$/.test(c) ? `c=${c}` : null;
    },
    // Real mode composites the landscape front photo (nova-front); illustrated
    // draws the square nova-canvas. Pick the right canvas + loading node per config.
    ogTarget(cfg) {
      return cfg.startsWith('m=real')
        ? { canvasId: 'nova-front', loadingId: 'nova-real-loading', landscape: true }
        : { canvasId: this.canvasId, loadingId: this.loadingId, landscape: false };
    },
  },
  {
    prefix: '/mlp1-colorways',
    ogPath: '/mlp1-og',
    canvasId: 'mlp1-canvas',
    loadingId: 'mlp1-loading',
    ver: 2,
    altName: 'Miniloong Pocket 1',
    card: { title: 'MLP1<br>Colorway<br>Studio', sub: 'Design your<br>Miniloong Pocket 1' },
    buildConfig(p) {
      const bd = p.get('bd'), fp = p.get('fp'), sc = p.get('sc');
      const out = [];
      if (['white', 'black', 'retro'].includes(bd)) out.push(`bd=${bd}`);
      if (fp === 'siwelk') out.push('fp=siwelk');                    // hidden easter egg
      else if (fp && /^[0-9a-fA-F]{6}$/.test(fp)) out.push(`fp=${fp.toLowerCase()}`);
      const ft = p.get('ft');
      if (ft !== null && /^\d+$/.test(ft) && +ft >= 0 && +ft <= 100) out.push(`ft=${+ft}`);
      if (['off', 'aurknix', 'bloom', 'darkos', 'knulli', 'leaf'].includes(sc)) out.push(`sc=${sc}`);
      return out.length ? out.join('&') : null;
    },
  },
  {
    prefix: '/mangmi-colorways',
    ogPath: '/mangmi-og',
    canvasId: 'mangmi-canvas',
    loadingId: 'mangmi-loading',
    ver: 2,
    altName: 'Mangmi',
    ogAlt: 'A Mangmi handheld colorway',
    // Four devices share the page, so the card names whichever one the link opens.
    card(cfg) {
      const name = cfg.includes('d=max')  ? 'Pocket Max'
                 : cfg.includes('d=yp')   ? 'Air Y Pro'
                 : cfg.includes('d=y')    ? 'Air Y'
                 : 'Air X';
      return {
        title: 'Mangmi<br>Colorway<br>Studio',
        sub: `Design your<br>Mangmi ${name}`,
      };
    },
    buildConfig(p) {
      // ?c=<base36 digit per axis>, plus the device and angle when they aren't the
      // defaults (Air X / front). Order is fixed so one build has one cache key.
      const c = p.get('c') || '';
      if (!/^[0-9a-z]{1,24}$/.test(c)) return null;
      let out = `c=${c}`;
      const d = p.get('d');
      // Whitelisted rather than passed through, so a junk value can't mint cache keys.
      if (d === 'max' || d === 'y' || d === 'yp') out += `&d=${d}`;
      if (p.get('v') === 'back') out += '&v=back';
      return out;
    },
    // The Air X and Max canvases are ~2:1 with the background masked out, so they sit
    // directly on the card. The Air Y pair is PORTRAIT (roughly 5:7) - at the landscape
    // width of 760px it would stand ~1070px tall and overflow a 900px card, so it is
    // sized by height instead.
    ogTarget(cfg) {
      const portrait = cfg.includes('d=y');   // matches d=y and d=yp
      if (portrait) {
        return {
          canvasId: this.canvasId, loadingId: this.loadingId,
          cvStyle: 'height:800px;width:auto;max-width:none;border-radius:24px;'
                 + 'margin-left:44px;flex:0 0 auto;background:transparent',
        };
      }
      return { canvasId: this.canvasId, loadingId: this.loadingId, landscape: true };
    },
  },
  {
    prefix: '/nextui-palettes',
    ogPath: '/nextui-og',
    ver: 1,
    altName: 'TrimUI Brick NextUI',
    ogAlt: 'A NextUI color palette on the TrimUI Brick',
    card: { title: 'NextUI<br>Palette<br>Studio', sub: 'Design your<br>TrimUI Brick theme' },
    buildConfig(p) {
      // Share links carry ?t= and an optional ?n=<name>. Two forms, matching the
      // studio's own readShareCode: base64url over the palette bytes (28 chars for
      // the usual all-opaque theme, up to 40 with alphas), or the older RGBA hex
      // (56, or 72 from when the studio still had the two cosmetic LED slots).
      // Hex is lowercased; base64url must be passed through as-is, it is case
      // sensitive. The cap is what keeps this from forwarding arbitrary junk.
      const raw = p.get('t') || '';
      const hex = /^([0-9a-fA-F]{8}){7,9}$/.test(raw);
      if (!hex && !/^[A-Za-z0-9_-]{24,44}$/.test(raw)) return null;
      const t = hex ? raw.toLowerCase() : raw;
      let out = `t=${t}`;
      const n = p.get('n');
      if (n) out += `&n=${encodeURIComponent(n.slice(0, 40))}`;
      return out;
    },
    // The studio composites the live screen onto the device photo (an HTML tree,
    // not a canvas). Screenshot the whole photo element; wait for the brick photo
    // to load and fitPhoto() to place the inner layer; size it for the card and
    // fire a resize so fitPhoto() rescales to the card width.
    ogTarget() {
      return {
        canvasId: 'nu-photo',
        landscape: true,
        readyExpr:
          "!!(()=>{const i=document.querySelector('.nu-photo-img'),n=document.getElementById('nu-photo-inner');" +
          'return i&&i.complete&&i.naturalWidth>0&&n&&n.style.transform})()',
        cvStyle:
          'width:760px;height:572px;max-width:none;position:relative;overflow:hidden;' +
          'border-radius:24px;margin-left:44px;flex:0 0 auto;background:transparent',
      };
    },
  },
];

class SetContent {
  constructor(value) { this.value = value; }
  element(el) { el.setAttribute('content', this.value); }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const ogStudio = STUDIOS.find((s) => url.pathname === s.ogPath);
    if (ogStudio) return renderOg(ogStudio, url, env, ctx);

    const pageStudio = STUDIOS.find((s) => url.pathname.startsWith(s.prefix));
    if (pageStudio) {
      const res = await fetch(request); // origin = GitHub Pages
      const cfg = pageStudio.buildConfig(url.searchParams);
      const ct = res.headers.get('content-type') || '';
      if (!cfg || !ct.includes('text/html')) return res; // no/invalid config -> untouched
      const img = `${url.origin}${pageStudio.ogPath}?${cfg}&v=${pageStudio.ver}`;
      return new HTMLRewriter()
        .on('meta[property="og:image"]', new SetContent(img))
        .on('meta[name="twitter:image"]', new SetContent(img))
        .on('meta[property="og:image:alt"]', new SetContent(pageStudio.ogAlt || `${pageStudio.altName} colorway`))
        .on('meta[property="og:image:width"]', new SetContent('1200'))
        .on('meta[property="og:image:height"]', new SetContent('900'))
        .transform(res);
    }

    return fetch(request);
  },
};

async function renderOg(studio, url, env, ctx) {
  const cfg = studio.buildConfig(url.searchParams);
  if (!cfg) return new Response('bad config', { status: 400 });
  const target = studio.ogTarget
    ? studio.ogTarget(cfg)
    : { canvasId: studio.canvasId, loadingId: studio.loadingId, landscape: false };
  // A studio serving more than one device varies its card copy by config.
  const card = typeof studio.card === 'function' ? studio.card(cfg) : studio.card;

  // Each config renders once, then serves from cache forever (config is immutable).
  const cache = caches.default;
  const key = new Request(`${url.origin}${studio.ogPath}?${cfg}&v=${studio.ver}`);
  const cached = await cache.match(key);
  if (cached) return cached;

  let browser;
  try {
    browser = await acquireBrowser(env);
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1400, deviceScaleFactor: 1 });
    await page.goto(`${url.origin}${studio.prefix}/?${cfg}`, { waitUntil: 'networkidle0', timeout: 25000 });
    // Wait for the studio to finish composing: a custom readiness expression when
    // the target defines one, else the loading node being removed by init().
    const ready = target.readyExpr || `!document.getElementById('${target.loadingId}')`;
    await page.waitForFunction(ready, { timeout: 25000 });
    // Build a 1200x900 branded card around the composed canvas: the device as a
    // rounded photo on the Leaf dark-green background, with the Leaf wordmark +
    // title alongside. Discord shows a full summary_large_image card (title +
    // description + link) for wide images, not a bare square photo.
    await page
      .addStyleTag({ url: 'https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&display=swap' })
      .catch(() => {});
    await page.evaluate(async (opts) => {
      const cv = document.getElementById(opts.canvasId);
      const wrap = document.createElement('div');
      wrap.id = 'og-card';
      wrap.style.cssText =
        'position:fixed;left:0;top:0;width:1200px;height:900px;background:#0F160E;' +
        'display:flex;align-items:center;overflow:hidden;z-index:99999;' +
        "font-family:'Nunito',system-ui,-apple-system,sans-serif";
      // Transparent so a landscape device sits on the card bg, not a canvas fill.
      // A target may supply its own sizing (e.g. an HTML photo tree that needs an
      // explicit height); otherwise fall back to the canvas landscape/square sizes.
      cv.style.cssText = opts.cvStyle
        ? opts.cvStyle
        : opts.landscape
        ? 'width:760px;height:auto;max-width:none;border-radius:24px;margin-left:44px;flex:0 0 auto;background:transparent'
        : 'width:812px;height:812px;max-width:none;border-radius:30px;margin-left:44px;flex:0 0 auto;background:transparent';
      const panel = document.createElement('div');
      panel.style.cssText = 'margin-left:46px;display:flex;flex-direction:column';
      panel.innerHTML =
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:26px">' +
        `<img src="${opts.origin}/favicon.png" width="60" height="60" style="display:block"/>` +
        '<span style="font-size:44px;font-weight:800;color:#C6E0B4;line-height:1">Leaf</span>' +
        '</div>' +
        `<div style="font-size:42px;font-weight:800;line-height:1.14;color:#fff">${opts.title}</div>` +
        '<div style="height:2px;width:240px;background:#3C5036;margin:26px 0 16px"></div>' +
        `<div style="font-size:20px;font-weight:700;color:#789A6E;line-height:1.3;margin-bottom:26px">${opts.sub}</div>` +
        '<div style="font-size:24px;font-weight:800;color:#7FB069">leaf.game</div>';
      wrap.appendChild(cv);
      wrap.appendChild(panel);
      document.body.appendChild(wrap);
      // If the target sized itself, the studio's resize handler (fitPhoto) must
      // rescale the composited layer to the new width before we screenshot.
      if (opts.cvStyle) {
        window.dispatchEvent(new Event('resize'));
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      }
      const img = panel.querySelector('img');
      try { if (img && img.decode) await img.decode(); } catch (_) {}
      try { await document.fonts.ready; } catch (_) {}
    }, { canvasId: target.canvasId, landscape: target.landscape, cvStyle: target.cvStyle, origin: url.origin, title: card.title, sub: card.sub });
    const el = await page.$('#og-card');
    if (!el) throw new Error('card not built');
    const png = await el.screenshot({ type: 'png' }); // binary Uint8Array, no base64
    await page.close();

    const resp = new Response(png, {
      headers: {
        'content-type': 'image/png',
        'cache-control': 'public, max-age=31536000, immutable',
      },
    });
    ctx.waitUntil(cache.put(key, resp.clone()));
    return resp;
  } catch (e) {
    // Fail soft: fall back to the default banner so the embed still shows something.
    return Response.redirect(`${url.origin}/og.png`, 302);
  } finally {
    // Disconnect (don't close) to leave the browser warm for the next render.
    if (browser) { try { await browser.disconnect(); } catch (_) {} }
  }
}

// Reuse a kept-alive browser session when one is free; otherwise launch a new one
// that stays warm a few minutes. Fewer cold launches = faster renders and fewer
// Browser Rendering rate-limit hits.
async function acquireBrowser(env) {
  try {
    const sessions = await puppeteer.sessions(env.BROWSER);
    const free = sessions.find((s) => !s.connectionId);
    if (free) return await puppeteer.connect(env.BROWSER, free.sessionId);
  } catch (_) { /* fall through to a fresh launch */ }
  return await puppeteer.launch(env.BROWSER, { keep_alive: 180000 });
}
