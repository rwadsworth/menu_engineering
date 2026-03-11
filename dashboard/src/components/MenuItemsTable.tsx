import { useState, useMemo } from "react";
import {
  QUADRANT_COLORS,
  QUADRANT_LABELS,
  type MenuItem,
  type Quadrant,
} from "../data/mockMenuData";

type FilterOption = Quadrant | "All";

const FILTER_OPTIONS: FilterOption[] = ["All", "Star", "Plowhorse", "Puzzle", "Dog"];
const PAGE_SIZE = 10;

interface MenuItemsTableProps {
  menuItems: MenuItem[];
  itemsByQuadrant: Record<Quadrant, MenuItem[]>;
  sectionId?: string;
}

export default function MenuItemsTable({ menuItems, itemsByQuadrant, sectionId }: MenuItemsTableProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    const base =
      activeFilter === "All"
        ? menuItems
        : menuItems.filter((item) => item.quadrant === activeFilter);
    return [...base].sort((a, b) => b.popularity - a.popularity);
  }, [menuItems, activeFilter]);

  const handleFilterChange = (opt: FilterOption) => {
    setActiveFilter(opt);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pagedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="matrix-table-section" id={sectionId}>
      <div className="matrix-table-header">
        <h3 className="matrix-table-title">Item Breakdown</h3>
        <div className="matrix-filter-pills">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = activeFilter === opt;
            const color = opt !== "All" ? QUADRANT_COLORS[opt as Quadrant] : undefined;
            return (
              <button
                key={opt}
                className={`filter-pill${isActive ? " filter-pill--active" : ""}`}
                style={
                  isActive && color
                    ? { backgroundColor: color, borderColor: color, color: "#fff" }
                    : {}
                }
                onClick={() => handleFilterChange(opt)}
              >
                {opt === "All" ? "All Items" : QUADRANT_LABELS[opt as Quadrant]}
                <span className="filter-pill-count">
                  {opt === "All"
                    ? menuItems.length
                    : (itemsByQuadrant[opt as Quadrant]?.length ?? 0)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="matrix-table-wrap">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Popularity</th>
              <th>Profitability</th>
              <th>Quadrant</th>
            </tr>
          </thead>
          <tbody>
            {pagedItems.map((item) => (
              <tr key={item.name}>
                <td className="matrix-table-name">{item.name}</td>
                <td className="matrix-table-category">{item.category}</td>
                <td>
                  <div className="matrix-bar-wrap">
                    <div className="matrix-bar-track">
                      <div
                        className="matrix-bar-fill"
                        style={{ width: `${item.popularity}%` }}
                      />
                    </div>
                    <span className="matrix-bar-value">{item.popularity}</span>
                  </div>
                </td>
                <td>
                  <div className="matrix-bar-wrap">
                    <div className="matrix-bar-track">
                      <div
                        className="matrix-bar-fill"
                        style={{ width: `${item.profitability}%` }}
                      />
                    </div>
                    <span className="matrix-bar-value">{item.profitability}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="matrix-quadrant-badge"
                    style={{
                      color: QUADRANT_COLORS[item.quadrant],
                      backgroundColor: `${QUADRANT_COLORS[item.quadrant]}18`,
                      borderColor: `${QUADRANT_COLORS[item.quadrant]}40`,
                    }}
                  >
                    {QUADRANT_LABELS[item.quadrant]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="matrix-table-pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-page${currentPage === page ? " pagination-page--active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
