import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, } from "recharts";
import { QUADRANT_COLORS, QUADRANT_LABELS, } from "../data/mockMenuData";
const QUADRANTS = ["Star", "Plowhorse", "Puzzle", "Dog"];
function MatrixTooltip({ active, payload }) {
    if (!active || !payload?.length)
        return null;
    const item = payload[0].payload;
    return (_jsxs("div", { className: "tooltip", children: [_jsx("p", { className: "tooltip-name", children: item.itemName }), _jsx("p", { className: "tooltip-detail", children: item.category }), _jsxs("p", { className: "tooltip-detail", children: ["Popularity: ", item.popularity] }), _jsxs("p", { className: "tooltip-detail", children: ["Profitability: ", item.profitability] }), _jsx("p", { className: "tooltip-quadrant", style: { color: QUADRANT_COLORS[item.quadrant] }, children: QUADRANT_LABELS[item.quadrant] })] }));
}
export default function AnimatedQuadrantMatrix({ snapshots, days }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const sortedDays = useMemo(() => [...days].sort((a, b) => a.localeCompare(b)), [days]);
    const frameMap = useMemo(() => {
        const map = new Map();
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
        if (!isPlaying || sortedDays.length < 2)
            return undefined;
        const timer = window.setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= sortedDays.length - 1)
                    return 0;
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
    const byQuadrant = useMemo(() => QUADRANTS.reduce((acc, quadrant) => {
        acc[quadrant] = frame.filter((point) => point.quadrant === quadrant);
        return acc;
    }, { Star: [], Plowhorse: [], Puzzle: [], Dog: [] }), [frame]);
    return (_jsxs("section", { className: "chart-card chart-card--analytics", children: [_jsxs("div", { className: "animated-matrix-header", children: [_jsxs("div", { children: [_jsx("h3", { className: "chart-title", children: "Animated Quadrant Matrix (30-Day Movement)" }), _jsx("p", { className: "chart-subtitle", children: "Playback of item movement across popularity and profitability over the last 30 days." })] }), _jsxs("div", { className: "animated-matrix-controls", children: [_jsx("button", { type: "button", className: "pagination-btn", onClick: () => setIsPlaying((value) => !value), children: isPlaying ? "Pause" : "Play" }), _jsx("span", { className: "animated-matrix-date", children: currentDay })] })] }), _jsx("div", { className: "animated-matrix-slider", children: _jsx("input", { type: "range", min: 0, max: Math.max(sortedDays.length - 1, 0), value: currentIndex, onChange: (event) => {
                        setIsPlaying(false);
                        setCurrentIndex(Number(event.target.value));
                    } }) }), _jsx(ResponsiveContainer, { width: "100%", height: 430, children: _jsxs(ScatterChart, { margin: { top: 20, right: 30, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }), _jsx(XAxis, { type: "number", dataKey: "popularity", domain: [0, 100], name: "Popularity", label: { value: "Popularity ->", position: "insideBottom", offset: -10, fill: "#6b7280", fontSize: 13 }, tick: { fill: "#9ca3af", fontSize: 12 }, tickLine: false }), _jsx(YAxis, { type: "number", dataKey: "profitability", domain: [0, 100], name: "Profitability", label: { value: "Profitability ->", angle: -90, position: "insideLeft", offset: 10, fill: "#6b7280", fontSize: 13 }, tick: { fill: "#9ca3af", fontSize: 12 }, tickLine: false }), _jsx(Tooltip, { content: _jsx(MatrixTooltip, {}) }), _jsx(ReferenceLine, { x: 50, stroke: "#d1d5db", strokeWidth: 1.5, strokeDasharray: "6 3" }), _jsx(ReferenceLine, { y: 50, stroke: "#d1d5db", strokeWidth: 1.5, strokeDasharray: "6 3" }), QUADRANTS.map((quadrant) => (_jsx(Scatter, { name: QUADRANT_LABELS[quadrant], data: byQuadrant[quadrant], fill: QUADRANT_COLORS[quadrant], r: 6, opacity: 0.86, animationDuration: 540, isAnimationActive: true }, quadrant)))] }) })] }));
}
