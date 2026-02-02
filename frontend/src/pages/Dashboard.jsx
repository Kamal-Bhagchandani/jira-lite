import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../api/projects";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>

        {loading && <p>Loading projects...</p>}

        {!loading && projects.length === 0 && (
          <p className="text-gray-500">No projects found.</p>
        )}

        <ul className="space-y-3">
          {projects.map((project) => (
            <li
              key={project._id}
              className="border p-4 rounded hover:bg-gray-50 cursor-pointer"
            >
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;