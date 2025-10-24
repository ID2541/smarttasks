// src/pages/Register.jsx
import { useState, useContext } from "react";
import { registerUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser({ username, password });
            login({ username: data.username }, data.access);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Errore nella registrazione");
        }
    };

    return (
        <div className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Registrati</h2>
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
                    className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
                >
                    Crea account
                </button>
            </form>
        </div>
    );
};

export default Register;
