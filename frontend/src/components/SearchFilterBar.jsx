const SOURCES = [
  "Facebook",
  "Google",
  "Referral",
  "Website",
  "Walk-in",
  "Other",
];
const STATUSES = ["New", "Contacted", "Site Visit", "Closed"];

const SearchFilterBar = ({ filters, onChange }) => {
  const handleInput = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="toolbar">
      <input
        type="text"
        name="search"
        placeholder="Search by name or phone..."
        value={filters.search}
        onChange={handleInput}
        style={{ minWidth: "220px" }}
      />
      <select name="source" value={filters.source} onChange={handleInput}>
        <option value="">All Sources</option>
        {SOURCES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select name="status" value={filters.status} onChange={handleInput}>
        <option value="">All Statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select name="sortBy" value={filters.sortBy} onChange={handleInput}>
        <option value="createdAt">Sort by Date</option>
        <option value="budget">Sort by Budget</option>
      </select>
      <select name="order" value={filters.order} onChange={handleInput}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;
