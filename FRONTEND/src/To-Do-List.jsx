import React, { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  function handleInput(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() === "") return;

    const requestData = { name: newTask };
    const method = editingTaskId ? "PUT" : "POST";
    const url = editingTaskId
      ? `http://localhost:5000/api/tasks/${editingTaskId}`
      : "http://localhost:5000/api/tasks";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((task) => {
        if (editingTaskId) {
          setTasks((prev) => prev.map((t) => (t._id === editingTaskId ? task : t)));
          setEditingTaskId(null);
        } else {
          setTasks((prev) => [...prev, task]);
        }
        setNewTask("");
      });
  }

  function deleteTask(id) {
    fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks((prev) => prev.filter((t) => t._id !== id)));
  }

  function editTask(id, name) {
    setNewTask(name);
    setEditingTaskId(id);
  }

  return (
    <div className="TODO">
      <h1>To-Do List</h1>
      <div>
        <input type="text" placeholder="Enter a task" value={newTask} onChange={handleInput} />
        <button onClick={addTask}>{editingTaskId ? "Update" : "Add"}</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.name}
            <button onClick={() => editTask(t._id, t.name)}>✏️ Edit</button>
            <button onClick={() => deleteTask(t._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
