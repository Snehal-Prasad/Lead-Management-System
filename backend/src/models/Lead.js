const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9+\-\s()]{7,15}$/, "Please enter a valid phone number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      min: [0, "Budget must be a positive number"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      enum: [
        "1 BHK",
        "2 BHK",
        "3 BHK",
        "4 BHK",
        "Plot",
        "Villa",
        "Commercial",
        "Other",
      ],
    },
    source: {
      type: String,
      required: [true, "Lead source is required"],
      enum: ["Facebook", "Google", "Referral", "Website", "Walk-in", "Other"],
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Site Visit", "Closed"],
      default: "New",
    },
    notes: [noteSchema],
  },
  { timestamps: true },
);

leadSchema.index({ name: "text", phone: "text" });

module.exports = mongoose.model("Lead", leadSchema);
