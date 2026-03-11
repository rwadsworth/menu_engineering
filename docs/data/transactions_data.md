# Sales Transactions Source Schema

This schema captures the raw POS-level sales facts needed to compute popularity, profitability, and quadrant movement over time.

## Entity: `orders`

Grain: one row per guest check/order.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | string | Yes | Unique order/check identifier |
| `location_id` | string | Yes | Restaurant location key |
| `opened_at` | timestamp | Yes | Check open timestamp |
| `closed_at` | timestamp | Yes | Check close timestamp |
| `business_date` | date | Yes | Local business date |
| `channel` | enum | Yes | Dine-in, takeout, delivery, online |
| `covers` | int | No | Guest count |
| `subtotal_amount` | decimal(12,2) | Yes | Pre-tax, pre-tip subtotal |
| `discount_amount` | decimal(12,2) | Yes | Total discounts |
| `net_sales_amount` | decimal(12,2) | Yes | Subtotal after discounts |
| `void_amount` | decimal(12,2) | Yes | Voided amount |
| `status` | enum | Yes | Closed, voided, refunded |

## Entity: `order_items`

Grain: one row per sold/voided line item occurrence.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_item_id` | string | Yes | Unique line identifier |
| `order_id` | string | Yes | Parent order/check key |
| `menu_item_id` | string | Yes | Menu item join key |
| `business_date` | date | Yes | Local business date |
| `quantity` | decimal(10,2) | Yes | Units sold |
| `unit_price` | decimal(10,2) | Yes | Price per unit |
| `gross_amount` | decimal(12,2) | Yes | `quantity * unit_price` |
| `discount_amount` | decimal(12,2) | Yes | Line-level discount |
| `net_amount` | decimal(12,2) | Yes | Gross minus discount |
| `estimated_cogs_amount` | decimal(12,2) | No | Derived cost estimate |
| `is_void` | boolean | Yes | Whether line was voided |
| `is_comp` | boolean | Yes | Whether line was comped |
| `service_period` | enum | No | Lunch, dinner, late-night |

## Sample Rows

```json
{
  "orders": [
    {
      "order_id": "ord_100245",
      "location_id": "bella_napoli_main",
      "opened_at": "2026-03-11T18:12:00Z",
      "closed_at": "2026-03-11T19:14:00Z",
      "business_date": "2026-03-11",
      "channel": "DineIn",
      "covers": 2,
      "subtotal_amount": 63.00,
      "discount_amount": 0.00,
      "net_sales_amount": 63.00,
      "void_amount": 0.00,
      "status": "Closed"
    }
  ],
  "order_items": [
    {
      "order_item_id": "oi_900882",
      "order_id": "ord_100245",
      "menu_item_id": "item_pizza_margherita",
      "business_date": "2026-03-11",
      "quantity": 1,
      "unit_price": 17.00,
      "gross_amount": 17.00,
      "discount_amount": 0.00,
      "net_amount": 17.00,
      "estimated_cogs_amount": 4.65,
      "is_void": false,
      "is_comp": false,
      "service_period": "Dinner"
    }
  ]
}
```

## Optional Supporting Entity: `menu_item_attachments`

Use to model halo/cross-sell effects.

| Field | Type | Description |
| :--- | :--- | :--- |
| `anchor_menu_item_id` | string | Primary item on a check |
| `attached_menu_item_id` | string | Item frequently co-purchased |
| `business_date` | date | Date grain |
| `co_purchase_count` | int | Number of checks containing both |
