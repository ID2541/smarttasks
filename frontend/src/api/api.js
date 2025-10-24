// src/api/api.js
import axios from "axios";
import { getAuthHeader } from "./auth";

const API_URL = "http://127.0.0.1:8000/api";

// Imposta token di autenticazione globale su axios
export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

// Intercettore globale per gestire errori 401
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token non valido o scaduto — logout necessario.");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Progetti
export const getProjects = async () => {
    const res = await axios.get(`${API_URL}/projects/`, { headers: getAuthHeader() });
    return res.data;
};

// Colonne
export const getColumns = async (projectId) => {
    const res = await axios.get(`${API_URL}/columns/?project=${projectId}`, { headers: getAuthHeader() });
    return res.data;
};

// Task
export const getTasks = async (projectId) => {
    const res = await axios.get(`${API_URL}/tasks/?project=${projectId}`, { headers: getAuthHeader() });
    return res.data;
};

export const createTask = async (data) => {
    const res = await axios.post(`${API_URL}/tasks/`, data, { headers: getAuthHeader() });
    return res.data;
};

export const updateTask = async (id, data) => {
    const res = await axios.put(`${API_URL}/tasks/${id}/`, data, { headers: getAuthHeader() });
    return res.data;
};

export const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}/`, { headers: getAuthHeader() });
};
