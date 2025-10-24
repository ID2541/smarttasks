// src/pages/Login.jsx
import { useState, useContext } from "react";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ username, password });
            login({ username }, data.access);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.detail || "Errore nel login");
        }
    };

    return (
        <div className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded p-2"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded p-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                >
                    Accedi
                </button>
            </form>
        </div>
    );
};

export default Login;
