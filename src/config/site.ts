export const SITE = {
  name: 'm1well',
  lang: 'en',
  locale: 'en_US',
  themeColor: '#ffffff',
  bodyClass: '',
  hasSvgFavicon: true,
  preloadFonts: [
    '/fonts/TitilliumWeb-Regular.woff2',
    '/fonts/TitilliumWeb-Bold.woff2',
  ] as readonly string[],
  // Empty on purpose: no third-party request, icons come from tools/icons.mjs.
  externalStylesheets: [] as readonly string[],
} as const;

export const OG_IMAGE = {
  path: '/images/og-image.png',
  type: 'image/png',
  width: 1200,
  height: 630,
  alt: 'm1well - Fullstack Software Developer',
} as const;
