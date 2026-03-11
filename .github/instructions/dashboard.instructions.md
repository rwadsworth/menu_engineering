---
applyTo: "dashboard/**"
---

# Dashboard — Visualization & Trends

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
