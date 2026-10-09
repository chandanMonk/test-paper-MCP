# Wishlist app — conventions for Claude

Shopify embedded app (App Home). UI is built with **Polaris web components** (`s-*`), loaded from the CDN.
Never use `@shopify/polaris` React components or hand-rolled HTML where an `s-*` component exists.

## Layout
- `app/routes/<route>.html` — one file per admin page. Every page is wrapped in `<s-page>`.
- `app/shared/charts.js` — the ONLY place chart/funnel SVG is drawn (`WishlistCharts.lineChart`, `WishlistCharts.funnel`).
  Polaris has no chart component; reuse these helpers, extend them if a design needs something new.
- `app/shared/app.css` — the only custom CSS. Chart colors live here as CSS variables.
- `app/data/*.sample.js` — sample data, exposed on `window.SampleData`. Pages never hard-code numbers
  that will come from the API; they read from a data object so the backend can swap it in.

## Polaris rules
- Cards = `<s-section>`; tables = `<s-section padding="none">` + `<s-table paginate>` with an `s-search-field` in `slot="filters"`.
- Page-level actions go in `slot="primary-action"` / `slot="secondary-actions"`.
- Badge tones: Signed-in Customer → `success`, Guest → `info`.
- Use camelCase attributes as in the Polaris docs (`inlineSize`, `gridTemplateColumns`, `alignItems`).
- Don't recreate Shopify admin chrome (sidebar, top bar, Sidekick) — admin renders it.

## Design → code workflow (Paper)
- `design/paper.json` maps each Paper frame to the route it becomes. Read it first.
- Pull exact values with Paper `get_jsx` / `get_computed_styles`; screenshots are only for checking the result.
- After implementing a frame: save the frame screenshot to `design/screenshots/`, set `status` and `route`
  in `design/paper.json`, and list any design inconsistencies under `"designFlags"` instead of silently picking one.
- One branch per frame: `design/<frame-slug>`.
