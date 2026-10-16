const StatusBadge = ({ status }) => {
  const cssClass = `status-badge status-${status?.replace(/\s+/g, "-")}`;
  return <span className={cssClass}>{status}</span>;
};

export default StatusBadge;
