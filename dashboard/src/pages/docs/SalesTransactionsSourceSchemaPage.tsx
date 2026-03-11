export default function SalesTransactionsSourceSchemaPage() {
  return (
    <div className="docs-markdown">
      <h1>Sales Transactions Source Schema</h1>
      <p>
        Raw POS-level sales facts needed to compute popularity, profitability,
        and quadrant movement over time.
      </p>

      <h2>Entity: orders</h2>
      <p>Grain: one row per guest check/order.</p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>order_id</td><td>string</td><td>Yes</td><td>Unique order/check identifier</td></tr>
          <tr><td>location_id</td><td>string</td><td>Yes</td><td>Restaurant location key</td></tr>
          <tr><td>opened_at</td><td>timestamp</td><td>Yes</td><td>Check open timestamp</td></tr>
          <tr><td>closed_at</td><td>timestamp</td><td>Yes</td><td>Check close timestamp</td></tr>
          <tr><td>business_date</td><td>date</td><td>Yes</td><td>Local business date</td></tr>
          <tr><td>channel</td><td>enum</td><td>Yes</td><td>Dine-in, takeout, delivery, online</td></tr>
          <tr><td>covers</td><td>int</td><td>No</td><td>Guest count</td></tr>
          <tr><td>subtotal_amount</td><td>decimal</td><td>Yes</td><td>Pre-tax, pre-tip subtotal</td></tr>
          <tr><td>discount_amount</td><td>decimal</td><td>Yes</td><td>Total discounts</td></tr>
          <tr><td>net_sales_amount</td><td>decimal</td><td>Yes</td><td>Subtotal after discounts</td></tr>
          <tr><td>void_amount</td><td>decimal</td><td>Yes</td><td>Voided amount</td></tr>
          <tr><td>status</td><td>enum</td><td>Yes</td><td>Closed, voided, refunded</td></tr>
        </tbody>
      </table>

      <h2>Entity: order_items</h2>
      <p>Grain: one row per sold/voided line item occurrence.</p>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>order_item_id</td><td>string</td><td>Yes</td><td>Unique line identifier</td></tr>
          <tr><td>order_id</td><td>string</td><td>Yes</td><td>Parent order/check key</td></tr>
          <tr><td>menu_item_id</td><td>string</td><td>Yes</td><td>Menu item join key</td></tr>
          <tr><td>business_date</td><td>date</td><td>Yes</td><td>Local business date</td></tr>
          <tr><td>quantity</td><td>decimal</td><td>Yes</td><td>Units sold</td></tr>
          <tr><td>unit_price</td><td>decimal</td><td>Yes</td><td>Price per unit</td></tr>
          <tr><td>gross_amount</td><td>decimal</td><td>Yes</td><td>Quantity x unit_price</td></tr>
          <tr><td>discount_amount</td><td>decimal</td><td>Yes</td><td>Line-level discount</td></tr>
          <tr><td>net_amount</td><td>decimal</td><td>Yes</td><td>Gross minus discount</td></tr>
          <tr><td>estimated_cogs_amount</td><td>decimal</td><td>No</td><td>Derived cost estimate</td></tr>
          <tr><td>is_void</td><td>boolean</td><td>Yes</td><td>Whether line was voided</td></tr>
          <tr><td>is_comp</td><td>boolean</td><td>Yes</td><td>Whether line was comped</td></tr>
          <tr><td>service_period</td><td>enum</td><td>No</td><td>Lunch, dinner, late-night</td></tr>
        </tbody>
      </table>

      <h2>Sample Rows</h2>
      <pre>
{`{
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
}`}
      </pre>

      <h2>Optional Supporting Entity: menu_item_attachments</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>anchor_menu_item_id</td><td>string</td><td>Primary item on a check</td></tr>
          <tr><td>attached_menu_item_id</td><td>string</td><td>Frequently co-purchased item</td></tr>
          <tr><td>business_date</td><td>date</td><td>Date grain</td></tr>
          <tr><td>co_purchase_count</td><td>int</td><td>Checks containing both items</td></tr>
        </tbody>
      </table>
    </div>
  );
}
