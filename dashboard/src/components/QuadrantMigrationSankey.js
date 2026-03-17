import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, Sankey, Tooltip } from "recharts";
import { QUADRANT_LABELS } from "../data/mockMenuData";
function SankeyTooltipContent({ active, payload }) {
    if (!active || !payload?.length)
        return null;
    const link = payload[0].payload;
    const source = link?.source?.name ?? "Unknown";
    const target = link?.target?.name ?? "Unknown";
    const value = link?.value ?? 0;
    return (_jsxs("div", { className: "tooltip", children: [_jsx("p", { className: "tooltip-name", children: "Quadrant Flow" }), _jsxs("p", { className: "tooltip-detail", children: ["From: ", source] }), _jsxs("p", { className: "tooltip-detail", children: ["To: ", target] }), _jsxs("p", { className: "tooltip-quadrant", style: { color: "#6b7280" }, children: ["Items moved: ", value] })] }));
}
export default function QuadrantMigrationSankey({ data }) {
    const quadrants = ["Star", "Plowhorse", "Puzzle", "Dog"];
    const nodes = [
        ...quadrants.map((q) => ({ name: `From ${QUADRANT_LABELS[q]}` })),
        ...quadrants.map((q) => ({ name: `To ${QUADRANT_LABELS[q]}` })),
    ];
    const sourceIndexByQuadrant = Object.fromEntries(quadrants.map((quadrant, index) => [quadrant, index]));
    const targetIndexByQuadrant = Object.fromEntries(quadrants.map((quadrant, index) => [quadrant, index + quadrants.length]));
    const links = data.map((transition) => ({
        source: sourceIndexByQuadrant[transition.fromQuadrant],
        target: targetIndexByQuadrant[transition.toQuadrant],
        value: transition.value,
    }));
    const hasFlows = links.length > 0;
    return (_jsxs("section", { className: "chart-card chart-card--analytics", children: [_jsx("h3", { className: "chart-title", children: "Quadrant Migration Flow (Sankey)" }), _jsx("p", { className: "chart-subtitle", children: "Aggregate flow of items between source and destination quadrants across the selected period." }), hasFlows ? (_jsx(ResponsiveContainer, { width: "100%", height: 340, children: _jsx(Sankey, { data: { nodes, links }, nodePadding: 28, nodeWidth: 14, margin: { top: 16, right: 20, bottom: 10, left: 20 }, link: { stroke: "#9ca3af", strokeOpacity: 0.28 }, children: _jsx(Tooltip, { content: _jsx(SankeyTooltipContent, {}) }) }) })) : (_jsx("p", { className: "state-message", children: "No quadrant transitions in the selected period." }))] }));
}
