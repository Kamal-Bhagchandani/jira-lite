import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import { useAuth } from "../context/AuthContext";

import { getProjects } from "../api/projects";
import { getUserTasks } from "../api/tasks";
import DashboardSection from "../components/common/DashboardSection";
import SectionHeader from "../components/common/SectionHeader";
import ProjectCard from "../components/project/ProjectCard";
import TaskListItem from "../components/task/TaskListItem";
import TaskPreviewModal from "../components/task/TaskPreviewModal";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskPreview, setShowTaskPreview] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [projectData, taskData] = await Promise.all([
          getProjects(),
          getUserTasks(),
        ]);

        setProjects(projectData);
        setTasks(taskData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskPreview(true);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <DashboardSection>
        <SectionHeader
          title="Recent Projects"
          buttonText="View All →"
          to="/projects"
        />

        {projects.length === 0 ? (
          <p className="text-gray-500">
            No projects yet.
            <br />
            Create your first project to get started.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </DashboardSection>
      <DashboardSection>
        <SectionHeader
          title="Recent Tasks"
          buttonText="View All →"
          to="/tasks"
        />

        {tasks.length === 0 ? (
          <p className="text-gray-500">
            No recent tasks.
            <br />
            Tasks assigned to you will appear here.
          </p>
        ) : (
          <div>
            {tasks.slice(0, 5).map((task) => (
              <TaskListItem
                key={task._id}
                task={task}
                onClick={handleTaskClick}
              />
            ))}
          </div>
        )}
      </DashboardSection>
      {showTaskPreview && (
        <TaskPreviewModal
          show={showTaskPreview}
          task={selectedTask}
          onClose={() => {
            setShowTaskPreview(false);
            setSelectedTask(null);
          }}
        />
      )}
    </MainLayout>
  );
};

export default Dashboard;
