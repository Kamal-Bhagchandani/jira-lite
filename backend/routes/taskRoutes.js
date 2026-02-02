const express = require("express");
const { createTask, updateTaskStatus, getTasksByProject, updateTaskAssignee } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create task
router.post("/", protect, createTask);

// Update task status
router.put("/:id/status", protect, updateTaskStatus);

// Get tasks of a project
router.get("/project/:projectId", protect, getTasksByProject);

router.patch("/:id/assignee", protect, updateTaskAssignee);

module.exports = router;
