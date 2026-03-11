import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ItemTrendPoint {
  weekStart: string;
  popularity: number;
  profitability: number;
}

interface ItemTrendChartProps {
  title: string;
  subtitle: string;
  data: ItemTrendPoint[];
}

export default function ItemTrendChart({ title, subtitle, data }: ItemTrendChartProps) {
  return (
    <section className="chart-card chart-card--analytics">
      <h3 className="chart-title">{title}</h3>
      <p className="chart-subtitle">{subtitle}</p>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 12, right: 22, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="weekStart" tick={{ fill: "#9ca3af", fontSize: 11 }} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: "#9ca3af", fontSize: 11 }} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="popularity"
            name="Popularity"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="profitability"
            name="Profitability"
            stroke="#ea580c"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
