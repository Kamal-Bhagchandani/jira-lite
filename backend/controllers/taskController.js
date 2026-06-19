const Task = require("../models/Task");
const Project = require("../models/Project");
const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");

// Create task (Admin or Project Member)
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, project, assignedTo, priority, status, dueDate } =
      req.body;

    if (!title || !project) {
      throw new ApiError(400, "Title and project are required");
    }
    if (priority && !["Low", "Medium", "High"].includes(priority)) {
      throw new ApiError(400, "Invalid priority");
    }
    if (status && !["Todo", "In Progress", "Done"].includes(status)) {
      throw new ApiError(400, "Invalid status");
    }
    if (dueDate && Number.isNaN(new Date(dueDate).getTime())) {
      throw new ApiError(400, "Invalid dueDate");
    }
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
    const isProjectOwner = projectDoc.createdBy.equals(req.user._id);
    const isProjectMemberReq = projectDoc.members.some((memberId) =>
      memberId.equals(req.user._id),
    );

    if (!isAdmin && !isProjectOwner && !isProjectMemberReq) {
      throw new ApiError(
        403,
        "You do not have permission to create tasks in this project",
      );
    }

    // If assignedTo provided, ensure they are a member or project creator
    if (assignedTo) {
      const isMember =
        projectDoc.createdBy.toString() === assignedTo ||
        projectDoc.members.some(
          (memberId) => memberId.toString() === assignedTo,
        );

      if (!isMember) {
        throw new ApiError(400, "Task can only be assigned to project members");
      }
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo: assignedTo || undefined,
      priority,
      status,
      dueDate,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, status, assignedTo, priority, dueDate } =
      req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const project = await Project.findById(task.project);

    const isAdmin = req.user.role === "admin";
    const isOwner = project.createdBy.equals(req.user._id);
    const isCreator = task.createdBy.equals(req.user._id);

    const isAssignee = task.assignedTo && task.assignedTo.equals(req.user._id);

    const wantsFullEdit =
      title !== undefined ||
      description !== undefined ||
      priority !== undefined ||
      dueDate !== undefined ||
      assignedTo !== undefined;

    if (wantsFullEdit) {
      if (!isAdmin && !isOwner && !isCreator) {
        throw new ApiError(
          403,
          "Only project owner, task creator or admin can edit task details",
        );
      }
    }

    if (status !== undefined) {
      if (!isAdmin && !isOwner && !isCreator && !isAssignee) {
        throw new ApiError(403, "You are not allowed to update task status");
      }

      if (!["Todo", "In Progress", "Done"].includes(status)) {
        throw new ApiError(400, "Invalid status");
      }

      task.status = status;
    }

    if (title !== undefined) task.title = title;

    if (description !== undefined) task.description = description;

    if (priority !== undefined) {
      if (!["Low", "Medium", "High"].includes(priority)) {
        throw new ApiError(400, "Invalid priority");
      }

      task.priority = priority;
    }

    if (assignedTo !== undefined) {
      if (assignedTo === "") {
        task.assignedTo = undefined;
      } else {
        const isValidAssignee =
          project.createdBy.equals(assignedTo) ||
          project.members.some((memberId) => memberId.equals(assignedTo));

        if (!isValidAssignee) {
          throw new ApiError(
            400,
            "Task can only be assigned to project members",
          );
        }

        task.assignedTo = assignedTo;
      }
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate || null;
    }

    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
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

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const project = await Project.findById(task.project);

    const isAdmin = req.user.role === "admin";
    const isOwner = project.createdBy.equals(req.user._id);

    if (!isAdmin && !isOwner) {
      throw new ApiError(403, "Only project owner or admin can delete tasks");
    }

    await task.deleteOne();

    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
