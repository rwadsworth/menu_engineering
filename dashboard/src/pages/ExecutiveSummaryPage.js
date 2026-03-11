import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useMenuItems } from "../hooks/useMenuItems";
import { useMenuTimeSeries } from "../hooks/useMenuTimeSeries";
function avg(values) {
    if (!values.length)
        return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}
export default function ExecutiveSummaryPage() {
    const { items, loading: itemsLoading, error: itemsError } = useMenuItems();
    const { data, loading: seriesLoading, error: seriesError } = useMenuTimeSeries({ weeks: 26, category: "All" });
    const summary = useMemo(() => {
        const totalItems = items.length;
        const totalStars = items.filter((item) => item.quadrant === "Star").length;
        const totalPlowhorses = items.filter((item) => item.quadrant === "Plowhorse").length;
        const totalPuzzles = items.filter((item) => item.quadrant === "Puzzle").length;
        const totalDogs = items.filter((item) => item.quadrant === "Dog").length;
        const topPopularityItems = [...items]
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5);
        const topProfitabilityItems = [...items]
            .sort((a, b) => b.profitability - a.profitability)
            .slice(0, 5);
        const lowestPopularityItems = [...items]
            .sort((a, b) => a.popularity - b.popularity)
            .slice(0, 5);
        const lowestProfitabilityItems = [...items]
            .sort((a, b) => a.profitability - b.profitability)
            .slice(0, 5);
        const topPuzzle = [...items]
            .filter((item) => item.quadrant === "Puzzle")
            .sort((a, b) => b.profitability - a.profitability)[0];
        const sortedWeeks = [...(data?.dimensions.weeks ?? [])].sort((a, b) => a.localeCompare(b));
        const latestWeek = sortedWeeks[sortedWeeks.length - 1];
        const previousWeek = sortedWeeks[sortedWeeks.length - 2];
        const latestRows = (data?.snapshots ?? []).filter((snapshot) => snapshot.weekStart === latestWeek);
        const previousByItem = new Map((data?.snapshots ?? [])
            .filter((snapshot) => snapshot.weekStart === previousWeek)
            .map((snapshot) => [snapshot.itemName, snapshot]));
        const fallingStars = latestRows
            .filter((snapshot) => snapshot.quadrant === "Star")
            .map((snapshot) => {
            const previous = previousByItem.get(snapshot.itemName);
            return {
                itemName: snapshot.itemName,
                delta: previous ? snapshot.popularity - previous.popularity : 0,
            };
        })
            .filter((row) => row.delta < 0)
            .sort((a, b) => a.delta - b.delta)
            .slice(0, 3);
        const highestVolumeLowMarginCategories = (data?.dimensions.categories ?? [])
            .map((category) => {
            const rows = latestRows.filter((snapshot) => snapshot.category === category);
            return {
                category,
                popularity: avg(rows.map((snapshot) => snapshot.popularity)),
                profitability: avg(rows.map((snapshot) => snapshot.profitability)),
            };
        })
            .filter((row) => row.popularity >= 50 && row.profitability < 50)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 3)
            .map((row) => row.category);
        return {
            totalItems,
            totalStars,
            totalPlowhorses,
            totalPuzzles,
            totalDogs,
            topPopularityItems,
            topProfitabilityItems,
            lowestPopularityItems,
            lowestProfitabilityItems,
            topPuzzle,
            fallingStars,
            highestVolumeLowMarginCategories,
        };
    }, [data, items]);
    if (itemsLoading || seriesLoading) {
        return (_jsxs("div", { className: "chart-card chart-card--state", children: [_jsx("div", { className: "state-spinner" }), _jsx("p", { className: "state-message", children: "Loading executive summary\u2026" })] }));
    }
    if (itemsError || seriesError) {
        return (_jsx("div", { className: "chart-card chart-card--state", children: _jsxs("p", { className: "state-message state-message--error", children: ["Could not load summary data: ", itemsError ?? seriesError ?? "Unknown error"] }) }));
    }
    return (_jsxs("div", { className: "analytics-page", children: [_jsxs("section", { className: "chart-card chart-card--analytics", children: [_jsx("h2", { className: "chart-title", children: "Executive Summary" }), _jsx("p", { className: "chart-subtitle", children: "High-level menu health and recommended actions based on current matrix position plus 26-week trend movement." }), _jsxs("div", { className: "summary-kpi-grid", children: [_jsxs("article", { className: "summary-kpi-card", children: [_jsx("p", { className: "summary-kpi-label", children: "Total Menu Items" }), _jsx("p", { className: "summary-kpi-value", children: summary.totalItems })] }), _jsxs("article", { className: "summary-kpi-card", children: [_jsx("p", { className: "summary-kpi-label", children: "Quadrant Mix" }), _jsxs("p", { className: "summary-kpi-value summary-kpi-value--compact", children: [_jsxs("abbr", { title: "Star: high popularity and high profitability (popularity >= 50, profitability >= 50)", children: ["S ", summary.totalStars] }), " | ", _jsxs("abbr", { title: "Plowhorse: high popularity and lower profitability (popularity >= 50, profitability < 50)", children: ["P ", summary.totalPlowhorses] }), " | ", _jsxs("abbr", { title: "Puzzle: lower popularity and high profitability (popularity < 50, profitability >= 50)", children: ["Z ", summary.totalPuzzles] }), " | ", _jsxs("abbr", { title: "Dog: lower popularity and lower profitability (popularity < 50, profitability < 50)", children: ["D ", summary.totalDogs] })] })] })] }), _jsxs("div", { className: "summary-toplists", children: [_jsxs("article", { className: "summary-toplist-card", children: [_jsx("p", { className: "summary-kpi-label", children: "Top 5 By Popularity" }), _jsxs("table", { className: "summary-toplist-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Item" }), _jsx("th", { children: "Popularity" })] }) }), _jsx("tbody", { children: summary.topPopularityItems.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.name }), _jsx("td", { children: Math.round(item.popularity) })] }, `pop-${item.name}`))) })] })] }), _jsxs("article", { className: "summary-toplist-card", children: [_jsx("p", { className: "summary-kpi-label", children: "Top 5 By Profitability" }), _jsxs("table", { className: "summary-toplist-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Item" }), _jsx("th", { children: "Profitability" })] }) }), _jsx("tbody", { children: summary.topProfitabilityItems.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.name }), _jsx("td", { children: Math.round(item.profitability) })] }, `profit-${item.name}`))) })] })] })] }), _jsxs("div", { className: "summary-toplists", children: [_jsxs("article", { className: "summary-toplist-card", children: [_jsx("p", { className: "summary-kpi-label", children: "Lowest 5 By Popularity" }), _jsxs("table", { className: "summary-toplist-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Item" }), _jsx("th", { children: "Popularity" })] }) }), _jsx("tbody", { children: summary.lowestPopularityItems.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.name }), _jsx("td", { children: Math.round(item.popularity) })] }, `low-pop-${item.name}`))) })] })] }), _jsxs("article", { className: "summary-toplist-card", children: [_jsx("p", { className: "summary-kpi-label", children: "Lowest 5 By Profitability" }), _jsxs("table", { className: "summary-toplist-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Item" }), _jsx("th", { children: "Profitability" })] }) }), _jsx("tbody", { children: summary.lowestProfitabilityItems.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: item.name }), _jsx("td", { children: Math.round(item.profitability) })] }, `low-profit-${item.name}`))) })] })] })] })] }), _jsxs("section", { className: "chart-card chart-card--analytics", children: [_jsx("h3", { className: "chart-title", children: "General Recommendations" }), _jsx("p", { className: "chart-subtitle", children: "Each recommendation includes direct links to the supporting tables and charts." }), _jsxs("div", { className: "recommendation-list", children: [_jsxs("article", { className: "recommendation-card", children: [_jsx("p", { className: "recommendation-title", children: "Protect margin in high-volume categories" }), _jsxs("p", { className: "recommendation-body", children: ["Focus price and portion reviews on ", summary.highestVolumeLowMarginCategories.length
                                                ? summary.highestVolumeLowMarginCategories.join(", ")
                                                : "your top Plowhorse categories", " to reduce profit drag without hurting demand."] }), _jsxs("div", { className: "recommendation-links", children: [_jsx(Link, { to: "/time-series#category-momentum", children: "Category Momentum" }), _jsx(Link, { to: "/#matrix-items-table", children: "Item Breakdown Table" })] })] }), _jsxs("article", { className: "recommendation-card", children: [_jsx("p", { className: "recommendation-title", children: "Promote high-margin Puzzles" }), _jsxs("p", { className: "recommendation-body", children: ["Lead with ", summary.topPuzzle?.name ?? "top Puzzle items", " in server callouts and menu placement to convert margin potential into volume."] }), _jsxs("div", { className: "recommendation-links", children: [_jsx(Link, { to: "/#matrix-overview", children: "Matrix Scatter" }), _jsx(Link, { to: "/time-series#top-movers", children: "Top Movers" })] })] }), _jsxs("article", { className: "recommendation-card", children: [_jsx("p", { className: "recommendation-title", children: "Intervene on slipping Stars this week" }), _jsx("p", { className: "recommendation-body", children: summary.fallingStars.length
                                            ? `${summary.fallingStars.map((star) => star.itemName).join(", ")} are trending down in popularity despite Star status.`
                                            : "No major Star declines detected in the latest week; continue monitoring for early fatigue." }), _jsxs("div", { className: "recommendation-links", children: [_jsx(Link, { to: "/time-series#animated-matrix", children: "30-Day Movement Matrix" }), _jsx(Link, { to: "/time-series#quadrant-migration", children: "Quadrant Migration" })] })] })] })] })] }));
}
