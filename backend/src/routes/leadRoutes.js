const express = require("express");
const router = express.Router();
const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStatus,
  addNote,
  deleteLead,
} = require("../controllers/leadController");
const { validateLead, validateStatus } = require("../middleware/validateLead");

router.route("/").get(getLeads).post(validateLead, createLead);

router
  .route("/:id")
  .get(getLeadById)
  .put(validateLead, updateLead)
  .delete(deleteLead);

router.patch("/:id/status", validateStatus, updateLeadStatus);
router.post("/:id/notes", addNote);

module.exports = router;
