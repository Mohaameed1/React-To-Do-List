// src/App.jsx

import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode === "true";
    });
    const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("darkMode", isDarkMode);
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const task = {
        id: Date.now(),
        text: newTask.trim(),
        isCompleted: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    toast.success("✅ Tâche ajoutée !");
};

   const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.info("🗑️ Tâche supprimée !");
};
const handleToggleTask = (id) => {
    setTasks(
        tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
    );
    toast("🔄 Statut de la tâche mis à jour !");
};


    const filteredTasks = tasks
        .filter((task) =>
            task.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((task) => {
            if (filter === "active") return !task.isCompleted;
            if (filter === "completed") return task.isCompleted;
            return true; // all
        });

    const remainingTasks = tasks.filter((task) => !task.isCompleted).length;

    return (
        <div className="app-container">
            <h1>📝 To Do List</h1>

            {/* Toggle Dark Mode */}
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="toggle-button"
            >
                {isDarkMode ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
            </button>

            <p>
                Il reste <strong>{remainingTasks}</strong> tâche
                {remainingTasks !== 1 ? "s" : ""} à faire
            </p>

            {/* ✅ Boutons de filtre */}
            <div className="filter-buttons">
                <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={() => setFilter("all")}
                >
                    Toutes
                </button>
                <button
                    className={filter === "active" ? "active-filter" : ""}
                    onClick={() => setFilter("active")}
                >
                    Actives
                </button>
                <button
                    className={filter === "completed" ? "active-filter" : ""}
                    onClick={() => setFilter("completed")}
                >
                    Terminées
                </button>
            </div>

            {/* Input de recherche */}
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Rechercher une tâche..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Input d'ajout */}
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Ajouter une tâche..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Ajouter</button>
            </div>

            <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
            />

            <ToastContainer
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme={isDarkMode ? "dark" : "light"} // adapte au mode sombre
/>

        </div>
    );
}

export default App;
