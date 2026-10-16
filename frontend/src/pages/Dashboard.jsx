import { useEffect, useState } from "react";
import { getDashboardMetrics } from "../api/leadApi";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await getDashboardMetrics();
        setMetrics(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!metrics) return null;

  const maxSourceCount = Math.max(
    ...metrics.leadsBySource.map((s) => s.count),
    1,
  );
  const maxStatusCount = Math.max(
    ...metrics.statusDistribution.map((s) => s.count),
    1,
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-value">{metrics.totalLeads}</div>
          <div className="metric-label">Total Leads</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{metrics.conversionRate}%</div>
          <div className="metric-label">Conversion Rate</div>
        </div>
      </div>

      <div className="card">
        <h3>Leads by Source</h3>
        {metrics.leadsBySource.map((item) => (
          <div key={item.source} style={{ marginBottom: "0.75rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.85rem",
                marginBottom: "0.25rem",
              }}
            >
              <span>{item.source}</span>
              <span>{item.count}</span>
            </div>
            <div
              style={{
                background: "#e5e7eb",
                borderRadius: "4px",
                height: "8px",
              }}
            >
              <div
                style={{
                  width: `${(item.count / maxSourceCount) * 100}%`,
                  background: "#2563eb",
                  height: "100%",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Status Distribution</h3>
        {metrics.statusDistribution.map((item) => (
          <div key={item.status} style={{ marginBottom: "0.75rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.85rem",
                marginBottom: "0.25rem",
              }}
            >
              <span>{item.status}</span>
              <span>{item.count}</span>
            </div>
            <div
              style={{
                background: "#e5e7eb",
                borderRadius: "4px",
                height: "8px",
              }}
            >
              <div
                style={{
                  width: `${(item.count / maxStatusCount) * 100}%`,
                  background: "#16a34a",
                  height: "100%",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
