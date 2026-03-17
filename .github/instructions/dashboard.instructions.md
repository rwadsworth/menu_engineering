---
applyTo: "dashboard/**"
---

# Dashboard — Visualization & Trends

## Why This File Exists

* This dashboard has paired TypeScript and JavaScript source files in `dashboard/src/`.
* The API contract is local and evolving, so UI regressions usually come from shape drift.
* These rules reduce accidental edits to generated files and keep visualizations stable.

## Chart Patterns

* **Menu Matrix:** Four-quadrant scatter plot (x = popularity, y = margin) is the
primary view. Items are colored by quadrant: Stars (green), Plowhorses (yellow),
Puzzles (blue), Dogs (red).
* **Menu Migration:** Sankey diagrams showing items moving between quadrants over time.
* **Halo Effect:** Identify "Anchor Items" that drive high-margin side sales
(e.g., a popular pizza driving Chianti orders). Visualize as a network/chord diagram.
* **Fatigue Tracking:** Line graphs comparing 7-day volume vs. 90-day averages
to spot declining Stars before they become Dogs.

## Component Conventions

* Each chart lives in its own component file under `dashboard/src/components/`.
* Props must be typed — no `any`.
* Data fetching belongs in hooks under `dashboard/src/hooks/`, not in components.

## Source-Of-Truth Rules

* Treat `*.ts` and `*.tsx` files as the source of truth.
* Do not hand-edit paired `*.js` files in `dashboard/src/**` unless explicitly requested.
* If a TypeScript change requires checked-in JavaScript mirrors, regenerate them via the normal build path instead of manual edits.

## Contract & UX Safeguards

* Keep quadrant labels exactly `Star`, `Plowhorse`, `Puzzle`, `Dog` to avoid color/legend drift.
* Keep loading and error UI states for all API-backed pages and hooks.
* Keep chart input ordering deterministic (explicit sort before render) so snapshots and diffs are stable.
* When API response keys change, update affected hooks and docs pages in the same change.
