export default function ReportingDataShapesPage() {
  return (
    <div className="docs-markdown">
      <h1>Reporting Data Shapes For Menu Insights</h1>
      <p>
        This document describes the reporting-layer data used by current visualizations and
        the minimum fields required to compute those insights.
      </p>

      <h2>1. Current Visualization Data Shapes</h2>

      <h3>1.1 Matrix Snapshot Shape (GET /api/menu)</h3>
      <pre>
{`{
  "name": "Margherita Pizza",
  "category": "Pizza",
  "popularity": 88,
  "profitability": 78,
  "quadrant": "Star"
}`}
      </pre>

      <h3>1.2 Weekly Time-Series Shape (GET /api/menu/timeseries)</h3>
      <pre>
{`{
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
}`}
      </pre>

      <h3>1.3 Daily Animation Shape (GET /api/menu/timeseries/daily)</h3>
      <pre>
{`{
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
}`}
      </pre>

      <h2>2. Reporting Entity Definitions</h2>

      <h3>2.1 menu_item_daily_metrics</h3>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>business_date</td><td>date</td><td>Local business day</td></tr>
          <tr><td>menu_item_id</td><td>string</td><td>Stable item key</td></tr>
          <tr><td>units_sold</td><td>int</td><td>Quantity sold</td></tr>
          <tr><td>net_sales</td><td>decimal</td><td>Revenue after discounts</td></tr>
          <tr><td>estimated_cogs</td><td>decimal</td><td>Estimated direct cost</td></tr>
          <tr><td>margin_pct</td><td>decimal</td><td>Gross margin percent</td></tr>
          <tr><td>popularity_score</td><td>decimal</td><td>0-100 normalized demand [1]</td></tr>
          <tr><td>profitability_score</td><td>decimal</td><td>0-100 normalized margin [2]</td></tr>
          <tr><td>quadrant</td><td>enum</td><td>Star, Plowhorse, Puzzle, Dog</td></tr>
        </tbody>
      </table>

      <h3>2.2 menu_item_weekly_metrics</h3>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>week_start_date</td><td>date</td><td>ISO week anchor</td></tr>
          <tr><td>menu_item_id</td><td>string</td><td>Stable item key</td></tr>
          <tr><td>weekly_units_sold</td><td>int</td><td>Sum of units sold</td></tr>
          <tr><td>weekly_net_sales</td><td>decimal</td><td>Sum of net sales</td></tr>
          <tr><td>weekly_margin_pct</td><td>decimal</td><td>Weekly margin percent</td></tr>
          <tr><td>popularity_score</td><td>decimal</td><td>0-100 weekly demand score [1]</td></tr>
          <tr><td>profitability_score</td><td>decimal</td><td>0-100 weekly margin score [2]</td></tr>
          <tr><td>quadrant</td><td>enum</td><td>Star, Plowhorse, Puzzle, Dog</td></tr>
          <tr><td>wow_popularity_delta</td><td>decimal</td><td>Week-over-week change</td></tr>
          <tr><td>wow_profitability_delta</td><td>decimal</td><td>Week-over-week change</td></tr>
        </tbody>
      </table>

      <h2>3. Rollup Logic Requirements</h2>
      <ol>
        <li>Join order line items to menu catalog by menu_item_id.</li>
        <li>Aggregate daily units_sold, net_sales, and estimated_cogs by item.</li>
        <li>Compute margin_pct, popularity_score, and profitability_score.</li>
        <li>Classify quadrants using 50/50 popularity and profitability thresholds.</li>
        <li>Roll daily data into weekly data and compute week-over-week deltas.</li>
      </ol>

      <h2>4. Minimum Data Quality Rules</h2>
      <ul>
        <li>Every sold line item maps to a valid menu_item_id.</li>
        <li>Business date uses local store timezone.</li>
        <li>Voids and comps are explicitly flagged.</li>
        <li>COGS inputs are versioned when recipe costs change.</li>
        <li>Historical IDs remain stable across renames.</li>
      </ul>

      <h2>Footnotes</h2>
      <p>
        <strong>[1] How popularity_score is calculated (simple version):</strong>{' '}
        First, count how many units each item sold in the same period (day or week).
        Then compare an item&apos;s units sold against the range of all items in that
        same period. The highest-selling item is near 100, the lowest-selling item
        is near 0, and everyone else falls in between. Example: if Lasagna sold 80
        units and the period range is 20 to 100 units, its popularity score is
        roughly ((80 - 20) / (100 - 20)) * 100 = 75.
      </p>
      <p>
        <strong>[2] How profitability_score is calculated (simple version):</strong>{' '}
        First, compute each item&apos;s margin percent: margin_pct =
        ((net_sales - estimated_cogs) / net_sales) * 100. Then scale that margin
        percent to a 0-100 score against other items in the same period. Higher
        margin items score closer to 100, lower margin items score closer to 0.
        Example: if an item has margin 68% and the period range is 40% to 80%,
        its profitability score is roughly ((68 - 40) / (80 - 40)) * 100 = 70.
      </p>
    </div>
  );
}
