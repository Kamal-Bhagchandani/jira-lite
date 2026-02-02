const express = require("express");
const { createProject, getMyProjects, addProjectMember } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Any logged-in user can create a project
router.post("/", protect, createProject);

// Logged-in users get their projects
router.get("/", protect, getMyProjects);

// Project owner adds members
router.post("/:projectId/members", protect, addProjectMember);

module.exports = router;