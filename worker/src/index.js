import puppeteer from '@cloudflare/puppeteer';

// Dynamic Open Graph for the colorway studios (Retroid Pocket Nova + Miniloong
// Pocket 1).
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
    ver: 6,
    altName: 'Retroid Pocket Nova',
    card: { title: 'Nova<br>Colorway<br>Studio', sub: 'Design your<br>Retroid Pocket Nova' },
    buildConfig(p) {
      const c = p.get('c') || '';
      return /^[0-9a-z]{1,24}$/.test(c) ? `c=${c}` : null;
    },
  },
  {
    prefix: '/mlp1-colorways',
    ogPath: '/mlp1-og',
    canvasId: 'mlp1-canvas',
    loadingId: 'mlp1-loading',
    ver: 1,
    altName: 'Miniloong Pocket 1',
    card: { title: 'MLP1<br>Colorway<br>Studio', sub: 'Design your<br>Miniloong Pocket 1' },
    buildConfig(p) {
      const bd = p.get('bd'), fp = p.get('fp'), sc = p.get('sc');
      const out = [];
      if (['white', 'black', 'retro'].includes(bd)) out.push(`bd=${bd}`);
      if (fp && /^[0-9a-fA-F]{6}$/.test(fp)) out.push(`fp=${fp.toLowerCase()}`);
      if (['off', 'aurknix', 'bloom', 'darkos', 'leaf'].includes(sc)) out.push(`sc=${sc}`);
      return out.length ? out.join('&') : null;
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
        .on('meta[property="og:image:alt"]', new SetContent(`${pageStudio.altName} colorway`))
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
    // init() removes the loading node immediately before it composes the canvas.
    await page.waitForFunction(`!document.getElementById('${studio.loadingId}')`, { timeout: 25000 });
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
      cv.style.cssText =
        'width:812px;height:812px;max-width:none;border-radius:30px;margin-left:44px;flex:0 0 auto;background:transparent';
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
      const img = panel.querySelector('img');
      try { if (img && img.decode) await img.decode(); } catch (_) {}
      try { await document.fonts.ready; } catch (_) {}
    }, { canvasId: studio.canvasId, origin: url.origin, title: studio.card.title, sub: studio.card.sub });
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
