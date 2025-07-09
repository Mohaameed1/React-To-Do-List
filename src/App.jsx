// src/App.jsx

import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all"); // all | active | completed

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() === "") return;
        const task = {
            id: Date.now(),
            text: newTask.trim(),
            isCompleted: false,
        };
        setTasks([...tasks, task]);
        setNewTask("");
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const handleToggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.isCompleted;
        if (filter === "completed") return task.isCompleted;
        return true;
    });

    return (
        <div className="app-container">
            <h1>📝 To Do List </h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Ajouter une tâche..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Ajouter</button>
            </div>

            {/* Boutons de filtre */}
            <div style={{ margin: "10px 0" }}>
                <button
                    onClick={() => setFilter("all")}
                    style={{
                        marginRight: "5px",
                        background: filter === "all" ? "#3498db" : "#ccc",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Toutes
                </button>
                <button
                    onClick={() => setFilter("active")}
                    style={{
                        marginRight: "5px",
                        background: filter === "active" ? "#3498db" : "#ccc",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Actives
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    style={{
                        background: filter === "completed" ? "#3498db" : "#ccc",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Terminées
                </button>
            </div>

            <TaskList
                tasks={filteredTasks}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
            />
        </div>
    );
}

export default App;
