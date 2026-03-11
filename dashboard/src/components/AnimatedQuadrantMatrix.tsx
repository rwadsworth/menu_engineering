import { useMemo, useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import {
  QUADRANT_COLORS,
  QUADRANT_LABELS,
  type Quadrant,
} from "../data/mockMenuData";
import type { MenuItemDailySnapshot } from "../data/menuTimeSeries";

const QUADRANTS: Quadrant[] = ["Star", "Plowhorse", "Puzzle", "Dog"];

interface AnimatedQuadrantMatrixProps {
  snapshots: MenuItemDailySnapshot[];
  days: string[];
}

interface FramePoint {
  itemName: string;
  category: string;
  popularity: number;
  profitability: number;
  quadrant: Quadrant;
}

interface MatrixTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: FramePoint }>;
}

function MatrixTooltip({ active, payload }: MatrixTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="tooltip">
      <p className="tooltip-name">{item.itemName}</p>
      <p className="tooltip-detail">{item.category}</p>
      <p className="tooltip-detail">Popularity: {item.popularity}</p>
      <p className="tooltip-detail">Profitability: {item.profitability}</p>
      <p className="tooltip-quadrant" style={{ color: QUADRANT_COLORS[item.quadrant] }}>
        {QUADRANT_LABELS[item.quadrant]}
      </p>
    </div>
  );
}

export default function AnimatedQuadrantMatrix({ snapshots, days }: AnimatedQuadrantMatrixProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const sortedDays = useMemo(() => [...days].sort((a, b) => a.localeCompare(b)), [days]);

  const frameMap = useMemo(() => {
    const map = new Map<string, FramePoint[]>();

    snapshots.forEach((snapshot) => {
      const points = map.get(snapshot.day) ?? [];
      points.push({
        itemName: snapshot.itemName,
        category: snapshot.category,
        popularity: snapshot.popularity,
        profitability: snapshot.profitability,
        quadrant: snapshot.quadrant,
      });
      map.set(snapshot.day, points);
    });

    return map;
  }, [snapshots]);

  useEffect(() => {
    if (!isPlaying || sortedDays.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= sortedDays.length - 1) return 0;
        return prev + 1;
      });
    }, 700);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPlaying, sortedDays.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [sortedDays.join("|"), snapshots.length]);

  const currentDay = sortedDays[currentIndex] ?? sortedDays[0] ?? "";
  const frame = frameMap.get(currentDay) ?? [];

  const byQuadrant = useMemo(
    () =>
      QUADRANTS.reduce<Record<Quadrant, FramePoint[]>>(
        (acc, quadrant) => {
          acc[quadrant] = frame.filter((point) => point.quadrant === quadrant);
          return acc;
        },
        { Star: [], Plowhorse: [], Puzzle: [], Dog: [] }
      ),
    [frame]
  );

  return (
    <section className="chart-card chart-card--analytics">
      <div className="animated-matrix-header">
        <div>
          <h3 className="chart-title">Animated Quadrant Matrix (30-Day Movement)</h3>
          <p className="chart-subtitle">
            Playback of item movement across popularity and profitability over the last 30 days.
          </p>
        </div>
        <div className="animated-matrix-controls">
          <button
            type="button"
            className="pagination-btn"
            onClick={() => setIsPlaying((value) => !value)}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <span className="animated-matrix-date">{currentDay}</span>
        </div>
      </div>

      <div className="animated-matrix-slider">
        <input
          type="range"
          min={0}
          max={Math.max(sortedDays.length - 1, 0)}
          value={currentIndex}
          onChange={(event) => {
            setIsPlaying(false);
            setCurrentIndex(Number(event.target.value));
          }}
        />
      </div>

      <ResponsiveContainer width="100%" height={430}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey="popularity"
            domain={[0, 100]}
            name="Popularity"
            label={{ value: "Popularity ->", position: "insideBottom", offset: -10, fill: "#6b7280", fontSize: 13 }}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            type="number"
            dataKey="profitability"
            domain={[0, 100]}
            name="Profitability"
            label={{ value: "Profitability ->", angle: -90, position: "insideLeft", offset: 10, fill: "#6b7280", fontSize: 13 }}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip content={<MatrixTooltip />} />
          <ReferenceLine x={50} stroke="#d1d5db" strokeWidth={1.5} strokeDasharray="6 3" />
          <ReferenceLine y={50} stroke="#d1d5db" strokeWidth={1.5} strokeDasharray="6 3" />

          {QUADRANTS.map((quadrant) => (
            <Scatter
              key={quadrant}
              name={QUADRANT_LABELS[quadrant]}
              data={byQuadrant[quadrant]}
              fill={QUADRANT_COLORS[quadrant]}
              r={6}
              opacity={0.86}
              animationDuration={540}
              isAnimationActive
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </section>
  );
}
