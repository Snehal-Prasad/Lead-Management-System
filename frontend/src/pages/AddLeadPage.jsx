import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLead } from "../api/leadApi";
import LeadForm from "../components/LeadForm.jsx";

const AddLeadPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (data) => {
    setError("");
    setSuccess("");
    try {
      await createLead(data);
      setSuccess("Lead added successfully!");
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Add New Lead</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <LeadForm onSubmit={handleSubmit} submitLabel="Add Lead" />
    </div>
  );
};

export default AddLeadPage;
