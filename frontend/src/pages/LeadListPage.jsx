import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads } from "../api/leadApi";
import LeadTable from "../components/LeadTable.jsx";
import SearchFilterBar from "../components/SearchFilterBar.jsx";

const LeadListPage = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    source: "",
    status: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.source) params.source = filters.source;
      if (filters.status) params.status = filters.status;
      params.sortBy = filters.sortBy;
      params.order = filters.order;

      const res = await getLeads(params);
      setLeads(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const debounce = setTimeout(fetchLeads, 300);
    return () => clearTimeout(debounce);
  }, [fetchLeads]);

  return (
    <div>
      <h1>Leads</h1>
      <SearchFilterBar filters={filters} onChange={setFilters} />
      {error && <div className="alert alert-error">{error}</div>}
      <div className="card">
        {loading ? (
          <p>Loading leads...</p>
        ) : (
          <LeadTable
            leads={leads}
            onRowClick={(id) => navigate(`/leads/${id}`)}
          />
        )}
      </div>
    </div>
  );
};

export default LeadListPage;
