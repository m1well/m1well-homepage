# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project

Personal developer portfolio (m1well.com) built with Astro 5, statically
generated and deployed to GitHub Pages via `.github/workflows` on every push to
`main` (`withastro/action@v4`). `CNAME` pins the custom domain; `npm run build`
writes `dist/.nojekyll` so Jekyll does not swallow underscore-prefixed assets.

**This is the only homepage still on GitHub Pages**, and the reason for two
oddities below: the cross-origin view counter, and no vhost of its own.
`nginx/sites.conf` in nexion-server already carries a line for `m1well.com`, so
moving it over is a DNS change plus `./nexion.sh seite m1well.com` - after which
`CNAME`, `.nojekyll` and the workflow can go, and the counter becomes
same-origin like everywhere else. Until the DNS points at the server, that line
is inert: certbot self-tests each name and skips the ones that do not resolve
there.

## Commands

```bash
npm install
npm start            # astro dev on http://localhost:4321
npm run build        # astro build + .nojekyll
npm run preview      # serve the built dist/
npm run lint         # eslint .
npm run lint:fix
npm run format       # prettier --check .
npm run format:fix   # prettier --write .
npm run checkup      # lint:fix + format:fix - run before committing
```

Commits follow Conventional Commits (`feat:`, `fix:`, ...).

## Architecture

**Data-driven sections.** Every landing-page section renders from a typed array
in `src/data/` (`journey.ts`, `projects.ts`, `technology.ts`, `navigation.ts`).
The `.astro` components in `src/components/` are pure renderers - to change what
the page says, edit the data file, not the markup. Some data strings
intentionally contain inline HTML (e.g. `journey.ts` events with
`<a>`/`<span class="mw-text-muted">`) and are rendered as HTML.

**Landing page composition.** `src/pages/index.astro` stacks the section
components inside `<section id="...">` wrappers. The anchor ids must match the
`href` values of `sections` in `src/data/navigation.ts` - adding a nav entry
without its section (or vice versa) silently breaks navigation.

**Blog.** Astro content collection `blog` (`src/content.config.ts`, Content
Layer API with the `glob()` loader; zod schema: `title`, `date`, `author`,
`description`, `featuredImage` nullable, `draft` default false) over markdown in
`src/content/blog/`. `src/pages/[slug].astro` generates one root-level route per
post (`post.id` = filename without extension) and computes wrap-around prev/next
links. Rendering goes through `render(post)` imported from `astro:content` - the
legacy `post.slug` / `post.render()` accessors are gone.

Every consumer queries posts through `getPublishedPosts()`
(`src/util/posts.ts`) - the single place that filters drafts and sorts
date-desc. Keep it that way: when the route and the listing each did their own
filtering, drafts ended up live. Drafts stay visible in `astro dev` and drop out
of the production build entirely (route, listing and sitemap).

A link in a post that leaves the site opens in a new tab, and no post writes
that attribute itself: `astro.config.mjs` passes a small hast plugin to the
Markdown processor (`markdown.processor: satteri({ hastPlugins: [...] })`) which
puts `target="_blank" rel="noopener noreferrer"` on every anchor whose href
starts with `http(s)://`. Relative links, fragments and `mailto:` are left
alone. It is written against Sätteri, the processor Astro 7 uses by default, and
not with `rehype-external-links` - `markdown.rehypePlugins` only runs on the
unified pipeline, which means installing the legacy `@astrojs/markdown-remark`
and swapping the Markdown renderer under every post for a fifteen line job.
Write links as plain Markdown; anchors written as HTML in a post get the same
treatment anyway, so there is no reason to.

**Styling comes from a dependency, not from this repo.** The site is styled by
MaverickWave (m1well's own CSS framework), installed as the `maverick-wave` npm
package: the CSS through `@use 'maverick-wave/src/scss/main-lean'` at the top of
`src/styles/main.scss`, the JS as a bundled module `<script>` in
`src/components/Scripts.astro`. Both end up in the Astro build output, so there
is no runtime CDN request and no version constant to thread through - bump the
version with npm. Font Awesome icons are a generated subset in
`src/styles/_icons.scss`, built by `node tools/icons.mjs` from the
`@fortawesome/fontawesome-free` package - a new `fa-*` class renders empty until
the tool has run again.

The `main-lean` `@use` must stay the **first** rule in `main.scss`, because the
rest of the file only overrides `--mw-*` custom properties on `:root` and loses
the cascade otherwise. Local SCSS (`src/styles/`) adds only those overrides plus
two small custom rules; markup uses `mw-*` framework classes, so avoid inventing
component-scoped CSS unless the framework has no class for it.

`main-lean` carries no component at all - tokens, reset, typography, layout and
utilities only. Every component the page uses follows it as its own
`@use 'maverick-wave/src/scss/components/<name>'`, which is what keeps the CSS
at ~27 kB gzipped instead of ~44 kB for the full build. Markup that reaches for
a component nobody imported renders unstyled and errors nowhere, so a new `mw-*`
class usually means a new line in that list.

The theme lives in a five-line `<script is:inline>` in `BaseLayout.astro`'s
`<head>`. It has to stay inline, in the head, and write `mw-theme-light` /
`mw-theme-dark` on `<html>`: `main.js` runs at the end of `<body>`, so a stored
choice that differs from the OS would otherwise flash the other theme for a
frame, and in the head there is no `<body>` to put the class on.

The `mw-` namespace belongs to the framework - never invent a class in it. An
`mw-*` class that this build does not ship fails silently, so stale or made-up
ones survive unnoticed; check against what the site actually emits
(`npm run build && grep -o '\.mw-[a-z0-9-]*' dist/_astro/*.css | sort -u`) and
not against the framework bundle - with `main-lean` the two differ on purpose.
Some names are JS hooks rather than CSS classes (e.g.
`mw-localhost-indicator-activated`), so grep
`node_modules/maverick-wave/src/js/main.js` too before deleting one. Classes
this repo owns use the `m1-` prefix: `m1-age` and `m1-duration` are JS hooks for
the date scripts below, `m1-custom-icon` is the only project-styled class
(`src/styles/_customs.scss`).

The one exception is the webfont: Titillium Web is self-hosted from
`public/fonts/` and declared in `src/styles/_fonts.scss` (woff2 with woff
fallback, 5 weights). Those `url()`s must stay **absolute** (`/fonts/...`) -
public assets are not resolved by Vite, and a relative path only works by
accident as long as no route nests deeper than one level.

**Build-time vs. client-time dates.** `src/util/constants.ts` evaluates
`CURRENT_YEAR`, `CURRENT_DATE` and `AGE_AT_BUILD` at build time, so they only
refresh on redeploy. Values that keep counting must stay accurate between
deploys, which is why two client scripts rewrite them after load: one in
`Scripts.astro` for every `.m1-duration[data-start-date]` element (via
`calculateMonthsSince`), one in `About.astro` for `.m1-age[data-birth]` (via
`calculateAge`). Both read the date off a data attribute and render the build
time value as SSR fallback. Use that mechanism for any new "since X" value
instead of computing it in frontmatter only.

Both helpers in `src/util/calculations.ts` take an ISO date string and parse it
through `parseLocalDate`, which splits the parts by hand - `new Date('...')`
would parse as UTC midnight and shift the day for visitors west of UTC.

A second inline script in `Scripts.astro` pings a cookie-less view counter and
is skipped on localhost. **That counter is gone**: it called vestigia through
`custos.m1well.com`, and neither runs on the new server. Umami replaces it, and
because this page sits on GitHub Pages it is the one place that has to name the
counter host in the markup instead of letting nginx proxy it:

```html
<script
  defer
  src="https://zaehler.m1well.com/script.js"
  data-website-id="…"
  data-host-url="https://zaehler.m1well.com"
></script>
```

That needs `script-src` and `connect-src` to allow `https://zaehler.m1well.com`.
The sibling homepages load `/z.js` from their own host and keep their CSP at
`'self'` - another reason to move this one over. See `SEITEN.md` and
`MONITORING.md` in nexion-server. `BaseLayout.astro` renders `Scripts.astro` at
the end of `<body>`.

**Page metadata.** `BaseLayout.astro` started out identical to the `ordnera-`
and `stimmwohl-homepage` copies and has since drifted in all three: same shape
(`<head>` order, `SITE`-driven config, `header`/`footer` slots around
`<main class="mw-main">`), different details. This one takes `title`,
`description`, `ogType`, `ogImage` and `noIndex` and carries the inline theme
script; ordnera adds an `ogDescription` prop plus `head` and `banner` slots;
stimmwohl writes `data-aktion-bis` on `<html>` and runs in German. Do not copy a
change across - port it. Everything project-specific lives in
`src/config/site.ts` (`SITE` and `OG_IMAGE`). It derives the canonical URL from
`Astro.url` and `Astro.site`; `ogType` defaults to `website` and
`BlogPostLayout.astro` overrides it with `article`. A page passing its own
`ogImage` (a post's `featuredImage`) drops the `og:image:width`/`height` tags,
because only the default image has known dimensions. `@astrojs/sitemap`
generates `sitemap-index.xml` from the same `site` value, so a new page is
picked up automatically.

**Favicons.** `public/favicon.ico` sits at the root because browsers request
that path unasked; everything else lives in `public/favicon/` and is rendered by
`Favicons.astro`, which is byte-identical across the three repos.

**Path alias.** `@/` resolves to `src/`, configured twice -
`compilerOptions.paths` in `tsconfig.json` (for TS/editor) and a vite
`resolve.alias` in `astro.config.mjs` (for the build). Change both together.
Some files still use relative imports; either style works.

## Conventions

- ESLint enforces `simple-import-sort` as an **error** for imports and exports
  in both `.ts` and `.astro` files - `npm run lint:fix` sorts them.
- Prettier: single quotes, 80 columns, 2 spaces, semicolons,
  `arrowParens: 'avoid'`, `trailingComma: 'es5'`. Markdown uses double quotes
  and hard-wraps prose at 80 columns (`proseWrap: 'always'`), so always run
  `npm run format:fix` after editing blog posts.
- TypeScript runs on `astro/tsconfigs/strict`.
