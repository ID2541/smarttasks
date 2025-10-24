// src/components/ProjectSelector.jsx
import { useEffect, useState } from "react";
import { getProjects } from "../api/api";

export default function ProjectSelector({ onSelect }) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    return (
        <select onChange={(e) => onSelect(e.target.value)} className="p-2 rounded border">
            <option value="">Seleziona un progetto</option>
            {projects.map((p) => (
                <option key={p.id} value={p.id}>
                    {p.name}
                </option>
            ))}
        </select>
    );
}
