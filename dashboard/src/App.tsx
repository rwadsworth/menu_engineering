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
    if (!location.hash) return;

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
  return (
    <BrowserRouter>
      <HashAnchorHandler />
      <div className="app">
        <header className="header">
          <div className="header-inner">
            <span className="header-badge">Menu Engineering</span>
            <h1 className="header-title">Restaurant Analytics Dashboard</h1>
            <p className="header-subtitle">
              Understand menu performance now and over time for Bella Napoli.
            </p>

            <nav className="top-nav" aria-label="Dashboard pages">
              <NavLink to="/summary" className={({ isActive }) => `top-nav-link${isActive ? " top-nav-link--active" : ""}`}>
                Summary
              </NavLink>
              <NavLink to="/" end className={({ isActive }) => `top-nav-link${isActive ? " top-nav-link--active" : ""}`}>
                Matrix
              </NavLink>
              <NavLink to="/time-series" className={({ isActive }) => `top-nav-link${isActive ? " top-nav-link--active" : ""}`}>
                Time Series
              </NavLink>
              <NavLink to="/docs" className={({ isActive }) => `top-nav-link${isActive ? " top-nav-link--active" : ""}`}>
                Docs
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/summary" element={<ExecutiveSummaryPage />} />
            <Route path="/" element={<MenuEngineeringPage />} />
            <Route path="/time-series" element={<MenuTimeSeriesPage />} />
            <Route path="/docs" element={<DocsLayoutPage />}>
              <Route index element={<DocsIndexPage />} />
              <Route path="reporting-data-shapes" element={<ReportingDataShapesPage />} />
              <Route path="menu-catalog-source-schema" element={<MenuCatalogSourceSchemaPage />} />
              <Route path="sales-transactions-source-schema" element={<SalesTransactionsSourceSchemaPage />} />
            </Route>
          </Routes>
        </main>

        <footer className="footer">
          <p>Data served by the Bella Napoli Express API — GET /api/menu and GET /api/menu/timeseries</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
