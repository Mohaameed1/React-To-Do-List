// src/components/TaskList.jsx

import React from "react";
import TaskItem from "./TaskItem";
import { motion, AnimatePresence } from "framer-motion";

function TaskList({ tasks, onDelete, onToggle }) {
    return (
        <motion.ul
            style={{ listStyle: "none", padding: 0 }}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <AnimatePresence>
                {tasks.map((task) => (
                    <motion.li
                        key={task.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <TaskItem
                            task={task}
                            onDelete={onDelete}
                            onToggle={onToggle}
                        />
                    </motion.li>
                ))}
            </AnimatePresence>
        </motion.ul>
    );
}

export default TaskList;
