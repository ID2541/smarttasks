// src/api/auth.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Header helper per autenticazione JWT
export const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Registrazione utente
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register/`, userData);
    return response.data;
};

// Login utente
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/token/`, credentials);
    return response.data;
};
