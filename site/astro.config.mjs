// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL: public origin (e.g. https://example.github.io). Leave unset until a domain exists:
// canonical URLs, og:url and the sitemap are then omitted.
// BASE_PATH: sub-path for GitHub Pages project sites (e.g. /trillian-website). Defaults to /.
const site = process.env.SITE_URL || undefined;
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: site ? [sitemap()] : [],
  devToolbar: { enabled: false },
});
