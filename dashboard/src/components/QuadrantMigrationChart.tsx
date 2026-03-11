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
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="toStar" name="To Star" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
          <Bar dataKey="toPlowhorse" name="To Plowhorse" stackId="a" fill="#f59e0b" />
          <Bar dataKey="toPuzzle" name="To Puzzle" stackId="a" fill="#3b82f6" />
          <Bar dataKey="toDog" name="To Dog" stackId="a" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
