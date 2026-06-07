import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://casamultvisata.ro',
  output: 'static',
  integrations: [
    sitemap({
      // Exclude Vândut/Retras detail pages from sitemap. We filter by URL pattern:
      // the [slug].astro page emits `<meta name="robots" content="noindex">` when
      // listingStatus is Vândut/Retras, but we also drop them from sitemap so Google
      // never sees them. We can't reliably read listingStatus in config context, so
      // we rely on the slug-naming convention: archived properties get prefixed with
      // `arhiva-` in their filename when set to Vândut/Retras (manual convention) OR
      // the noindex meta tag handles SEO. For now, keep all listed and let noindex
      // do the work — sitemap filtering can be revisited if needed.
      filter: () => true,
    }),
  ],
});
