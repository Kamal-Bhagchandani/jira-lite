const Task = require("../models/Task");

// Create task (Admin or Project Member)
exports.createTask = async (req, res) => {
  const { title, description, project, assignedTo } = req.body;

  if (!title || !project) {
    return res.status(400).json({ message: "Title and project are required" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  if (!["Todo", "In Progress", "Done"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks by project
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
