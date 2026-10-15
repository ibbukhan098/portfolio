# The Ibrahim Record

Portfolio of Ibrahim Ali Khan, styled as a broadsheet newspaper. Every claim on the site cites a source.

Built with [Astro](https://astro.build). Static output, no cookies, no tracking, fonts self-hosted.

## Commands

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Dev server at `localhost:4321`       |
| `npm run build`   | Build the static site into `dist/`   |
| `npm run preview` | Serve the built site locally         |
| `npm run check`   | Type-check `.astro` and `.ts` files  |

## Languages

Two editions: English at the root, German under `/de/`, with a toggle at the top of every page.

- `src/i18n/index.ts`: language helpers, shared UI strings and the navigation.
- Shared pages (front page, sources, model card) are components in `src/components/` that read the language from the URL.
- Case studies and legal pages have one file per language: `src/pages/…` (English) and `src/pages/de/…` (German). The German Impressum and Datenschutz are the legally binding versions.
- Text in `sources.ts` and `ask.ts` is `{ en, de }`.

## Where things live

- `src/data/sources.ts`: the evidence registry. Footnote numbers follow its order. Use `<Cite id="..." />` in any page to cite an entry.
- `src/data/ask.ts`: scripted questions and answers for "Readers ask the Record". Typed questions are matched by keyword; anything unmatched is declined.
- `src/data/site.ts`: name, contact details, address and links.
- `src/pages/work/*.astro`: the case studies, laid out with `src/layouts/Article.astro`.
- `<Todo>` and `class="todo"` mark placeholders (highlighted yellow). Search for them before launch.

## Deployment

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`:
https://ibbukhan098.github.io/portfolio/

Internal links go through `url()` in `src/lib/url.ts`, which adds the `/portfolio` base. For a custom domain, set `site` in `astro.config.mjs` and remove `base`.

## Still to do

- Fill every `<Todo>` and every `TODO` comment, including source links in `sources.ts`.
