// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Deploy target: custom domain at the apex, served by GitHub Pages.
//   Custom domain (now):  https://leaf.game/      -> SITE = the domain, BASE = '/'
//   GitHub Pages project:  https://<org>.github.io/leaf-docs/ -> BASE = '/leaf-docs'
// Starlight nav follows BASE automatically; in-content absolute paths are written
// relative to BASE (root here), so they resolve under the apex.
const SITE = 'https://leaf.game';
const BASE = '/';
// Absolute asset URLs (og:image) must not double the slash when BASE is '/'.
const ASSET_PREFIX = BASE === '/' ? '' : BASE;

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [
    starlight({
      title: 'Leaf',
      // "Deconstructed leaf" duotone mark (separated halves + detached stem held
      // by negative space) + the "Leaf" title text. Provisional brand mark
      // pending Helaas review. Swap src/assets/leaf.png to change it.
      logo: { src: './src/assets/leaf.png', alt: 'Leaf' },
      favicon: '/favicon.png',
      customCss: ['./src/styles/leaf.css'],
      social: [
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/q5F7cZ7KRp',
        },
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Utility-Muffin-Research-Kitchen/Leaf',
        },
      ],
      // Default to dark when the visitor has no saved preference - it suits the
      // dark device UI and makes the green-glow hero and framed screenshots pop.
      // This forces dark on a first visit regardless of the OS setting; the theme
      // toggle (including Auto, which then follows the OS) still works and the
      // choice is remembered.
      head: [
        {
          tag: 'script',
          content:
            "if(!localStorage.getItem('starlight-theme')){localStorage.setItem('starlight-theme','dark');document.documentElement.dataset.theme='dark';}",
        },
        // Social-card image for link previews (Discord, Slack, iMessage, etc.).
        // Starlight emits og:title/description but no og:image, so embeds show no
        // image. Open Graph needs absolute URLs. Regenerate with scripts/make-og.py.
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE}${ASSET_PREFIX}/og.png` } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1280' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '640' } },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Leaf - custom firmware for the Miniloong Pocket 1' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE}${ASSET_PREFIX}/og.png` } },
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
            { label: 'Playing games', slug: 'guide/playing' },
            { label: 'RetroArch shaders', slug: 'guide/shaders' },
            { label: 'Features tour', slug: 'guide/features' },
            { label: '5-Game Mode', slug: 'guide/five-game-mode' },
            { label: 'Screenshots', slug: 'guide/screenshots' },
            { label: 'Recording', slug: 'guide/recording' },
            { label: 'Rumble', slug: 'guide/rumble' },
            { label: 'Settings reference', slug: 'guide/settings' },
            { label: 'Troubleshooting', slug: 'guide/troubleshooting' },
          ],
        },
        {
          label: 'Built-in apps',
          items: [
            { label: 'Overview', slug: 'apps/introduction' },
            { label: 'Central Scrutinizer', slug: 'apps/central-scrutinizer' },
            { label: 'Fugazi', slug: 'apps/fugazi' },
            { label: "Joe's Calibrage", slug: 'apps/joes-calibrage' },
            { label: 'SSH Server', slug: 'apps/ssh-server' },
            { label: 'File manager', slug: 'apps/file-manager' },
          ],
        },
        {
          label: 'App store',
          items: [
            { label: 'Overview', slug: 'app-store/introduction' },
            { label: 'Itch.io', slug: 'app-store/itchio' },
            { label: 'Disco Boy', slug: 'app-store/disco-boy' },
            { label: 'Nimbus', slug: 'app-store/nimbus' },
            { label: 'PortMaster', slug: 'app-store/portmaster' },
            { label: 'SDLReader', slug: 'app-store/sdlreader' },
          ],
        },
        {
          label: 'Develop',
          items: [
            { label: 'Architecture', slug: 'develop/architecture' },
            { label: 'Repo map', slug: 'develop/repo-map' },
            { label: 'Building from source', slug: 'develop/building' },
            { label: 'Building a Leaf app', slug: 'develop/building-an-app' },
            { label: 'Contributing', slug: 'develop/contributing' },
          ],
        },
        // The individual studios stay orphaned; this hub is the way in.
        { label: 'Colorway studios', slug: 'colorways' },
        { label: 'Credits', slug: 'credits' },
      ],
    }),
  ],
});
