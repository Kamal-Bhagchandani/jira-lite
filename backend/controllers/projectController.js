const Project = require("../models/Project");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");

// Logged in user Creates project
exports.createProject = async (req, res) => {
  const { name, description, members = [] } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  try {
    if (!Array.isArray(members)) {
      return res
        .status(400)
        .json({ message: "Members must be an array of emails" });
    }

    // Normalize emails
    const normalizedEmails = members.map((e) => e.toLowerCase().trim());

    // Check duplicates FIRST
    const uniqueEmails = [...new Set(normalizedEmails)];
    if (uniqueEmails.length !== normalizedEmails.length) {
      return res.status(400).json({
        message: "Please enter unique email addresses",
      });
    }

    // Find users by email
    const users = await User.find({ email: { $in: uniqueEmails } });

    if (users.length !== uniqueEmails.length) {
      return res
        .status(400)
        .json({
          message: "One or more users do not have an account on this platform",
        });
    }

    // Remove creator if included
    const memberIds = users
      .filter((u) => u._id.toString() !== req.user._id.toString())
      .map((u) => u._id);

    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members: memberIds,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get projects for logged-in user
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ createdBy: req.user._id }, { members: req.user._id }],
    }).populate("createdBy", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Project owners add members to their project
exports.addProjectMembers = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    let { members = [] } = req.body;

    if (!Array.isArray(members) || members.length === 0) {
      throw new ApiError(400, "Members must be a non-empty array of emails");
    }

    const normalizedEmails = [...new Set(
      members.map(e => e.toLowerCase().trim())
    )];

    const project = await Project.findById(projectId);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = project.createdBy.equals(req.user._id);

    if (!isAdmin && !isOwner) {
      throw new ApiError(403, "Only project owner or admin can add members");
    }

    const users = await User.find({ email: { $in: normalizedEmails } });

    const foundEmails = users.map(u => u.email);
    const invalidEmails = normalizedEmails.filter(
      email => !foundEmails.includes(email)
    );

    if (invalidEmails.length > 0) {
      throw new ApiError(
        400,
        `These users are not registered: ${invalidEmails.join(", ")}`
      );
    }

    const newMemberIds = users
      .filter(
        u =>
          !project.createdBy.equals(u._id) &&
          !project.members.some(m => m.equals(u._id))
      )
      .map(u => u._id);

    if (newMemberIds.length === 0) {
      throw new ApiError(400, "No new members to add");
    }

    project.members.push(...newMemberIds);
    await project.save();

    res.json({
      message: "Project members added successfully",
      addedCount: newMemberIds.length,
      project,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = project.createdBy._id.equals(req.user._id);
    const isMember = project.members.some((m) =>
      m._id.equals(req.user._id)
    );

    if (!isAdmin && !isOwner && !isMember) {
      res.status(403);
      throw new Error("Access denied");
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};
