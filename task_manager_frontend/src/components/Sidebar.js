import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar for task filtering (status, priority).
 * Receives filter props and notifies parent on changes.
 */
function Sidebar({ open = true, filters = {}, setFilters = () => {}, setOpen }) {
  if (!open) return null;

  function handleChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function handleClear() {
    setFilters({});
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span>Filters</span>
        <button
          className="sidebar-close"
          onClick={() => setOpen(false)}
          aria-label="Hide Sidebar"
        >×</button>
      </div>
      <div className="sidebar-section">
        <label>Status:</label>
        <select name="status" value={filters.status || ""} onChange={handleChange}>
          <option value="">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div className="sidebar-section">
        <label>Priority:</label>
        <select name="priority" value={filters.priority || ""} onChange={handleChange}>
          <option value="">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button className="sidebar-btn-clear" onClick={handleClear}>
        Clear Filters
      </button>
    </aside>
  );
}

export default Sidebar;
