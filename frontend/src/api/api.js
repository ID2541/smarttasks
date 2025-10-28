// src/api/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// ✅ Crea un'istanza di Axios con interceptor per JWT
export const authAxios = axios.create({
  baseURL: API_URL,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access"); // prende il token dal localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ======================
// 🔹 Progetti
// ======================
export const getProjects = async () => {
  const response = await authAxios.get("/projects/");
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await authAxios.post("/projects/", projectData);
  return response.data;
};

// ======================
// 🔹 Colonne
// ======================
export const getColumns = async (projectId) => {
  // ⚠️ Assicuriamoci che projectId sia passato correttamente
  if (!projectId) throw new Error("ProjectId mancante per getColumns");
  const response = await authAxios.get(`/columns/?project=${projectId}`);
  return response.data;
};

// ======================
// 🔹 Task
// ======================
export const getTasks = async (projectId) => {
  if (!projectId) throw new Error("ProjectId mancante per getTasks");
  // Filtra tasks solo per colonne del progetto selezionato
  const response = await authAxios.get(`/tasks/?project=${projectId}`);
  return response.data;
};

export const createTask = async (columnId, taskData) => {
  if (!columnId) throw new Error("ColumnId mancante per createTask");
  const response = await authAxios.post("/tasks/", {
    ...taskData,
    column: columnId, // assegna correttamente la colonna
  });
  return response.data;
};
