// src/components/TaskList.jsx

import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
    {tasks
        .slice()
        .sort((a, b) => a.isCompleted - b.isCompleted) // trie: non complétées en haut, complétées en bas
        .map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                onDelete={onDelete}
                onToggle={onToggle}
            />
        ))}
</ul>
  );
  
}


export default TaskList;
