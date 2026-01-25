const Project = require("../models/Project");

// Admin creates project
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
