// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 🔹 Named export del contesto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("access");
        if (token) {
            try {
                return JSON.parse(atob(token.split(".")[1])); // decodifica payload JWT
            } catch (e) {
                return null;
            }
        }
        return null;
    });

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("access") ? localStorage.getItem("access") : null
    );

    const [loading, setLoading] = useState(true);

    // 🔹 Login
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
                username,
                password,
            });
            if (response.status === 200) {
                const data = response.data;
                setAuthTokens(data.access);
                localStorage.setItem("access", data.access);
                setUser(JSON.parse(atob(data.access.split(".")[1])));
                navigate("/dashboard");
            }
        } catch (err) {
            throw err; // gestione errori nel componente Login
        }
    };

    // 🔹 Logout
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("access");
        navigate("/login");
    };

    // 🔹 Registrazione (automatico login)
    const registerUser = async (username, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", {
                username,
                password,
            });
            if (response.status === 201) {
                const data = response.data;
                setAuthTokens(data.access);
                localStorage.setItem("access", data.access);
                setUser(JSON.parse(atob(data.access.split(".")[1])));
                navigate("/dashboard");
            }
        } catch (err) {
            throw err;
        }
    };

    // 🔹 Interceptor axios globale
    const authAxios = axios.create();
    authAxios.interceptors.request.use((config) => {
        if (authTokens) {
            config.headers.Authorization = `Bearer ${authTokens}`;
        }
        return config;
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                authTokens,
                loginUser,
                logoutUser,
                registerUser,
                authAxios, // axios protetto da JWT
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
