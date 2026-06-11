import MainLayout from "../components/layout/MainLayout";
import ProjectHeader from "../components/kanban/ProjectHeader";
import KanbanBoard from "../components/kanban/KanbanBoard";

const project = {
  name: "Jira Lite",
  description:
    "Track tasks, bugs and features for the Jira Lite application.",
};

const ProjectDetails = () => {
  return (
    <MainLayout>

      <ProjectHeader project={project} />

      <KanbanBoard />

    </MainLayout>
  );
};

export default ProjectDetails;