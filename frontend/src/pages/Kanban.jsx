import { useState, useEffect, useContext } from "react";
import { api, setAuthToken } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Kanban = () => {
    const { token } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (token) setAuthToken(token);

        const fetchProjects = async () => {
            try {
                const res = await api.get("/projects/");
                setProjects(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProjects();
    }, [token]);

    return (
        <div>
            <h2>Kanban Board</h2>
            {projects.map((project) => (
                <div key={project.id} style={{ marginBottom: "1rem" }}>
                    <h3>{project.name}</h3>
                    <p>Owner: {project.owner}</p>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Kanban;
