const Task = require("../models/Task");
const Project = require("../models/Project");
const mongoose = require("mongoose");

// Create task (Admin or Project Member)
exports.createTask = async (req, res) => {
  const { title, description, project, assignedTo } = req.body;

  if (!title || !project) {
    return res.status(400).json({ message: "Title and project are required" });
  }

  try {
    // Validate IDs
    if (!mongoose.isValidObjectId(project)) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    if (assignedTo && !mongoose.isValidObjectId(assignedTo)) {
      return res.status(400).json({ message: "Invalid assignedTo id" });
    }

    const projectDoc = await Project.findById(project);

    if (!projectDoc) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Authorization: only project owner, project members, or system admin can create tasks
    const isAdmin = req.user.role === "admin";
    const isProjectOwner = projectDoc.createdBy.toString() === req.user._id.toString();
    const isProjectMemberReq = projectDoc.members.some((memberId) => memberId.toString() === req.user._id.toString());

    if (!isAdmin && !isProjectOwner && !isProjectMemberReq) {
      return res.status(403).json({
        message: "You do not have permission to create tasks in this project",
      });
    }

    // If assignedTo provided, ensure they are a member or project creator
    if (assignedTo) {
      const isMember =
        projectDoc.createdBy.toString() === assignedTo ||
        projectDoc.members.some((memberId) => memberId.toString() === assignedTo);

      if (!isMember) {
        return res.status(400).json({
          message: "Task can only be assigned to project members",
        });
      }
    }

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
        (memberId) => memberId.toString() === req.user._id.toString(),
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
    const { projectId } = req.params;

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Authorization check
    const isAdmin = req.user.role === "admin";

    const isProjectCreator =
      project.createdBy.toString() === req.user._id.toString();

    const isProjectMember = project.members.some(
      (memberId) => memberId.toString() === req.user._id.toString()
    );

    if (!isAdmin && !isProjectCreator && !isProjectMember) {
      return res.status(403).json({
        message: "You do not have access to this project",
      });
    }

    // Fetch tasks
    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reassign task
exports.updateTaskAssignee = async (req, res) => {
  const { assignedTo } = req.body;

  if (!assignedTo) {
    return res.status(400).json({
      message: "assignedTo is required",
    });
  }

  try {
    // Find task
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Find project
    const project = await Project.findById(task.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only project creator or admin can reassign
    const isAdmin = req.user.role === "admin";
    const isProjectCreator = project.createdBy.toString() === req.user._id.toString();

    if (!isAdmin && !isProjectCreator) {
      return res.status(403).json({
        message: "Only project owner or admin can reassign tasks",
      });
    }

    // Validate new assignee is project member or creator
    const isValidAssignee =
      project.createdBy.toString() === assignedTo ||
      project.members.some((memberId) => memberId.toString() === assignedTo);

    if (!isValidAssignee) {
      return res.status(400).json({
        message: "Task can only be assigned to project members",
      });
    }

    // Update assignee
    task.assignedTo = assignedTo;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};