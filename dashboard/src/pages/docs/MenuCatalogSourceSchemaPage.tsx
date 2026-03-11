export default function MenuCatalogSourceSchemaPage() {
  return (
    <div className="docs-markdown">
      <h1>Menu Catalog Source Schema</h1>
      <p>
        Canonical menu metadata required for sales joins, category rollups, and
        profitability calculations.
      </p>

      <h2>Entity: menu_items</h2>
      <p>Grain: one row per active or historical menu item.</p>

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
          <tr><td>menu_item_id</td><td>string</td><td>Yes</td><td>Stable unique key</td></tr>
          <tr><td>item_name</td><td>string</td><td>Yes</td><td>Guest-facing item name</td></tr>
          <tr><td>category</td><td>string</td><td>Yes</td><td>Reporting category</td></tr>
          <tr><td>subcategory</td><td>string</td><td>No</td><td>Optional finer grouping</td></tr>
          <tr><td>is_active</td><td>boolean</td><td>Yes</td><td>Active on current menu</td></tr>
          <tr><td>list_price</td><td>decimal</td><td>Yes</td><td>Current base selling price</td></tr>
          <tr><td>margin_tag</td><td>enum</td><td>Yes</td><td>High, Standard, Low, Loss Leader</td></tr>
          <tr><td>food_cost_estimate</td><td>decimal</td><td>No</td><td>Optional direct cost estimate</td></tr>
          <tr><td>recipe_version_id</td><td>string</td><td>No</td><td>Recipe/costing version link</td></tr>
          <tr><td>introduced_at</td><td>timestamp</td><td>Yes</td><td>Item launch timestamp</td></tr>
          <tr><td>retired_at</td><td>timestamp</td><td>No</td><td>Item sunset timestamp</td></tr>
          <tr><td>updated_at</td><td>timestamp</td><td>Yes</td><td>Last metadata update timestamp</td></tr>
        </tbody>
      </table>

      <h2>Sample Row</h2>
      <pre>
{`{
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
}`}
      </pre>

      <h2>Optional Supporting Entity: menu_item_price_history</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>menu_item_id</td><td>string</td><td>Parent item key</td></tr>
          <tr><td>effective_start</td><td>timestamp</td><td>Price validity start</td></tr>
          <tr><td>effective_end</td><td>timestamp</td><td>Price validity end</td></tr>
          <tr><td>price</td><td>decimal</td><td>Effective list price</td></tr>
          <tr><td>reason_code</td><td>string</td><td>Reprice, promo, seasonal, etc.</td></tr>
        </tbody>
      </table>
    </div>
  );
}
