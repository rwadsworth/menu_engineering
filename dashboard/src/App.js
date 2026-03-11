import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { BrowserRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import MenuEngineeringPage from "./pages/MenuEngineeringPage";
import MenuTimeSeriesPage from "./pages/MenuTimeSeriesPage";
import ExecutiveSummaryPage from "./pages/ExecutiveSummaryPage";
import DocsLayoutPage from "./pages/docs/DocsLayoutPage";
import DocsIndexPage from "./pages/docs/DocsIndexPage";
import ReportingDataShapesPage from "./pages/docs/ReportingDataShapesPage";
import MenuCatalogSourceSchemaPage from "./pages/docs/MenuCatalogSourceSchemaPage";
import SalesTransactionsSourceSchemaPage from "./pages/docs/SalesTransactionsSourceSchemaPage";
function HashAnchorHandler() {
    const location = useLocation();
    useEffect(() => {
        if (!location.hash)
            return;
        const anchorId = location.hash.replace("#", "");
        window.requestAnimationFrame(() => {
            const element = document.getElementById(anchorId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }, [location.hash, location.pathname]);
    return null;
}
export default function App() {
    return (_jsxs(BrowserRouter, { children: [_jsx(HashAnchorHandler, {}), _jsxs("div", { className: "app", children: [_jsx("header", { className: "header", children: _jsxs("div", { className: "header-inner", children: [_jsx("span", { className: "header-badge", children: "Menu Engineering" }), _jsx("h1", { className: "header-title", children: "Restaurant Analytics Dashboard" }), _jsx("p", { className: "header-subtitle", children: "Understand menu performance now and over time for Bella Napoli." }), _jsxs("nav", { className: "top-nav", "aria-label": "Dashboard pages", children: [_jsx(NavLink, { to: "/summary", className: ({ isActive }) => `top-nav-link${isActive ? " top-nav-link--active" : ""}`, children: "Summary" }), _jsx(NavLink, { to: "/", end: true, className: ({ isActive }) => `top-nav-link${isActive ? " top-nav-link--active" : ""}`, children: "Matrix" }), _jsx(NavLink, { to: "/time-series", className: ({ isActive }) => `top-nav-link${isActive ? " top-nav-link--active" : ""}`, children: "Time Series" }), _jsx(NavLink, { to: "/docs", className: ({ isActive }) => `top-nav-link${isActive ? " top-nav-link--active" : ""}`, children: "Docs" })] })] }) }), _jsx("main", { className: "main", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/summary", element: _jsx(ExecutiveSummaryPage, {}) }), _jsx(Route, { path: "/", element: _jsx(MenuEngineeringPage, {}) }), _jsx(Route, { path: "/time-series", element: _jsx(MenuTimeSeriesPage, {}) }), _jsxs(Route, { path: "/docs", element: _jsx(DocsLayoutPage, {}), children: [_jsx(Route, { index: true, element: _jsx(DocsIndexPage, {}) }), _jsx(Route, { path: "reporting-data-shapes", element: _jsx(ReportingDataShapesPage, {}) }), _jsx(Route, { path: "menu-catalog-source-schema", element: _jsx(MenuCatalogSourceSchemaPage, {}) }), _jsx(Route, { path: "sales-transactions-source-schema", element: _jsx(SalesTransactionsSourceSchemaPage, {}) })] })] }) }), _jsx("footer", { className: "footer", children: _jsx("p", { children: "Data served by the Bella Napoli Express API \u2014 GET /api/menu and GET /api/menu/timeseries" }) })] })] }));
}
