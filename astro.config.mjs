// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import { defineConfig } from 'astro/config';
import homepage from 'maverick-wave-astro';

import { OG_IMAGE, SITE } from './src/config/site.ts';

export default defineConfig({
  site: 'https://m1well.com',
  integrations: [
    homepage({
      site: SITE,
      ogImage: OG_IMAGE,
      sitemap: {
        // Legal notice and privacy policy are noIndex.
        filter: page =>
          !page.includes('/legal-notice') && !page.includes('/privacy'),
      },
    }),
  ],
  // target=_blank on every external link in a post. A hast plugin because
  // Sätteri is Astro 7's default processor; rehype plugins run only on the
  // legacy unified pipeline.
  markdown: {
    processor: satteri({
      hastPlugins: [
        {
          name: 'external-links',
          element: {
            filter: ['a'],
            visit(node, ctx) {
              const href = node.properties?.href;
              if (typeof href !== 'string' || !/^https?:\/\//.test(href)) {
                return;
              }
              ctx.setProperty(node, 'target', '_blank');
              ctx.setProperty(node, 'rel', ['noopener', 'noreferrer']);
            },
          },
        },
      ],
    }),
  },
  server: { port: 4321 },
});
