import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/projects";
import MainLayout from "../components/layout/MainLayout";
import ProjectCard from "../components/project/ProjectCard";
import CreateProjectModal from "../components/project/CreateProjectModal";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);

      setProjects((prev) => [newProject, ...prev]);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to create project",
      };
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>

            <p className="text-gray-500 mt-2">
              Manage and track your projects.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium shadow"
          >
            Create Project
          </button>
        </div>

        {/* Loading State */}
        {loading && <p className="text-gray-500">Loading projects...</p>}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8">
            <p className="text-gray-500">No projects found.</p>
          </div>
        )}

        {/* Project Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
      <CreateProjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateProject}
      />
    </MainLayout>
  );
};

export default Dashboard;
