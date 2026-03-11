import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useMenuItems } from "../hooks/useMenuItems";
import { useMenuTimeSeries } from "../hooks/useMenuTimeSeries";

function avg(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export default function ExecutiveSummaryPage() {
  const { items, loading: itemsLoading, error: itemsError } = useMenuItems();
  const { data, loading: seriesLoading, error: seriesError } = useMenuTimeSeries({ weeks: 26, category: "All" });

  const summary = useMemo(() => {
    const totalItems = items.length;
    const totalStars = items.filter((item) => item.quadrant === "Star").length;
    const totalPlowhorses = items.filter((item) => item.quadrant === "Plowhorse").length;
    const totalPuzzles = items.filter((item) => item.quadrant === "Puzzle").length;
    const totalDogs = items.filter((item) => item.quadrant === "Dog").length;

    const topPopularityItems = [...items]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);

    const topProfitabilityItems = [...items]
      .sort((a, b) => b.profitability - a.profitability)
      .slice(0, 5);

    const lowestPopularityItems = [...items]
      .sort((a, b) => a.popularity - b.popularity)
      .slice(0, 5);

    const lowestProfitabilityItems = [...items]
      .sort((a, b) => a.profitability - b.profitability)
      .slice(0, 5);

    const topPuzzle = [...items]
      .filter((item) => item.quadrant === "Puzzle")
      .sort((a, b) => b.profitability - a.profitability)[0];

    const sortedWeeks = [...(data?.dimensions.weeks ?? [])].sort((a, b) => a.localeCompare(b));
    const latestWeek = sortedWeeks[sortedWeeks.length - 1];
    const previousWeek = sortedWeeks[sortedWeeks.length - 2];

    const latestRows = (data?.snapshots ?? []).filter((snapshot) => snapshot.weekStart === latestWeek);
    const previousByItem = new Map(
      (data?.snapshots ?? [])
        .filter((snapshot) => snapshot.weekStart === previousWeek)
        .map((snapshot) => [snapshot.itemName, snapshot])
    );

    const fallingStars = latestRows
      .filter((snapshot) => snapshot.quadrant === "Star")
      .map((snapshot) => {
        const previous = previousByItem.get(snapshot.itemName);
        return {
          itemName: snapshot.itemName,
          delta: previous ? snapshot.popularity - previous.popularity : 0,
        };
      })
      .filter((row) => row.delta < 0)
      .sort((a, b) => a.delta - b.delta)
      .slice(0, 3);

    const highestVolumeLowMarginCategories = (data?.dimensions.categories ?? [])
      .map((category) => {
        const rows = latestRows.filter((snapshot) => snapshot.category === category);
        return {
          category,
          popularity: avg(rows.map((snapshot) => snapshot.popularity)),
          profitability: avg(rows.map((snapshot) => snapshot.profitability)),
        };
      })
      .filter((row) => row.popularity >= 50 && row.profitability < 50)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map((row) => row.category);

    return {
      totalItems,
      totalStars,
      totalPlowhorses,
      totalPuzzles,
      totalDogs,
      topPopularityItems,
      topProfitabilityItems,
      lowestPopularityItems,
      lowestProfitabilityItems,
      topPuzzle,
      fallingStars,
      highestVolumeLowMarginCategories,
    };
  }, [data, items]);

  if (itemsLoading || seriesLoading) {
    return (
      <div className="chart-card chart-card--state">
        <div className="state-spinner" />
        <p className="state-message">Loading executive summary…</p>
      </div>
    );
  }

  if (itemsError || seriesError) {
    return (
      <div className="chart-card chart-card--state">
        <p className="state-message state-message--error">
          Could not load summary data: {itemsError ?? seriesError ?? "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <section className="chart-card chart-card--analytics">
        <h2 className="chart-title">Executive Summary</h2>
        <p className="chart-subtitle">
          High-level menu health and recommended actions based on current matrix position plus 26-week trend movement.
        </p>

        <div className="summary-kpi-grid">
          <article className="summary-kpi-card">
            <p className="summary-kpi-label">Total Menu Items</p>
            <p className="summary-kpi-value">{summary.totalItems}</p>
          </article>
          <article className="summary-kpi-card">
            <p className="summary-kpi-label">Quadrant Mix</p>
            <p className="summary-kpi-value summary-kpi-value--compact">
              <abbr title="Star: high popularity and high profitability (popularity >= 50, profitability >= 50)">S {summary.totalStars}</abbr>
              {" | "}
              <abbr title="Plowhorse: high popularity and lower profitability (popularity >= 50, profitability < 50)">P {summary.totalPlowhorses}</abbr>
              {" | "}
              <abbr title="Puzzle: lower popularity and high profitability (popularity < 50, profitability >= 50)">Z {summary.totalPuzzles}</abbr>
              {" | "}
              <abbr title="Dog: lower popularity and lower profitability (popularity < 50, profitability < 50)">D {summary.totalDogs}</abbr>
            </p>
          </article>
        </div>

        <div className="summary-toplists">
          <article className="summary-toplist-card">
            <p className="summary-kpi-label">Top 5 By Popularity</p>
            <table className="summary-toplist-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Popularity</th>
                </tr>
              </thead>
              <tbody>
                {summary.topPopularityItems.map((item) => (
                  <tr key={`pop-${item.name}`}>
                    <td>{item.name}</td>
                    <td>{Math.round(item.popularity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="summary-toplist-card">
            <p className="summary-kpi-label">Top 5 By Profitability</p>
            <table className="summary-toplist-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Profitability</th>
                </tr>
              </thead>
              <tbody>
                {summary.topProfitabilityItems.map((item) => (
                  <tr key={`profit-${item.name}`}>
                    <td>{item.name}</td>
                    <td>{Math.round(item.profitability)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>

        <div className="summary-toplists">
          <article className="summary-toplist-card">
            <p className="summary-kpi-label">Lowest 5 By Popularity</p>
            <table className="summary-toplist-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Popularity</th>
                </tr>
              </thead>
              <tbody>
                {summary.lowestPopularityItems.map((item) => (
                  <tr key={`low-pop-${item.name}`}>
                    <td>{item.name}</td>
                    <td>{Math.round(item.popularity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="summary-toplist-card">
            <p className="summary-kpi-label">Lowest 5 By Profitability</p>
            <table className="summary-toplist-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Profitability</th>
                </tr>
              </thead>
              <tbody>
                {summary.lowestProfitabilityItems.map((item) => (
                  <tr key={`low-profit-${item.name}`}>
                    <td>{item.name}</td>
                    <td>{Math.round(item.profitability)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </section>

      <section className="chart-card chart-card--analytics">
        <h3 className="chart-title">General Recommendations</h3>
        <p className="chart-subtitle">
          Each recommendation includes direct links to the supporting tables and charts.
        </p>

        <div className="recommendation-list">
          <article className="recommendation-card">
            <p className="recommendation-title">Protect margin in high-volume categories</p>
            <p className="recommendation-body">
              Focus price and portion reviews on {summary.highestVolumeLowMarginCategories.length
                ? summary.highestVolumeLowMarginCategories.join(", ")
                : "your top Plowhorse categories"} to reduce profit drag without hurting demand.
            </p>
            <div className="recommendation-links">
              <Link to="/time-series#category-momentum">Category Momentum</Link>
              <Link to="/#matrix-items-table">Item Breakdown Table</Link>
            </div>
          </article>

          <article className="recommendation-card">
            <p className="recommendation-title">Promote high-margin Puzzles</p>
            <p className="recommendation-body">
              Lead with {summary.topPuzzle?.name ?? "top Puzzle items"} in server callouts and menu placement to convert margin potential into volume.
            </p>
            <div className="recommendation-links">
              <Link to="/#matrix-overview">Matrix Scatter</Link>
              <Link to="/time-series#top-movers">Top Movers</Link>
            </div>
          </article>

          <article className="recommendation-card">
            <p className="recommendation-title">Intervene on slipping Stars this week</p>
            <p className="recommendation-body">
              {summary.fallingStars.length
                ? `${summary.fallingStars.map((star) => star.itemName).join(", ")} are trending down in popularity despite Star status.`
                : "No major Star declines detected in the latest week; continue monitoring for early fatigue."}
            </p>
            <div className="recommendation-links">
              <Link to="/time-series#animated-matrix">30-Day Movement Matrix</Link>
              <Link to="/time-series#quadrant-migration">Quadrant Migration</Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}