import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProjectHeader from "../components/kanban/ProjectHeader";
import KanbanBoard from "../components/kanban/KanbanBoard";

import { getProjectById, addProjectMembers, deleteProject } from "../api/projects";
import { getTasksByProject, createTask, updateTask, deleteTask } from "../api/tasks";
import CreateTaskModal from "../components/modals/CreateTaskModal";
import TaskDetailsModal from "../components/modals/TaskDetailsModal";
import AddMembersModal from "../components/modals/AddMembersModal";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);

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

  const handleAddMembers = async (emails) => {
    const data = await addProjectMembers(id, emails);

    setProject(data.project);

    return data;
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(id);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask({
        ...taskData,
        project: id,
      });

      const allMembers = [
        project.createdBy,
        ...project.members
      ];

      const taskWithObjects = {
        ...newTask,
        assignedTo:
          allMembers.find(
            member =>
              member._id === newTask.assignedTo
          ) || null,

        createdBy: project.createdBy
      };

      setTasks(prev => [...prev, taskWithObjects]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTask = async (updatedTaskData) => {
    try {
      const updatedTask = await updateTask(
        updatedTaskData._id,
        updatedTaskData
      );

      setTasks((prev) =>
        prev.map((task) => {
          if (task._id !== updatedTask._id) {
            return task;
          }

          return {
            ...task,
            ...updatedTask,
            assignedTo:
              updatedTask.assignedTo === ""
                ? null
                : (
                    [project.createdBy, ...project.members]
                      .find(
                        (member) =>
                          member._id === updatedTask.assignedTo
                      ) || null
                  ),
            createdBy: project.createdBy
          };
        })
      );

      setSelectedTask(updatedTask);

      setShowTaskDetails(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);

      setTasks((prev) =>
        prev.filter(
          (task) => task._id !== taskId
        )
      );

      setSelectedTask(null);

      setShowTaskDetails(false);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <ProjectHeader
        project={project}
        onNewTask={() => setShowModal(true)}
        onDeleteProject={handleDeleteProject}
        onAddMembers={() => setShowMembersModal(true)}
      />
      <KanbanBoard
        tasks={tasks}
        onTaskClick={(task) => {
          setSelectedTask(task);
          setShowTaskDetails(true);
        }}
      />
      <CreateTaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateTask}
        project={project}
      />
      <TaskDetailsModal
        show={showTaskDetails}
        task={selectedTask}
        project={project}
        onClose={() => {
          setShowTaskDetails(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        onDelete={() =>
          handleDeleteTask(selectedTask._id)
        }
      />
      <AddMembersModal
        show={showMembersModal}
        onClose={() => setShowMembersModal(false)}
        onAdd={handleAddMembers}
      />
    </MainLayout>
  );
};

export default ProjectDetails;
