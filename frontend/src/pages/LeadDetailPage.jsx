import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getLeadById, updateLeadStatus, addNote } from "../api/leadApi";
import StatusBadge from "../components/StatusBadge.jsx";

const STATUSES = ["New", "Contacted", "Site Visit", "Closed"];

const LeadDetailPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noteText, setNoteText] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchLead = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLeadById(id);
      setLead(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleStatusChange = async (e) => {
    setUpdating(true);
    setError("");
    try {
      const res = await updateLeadStatus(id, e.target.value);
      setLead(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    try {
      const res = await addNote(id, noteText);
      setLead(res.data.data);
      setNoteText("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error && !lead) return <div className="alert alert-error">{error}</div>;
  if (!lead) return null;

  return (
    <div>
      <Link to="/" className="back-link">
        ← Back to Leads
      </Link>
      <h1>{lead.name}</h1>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h3>Lead Details</h3>
        <div className="form-grid">
          <div>
            <strong>Phone:</strong> {lead.phone}
          </div>
          <div>
            <strong>Email:</strong> {lead.email || "—"}
          </div>
          <div>
            <strong>Budget:</strong> ₹
            {Number(lead.budget).toLocaleString("en-IN")}
          </div>
          <div>
            <strong>Location:</strong> {lead.location}
          </div>
          <div>
            <strong>Property Type:</strong> {lead.propertyType}
          </div>
          <div>
            <strong>Source:</strong> {lead.source}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Status</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <StatusBadge status={lead.status} />
          <select
            value={lead.status}
            onChange={handleStatusChange}
            disabled={updating}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card">
        <h3>Notes / Comments</h3>
        <form
          onSubmit={handleAddNote}
          style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}
        >
          <input
            type="text"
            placeholder="Add a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit">Add Note</button>
        </form>
        {lead.notes && lead.notes.length > 0 ? (
          <ul className="notes-list">
            {lead.notes
              .slice()
              .reverse()
              .map((n) => (
                <li key={n._id}>
                  <div>{n.text}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p style={{ color: "#6b7280" }}>No notes yet.</p>
        )}
      </div>
    </div>
  );
};

export default LeadDetailPage;
