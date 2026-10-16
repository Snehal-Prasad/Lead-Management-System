import StatusBadge from "./StatusBadge.jsx";

const LeadTable = ({ leads, onRowClick }) => {
  if (!leads || leads.length === 0) {
    return (
      <div className="empty-state">
        No leads found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Budget</th>
          <th>Location</th>
          <th>Source</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead) => (
          <tr key={lead._id} onClick={() => onRowClick(lead._id)}>
            <td>{lead.name}</td>
            <td>
              <div>{lead.phone}</div>
              {lead.email && (
                <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                  {lead.email}
                </div>
              )}
            </td>
            <td>₹{Number(lead.budget).toLocaleString("en-IN")}</td>
            <td>{lead.location}</td>
            <td>{lead.source}</td>
            <td>
              <StatusBadge status={lead.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadTable;
