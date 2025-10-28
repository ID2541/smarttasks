// src/pages/Kanban.jsx
import React, { useEffect, useState } from "react";
import { getProjects, getColumns, getTasks, createTask } from "../api/api";

function Kanban() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // 🔹 Carica tutti i progetti all’avvio
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res);
        if (res.length > 0 && !selectedProject) {
          setSelectedProject(res[0].id);
        }
      } catch (error) {
        console.error("Errore nel caricamento dei progetti:", error);
      }
    };
    loadProjects();
  }, []);

  // 🔹 Carica colonne e task quando cambia il progetto selezionato
  useEffect(() => {
    const loadData = async () => {
      if (!selectedProject) return;
      try {
        const cols = await getColumns(selectedProject);
        setColumns(cols);

        const tks = await getTasks(selectedProject);
        setTasks(tks);
      } catch (error) {
        console.error("Errore nel caricamento dei dati del progetto:", error);
      }
    };
    loadData();
  }, [selectedProject]);

  // 🔹 Creazione task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedProject) return;

    try {
      // Seleziona la prima colonna disponibile del progetto
      const firstColumn = columns[0];
      if (!firstColumn) {
        alert("Nessuna colonna disponibile per questo progetto.");
        return;
      }

      // Crea il task
      await createTask(firstColumn.id, { title: newTaskTitle });
      setNewTaskTitle("");

      // Ricarica i task aggiornati
      const updatedTasks = await getTasks(selectedProject);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Errore nella creazione del task:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Kanban Board</h1>

      {/* 🔹 Selettore Progetto */}
      <div className="mb-6">
        <label className="mr-2 font-semibold">Progetto:</label>
        <select
          value={selectedProject || ""}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="border rounded p-1"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Form creazione task */}
      <form onSubmit={handleCreateTask} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nuovo task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Crea Task
        </button>
      </form>

      {/* 🔹 Colonne e task */}
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <div
            key={col.id}
            className="bg-gray-100 p-4 rounded shadow-sm border"
          >
            <h2 className="font-semibold mb-3">{col.name}</h2>
            <ul>
              {tasks
                .filter((t) => t.column === col.id)
                .map((t) => (
                  <li
                    key={t.id}
                    className="bg-white p-2 mb-2 rounded shadow"
                  >
                    {t.title}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kanban;
