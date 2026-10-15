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

## Where things live

- `src/data/sources.ts`: the evidence registry. Footnote numbers follow its order. Use `<Cite id="..." />` in any page to cite an entry.
- `src/data/ask.ts`: scripted questions and answers for "Readers ask the Record". Typed questions are matched by keyword; anything unmatched is declined.
- `src/data/site.ts`: name, email, links and navigation.
- `src/pages/work/*.astro`: the case studies, laid out with `src/layouts/Article.astro`.
- `<Todo>` and `class="todo"` mark placeholders (highlighted yellow). Search for them before launch.

## Before launch

- Fill every `<Todo>` and every `TODO` comment, including source links in `sources.ts`.
- Add `public/cv.pdf` and `public/portrait.jpg` (then swap the photo placeholder in `src/pages/index.astro`).
- Set your real email in `src/data/site.ts`.
- Write the Impressum and Datenschutz pages.
