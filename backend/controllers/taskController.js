const Task = require("../models/Task");
const Project = require("../models/Project");

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

    const isAdmin = req.user.role === "admin";

    // If task is assigned, only assignee or admin can update status
    if (task.assignedTo) {
      const isAssignee = task.assignedTo.toString() === req.user._id.toString();

      if (!isAssignee && !isAdmin) {
        return res.status(403).json({ message: "Only assignee or admin can update this task" });
      }
    }
    // If task is unassigned, only project members or admin can update status
    else {
      const project = await Project.findById(task.project);

      const isProjectMember = project.members.some(
        (memberId) => memberId.toString() === req.user._id.toString()
      );

      const isProjectCreator = project.createdBy.toString() === req.user._id.toString();

      if (!isProjectMember && !isProjectCreator && !isAdmin) {
        return res.status(403).json({
          message: "Only project members or admin can update this task",
        });
      }
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
