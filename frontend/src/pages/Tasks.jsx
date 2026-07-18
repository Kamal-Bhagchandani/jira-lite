import { useEffect, useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import DashboardSection from "../components/common/DashboardSection";
import SectionHeader from "../components/common/SectionHeader";
import TaskListItem from "../components/task/TaskListItem";
import TaskDetailsModal from "../components/task/TaskDetailsModal";

import { getProjects } from "../api/projects";
import { getUserTasks } from "../api/tasks";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [taskData, projectData] = await Promise.all([
          getUserTasks(),
          getProjects(),
        ]);

        setTasks(taskData);
        setProjects(projectData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTaskClick = (task) => {
    const project = projects.find(
      (project) => project._id === task.project._id,
    );

    if (!project) return;

    setSelectedTask(task);
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleSaveTask = async (updatedTaskData) => {
    try {
      const updatedTask = await updateTask(
        updatedTaskData._id,
        updatedTaskData,
      );

      const project = projects.find((p) => p._id === updatedTask.project);

      const members = project ? [project.createdBy, ...project.members] : [];

      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id
            ? {
                ...task,
                ...updatedTask,
                assignedTo:
                  updatedTask.assignedTo === ""
                    ? null
                    : members.find(
                        (member) => member._id === updatedTask.assignedTo,
                      ) || null,
              }
            : task,
        ),
      );

      setSelectedTask(null);
      setSelectedProject(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      setTasks((prev) => prev.filter((task) => task._id !== taskId));

      setSelectedTask(null);
      setSelectedProject(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
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
      <div>
        <h1 className="text-3xl font-bold">Tasks</h1>

        <p className="text-gray-500 mt-2">
          View and manage all your tasks across projects.
        </p>

        <div className="mt-8">
          <DashboardSection>
            <SectionHeader title="All Tasks" />

            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks found.</p>
            ) : (
              <div className="divide-y">
                {tasks.map((task) => (
                  <TaskListItem
                    key={task._id}
                    task={task}
                    onClick={() => handleTaskClick(task)}
                  />
                ))}
              </div>
            )}
          </DashboardSection>
        </div>
      </div>

      {selectedTask && selectedProject && (
        <TaskDetailsModal
          show={showModal}
          task={selectedTask}
          project={selectedProject}
          onClose={() => {
            setShowModal(false);
            setSelectedTask(null);
            setSelectedProject(null);
          }}
          onSave={() => {handleSaveTask}}
          onDelete={() => handleDeleteTask(selectedTask._id)}
        />
      )}
    </MainLayout>
  );
};

export default Tasks;
