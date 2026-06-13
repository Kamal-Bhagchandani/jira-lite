import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProjectHeader from "../components/kanban/ProjectHeader";
import KanbanBoard from "../components/kanban/KanbanBoard";

import { getProjectById } from "../api/projects";
import { getTasksByProject, createTask } from "../api/tasks";
import CreateTaskModal from "../components/modals/CreateTaskModal";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectData = await getProjectById(id);
        setProject(projectData);

        const taskData = await getTasksByProject(id);
        setTasks(taskData);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [id]);

  if (!project) {
    return (
      <MainLayout>
        <div className="p-8">Loading...</div>
      </MainLayout>
    );
  }

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask({
        ...taskData,
        project: id,
      });

      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <ProjectHeader
        project={project}
        onNewTask={() => setShowModal(true)}
      />
      <KanbanBoard tasks={tasks} />
      <CreateTaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateTask}
        project={project}
      />
    </MainLayout>
  );
};

export default ProjectDetails;