const express = require("express");
const { createProject, getMyProjects, addProjectMember, getProjectById } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Any logged-in user can create a project
router.post("/", protect, createProject);

// Logged-in users get their projects
router.get("/", protect, getMyProjects);

// Get all details of a single project
router.get("/:id", protect, getProjectById);

// Project owner adds members
router.post("/:projectId/members", protect, addProjectMember);

module.exports = router;