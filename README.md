# Tools Directory (Utility Drawer)

A browser-local list of tool cards: two seed entries (JSON Formatter, Color Picker), search by title, details or
status, add a card (title, details, status) and remove one. Entries stay in this browser (localStorage) and are labels
only: nothing here links to or runs a tool.

Live: https://tools.bookchaowalit.com (deployed by Vercel CLI from an old Git link; a push to `main` does not deploy
until the owner reconnects Vercel Git, D9).

## Status: archive candidate

The working tools directory is `bookchaowalit-website/devtools-suite-web` (https://devtools.bookchaowalit.com): its
home page lists 17 tools from `lib/tools.ts`, each a real route under `app/(tools)/`, including `jsonconverter` and
`colorpicker`, which are the two seed cards here. This repository only duplicates the idea as a hand-kept list, so the
2026-10-23 review recommends archiving it (the owner decides). It is kept at L1: lint, typecheck and build pass in CI,
with no tests, Sentry or product brief beyond the existing `PRODUCT.md`.

## What it does not do

- No grid/list views, keyboard shortcuts, usage analytics, last-deploy times or 30+ tools (removed from the
  portfolio card in the 2026-10 review).
- `/api/mcp` answers `initialize` and an empty `tools/list`; every tool call is rejected, since the entries live in
  the browser.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Code map

- `lib/tools.ts`: seed cards, parse, filter and add.
- `lib/local-store.ts`: small `useSyncExternalStore` store over localStorage (server sees the seed).
- `app/more-projects/page.tsx`: shared portfolio link page (copied per repository, not a package).
