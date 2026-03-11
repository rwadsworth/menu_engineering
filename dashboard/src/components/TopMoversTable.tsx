interface TopMover {
  itemName: string;
  category: string;
  fromQuadrant: string;
  toQuadrant: string;
  popularityDelta: number;
  profitabilityDelta: number;
  action: string;
}

interface TopMoversTableProps {
  movers: TopMover[];
}

export default function TopMoversTable({ movers }: TopMoversTableProps) {
  return (
    <section className="chart-card chart-card--analytics">
      <h3 className="chart-title">Top Movers</h3>
      <p className="chart-subtitle">
        Largest week-over-week swings to prioritize promotion, margin protection, or repositioning.
      </p>
      <div className="analytics-table-wrap">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Quadrant Shift</th>
              <th>Popularity Δ</th>
              <th>Profitability Δ</th>
              <th>Suggested Action</th>
            </tr>
          </thead>
          <tbody>
            {movers.map((mover) => (
              <tr key={mover.itemName}>
                <td className="matrix-table-name">{mover.itemName}</td>
                <td className="matrix-table-category">{mover.category}</td>
                <td>{mover.fromQuadrant}{" -> "}{mover.toQuadrant}</td>
                <td>{mover.popularityDelta >= 0 ? "+" : ""}{mover.popularityDelta}</td>
                <td>{mover.profitabilityDelta >= 0 ? "+" : ""}{mover.profitabilityDelta}</td>
                <td>{mover.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
