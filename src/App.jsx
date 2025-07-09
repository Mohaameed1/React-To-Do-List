import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks && savedTasks !== "undefined") {
    try {
      const parsedTasks = JSON.parse(savedTasks);
      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      }
    } catch (error) {
      console.error("Erreur de parsing des tâches depuis localStorage:", error);
    }
  }
  return [];
});



  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>📝 To Do List</h1>
      <div>
        <input
          type="text"
          value={task}
          placeholder="Ajouter une tâche..."
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => { if (e.key === "Enter") addTask(); }}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
