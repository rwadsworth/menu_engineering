import { useState, useRef, useMemo } from "react";
import MenuItemsTable from "./MenuItemsTable";
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
  type MenuItem,
  type Quadrant,
} from "../data/mockMenuData";
import { useMenuItems } from "../hooks/useMenuItems";

const QUADRANTS: Quadrant[] = ["Star", "Plowhorse", "Puzzle", "Dog"];

const QUADRANT_INFO: Record<string, { title: string; description: string; strategy: string }> = {
  STARS: {
    title: "Stars",
    description:
      "High popularity & high margin. Your best performers — they drive volume and profit simultaneously.",
    strategy: "Keep & Feature",
  },
  PLOWHORSES: {
    title: "Plowhorses",
    description:
      "Guests order these often, but margins are thin. Consider a price increase, smaller portions, or pairing with a high-margin upsell.",
    strategy: "Adjust Price / Portion",
  },
  PUZZLES: {
    title: "Puzzles",
    description:
      "Profitable when ordered, but guests rarely choose them. Improve menu placement, rewrite descriptions, or lean on server recommendations.",
    strategy: "Promote / Reposition",
  },
  DOGS: {
    title: "Dogs",
    description:
      "Low popularity and low margin — these items cost more than they earn. Review for removal, rebranding, or full replacement.",
    strategy: "Remove / Rebrand",
  },
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: MenuItem }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="tooltip">
      <p className="tooltip-name">{item.name}</p>
      <p className="tooltip-detail">{item.category}</p>
      <p className="tooltip-detail">Popularity: {item.popularity}</p>
      <p className="tooltip-detail">Profitability: {item.profitability}</p>
      <p className="tooltip-quadrant" style={{ color: QUADRANT_COLORS[item.quadrant] }}>
        {QUADRANT_LABELS[item.quadrant]}
      </p>
    </div>
  );
}

function CustomLegendContent() {
  const [expanded, setExpanded] = useState<Quadrant | null>(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const legendRef = useRef<HTMLDivElement>(null);

  const handleToggle = (quadrant: Quadrant, e: React.MouseEvent<HTMLButtonElement>) => {
    if (expanded === quadrant) {
      setExpanded(null);
      return;
    }
    const btnRect = e.currentTarget.getBoundingClientRect();
    const containerRect = legendRef.current?.getBoundingClientRect();
    if (containerRect) {
      setPopupPos({
        top: btnRect.top - containerRect.top,
        left: btnRect.right - containerRect.left + 10,
      });
    }
    setExpanded(quadrant);
  };

  const activeInfo = expanded ? QUADRANT_INFO[QUADRANT_LABELS[expanded].toUpperCase()] : null;
  const activeColor = expanded ? QUADRANT_COLORS[expanded] : "#000";

  return (
    <div className="matrix-legend" ref={legendRef}>
      <div className="matrix-legend-items">
        {QUADRANTS.map((quadrant) => {
          const color = QUADRANT_COLORS[quadrant];
          const label = QUADRANT_LABELS[quadrant];
          const isActive = expanded === quadrant;
          return (
            <button
              key={quadrant}
              className={`matrix-legend-item${isActive ? " matrix-legend-item--active" : ""}`}
              style={
                isActive
                  ? { backgroundColor: `${color}14`, borderColor: `${color}50` }
                  : {}
              }
              onClick={(e) => handleToggle(quadrant, e)}
            >
              <span className="matrix-legend-dot" style={{ backgroundColor: color }} />
              <span className="matrix-legend-label">{label}</span>
              <span
                className="matrix-legend-icon"
                style={isActive ? { backgroundColor: color, borderColor: color, color: "#fff" } : {}}
              >
                i
              </span>
            </button>
          );
        })}
      </div>

      {expanded && activeInfo && (
        <div
          className="matrix-legend-popup"
          style={{ top: popupPos.top, left: popupPos.left }}
        >
          <div className="matrix-legend-popup-header">
            <span className="matrix-legend-popup-dot" style={{ backgroundColor: activeColor }} />
            <span className="matrix-legend-popup-title">{activeInfo.title}</span>
            <button className="matrix-legend-popup-close" onClick={() => setExpanded(null)}>
              ×
            </button>
          </div>
          <p className="matrix-legend-popup-desc">{activeInfo.description}</p>
          <div
            className="matrix-legend-popup-strategy"
            style={{
              color: activeColor,
              borderColor: `${activeColor}40`,
              backgroundColor: `${activeColor}12`,
            }}
          >
            <span className="matrix-legend-popup-strategy-label">Strategy</span>
            <strong>{activeInfo.strategy}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MenuMatrix() {
  const { items: menuItems, loading, error } = useMenuItems();

  const itemsByQuadrant = useMemo(
    () =>
      QUADRANTS.reduce<Record<Quadrant, MenuItem[]>>(
        (acc, q) => {
          acc[q] = menuItems.filter((item) => item.quadrant === q);
          return acc;
        },
        { Star: [], Plowhorse: [], Puzzle: [], Dog: [] }
      ),
    [menuItems]
  );

  if (loading) {
    return (
      <div className="chart-card chart-card--state">
        <div className="state-spinner" />
        <p className="state-message">Loading menu data…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-card chart-card--state">
        <p className="state-message state-message--error">
          Could not load menu data: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="chart-card" id="matrix-overview">
      <h2 className="chart-title">Menu Engineering Matrix</h2>
      <p className="chart-subtitle">
        Popularity (sales volume) vs. Profitability (margin) — each dot is a menu item
      </p>

      <div className="chart-matrix-wrap">
        <ResponsiveContainer width="100%" height={480}>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              dataKey="popularity"
              domain={[0, 100]}
              name="Popularity"
              label={{ value: "Popularity →", position: "insideBottom", offset: -10, fill: "#6b7280", fontSize: 13 }}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              type="number"
              dataKey="profitability"
              domain={[0, 100]}
              name="Profitability"
              label={{ value: "Profitability →", angle: -90, position: "insideLeft", offset: 10, fill: "#6b7280", fontSize: 13 }}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine x={50} stroke="#d1d5db" strokeWidth={1.5} strokeDasharray="6 3" />
            <ReferenceLine y={50} stroke="#d1d5db" strokeWidth={1.5} strokeDasharray="6 3" />

            {QUADRANTS.map((quadrant) => (
              <Scatter
                key={quadrant}
                name={QUADRANT_LABELS[quadrant]}
                data={itemsByQuadrant[quadrant]}
                fill={QUADRANT_COLORS[quadrant]}
                r={7}
                opacity={0.85}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <CustomLegendContent />

      <MenuItemsTable menuItems={menuItems} itemsByQuadrant={itemsByQuadrant} sectionId="matrix-items-table" />
    </div>
  );
}
