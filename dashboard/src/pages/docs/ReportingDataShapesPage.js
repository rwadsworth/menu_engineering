import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ReportingDataShapesPage() {
    return (_jsxs("div", { className: "docs-markdown", children: [_jsx("h1", { children: "Reporting Data Shapes For Menu Insights" }), _jsx("p", { children: "This document describes the reporting-layer data used by current visualizations and the minimum fields required to compute those insights." }), _jsx("h2", { children: "1. Current Visualization Data Shapes" }), _jsx("h3", { children: "1.1 Matrix Snapshot Shape (GET /api/menu)" }), _jsx("pre", { children: `{
  "name": "Margherita Pizza",
  "category": "Pizza",
  "popularity": 88,
  "profitability": 78,
  "quadrant": "Star"
}` }), _jsx("h3", { children: "1.2 Weekly Time-Series Shape (GET /api/menu/timeseries)" }), _jsx("pre", { children: `{
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
}` }), _jsx("h3", { children: "1.3 Daily Animation Shape (GET /api/menu/timeseries/daily)" }), _jsx("pre", { children: `{
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
}` }), _jsx("h2", { children: "2. Reporting Entity Definitions" }), _jsx("h3", { children: "2.1 menu_item_daily_metrics" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Field" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Description" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: "business_date" }), _jsx("td", { children: "date" }), _jsx("td", { children: "Local business day" })] }), _jsxs("tr", { children: [_jsx("td", { children: "menu_item_id" }), _jsx("td", { children: "string" }), _jsx("td", { children: "Stable item key" })] }), _jsxs("tr", { children: [_jsx("td", { children: "units_sold" }), _jsx("td", { children: "int" }), _jsx("td", { children: "Quantity sold" })] }), _jsxs("tr", { children: [_jsx("td", { children: "net_sales" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "Revenue after discounts" })] }), _jsxs("tr", { children: [_jsx("td", { children: "estimated_cogs" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "Estimated direct cost" })] }), _jsxs("tr", { children: [_jsx("td", { children: "margin_pct" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "Gross margin percent" })] }), _jsxs("tr", { children: [_jsx("td", { children: "popularity_score" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "0-100 normalized demand [1]" })] }), _jsxs("tr", { children: [_jsx("td", { children: "profitability_score" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "0-100 normalized margin [2]" })] }), _jsxs("tr", { children: [_jsx("td", { children: "quadrant" }), _jsx("td", { children: "enum" }), _jsx("td", { children: "Star, Plowhorse, Puzzle, Dog" })] })] })] }), _jsx("h3", { children: "2.2 menu_item_weekly_metrics" }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Field" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Description" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: "week_start_date" }), _jsx("td", { children: "date" }), _jsx("td", { children: "ISO week anchor" })] }), _jsxs("tr", { children: [_jsx("td", { children: "menu_item_id" }), _jsx("td", { children: "string" }), _jsx("td", { children: "Stable item key" })] }), _jsxs("tr", { children: [_jsx("td", { children: "weekly_units_sold" }), _jsx("td", { children: "int" }), _jsx("td", { children: "Sum of units sold" })] }), _jsxs("tr", { children: [_jsx("td", { children: "weekly_net_sales" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "Sum of net sales" })] }), _jsxs("tr", { children: [_jsx("td", { children: "weekly_margin_pct" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "Weekly margin percent" })] }), _jsxs("tr", { children: [_jsx("td", { children: "popularity_score" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "0-100 weekly demand score [1]" })] }), _jsxs("tr", { children: [_jsx("td", { children: "profitability_score" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "0-100 weekly margin score [2]" })] }), _jsxs("tr", { children: [_jsx("td", { children: "quadrant" }), _jsx("td", { children: "enum" }), _jsx("td", { children: "Star, Plowhorse, Puzzle, Dog" })] }), _jsxs("tr", { children: [_jsx("td", { children: "wow_popularity_delta" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "Week-over-week change" })] }), _jsxs("tr", { children: [_jsx("td", { children: "wow_profitability_delta" }), _jsx("td", { children: "decimal" }), _jsx("td", { children: "Week-over-week change" })] })] })] }), _jsx("h2", { children: "3. Rollup Logic Requirements" }), _jsxs("ol", { children: [_jsx("li", { children: "Join order line items to menu catalog by menu_item_id." }), _jsx("li", { children: "Aggregate daily units_sold, net_sales, and estimated_cogs by item." }), _jsx("li", { children: "Compute margin_pct, popularity_score, and profitability_score." }), _jsx("li", { children: "Classify quadrants using 50/50 popularity and profitability thresholds." }), _jsx("li", { children: "Roll daily data into weekly data and compute week-over-week deltas." })] }), _jsx("h2", { children: "4. Minimum Data Quality Rules" }), _jsxs("ul", { children: [_jsx("li", { children: "Every sold line item maps to a valid menu_item_id." }), _jsx("li", { children: "Business date uses local store timezone." }), _jsx("li", { children: "Voids and comps are explicitly flagged." }), _jsx("li", { children: "COGS inputs are versioned when recipe costs change." }), _jsx("li", { children: "Historical IDs remain stable across renames." })] }), _jsx("h2", { children: "Footnotes" }), _jsxs("p", { children: [_jsx("strong", { children: "[1] How popularity_score is calculated (simple version):" }), ' ', "First, count how many units each item sold in the same period (day or week). Then compare an item's units sold against the range of all items in that same period. The highest-selling item is near 100, the lowest-selling item is near 0, and everyone else falls in between. Example: if Lasagna sold 80 units and the period range is 20 to 100 units, its popularity score is roughly ((80 - 20) / (100 - 20)) * 100 = 75."] }), _jsxs("p", { children: [_jsx("strong", { children: "[2] How profitability_score is calculated (simple version):" }), ' ', "First, compute each item's margin percent: margin_pct = ((net_sales - estimated_cogs) / net_sales) * 100. Then scale that margin percent to a 0-100 score against other items in the same period. Higher margin items score closer to 100, lower margin items score closer to 0. Example: if an item has margin 68% and the period range is 40% to 80%, its profitability score is roughly ((68 - 40) / (80 - 40)) * 100 = 70."] })] }));
}
