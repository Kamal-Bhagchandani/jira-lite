import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProjectHeader from "../components/kanban/ProjectHeader";
import KanbanBoard from "../components/kanban/KanbanBoard";

import { getProjectById } from "../api/projects";
import { getTasksByProject } from "../api/tasks";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

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

  return (
    <MainLayout>
      <ProjectHeader project={project} />
      <KanbanBoard tasks={tasks} />
    </MainLayout>
  );
};

export default ProjectDetails;