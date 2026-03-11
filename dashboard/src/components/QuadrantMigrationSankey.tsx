import { ResponsiveContainer, Sankey, Tooltip } from "recharts";
import { QUADRANT_LABELS, type Quadrant } from "../data/mockMenuData";

interface QuadrantTransition {
  fromQuadrant: Quadrant;
  toQuadrant: Quadrant;
  value: number;
}

interface QuadrantMigrationSankeyProps {
  data: QuadrantTransition[];
}

interface SankeyTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload?: {
      source?: { name?: string };
      target?: { name?: string };
      value?: number;
    };
  }>;
}

function SankeyTooltipContent({ active, payload }: SankeyTooltipProps) {
  if (!active || !payload?.length) return null;
  const link = payload[0].payload;
  const source = link?.source?.name ?? "Unknown";
  const target = link?.target?.name ?? "Unknown";
  const value = link?.value ?? 0;

  return (
    <div className="tooltip">
      <p className="tooltip-name">Quadrant Flow</p>
      <p className="tooltip-detail">From: {source}</p>
      <p className="tooltip-detail">To: {target}</p>
      <p className="tooltip-quadrant" style={{ color: "#6b7280" }}>
        Items moved: {value}
      </p>
    </div>
  );
}

export default function QuadrantMigrationSankey({ data }: QuadrantMigrationSankeyProps) {
  const quadrants: Quadrant[] = ["Star", "Plowhorse", "Puzzle", "Dog"];

  const nodes = [
    ...quadrants.map((q) => ({ name: `From ${QUADRANT_LABELS[q]}` })),
    ...quadrants.map((q) => ({ name: `To ${QUADRANT_LABELS[q]}` })),
  ];

  const sourceIndexByQuadrant = Object.fromEntries(
    quadrants.map((quadrant, index) => [quadrant, index])
  ) as Record<Quadrant, number>;

  const targetIndexByQuadrant = Object.fromEntries(
    quadrants.map((quadrant, index) => [quadrant, index + quadrants.length])
  ) as Record<Quadrant, number>;

  const links = data.map((transition) => ({
    source: sourceIndexByQuadrant[transition.fromQuadrant],
    target: targetIndexByQuadrant[transition.toQuadrant],
    value: transition.value,
  }));

  const hasFlows = links.length > 0;

  return (
    <section className="chart-card chart-card--analytics">
      <h3 className="chart-title">Quadrant Migration Flow (Sankey)</h3>
      <p className="chart-subtitle">
        Aggregate flow of items between source and destination quadrants across the selected period.
      </p>

      {hasFlows ? (
        <ResponsiveContainer width="100%" height={340}>
          <Sankey
            data={{ nodes, links }}
            nodePadding={28}
            nodeWidth={14}
            margin={{ top: 16, right: 20, bottom: 10, left: 20 }}
            link={{ stroke: "#9ca3af", strokeOpacity: 0.28 }}
          >
            <Tooltip content={<SankeyTooltipContent />} />
          </Sankey>
        </ResponsiveContainer>
      ) : (
        <p className="state-message">No quadrant transitions in the selected period.</p>
      )}
    </section>
  );
}
