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
const STATUSES = ["New", "Contacted", "Site Visit", "Closed"];

const validateLead = (req, res, next) => {
  const { name, phone, email, budget, location, propertyType, source } =
    req.body;
  const errors = [];

  if (!name || !name.trim()) errors.push("Name is required");
  if (!phone || !/^[0-9+\-\s()]{7,15}$/.test(phone))
    errors.push("A valid phone number is required");
  if (email && !/^\S+@\S+\.\S+$/.test(email))
    errors.push("A valid email is required");
  if (
    budget === undefined ||
    budget === null ||
    isNaN(budget) ||
    Number(budget) < 0
  ) {
    errors.push("Budget must be a positive number");
  }
  if (!location || !location.trim()) errors.push("Location is required");
  if (!propertyType || !PROPERTY_TYPES.includes(propertyType)) {
    errors.push(`Property type must be one of: ${PROPERTY_TYPES.join(", ")}`);
  }
  if (!source || !SOURCES.includes(source)) {
    errors.push(`Lead source must be one of: ${SOURCES.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join("; ") });
  }

  next();
};

const validateStatus = (req, res, next) => {
  const { status } = req.body;
  if (!status || !STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${STATUSES.join(", ")}`,
    });
  }
  next();
};

module.exports = { validateLead, validateStatus };
