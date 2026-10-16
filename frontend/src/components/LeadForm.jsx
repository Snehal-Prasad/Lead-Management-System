import { useState } from "react";

const PROPERTY_TYPES = [
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Plot",
  "Villa",
  "Commercial",
  "Other",
];
const SOURCES = [
  "Facebook",
  "Google",
  "Referral",
  "Website",
  "Walk-in",
  "Other",
];

const initialState = {
  name: "",
  phone: "",
  email: "",
  budget: "",
  location: "",
  propertyType: "1 BHK",
  source: "Facebook",
};

const LeadForm = ({ onSubmit, submitLabel = "Add Lead" }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone))
      newErrors.phone = "Enter a valid phone number";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.budget || Number(form.budget) < 0)
      newErrors.budget = "Budget must be a positive number";
    if (!form.location.trim()) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, budget: Number(form.budget) });
      setForm(initialState);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-grid">
        <div className="form-group">
          <label>Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Budget (₹) *</label>
          <input
            name="budget"
            type="number"
            value={form.budget}
            onChange={handleChange}
            placeholder="5000000"
          />
          {errors.budget && <span className="error-text">{errors.budget}</span>}
        </div>
        <div className="form-group">
          <label>Location *</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Bangalore"
          />
          {errors.location && (
            <span className="error-text">{errors.location}</span>
          )}
        </div>
        <div className="form-group">
          <label>Property Type *</label>
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
          >
            {PROPERTY_TYPES.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Lead Source *</label>
          <select name="source" value={form.source} onChange={handleChange}>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ marginTop: "1.25rem" }}>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
