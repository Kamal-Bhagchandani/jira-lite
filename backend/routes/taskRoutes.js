const express = require("express");
const { createTask, getUserTasks, getTasksByProject, updateTask, deleteTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Apply authentication to all routes below
router.use(protect);

// Create task
router.post("/", createTask);

// Get tasks of all projects of user
router.get("/", getUserTasks);

// Get tasks of a project
router.get("/project/:projectId", getTasksByProject);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
