import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { QUADRANT_COLORS, QUADRANT_LABELS, type Quadrant } from "../data/mockMenuData";

interface QuadrantMigrationPoint {
  weekStart: string;
  toStar: number;
  toPlowhorse: number;
  toPuzzle: number;
  toDog: number;
}

interface QuadrantMigrationChartProps {
  data: QuadrantMigrationPoint[];
}

interface MigrationTooltipEntry {
  value: number;
  color: string;
  dataKey: string;
  name: string;
}

interface MigrationTooltipProps {
  active?: boolean;
  label?: string;
  payload?: MigrationTooltipEntry[];
}

const DESTINATION_LOOKUP: Record<string, Quadrant> = {
  toStar: "Star",
  toPlowhorse: "Plowhorse",
  toPuzzle: "Puzzle",
  toDog: "Dog",
};

function MigrationTooltip({ active, label, payload }: MigrationTooltipProps) {
  if (!active || !payload?.length) return null;

  const rows = payload.filter((entry) => entry.value > 0);
  const total = rows.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="tooltip">
      <p className="tooltip-name">Week of {label}</p>
      {rows.length ? (
        rows.map((entry) => {
          const quadrant = DESTINATION_LOOKUP[entry.dataKey];
          return (
            <p key={entry.dataKey} className="tooltip-detail">
              To {QUADRANT_LABELS[quadrant]}: {entry.value}
            </p>
          );
        })
      ) : (
        <p className="tooltip-detail">No quadrant changes</p>
      )}
      <p className="tooltip-quadrant" style={{ color: "#6b7280" }}>
        Total moves: {total}
      </p>
    </div>
  );
}

export default function QuadrantMigrationChart({ data }: QuadrantMigrationChartProps) {
  return (
    <section className="chart-card chart-card--analytics">
      <h3 className="chart-title">Quadrant Migration</h3>
      <p className="chart-subtitle">
        Weekly count of items that changed quadrant, grouped by their destination quadrant.
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 12, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="weekStart" tick={{ fill: "#9ca3af", fontSize: 11 }} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} tickLine={false} />
          <Tooltip content={<MigrationTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="toStar" name="To Star" stackId="a" fill={QUADRANT_COLORS.Star} radius={[0, 0, 0, 0]} />
          <Bar dataKey="toPlowhorse" name="To Plowhorse" stackId="a" fill={QUADRANT_COLORS.Plowhorse} />
          <Bar dataKey="toPuzzle" name="To Puzzle" stackId="a" fill={QUADRANT_COLORS.Puzzle} />
          <Bar dataKey="toDog" name="To Dog" stackId="a" fill={QUADRANT_COLORS.Dog} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
