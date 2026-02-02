const Project = require("../models/Project");
const User = require("../models/User");

// Logged in user Creates project
exports.createProject = async (req, res) => {
  const { name, description, members } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Project name is required" });
  }

  try {
    const project = await Project.create({
      name,
      description,
      createdBy: req.user._id,
      members,
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
      $or: [
        { createdBy: req.user._id },
        { members: req.user._id },
      ],
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
    const { userId } = req.body;

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Only project creator or system admin can add members
    const isAdmin = req.user.role === "admin";
    if (!isAdmin && project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only project owner or admin can add members",
      });
    }

    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent duplicates (including creator)
    const alreadyMember =
      project.createdBy.toString() === userId ||
      project.members.some(
        (memberId) => memberId.toString() === userId
      );

    if (alreadyMember) {
      return res.status(400).json({
        message: "User is already a project member",
      });
    }

    // Add member
    project.members.push(userId);
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