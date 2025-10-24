import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Dashboard</h1>
            <Link
                to="/kanban"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Vai alla Kanban Board
            </Link>
        </div>
    );
}
