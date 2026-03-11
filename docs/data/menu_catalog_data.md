# Menu Catalog Source Schema

This schema represents the canonical menu metadata required for sales joins, category rollups, and profitability calculations.

## Entity: `menu_items`

Grain: one row per active or historical menu item.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `menu_item_id` | string | Yes | Stable unique key |
| `item_name` | string | Yes | Guest-facing item name |
| `category` | string | Yes | Reporting category |
| `subcategory` | string | No | Optional finer grouping |
| `is_active` | boolean | Yes | Active on current menu |
| `list_price` | decimal(10,2) | Yes | Current base selling price |
| `margin_tag` | enum | Yes | High, Standard, Low, Loss Leader |
| `food_cost_estimate` | decimal(10,2) | No | Optional direct cost estimate |
| `recipe_version_id` | string | No | Recipe/costing version link |
| `introduced_at` | timestamp | Yes | Item launch timestamp |
| `retired_at` | timestamp | No | Item sunset timestamp |
| `updated_at` | timestamp | Yes | Last metadata update timestamp |

## Sample Row

```json
{
  "menu_item_id": "item_pizza_margherita",
  "item_name": "Margherita Pizza",
  "category": "Pizza",
  "subcategory": "Classic",
  "is_active": true,
  "list_price": 17.00,
  "margin_tag": "High",
  "food_cost_estimate": 4.65,
  "recipe_version_id": "rv_2026_01",
  "introduced_at": "2024-06-01T00:00:00Z",
  "retired_at": null,
  "updated_at": "2026-03-01T08:00:00Z"
}
```

## Optional Supporting Entity: `menu_item_price_history`

Use when historical price movement is required for explainability.

| Field | Type | Description |
| :--- | :--- | :--- |
| `menu_item_id` | string | Parent item key |
| `effective_start` | timestamp | Price validity start |
| `effective_end` | timestamp | Price validity end |
| `price` | decimal(10,2) | Effective list price |
| `reason_code` | string | Reprice, promo, seasonal, etc. |
