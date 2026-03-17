import { useMemo, useState } from "react";
import type { MenuItemSnapshot } from "../data/menuTimeSeries";
import ItemTrendChart from "../components/ItemTrendChart";
import QuadrantMigrationChart from "../components/QuadrantMigrationChart";
// import QuadrantMigrationSankey from "../components/QuadrantMigrationSankey"; // restore with migrationFlowData when Sankey is re-enabled
import CategoryTrendBars from "../components/CategoryTrendBars";
import TopMoversTable from "../components/TopMoversTable";
import AnimatedQuadrantMatrix from "../components/AnimatedQuadrantMatrix";
import { useMenuTimeSeries } from "../hooks/useMenuTimeSeries";
import { useMenuDailySeries } from "../hooks/useMenuDailySeries";

interface GroupedWeek {
  [itemName: string]: MenuItemSnapshot;
}

function average(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function actionLabel(snapshot: MenuItemSnapshot): string {
  if (snapshot.quadrant === "Star") return "Feature in specials";
  if (snapshot.quadrant === "Plowhorse") return "Review price/portion";
  if (snapshot.quadrant === "Puzzle") return "Promote with staff prompts";
  return "Consider removal/rework";
}

export default function MenuTimeSeriesPage() {
  const [weeks, setWeeks] = useState(26);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { data, loading, error } = useMenuTimeSeries({ weeks, category: categoryFilter });
  const {
    data: dailyData,
    loading: dailyLoading,
    error: dailyError,
  } = useMenuDailySeries({ days: 30, category: categoryFilter });

  const selectedItem = data?.dimensions.items[0];

  const weekMap = useMemo(() => {
    const map = new Map<string, GroupedWeek>();

    data?.snapshots.forEach((snapshot) => {
      const grouped = map.get(snapshot.weekStart) ?? {};
      grouped[snapshot.itemName] = snapshot;
      map.set(snapshot.weekStart, grouped);
    });

    return map;
  }, [data?.snapshots]);

  const itemTrendData = useMemo(() => {
    if (!selectedItem || !data) return [];

    return data.snapshots
      .filter((snapshot) => snapshot.itemName === selectedItem)
      .sort((a, b) => a.weekStart.localeCompare(b.weekStart))
      .map((snapshot) => ({
        weekStart: snapshot.weekStart,
        popularity: snapshot.popularity,
        profitability: snapshot.profitability,
      }));
  }, [data, selectedItem]);

  const migrationData = useMemo(() => {
    if (!data) return [];

    const sortedWeeks = [...data.dimensions.weeks].sort((a, b) => a.localeCompare(b));
    const rows: Array<{ weekStart: string; toStar: number; toPlowhorse: number; toPuzzle: number; toDog: number }> = [];

    for (let i = 1; i < sortedWeeks.length; i += 1) {
      const currentWeek = weekMap.get(sortedWeeks[i]);
      const previousWeek = weekMap.get(sortedWeeks[i - 1]);
      if (!currentWeek || !previousWeek) continue;

      const row = { weekStart: sortedWeeks[i], toStar: 0, toPlowhorse: 0, toPuzzle: 0, toDog: 0 };

      Object.keys(currentWeek).forEach((itemName) => {
        const current = currentWeek[itemName];
        const previous = previousWeek[itemName];
        if (!previous || current.quadrant === previous.quadrant) return;

        if (current.quadrant === "Star") row.toStar += 1;
        if (current.quadrant === "Plowhorse") row.toPlowhorse += 1;
        if (current.quadrant === "Puzzle") row.toPuzzle += 1;
        if (current.quadrant === "Dog") row.toDog += 1;
      });

      rows.push(row);
    }

    return rows;
  }, [data, weekMap]);

  const categoryTrendData = useMemo(() => {
    if (!data || data.dimensions.weeks.length < 2) return [];

    const sortedWeeks = [...data.dimensions.weeks].sort((a, b) => a.localeCompare(b));
    const firstWeek = sortedWeeks[0];
    const latestWeek = sortedWeeks[sortedWeeks.length - 1];

    const categories = data.dimensions.categories;

    return categories
      .map((category) => {
        const first = data.snapshots.filter(
          (snapshot) => snapshot.weekStart === firstWeek && snapshot.category === category
        );
        const latest = data.snapshots.filter(
          (snapshot) => snapshot.weekStart === latestWeek && snapshot.category === category
        );

        const popularityDelta = Math.round(average(latest.map((point) => point.popularity)) - average(first.map((point) => point.popularity)));
        const profitabilityDelta = Math.round(average(latest.map((point) => point.profitability)) - average(first.map((point) => point.profitability)));

        return { category, popularityDelta, profitabilityDelta };
      })
      .sort((a, b) => Math.abs(b.popularityDelta) - Math.abs(a.popularityDelta))
      .slice(0, 8);
  }, [data]);

  const topMovers = useMemo(() => {
    if (!data || data.dimensions.weeks.length < 2) return [];

    const sortedWeeks = [...data.dimensions.weeks].sort((a, b) => a.localeCompare(b));
    const previousWeek = sortedWeeks[sortedWeeks.length - 2];
    const latestWeek = sortedWeeks[sortedWeeks.length - 1];

    const previousByItem = new Map(
      data.snapshots
        .filter((snapshot) => snapshot.weekStart === previousWeek)
        .map((snapshot) => [snapshot.itemName, snapshot])
    );

    return data.snapshots
      .filter((snapshot) => snapshot.weekStart === latestWeek)
      .map((snapshot) => {
        const previous = previousByItem.get(snapshot.itemName);
        const popularityDelta = previous ? snapshot.popularity - previous.popularity : 0;
        const profitabilityDelta = previous ? snapshot.profitability - previous.profitability : 0;

        return {
          itemName: snapshot.itemName,
          category: snapshot.category,
          fromQuadrant: previous?.quadrant ?? snapshot.quadrant,
          toQuadrant: snapshot.quadrant,
          popularityDelta,
          profitabilityDelta,
          action: actionLabel(snapshot),
          score: Math.abs(popularityDelta) + Math.abs(profitabilityDelta),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(({ score: _score, ...mover }) => mover);
  }, [data]);

  if (loading || dailyLoading) {
    return (
      <div className="chart-card chart-card--state">
        <div className="state-spinner" />
        <p className="state-message">Loading time-series analytics…</p>
      </div>
    );
  }

  if (error || dailyError || !data || !dailyData) {
    return (
      <div className="chart-card chart-card--state">
        <p className="state-message state-message--error">
          Could not load time-series data: {error ?? dailyError ?? "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <section className="chart-card chart-card--controls">
        <div className="analytics-controls">
          <label>
            Lookback Window
            <select value={weeks} onChange={(event) => setWeeks(Number(event.target.value))}>
              <option value={12}>Last 12 weeks</option>
              <option value={26}>Last 26 weeks</option>
            </select>
          </label>

          <label>
            Category
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="All">All categories</option>
              {data.dimensions.categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div id="top-movers">
        <TopMoversTable movers={topMovers} />
      </div>
      <div id="animated-matrix">
        <AnimatedQuadrantMatrix snapshots={dailyData.snapshots} days={dailyData.dimensions.days} />
      </div>

      <div id="item-trend">
        <ItemTrendChart
          title={`Item Trend: ${selectedItem}`}
          subtitle="Weekly movement of popularity and profitability for one representative item from the active filter set."
          data={itemTrendData}
        />
      </div>

      {/* Sankey disabled: restore QuadrantMigrationSankey import and migrationFlowData useMemo when re-enabling */}

      <div id="quadrant-migration">
        <QuadrantMigrationChart data={migrationData} />
      </div>
      <div id="category-momentum">
        <CategoryTrendBars data={categoryTrendData} />
      </div>
    </div>
  );
}
