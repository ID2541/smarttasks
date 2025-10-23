import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const api = axios.create({
    baseURL: API_BASE,
});

// Aggiunge token alle richieste
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};
