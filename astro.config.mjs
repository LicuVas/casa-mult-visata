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
      // Emit <lastmod> (build timestamp) on every entry. A static site rebuilds
      // all pages each deploy, so build time is an honest "last generated" signal —
      // and without it engines can't tell the new silos are fresh, which hurts
      // recrawl prioritization (observed 2026-06-20: sitemap had no lastmod).
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
});
