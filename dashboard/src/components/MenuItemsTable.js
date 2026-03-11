import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { QUADRANT_COLORS, QUADRANT_LABELS, } from "../data/mockMenuData";
const FILTER_OPTIONS = ["All", "Star", "Plowhorse", "Puzzle", "Dog"];
const PAGE_SIZE = 10;
export default function MenuItemsTable({ menuItems, itemsByQuadrant, sectionId }) {
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const filteredItems = useMemo(() => {
        const base = activeFilter === "All"
            ? menuItems
            : menuItems.filter((item) => item.quadrant === activeFilter);
        return [...base].sort((a, b) => b.popularity - a.popularity);
    }, [menuItems, activeFilter]);
    const handleFilterChange = (opt) => {
        setActiveFilter(opt);
        setCurrentPage(1);
    };
    const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
    const pagedItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    return (_jsxs("div", { className: "matrix-table-section", id: sectionId, children: [_jsxs("div", { className: "matrix-table-header", children: [_jsx("h3", { className: "matrix-table-title", children: "Item Breakdown" }), _jsx("div", { className: "matrix-filter-pills", children: FILTER_OPTIONS.map((opt) => {
                            const isActive = activeFilter === opt;
                            const color = opt !== "All" ? QUADRANT_COLORS[opt] : undefined;
                            return (_jsxs("button", { className: `filter-pill${isActive ? " filter-pill--active" : ""}`, style: isActive && color
                                    ? { backgroundColor: color, borderColor: color, color: "#fff" }
                                    : {}, onClick: () => handleFilterChange(opt), children: [opt === "All" ? "All Items" : QUADRANT_LABELS[opt], _jsx("span", { className: "filter-pill-count", children: opt === "All"
                                            ? menuItems.length
                                            : (itemsByQuadrant[opt]?.length ?? 0) })] }, opt));
                        }) })] }), _jsx("div", { className: "matrix-table-wrap", children: _jsxs("table", { className: "matrix-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Item" }), _jsx("th", { children: "Category" }), _jsx("th", { children: "Popularity" }), _jsx("th", { children: "Profitability" }), _jsx("th", { children: "Quadrant" })] }) }), _jsx("tbody", { children: pagedItems.map((item) => (_jsxs("tr", { children: [_jsx("td", { className: "matrix-table-name", children: item.name }), _jsx("td", { className: "matrix-table-category", children: item.category }), _jsx("td", { children: _jsxs("div", { className: "matrix-bar-wrap", children: [_jsx("div", { className: "matrix-bar-track", children: _jsx("div", { className: "matrix-bar-fill", style: { width: `${item.popularity}%` } }) }), _jsx("span", { className: "matrix-bar-value", children: item.popularity })] }) }), _jsx("td", { children: _jsxs("div", { className: "matrix-bar-wrap", children: [_jsx("div", { className: "matrix-bar-track", children: _jsx("div", { className: "matrix-bar-fill", style: { width: `${item.profitability}%` } }) }), _jsx("span", { className: "matrix-bar-value", children: item.profitability })] }) }), _jsx("td", { children: _jsx("span", { className: "matrix-quadrant-badge", style: {
                                                color: QUADRANT_COLORS[item.quadrant],
                                                backgroundColor: `${QUADRANT_COLORS[item.quadrant]}18`,
                                                borderColor: `${QUADRANT_COLORS[item.quadrant]}40`,
                                            }, children: QUADRANT_LABELS[item.quadrant] }) })] }, item.name))) })] }) }), totalPages > 1 && (_jsxs("div", { className: "matrix-table-pagination", children: [_jsx("button", { className: "pagination-btn", onClick: () => setCurrentPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1, children: "\u2190 Prev" }), _jsx("div", { className: "pagination-pages", children: Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx("button", { className: `pagination-page${currentPage === page ? " pagination-page--active" : ""}`, onClick: () => setCurrentPage(page), children: page }, page))) }), _jsx("button", { className: "pagination-btn", onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)), disabled: currentPage === totalPages, children: "Next \u2192" })] }))] }));
}
