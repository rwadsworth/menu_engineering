import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useMemo } from "react";
import MenuItemsTable from "./MenuItemsTable";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, } from "recharts";
import { QUADRANT_COLORS, QUADRANT_LABELS, } from "../data/mockMenuData";
import { useMenuItems } from "../hooks/useMenuItems";
const QUADRANTS = ["Star", "Plowhorse", "Puzzle", "Dog"];
const QUADRANT_INFO = {
    STARS: {
        title: "Stars",
        description: "High popularity & high margin. Your best performers — they drive volume and profit simultaneously.",
        strategy: "Keep & Feature",
    },
    PLOWHORSES: {
        title: "Plowhorses",
        description: "Guests order these often, but margins are thin. Consider a price increase, smaller portions, or pairing with a high-margin upsell.",
        strategy: "Adjust Price / Portion",
    },
    PUZZLES: {
        title: "Puzzles",
        description: "Profitable when ordered, but guests rarely choose them. Improve menu placement, rewrite descriptions, or lean on server recommendations.",
        strategy: "Promote / Reposition",
    },
    DOGS: {
        title: "Dogs",
        description: "Low popularity and low margin — these items cost more than they earn. Review for removal, rebranding, or full replacement.",
        strategy: "Remove / Rebrand",
    },
};
function CustomTooltip({ active, payload }) {
    if (!active || !payload?.length)
        return null;
    const item = payload[0].payload;
    return (_jsxs("div", { className: "tooltip", children: [_jsx("p", { className: "tooltip-name", children: item.name }), _jsx("p", { className: "tooltip-detail", children: item.category }), _jsxs("p", { className: "tooltip-detail", children: ["Popularity: ", item.popularity] }), _jsxs("p", { className: "tooltip-detail", children: ["Profitability: ", item.profitability] }), _jsx("p", { className: "tooltip-quadrant", style: { color: QUADRANT_COLORS[item.quadrant] }, children: QUADRANT_LABELS[item.quadrant] })] }));
}
function CustomLegendContent() {
    const [expanded, setExpanded] = useState(null);
    const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
    const legendRef = useRef(null);
    const handleToggle = (quadrant, e) => {
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
    return (_jsxs("div", { className: "matrix-legend", ref: legendRef, children: [_jsx("div", { className: "matrix-legend-items", children: QUADRANTS.map((quadrant) => {
                    const color = QUADRANT_COLORS[quadrant];
                    const label = QUADRANT_LABELS[quadrant];
                    const isActive = expanded === quadrant;
                    return (_jsxs("button", { className: `matrix-legend-item${isActive ? " matrix-legend-item--active" : ""}`, style: isActive
                            ? { backgroundColor: `${color}14`, borderColor: `${color}50` }
                            : {}, onClick: (e) => handleToggle(quadrant, e), children: [_jsx("span", { className: "matrix-legend-dot", style: { backgroundColor: color } }), _jsx("span", { className: "matrix-legend-label", children: label }), _jsx("span", { className: "matrix-legend-icon", style: isActive ? { backgroundColor: color, borderColor: color, color: "#fff" } : {}, children: "i" })] }, quadrant));
                }) }), expanded && activeInfo && (_jsxs("div", { className: "matrix-legend-popup", style: { top: popupPos.top, left: popupPos.left }, children: [_jsxs("div", { className: "matrix-legend-popup-header", children: [_jsx("span", { className: "matrix-legend-popup-dot", style: { backgroundColor: activeColor } }), _jsx("span", { className: "matrix-legend-popup-title", children: activeInfo.title }), _jsx("button", { className: "matrix-legend-popup-close", onClick: () => setExpanded(null), children: "\u00D7" })] }), _jsx("p", { className: "matrix-legend-popup-desc", children: activeInfo.description }), _jsxs("div", { className: "matrix-legend-popup-strategy", style: {
                            color: activeColor,
                            borderColor: `${activeColor}40`,
                            backgroundColor: `${activeColor}12`,
                        }, children: [_jsx("span", { className: "matrix-legend-popup-strategy-label", children: "Strategy" }), _jsx("strong", { children: activeInfo.strategy })] })] }))] }));
}
export default function MenuMatrix() {
    const { items: menuItems, loading, error } = useMenuItems();
    const itemsByQuadrant = useMemo(() => QUADRANTS.reduce((acc, q) => {
        acc[q] = menuItems.filter((item) => item.quadrant === q);
        return acc;
    }, { Star: [], Plowhorse: [], Puzzle: [], Dog: [] }), [menuItems]);
    if (loading) {
        return (_jsxs("div", { className: "chart-card chart-card--state", children: [_jsx("div", { className: "state-spinner" }), _jsx("p", { className: "state-message", children: "Loading menu data\u2026" })] }));
    }
    if (error) {
        return (_jsx("div", { className: "chart-card chart-card--state", children: _jsxs("p", { className: "state-message state-message--error", children: ["Could not load menu data: ", error] }) }));
    }
    return (_jsxs("div", { className: "chart-card", id: "matrix-overview", children: [_jsx("h2", { className: "chart-title", children: "Menu Engineering Matrix" }), _jsx("p", { className: "chart-subtitle", children: "Popularity (sales volume) vs. Profitability (margin) \u2014 each dot is a menu item" }), _jsx("div", { className: "chart-matrix-wrap", children: _jsx(ResponsiveContainer, { width: "100%", height: 480, children: _jsxs(ScatterChart, { margin: { top: 20, right: 30, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { type: "number", dataKey: "popularity", domain: [0, 100], name: "Popularity", label: { value: "Popularity →", position: "insideBottom", offset: -10, fill: "#6b7280", fontSize: 13 }, tick: { fill: "#9ca3af", fontSize: 12 }, tickLine: false }), _jsx(YAxis, { type: "number", dataKey: "profitability", domain: [0, 100], name: "Profitability", label: { value: "Profitability →", angle: -90, position: "insideLeft", offset: 10, fill: "#6b7280", fontSize: 13 }, tick: { fill: "#9ca3af", fontSize: 12 }, tickLine: false }), _jsx(Tooltip, { content: _jsx(CustomTooltip, {}) }), _jsx(ReferenceLine, { x: 50, stroke: "#d1d5db", strokeWidth: 1.5, strokeDasharray: "6 3" }), _jsx(ReferenceLine, { y: 50, stroke: "#d1d5db", strokeWidth: 1.5, strokeDasharray: "6 3" }), QUADRANTS.map((quadrant) => (_jsx(Scatter, { name: QUADRANT_LABELS[quadrant], data: itemsByQuadrant[quadrant], fill: QUADRANT_COLORS[quadrant], r: 7, opacity: 0.85 }, quadrant)))] }) }) }), _jsx(CustomLegendContent, {}), _jsx(MenuItemsTable, { menuItems: menuItems, itemsByQuadrant: itemsByQuadrant, sectionId: "matrix-items-table" })] }));
}
