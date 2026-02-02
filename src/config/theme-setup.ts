// Paste target for the variants overlay on maverick-wave.m1well.com: copy the
// setup box, drop it between the backticks. Empty means the project theme from
// main.scss stands on its own.
const SETUP = ``;

// The overlay writes three kinds of line: `html class="..."` for the variant
// classes, `.mw-header: no mw-header-reveal` for a class the markup ships and
// the setup takes away, and a `:root` block of custom properties.
const classAttribute = SETUP.match(/class\s*=\s*"([^"]*)"/)?.[1] ?? '';
const dropped = [...SETUP.matchAll(/:\s*no\s+([\w-]+)/g)].map(
  match => match[1]
);
const properties = [...SETUP.matchAll(/(--[\w-]+)\s*:\s*([^;\n}]+)/g)].map(
  match => [match[1], match[2].trim()] as const
);

export const themeSetup = {
  htmlClasses: classAttribute.split(/\s+/).filter(Boolean),

  // Rebuilt rather than passed through, so a half-typed selector left in the box
  // cannot leak into the page. Doubled selector on purpose: Astro emits the
  // style bundle after this tag, so a plain :root would lose to the project's
  // own :root block in main.scss.
  rootCss: properties.length
    ? `:root:root{${properties.map(([name, value]) => `${name}:${value};`).join('')}}`
    : '',

  keeps: (className: string) => !dropped.includes(className),
};
