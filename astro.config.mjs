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
  // Pages that were merged into another page. Keep old links working.
  redirects: {
    '/guide/recording': '/guide/screenshots/#recording',
    '/apps/file-manager': '/apps/introduction/#file-explorer',
    '/apps/ssh-server': '/apps/introduction/#ssh-server',
    '/apps/joes-calibrage': '/apps/introduction/#joes-calibrage',
    '/develop/repo-map': '/develop/architecture/#repositories',
  },
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
          label: 'Start here',
          items: [
            { label: 'Introduction', slug: 'guide/introduction' },
            { label: 'Install Leaf', slug: 'guide/install' },
            { label: 'Updating', slug: 'guide/updating' },
            { label: 'Features tour', slug: 'guide/features' },
          ],
        },
        {
          label: 'Games',
          items: [
            { label: 'Adding games', slug: 'guide/games' },
            { label: 'BIOS files', slug: 'guide/bios-and-cores' },
          ],
        },
        {
          label: 'Playing',
          items: [
            { label: 'Playing games', slug: 'guide/playing' },
            { label: 'Controllers', slug: 'guide/controllers' },
            { label: 'Rumble', slug: 'guide/rumble' },
            { label: 'Screenshots and recording', slug: 'guide/screenshots' },
            { label: '5-Game Mode', slug: 'guide/five-game-mode' },
            { label: 'RetroArch settings', slug: 'guide/retroarch-settings' },
            { label: 'Shaders', slug: 'guide/shaders' },
          ],
        },
        {
          label: 'Make it yours',
          items: [
            { label: 'Themes', slug: 'guide/pak-rat-themes' },
            { label: 'Theme gallery', slug: 'themes' },
            { label: 'Language', slug: 'guide/language' },
            { label: 'Settings reference', slug: 'guide/settings' },
            // The individual studios stay orphaned; this hub is the way in.
            { label: 'Colorway studios', slug: 'colorways' },
          ],
        },
        {
          label: 'Help',
          items: [
            { label: 'Troubleshooting', slug: 'guide/troubleshooting' },
            { label: 'Recovery', slug: 'guide/recovery' },
            { label: 'My SD card is read-only', slug: 'guide/sd-card-read-only' },
            { label: 'Moving to a new SD card', slug: 'guide/moving-to-a-new-card' },
          ],
        },
        {
          label: 'Built-in apps',
          items: [
            { label: 'Overview', slug: 'apps/introduction' },
            { label: 'Central Scrutinizer', slug: 'apps/central-scrutinizer' },
            { label: 'Fugazi', slug: 'apps/fugazi' },
          ],
        },
        {
          label: 'App store',
          items: [
            { label: 'Overview', slug: 'app-store/introduction' },
            {
              label: 'Systems and emulators',
              items: [
                { label: 'Flycastrophe', slug: 'app-store/flycastrophe' },
                { label: 'J2ME', slug: 'app-store/j2me' },
                { label: 'PICO-8', slug: 'guide/pico-8' },
                { label: 'ScummVM', slug: 'app-store/scummvm' },
                { label: 'Yabadabadoo', slug: 'app-store/yabadabadoo' },
              ],
            },
            {
              label: 'More games',
              items: [
                { label: 'Itch.io', slug: 'app-store/itchio' },
                { label: 'PortMaster', slug: 'app-store/portmaster' },
              ],
            },
            {
              label: 'Media',
              items: [
                { label: 'Disco Boy', slug: 'app-store/disco-boy' },
                { label: 'SDLReader', slug: 'app-store/sdlreader' },
                { label: 'Video From Hell', slug: 'app-store/video-from-hell' },
              ],
            },
            {
              label: 'Tools',
              items: [
                { label: 'Nimbus', slug: 'app-store/nimbus' },
                { label: 'RAOfflineProxy', slug: 'app-store/raofflineproxy' },
                { label: 'Syncthing', slug: 'app-store/syncthing' },
              ],
            },
          ],
        },
        {
          label: 'Contribute',
          items: [
            { label: 'Translate Leaf', slug: 'guide/translating' },
            { label: 'Make a theme', slug: 'guide/themes' },
            { label: 'Submit a theme', slug: 'guide/submit-a-theme' },
          ],
        },
        {
          label: 'Develop',
          items: [
            { label: 'How Leaf is built', slug: 'develop/architecture' },
            { label: 'Building from source', slug: 'develop/building' },
            { label: 'Building a Leaf app', slug: 'develop/building-an-app' },
            { label: 'Adding a system or emulator', slug: 'develop/adding-an-emulator' },
            { label: 'Content pak reference', slug: 'develop/content-pak-reference' },
            { label: 'Contributing', slug: 'develop/contributing' },
            { label: 'Measuring the refresh rate', slug: 'panel-refresh-measurement' },
          ],
        },
        { label: 'Credits', slug: 'credits' },
      ],
    }),
  ],
});
