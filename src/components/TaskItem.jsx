// src/components/TaskItem.jsx

import React from "react";

function TaskItem({ task, onDelete, onToggle }) {
    return (
       <li
    onClick={() => onToggle(task.id)}
    style={{
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "8px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: task.isCompleted ? "#d5f5e3" : "#333", // fond vert clair si complétée
        color: task.isCompleted ? "#000" : "#fff", // texte noir si complétée, blanc sinon
    }}
>

            <span
                style={{
                    textDecoration: task.isCompleted ? "line-through" : "none",
                    color: "#000", // forcé en noir pour être visible
                    fontSize: "16px",
                }}
            >
                {task.text}
            </span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id);
                }}
                style={{
                    background: "#e74c3c",
                    border: "none",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                ❌
            </button>
        </li>
    );
}

export default TaskItem;
