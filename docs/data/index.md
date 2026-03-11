# Data Documentation Index

This folder documents the data required to power menu-engineering and time-series analytics for Bella Napoli.

## Documents

- [Reporting Data Shapes](sales_data.md)
- [Menu Catalog Source Schema](menu_catalog_data.md)
- [Sales Transactions Source Schema](transactions_data.md)

## Data Flow

1. `menu_items` defines the canonical menu catalog.
2. `order_items` (joined to `orders`) captures item-level sales behavior.
3. Daily and weekly rollups produce reporting snapshots consumed by dashboard APIs.
4. Dashboard visualizations read reporting snapshots, not raw transactions.

## Current Dashboard Coverage

- Matrix snapshot (`GET /api/menu`): current popularity and profitability by menu item.
- Weekly trends (`GET /api/menu/timeseries`): historical weekly movement by item and category.
- Daily animation (`GET /api/menu/timeseries/daily`): 30-day point movement across quadrants.
