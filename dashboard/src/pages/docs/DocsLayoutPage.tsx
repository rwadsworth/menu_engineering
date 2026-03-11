import { NavLink, Outlet } from "react-router-dom";

export default function DocsLayoutPage() {
  return (
    <div className="docs-page">
      <aside className="docs-nav">
        <h2 className="docs-nav-title">Data Docs</h2>
        <nav aria-label="Documentation pages" className="docs-nav-links">
          <NavLink to="/docs" end className={({ isActive }) => `docs-nav-link${isActive ? " docs-nav-link--active" : ""}`}>
            Index
          </NavLink>
          <NavLink to="/docs/reporting-data-shapes" className={({ isActive }) => `docs-nav-link${isActive ? " docs-nav-link--active" : ""}`}>
            Reporting Data Shapes
          </NavLink>
          <NavLink to="/docs/menu-catalog-source-schema" className={({ isActive }) => `docs-nav-link${isActive ? " docs-nav-link--active" : ""}`}>
            Menu Catalog Source Schema
          </NavLink>
          <NavLink to="/docs/sales-transactions-source-schema" className={({ isActive }) => `docs-nav-link${isActive ? " docs-nav-link--active" : ""}`}>
            Sales Transactions Source Schema
          </NavLink>
        </nav>
      </aside>

      <section className="chart-card docs-content">
        <Outlet />
      </section>
    </div>
  );
}
