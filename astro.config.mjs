// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Deploy target.
//   Now:   GitHub Pages project path  ->  https://<org>.github.io/leaf-docs/
//   Later: custom domain              ->  set `site` to the domain and `base` to '/'
//          (that single change is all that's needed to flip — internal links use
//           Starlight slugs, so they follow `base` automatically).
const SITE = 'https://utility-muffin-research-kitchen.github.io';
const BASE = '/leaf-docs';

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [
    starlight({
      title: 'Leaf',
      // "Deconstructed leaf" duotone mark (separated halves + detached stem held
      // by negative space) + the "Leaf" title text. Provisional brand mark —
      // pending Helaas review. Swap src/assets/leaf.png to change it.
      logo: { src: './src/assets/leaf.png', alt: 'Leaf' },
      favicon: '/favicon.png',
      customCss: ['./src/styles/leaf.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Utility-Muffin-Research-Kitchen',
        },
      ],
      // Default to dark when the visitor has no saved preference (Leaf is a
      // soft-green-on-dark identity). The theme toggle still works.
      head: [
        {
          tag: 'script',
          content:
            "if(!localStorage.getItem('starlight-theme')){document.documentElement.dataset.theme='dark';}",
        },
        // Social-card image for link previews (Discord, Slack, iMessage, etc.).
        // Starlight emits og:title/description but no og:image, so embeds show no
        // image. Open Graph needs absolute URLs. Regenerate with scripts/make-og.py.
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE}${BASE}/og.png` } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Leaf - custom firmware for the Miniloong Pocket 1' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE}${BASE}/og.png` } },
      ],
      sidebar: [
        {
          label: 'Guide',
          items: [
            { label: 'Introduction', slug: 'guide/introduction' },
            { label: 'Install Leaf', slug: 'guide/install' },
            { label: 'Updating (OTA)', slug: 'guide/updating' },
            { label: 'Recovery', slug: 'guide/recovery' },
            { label: 'Adding games & ROMs', slug: 'guide/games' },
            { label: 'BIOS & cores', slug: 'guide/bios-and-cores' },
            { label: 'Features tour', slug: 'guide/features' },
            { label: 'Settings reference', slug: 'guide/settings' },
            { label: 'Troubleshooting', slug: 'guide/troubleshooting' },
          ],
        },
        {
          label: 'Develop',
          items: [
            { label: 'Architecture', slug: 'develop/architecture' },
            { label: 'Repo map', slug: 'develop/repo-map' },
            { label: 'Building from source', slug: 'develop/building' },
            { label: 'Contributing', slug: 'develop/contributing' },
          ],
        },
      ],
    }),
  ],
});
