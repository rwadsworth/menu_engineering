import { Link } from "react-router-dom";

export default function DocsIndexPage() {
  return (
    <div className="docs-markdown">
      <h1>Data Documentation Index</h1>
      <p>
        This section documents the data required to power menu-engineering and time-series
        analytics for Bella Napoli.
      </p>

      <h2>Documents</h2>
      <ul>
        <li><Link to="/docs/reporting-data-shapes">Reporting Data Shapes</Link></li>
        <li><Link to="/docs/menu-catalog-source-schema">Menu Catalog Source Schema</Link></li>
        <li><Link to="/docs/sales-transactions-source-schema">Sales Transactions Source Schema</Link></li>
      </ul>

      <h2>Data Flow</h2>
      <ol>
        <li>menu_items defines the canonical menu catalog.</li>
        <li>order_items joined to orders captures item-level sales behavior.</li>
        <li>Daily and weekly rollups produce reporting snapshots consumed by dashboard APIs.</li>
        <li>Dashboard visualizations read reporting snapshots, not raw transactions.</li>
      </ol>

      <h2>Current Dashboard Coverage</h2>
      <ul>
        <li>Matrix snapshot (GET /api/menu): current popularity and profitability by item.</li>
        <li>Weekly trends (GET /api/menu/timeseries): historical weekly movement.</li>
        <li>Daily animation (GET /api/menu/timeseries/daily): 30-day point movement.</li>
      </ul>
    </div>
  );
}
