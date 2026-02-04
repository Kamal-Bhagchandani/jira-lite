const Project = require("../models/Project");
const User = require("../models/User");

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
exports.addProjectMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    let { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        message: "Member email is required",
      });
    }

    // Normalize email
    email = email.toLowerCase().trim();

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Authorization: only system admin or project owner
    const isAdmin = req.user.role === "admin";
    const isOwner = project.createdBy.equals(req.user._id);

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        message: "Only project owner or admin can add members",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User does not have an account on this platform",
      });
    }

    // Prevent duplicates (including creator)
    const isCreator = project.createdBy.equals(user._id);
    const isAlreadyMember = project.members.some((memberId) =>
      memberId.equals(user._id)
    );

    if (isCreator || isAlreadyMember) {
      return res.status(400).json({
        message: "User is already a project member",
      });
    }

    // Add member
    project.members.push(user._id);
    await project.save();

    res.status(200).json({
      message: "Member added successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add project member",
    });
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
