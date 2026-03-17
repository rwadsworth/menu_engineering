import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, } from "recharts";
import { QUADRANT_COLORS, QUADRANT_LABELS } from "../data/mockMenuData";
const DESTINATION_LOOKUP = {
    toStar: "Star",
    toPlowhorse: "Plowhorse",
    toPuzzle: "Puzzle",
    toDog: "Dog",
};
function MigrationTooltip({ active, label, payload }) {
    if (!active || !payload?.length)
        return null;
    const rows = payload.filter((entry) => entry.value > 0);
    const total = rows.reduce((sum, entry) => sum + entry.value, 0);
    return (_jsxs("div", { className: "tooltip", children: [_jsxs("p", { className: "tooltip-name", children: ["Week of ", label] }), rows.length ? (rows.map((entry) => {
                const quadrant = DESTINATION_LOOKUP[entry.dataKey];
                return (_jsxs("p", { className: "tooltip-detail", children: ["To ", QUADRANT_LABELS[quadrant], ": ", entry.value] }, entry.dataKey));
            })) : (_jsx("p", { className: "tooltip-detail", children: "No quadrant changes" })), _jsxs("p", { className: "tooltip-quadrant", style: { color: "#6b7280" }, children: ["Total moves: ", total] })] }));
}
export default function QuadrantMigrationChart({ data }) {
    return (_jsxs("section", { className: "chart-card chart-card--analytics", children: [_jsx("h3", { className: "chart-title", children: "Quadrant Migration" }), _jsx("p", { className: "chart-subtitle", children: "Weekly count of items that changed quadrant, grouped by their destination quadrant." }), _jsx(ResponsiveContainer, { width: "100%", height: 320, children: _jsxs(BarChart, { data: data, margin: { top: 12, right: 20, bottom: 20, left: 0 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { dataKey: "weekStart", tick: { fill: "#9ca3af", fontSize: 11 }, tickLine: false }), _jsx(YAxis, { tick: { fill: "#9ca3af", fontSize: 11 }, tickLine: false }), _jsx(Tooltip, { content: _jsx(MigrationTooltip, {}) }), _jsx(Legend, { wrapperStyle: { fontSize: "12px" } }), _jsx(Bar, { dataKey: "toStar", name: "To Star", stackId: "a", fill: QUADRANT_COLORS.Star, radius: [0, 0, 0, 0] }), _jsx(Bar, { dataKey: "toPlowhorse", name: "To Plowhorse", stackId: "a", fill: QUADRANT_COLORS.Plowhorse }), _jsx(Bar, { dataKey: "toPuzzle", name: "To Puzzle", stackId: "a", fill: QUADRANT_COLORS.Puzzle }), _jsx(Bar, { dataKey: "toDog", name: "To Dog", stackId: "a", fill: QUADRANT_COLORS.Dog })] }) })] }));
}
