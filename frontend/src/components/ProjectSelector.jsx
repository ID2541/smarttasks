import { useState, useEffect, useContext } from "react";
import { getProjects, createProject } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function ProjectSelector({ onSelect }) {
    const { token } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) loadProjects();
    }, [token]);

    const loadProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (err) {
            console.error(err);
            setError("Errore nel caricamento dei progetti.");
        }
    };

    const handleCreateProject = async () => {
        if (!newProjectName.trim()) return;
        try {
            const createdProject = await createProject({ name: newProjectName });
            setProjects([...projects, createdProject]);
            setNewProjectName("");
            onSelect(createdProject.id); // seleziona il nuovo progetto
        } catch (err) {
            console.error(err);
            setError("Errore nella creazione del progetto");
        }
    };

    return (
        <div className="mb-4">
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex gap-2 mb-2">
                <select
                    className="border rounded p-1 flex-1"
                    onChange={(e) => onSelect(Number(e.target.value))}
                    defaultValue=""
                >
                    <option value="" disabled>
                        Seleziona un progetto
                    </option>
                    {projects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                            {proj.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Nuovo progetto"
                    className="border rounded p-1 flex-1"
                />
                <button
                    onClick={handleCreateProject}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    Crea
                </button>
            </div>
        </div>
    );
}
