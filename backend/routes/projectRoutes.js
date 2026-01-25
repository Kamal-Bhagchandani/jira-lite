const express = require("express");
const { createProject, getMyProjects } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin only
router.post("/", protect, isAdmin, createProject);

// Logged-in users
router.get("/", protect, getMyProjects);

module.exports = router;