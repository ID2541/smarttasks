// src/pages/Kanban.jsx
import { useState, useEffect } from "react";
import { getColumns, getTasks, createTask, deleteTask } from "../api/api";
import ProjectSelector from "../components/ProjectSelector";

export default function Kanban() {
    const [projectId, setProjectId] = useState(null);
    const [columns, setColumns] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (projectId) loadData();
    }, [projectId]);

    const loadData = async () => {
        try {
            setLoading(true);
            const cols = await getColumns(projectId);
            const tks = await getTasks(projectId);
            setColumns(cols);
            setTasks(tks);
        } catch (err) {
            setError("Errore nel caricamento dei dati.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (colId) => {
        if (!newTask.trim()) return;
        await createTask({ title: newTask, column: colId, project: projectId });
        setNewTask("");
        await loadData();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        await loadData();
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Kanban Board</h1>
            <ProjectSelector onSelect={(id) => setProjectId(id)} />

            {loading ? (
                <p className="mt-4 text-gray-500">Caricamento...</p>
            ) : error ? (
                <p className="mt-4 text-red-500">{error}</p>
            ) : !projectId ? (
                <p className="mt-4">Seleziona un progetto per iniziare.</p>
            ) : (
                <div className="flex gap-4 mt-6 overflow-x-auto">
                    {columns.map((col) => (
                        <div key={col.id} className="bg-gray-100 p-3 rounded-lg min-w-[250px]">
                            <h2 className="font-semibold mb-2">{col.name}</h2>
                            {tasks
                                .filter((t) => t.column === col.id)
                                .map((t) => (
                                    <div key={t.id} className="bg-white p-2 mb-2 rounded shadow flex justify-between items-center">
                                        <span>{t.title}</span>
                                        <button onClick={() => handleDeleteTask(t.id)} className="text-red-500 hover:text-red-700">
                                            ✕
                                        </button>
                                    </div>
                                ))}

                            <div className="mt-2">
                                <input
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Nuovo task"
                                    className="border rounded p-1 w-full"
                                />
                                <button
                                    onClick={() => handleCreateTask(col.id)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded mt-1 w-full"
                                >
                                    Aggiungi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
