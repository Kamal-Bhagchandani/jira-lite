const Task = require("../models/Task");
const Project = require("../models/Project");
const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

// Create task (Admin or Project Member)
exports.createTask = async (req, res) => {
  const { title, description, project, assignedTo } = req.body;

  if (!title || !project) {
    return res.status(400).json({ message: "Title and project are required" });
  }

  try {
    // Validate IDs
    if (!mongoose.isValidObjectId(project)) {
      throw new ApiError(400, "Invalid project id");
    }
    if (assignedTo && !mongoose.isValidObjectId(assignedTo)) {
      throw new ApiError(400, "Invalid assignedTo id");
    }

    const projectDoc = await Project.findById(project);

    if (!projectDoc) {
      throw new ApiError(404, "Project not found");
    }

    // Authorization: only project owner, project members, or system admin can create tasks
    const isAdmin = req.user.role === "admin";
    const isProjectOwner = projectDoc.createdBy.toString() === req.user._id.toString();
    const isProjectMemberReq = projectDoc.members.some((memberId) => memberId.toString() === req.user._id.toString());

    if (!isAdmin && !isProjectOwner && !isProjectMemberReq) {
      throw new ApiError(403, "You do not have permission to create tasks in this project");
    }

    // If assignedTo provided, ensure they are a member or project creator
    if (assignedTo) {
      const isMember =
        projectDoc.createdBy.toString() === assignedTo ||
        projectDoc.members.some((memberId) => memberId.toString() === assignedTo);

      if (!isMember) {
         throw new ApiError(400, "Task can only be assigned to project members");
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
    next(error);
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

  if (!["Todo", "In Progress", "Done"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const isAdmin = req.user.role === "admin";

    // If task is assigned, only assignee or admin can update status
    if (task.assignedTo) {
      const isAssignee = task.assignedTo.toString() === req.user._id.toString();

      if (!isAssignee && !isAdmin) {
        throw new ApiError(403, "Only assignee or admin can update this task");
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
        throw new ApiError(403, "Only project members or admin can update this task");
      }
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Get tasks by project
exports.getTasksByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = project.createdBy.equals(req.user._id);
    const isMember = project.members.some((m) => m.equals(req.user._id));

    if (!isAdmin && !isOwner && !isMember) {
      throw new ApiError(403, "Access denied");
    }

    // Fetch tasks
    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Reassign task
exports.updateTaskAssignee = async (req, res) => {
  try {
    const { assignedTo } = req.body;

  if (!assignedTo) {
    throw new ApiError(400, "assignedTo is required");
  }

    // Find task
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    // Find project
    const project = await Project.findById(task.project);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    // Only project creator or admin can reassign
    const isAdmin = req.user.role === "admin";
    const isProjectCreator = project.createdBy.toString() === req.user._id.toString();

    if (!isAdmin && !isProjectCreator) {
      throw new ApiError(403, "Only project owner or admin can reassign tasks");
    }

    // Validate new assignee is project member or creator
    const isValidAssignee =
      project.createdBy.toString() === assignedTo ||
      project.members.some((memberId) => memberId.toString() === assignedTo);

    if (!isValidAssignee) {
      throw new ApiError(400, "Task can only be assigned to project members");
    }

    // Update assignee
    task.assignedTo = assignedTo;
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};