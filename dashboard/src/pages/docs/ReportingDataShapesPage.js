import { jsx, jsxs } from "react/jsx-runtime";
function ReportingDataShapesPage() {
  return /* @__PURE__ */ jsxs("div", { className: "docs-markdown", children: [
    /* @__PURE__ */ jsx("h1", { children: "Reporting Data Shapes For Menu Insights" }),
    /* @__PURE__ */ jsx("p", { children: "This document describes the reporting-layer data used by current visualizations and the minimum fields required to compute those insights." }),
    /* @__PURE__ */ jsx("h2", { children: "1. Current Visualization Data Shapes" }),
    /* @__PURE__ */ jsx("h3", { children: "1.1 Matrix Snapshot Shape (GET /api/menu)" }),
    /* @__PURE__ */ jsx("pre", { children: `{
  "name": "Margherita Pizza",
  "category": "Pizza",
  "popularity": 88,
  "profitability": 78,
  "quadrant": "Star"
}` }),
    /* @__PURE__ */ jsx("h3", { children: "1.2 Weekly Time-Series Shape (GET /api/menu/timeseries)" }),
    /* @__PURE__ */ jsx("pre", { children: `{
  "snapshots": [
    {
      "itemName": "Margherita Pizza",
      "category": "Pizza",
      "weekStart": "2026-02-09",
      "weekIndex": 22,
      "popularity": 84,
      "profitability": 75,
      "quadrant": "Star"
    }
  ],
  "dimensions": {
    "items": ["Margherita Pizza"],
    "categories": ["Pizza"],
    "weeks": ["2026-02-09"]
  }
}` }),
    /* @__PURE__ */ jsx("h3", { children: "1.3 Daily Animation Shape (GET /api/menu/timeseries/daily)" }),
    /* @__PURE__ */ jsx("pre", { children: `{
  "snapshots": [
    {
      "itemName": "Margherita Pizza",
      "category": "Pizza",
      "day": "2026-03-11",
      "dayIndex": 30,
      "popularity": 87,
      "profitability": 77,
      "quadrant": "Star"
    }
  ],
  "dimensions": {
    "items": ["Margherita Pizza"],
    "categories": ["Pizza"],
    "days": ["2026-03-11"]
  }
}` }),
    /* @__PURE__ */ jsx("h2", { children: "2. Reporting Entity Definitions" }),
    /* @__PURE__ */ jsx("h3", { children: "2.1 menu_item_daily_metrics" }),
    /* @__PURE__ */ jsxs("table", { children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Field" }),
        /* @__PURE__ */ jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsx("th", { children: "Description" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "business_date" }),
          /* @__PURE__ */ jsx("td", { children: "date" }),
          /* @__PURE__ */ jsx("td", { children: "Local business day" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "menu_item_id" }),
          /* @__PURE__ */ jsx("td", { children: "string" }),
          /* @__PURE__ */ jsx("td", { children: "Stable item key" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "units_sold" }),
          /* @__PURE__ */ jsx("td", { children: "int" }),
          /* @__PURE__ */ jsx("td", { children: "Quantity sold" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "net_sales" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "Revenue after discounts" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "estimated_cogs" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "Estimated direct cost" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "margin_pct" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "Gross margin percent" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "popularity_score" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "0-100 normalized demand [1]" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "profitability_score" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "0-100 normalized margin [2]" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "quadrant" }),
          /* @__PURE__ */ jsx("td", { children: "enum" }),
          /* @__PURE__ */ jsx("td", { children: "Star, Plowhorse, Puzzle, Dog" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h3", { children: "2.2 menu_item_weekly_metrics" }),
    /* @__PURE__ */ jsxs("table", { children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Field" }),
        /* @__PURE__ */ jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsx("th", { children: "Description" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "week_start_date" }),
          /* @__PURE__ */ jsx("td", { children: "date" }),
          /* @__PURE__ */ jsx("td", { children: "ISO week anchor" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "menu_item_id" }),
          /* @__PURE__ */ jsx("td", { children: "string" }),
          /* @__PURE__ */ jsx("td", { children: "Stable item key" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "weekly_units_sold" }),
          /* @__PURE__ */ jsx("td", { children: "int" }),
          /* @__PURE__ */ jsx("td", { children: "Sum of units sold" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "weekly_net_sales" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "Sum of net sales" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "weekly_margin_pct" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "Weekly margin percent" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "popularity_score" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "0-100 weekly demand score [1]" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "profitability_score" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "0-100 weekly margin score [2]" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "quadrant" }),
          /* @__PURE__ */ jsx("td", { children: "enum" }),
          /* @__PURE__ */ jsx("td", { children: "Star, Plowhorse, Puzzle, Dog" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "wow_popularity_delta" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "Week-over-week change" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "wow_profitability_delta" }),
          /* @__PURE__ */ jsx("td", { children: "decimal" }),
          /* @__PURE__ */ jsx("td", { children: "Week-over-week change" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { children: "3. Rollup Logic Requirements" }),
    /* @__PURE__ */ jsxs("ol", { children: [
      /* @__PURE__ */ jsx("li", { children: "Join order line items to menu catalog by menu_item_id." }),
      /* @__PURE__ */ jsx("li", { children: "Aggregate daily units_sold, net_sales, and estimated_cogs by item." }),
      /* @__PURE__ */ jsx("li", { children: "Compute margin_pct, popularity_score, and profitability_score." }),
      /* @__PURE__ */ jsx("li", { children: "Classify quadrants using 50/50 popularity and profitability thresholds." }),
      /* @__PURE__ */ jsx("li", { children: "Roll daily data into weekly data and compute week-over-week deltas." })
    ] }),
    /* @__PURE__ */ jsx("h2", { children: "4. Minimum Data Quality Rules" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Every sold line item maps to a valid menu_item_id." }),
      /* @__PURE__ */ jsx("li", { children: "Business date uses local store timezone." }),
      /* @__PURE__ */ jsx("li", { children: "Voids and comps are explicitly flagged." }),
      /* @__PURE__ */ jsx("li", { children: "COGS inputs are versioned when recipe costs change." }),
      /* @__PURE__ */ jsx("li", { children: "Historical IDs remain stable across renames." })
    ] }),
    /* @__PURE__ */ jsx("h2", { children: "Footnotes" }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("strong", { children: "[1] How popularity_score is calculated (simple version):" }),
      " ",
      "First, count how many units each item sold in the same period (day or week). Then compare an item's units sold against the range of all items in that same period. The highest-selling item is near 100, the lowest-selling item is near 0, and everyone else falls in between. Example: if Lasagna sold 80 units and the period range is 20 to 100 units, its popularity score is roughly ((80 - 20) / (100 - 20)) * 100 = 75."
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("strong", { children: "[2] How profitability_score is calculated (simple version):" }),
      " ",
      "First, compute each item's margin percent: margin_pct = ((net_sales - estimated_cogs) / net_sales) * 100. Then scale that margin percent to a 0-100 score against other items in the same period. Higher margin items score closer to 100, lower margin items score closer to 0. Example: if an item has margin 68% and the period range is 40% to 80%, its profitability score is roughly ((68 - 40) / (80 - 40)) * 100 = 70."
    ] })
  ] });
}
export {
  ReportingDataShapesPage as default
};
