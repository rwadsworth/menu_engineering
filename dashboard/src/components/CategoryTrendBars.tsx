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

interface CategoryMomentum {
  category: string;
  popularityDelta: number;
  profitabilityDelta: number;
}

interface CategoryTrendBarsProps {
  data: CategoryMomentum[];
}

export default function CategoryTrendBars({ data }: CategoryTrendBarsProps) {
  return (
    <section className="chart-card chart-card--analytics">
      <h3 className="chart-title">Category Momentum</h3>
      <p className="chart-subtitle">
        Change from first to latest week in average category popularity and profitability.
      </p>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 44 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 11 }} tickLine={false} />
          <YAxis
            dataKey="category"
            type="category"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickLine={false}
            width={95}
          />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="popularityDelta" name="Popularity Delta" fill="#2563eb" />
          <Bar dataKey="profitabilityDelta" name="Profitability Delta" fill="#ea580c" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
