import api from "./axios";

export const getTasksByProject = async (projectId) => {
  const res = await api.get(`/tasks/project/${projectId}`);
  return res.data;
};