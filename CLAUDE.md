# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project

Personal developer portfolio (m1well.com) built with Astro 5, statically
generated and deployed to GitHub Pages via `.github/workflows` on every push to
`main` (`withastro/action@v4`). `CNAME` pins the custom domain; `npm run build`
writes `dist/.nojekyll` so Jekyll does not swallow underscore-prefixed assets.

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
package: the CSS through `@use 'maverick-wave/maverick-wave.min.css'` at the top
of `src/styles/main.scss`, the JS as a bundled module `<script>` in
`src/components/Scripts.astro`. Both end up in the Astro build output, so there
is no runtime CDN request and no version constant to thread through - bump the
version with npm. Font Awesome is still loaded from cdnjs, listed in
`SITE.externalStylesheets`.

That `@use` must stay the **first** rule in `main.scss`, because the rest of the
file only overrides `--mw-*` custom properties on `:root` and loses the cascade
otherwise. Local SCSS (`src/styles/`) adds only those overrides plus two small
custom rules; markup uses `mw-*` framework classes, so avoid inventing
component-scoped CSS unless the framework has no class for it.

The `mw-` namespace belongs to the framework - never invent a class in it. An
`mw-*` class that does not exist in the bundle fails silently, so stale or
made-up ones survive unnoticed; check against the real stylesheet
(`grep -o '\.mw-[a-z0-9-]*' node_modules/maverick-wave/maverick-wave.min.css | sort -u`)
rather than from memory. Some names are JS hooks rather than CSS classes (e.g.
`mw-localhost-indicator-activated`), so grep the shipped `maverick-wave.min.js`
too before deleting one. Classes this repo owns use the `m1-` prefix: `m1-age`
and `m1-duration` are JS hooks for the date scripts below, `m1-custom-icon` is
the only project-styled class (`src/styles/_customs.scss`).

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

A second inline script in `Scripts.astro` pings a self-hosted, cookie-less view
counter and is skipped on localhost. It is the one page of the set that calls
the counter across origins: GitHub Pages has no vhost of its own, so the
same-origin beacon the sibling homepages send is not available here.
`Scripts.astro` is the one project-specific piece of the shared layout -
`BaseLayout.astro` renders it at the end of `<body>` and stays byte-identical
across the three homepages.

**Page metadata.** `BaseLayout.astro` is shared verbatim with the `ordnera-` and
`stimmwohl-homepage` repos: same `<head>` order, same props (`title`,
`description`, `ogType`, `ogImage`, `noIndex`), same named slots (`header`,
`footer`) around a `<main class="mw-main">`. Everything that differs per project
lives in `src/config/site.ts` (`SITE` and `OG_IMAGE`) - change the layout in one
repo and carry it to the other two. It derives the canonical URL from
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
