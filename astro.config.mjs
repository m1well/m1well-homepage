// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import path from 'path';

export default defineConfig({
  site: 'https://m1well.com',
  output: 'static',
  // Inlined CSS would be dropped by the CSP - it has no 'unsafe-inline'.
  build: { inlineStylesheets: 'never' },
  integrations: [sitemap()],
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
  vite: {
    // Same reason: an inlined bundle would be dropped by the CSP.
    build: { assetsInlineLimit: 0 },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
