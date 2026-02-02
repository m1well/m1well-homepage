import type { OgImage, Site } from 'maverick-wave-astro';

export const SITE = {
  name: 'm1well',
  lang: 'en',
  locale: 'en_US',
  themeColor: '#ffffff',
  hasSvgFavicon: true,
  email: 'hallo@formatwerke.de',
  themeToggle: 'system',
  preloadFonts: [
    '/fonts/TitilliumWeb-Regular.woff2',
    '/fonts/TitilliumWeb-Bold.woff2',
  ],
} satisfies Site;

export const OG_IMAGE = {
  path: '/images/og-image.jpg',
  type: 'image/jpeg',
  width: 1200,
  height: 630,
  alt: 'm1well - Fullstack Software Developer',
} satisfies OgImage;
