import api from "./axios";

export const getTasksByProject = async (projectId) => {
  const res = await api.get(`/tasks/project/${projectId}`);
  return res.data;
};

export const getUserTasks = async () => {
    const res = await api.get("/tasks");
    return res.data;
};

export const createTask = async (taskData) => {
  const res = await api.post("/tasks", taskData);
  return res.data;
};

export const updateTask = async (id, taskData) => {
  const res = await api.patch(`/tasks/${id}`, taskData);

  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);

  return res.data;
};