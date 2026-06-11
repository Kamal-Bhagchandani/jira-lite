import { useEffect, useState } from "react";
import { getProjects } from "../api/projects";
import MainLayout from "../components/layout/MainLayout";
import ProjectCard from "../components/dashboard/ProjectCard";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Project Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and track your projects.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-gray-500">
            Loading projects...
          </p>
        )}

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8">
            <p className="text-gray-500">
              No projects found.
            </p>
          </div>
        )}

        {/* Project Grid */}
        {!loading && projects.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;