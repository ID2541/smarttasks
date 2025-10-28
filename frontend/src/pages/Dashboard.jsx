// src/pages/Dashboard.jsx
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <p className="mb-4">
                Seleziona un progetto per gestire le tue attività nella Kanban Board.
            </p>
            <Link
                to="/kanban"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Vai alla Kanban Board
            </Link>
        </div>
    );
}
