import api from "./axios";

export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};