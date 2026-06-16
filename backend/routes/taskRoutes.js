const express = require("express");
const { createTask, getTasksByProject, updateTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create task
router.post("/", protect, createTask);

// Get tasks of a project
router.get("/project/:projectId", protect, getTasksByProject);

router.patch("/:id", protect, updateTask);

module.exports = router;
