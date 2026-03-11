# Reporting Data Shapes For Menu Insights

This document describes the reporting-layer data currently used by the dashboard visualizations and the minimum fields required to compute those insights.

## 1. Current Visualization Data Shapes

### 1.1 Matrix Snapshot Shape (`GET /api/menu`)

Used by the static matrix page.

```json
{
  "name": "Margherita Pizza",
  "category": "Pizza",
  "popularity": 88,
  "profitability": 78,
  "quadrant": "Star"
}
```

Field definitions:

- `name` (string): menu item display name.
- `category` (string): menu category.
- `popularity` (number, 0-100): normalized demand score.
- `profitability` (number, 0-100): normalized margin score.
- `quadrant` (enum): `Star | Plowhorse | Puzzle | Dog`.

### 1.2 Weekly Time-Series Shape (`GET /api/menu/timeseries`)

Used by item trend lines, migration chart, category trend bars, and top movers.

```json
{
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
  },
  "filters": {
    "item": null,
    "category": null,
    "start": null,
    "end": null,
    "weeks": 26
  }
}
```

### 1.3 Daily Animation Shape (`GET /api/menu/timeseries/daily`)

Used by the animated matrix that plays day-by-day movement across quadrants.

```json
{
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
  },
  "filters": {
    "item": null,
    "category": null,
    "start": null,
    "end": null,
    "days": 30
  }
}
```

## 2. Reporting Entity Definitions

These entities represent denormalized outputs produced from raw POS-style sales and menu data.

### 2.1 `menu_item_daily_metrics`

Grain: one row per item per day.

| Field | Type | Description |
| :--- | :--- | :--- |
| `business_date` | date | Local business day |
| `menu_item_id` | string | Stable item key |
| `item_name` | string | Display name |
| `category` | string | Menu category |
| `units_sold` | int | Quantity sold |
| `gross_sales` | decimal(12,2) | Pre-discount item revenue |
| `discount_amount` | decimal(12,2) | Discounts applied to item |
| `net_sales` | decimal(12,2) | Revenue after discounts |
| `estimated_cogs` | decimal(12,2) | Estimated food/beverage cost |
| `gross_profit` | decimal(12,2) | `net_sales - estimated_cogs` |
| `margin_pct` | decimal(5,2) | `gross_profit / net_sales * 100` |
| `popularity_score` | decimal(5,2) | 0-100 normalized demand score[^popularity_score_calc] |
| `profitability_score` | decimal(5,2) | 0-100 normalized margin score[^profitability_score_calc] |
| `quadrant` | enum | Star, Plowhorse, Puzzle, Dog |

### 2.2 `menu_item_weekly_metrics`

Grain: one row per item per week start date.

| Field | Type | Description |
| :--- | :--- | :--- |
| `week_start_date` | date | ISO week anchor |
| `menu_item_id` | string | Stable item key |
| `item_name` | string | Display name |
| `category` | string | Menu category |
| `weekly_units_sold` | int | Sum of units sold |
| `weekly_net_sales` | decimal(12,2) | Sum of net sales |
| `weekly_estimated_cogs` | decimal(12,2) | Sum of estimated COGS |
| `weekly_margin_pct` | decimal(5,2) | Weekly margin percent |
| `popularity_score` | decimal(5,2) | 0-100 normalized weekly demand[^popularity_score_calc] |
| `profitability_score` | decimal(5,2) | 0-100 normalized weekly margin[^profitability_score_calc] |
| `quadrant` | enum | Star, Plowhorse, Puzzle, Dog |
| `prev_week_popularity_score` | decimal(5,2) | Prior week score |
| `prev_week_profitability_score` | decimal(5,2) | Prior week score |
| `wow_popularity_delta` | decimal(6,2) | Week-over-week popularity change |
| `wow_profitability_delta` | decimal(6,2) | Week-over-week profitability change |

## 3. Rollup Logic Requirements

To produce dashboard-ready outputs from source systems:

1. Join order line items to menu catalog by `menu_item_id`.
2. Aggregate daily `units_sold`, `net_sales`, and `estimated_cogs` by item.
3. Compute `margin_pct` and derive normalized scores (`popularity_score`, `profitability_score`) using configurable scaling rules.
4. Classify quadrants:
   - `Star`: popularity >= 50 and profitability >= 50
   - `Plowhorse`: popularity >= 50 and profitability < 50
   - `Puzzle`: popularity < 50 and profitability >= 50
   - `Dog`: popularity < 50 and profitability < 50
5. Roll daily data into weekly aggregates and compute week-over-week deltas.

## 4. Minimum Data Quality Rules

- Every sold line item must map to a valid `menu_item_id`.
- Business date must use local store timezone.
- Voids and comps must be explicitly flagged so net sales are accurate.
- COGS inputs should be versioned when recipe costs change.
- Deleted or renamed menu items should retain historical IDs for continuity.

[^popularity_score_calc]: **How popularity_score is calculated (simple version):** First, count how many units each item sold in the same period (day or week). Then compare an item's units sold against the range of all items in that same period. The highest-selling item is near 100, the lowest-selling item is near 0, and everyone else falls in between. Example: if Lasagna sold 80 units and the period range is 20 to 100 units, its popularity score is roughly $((80-20)/(100-20))\times100=75$.

[^profitability_score_calc]: **How profitability_score is calculated (simple version):** First, compute each item's margin percent: $\text{margin\_pct}=((\text{net\_sales}-\text{estimated\_cogs})/\text{net\_sales})\times100$. Then scale that margin percent to a 0-100 score against other items in the same period. Higher margin items score closer to 100, lower margin items score closer to 0. Example: if an item has margin 68% and the period range is 40% to 80%, its profitability score is roughly $((68-40)/(80-40))\times100=70$.
