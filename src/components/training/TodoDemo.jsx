import React, { useState } from "react";

export default function TodoDemo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = id => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = id => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="p-3 border rounded bg-light mb-3">

      <h5>Todo List Demo</h5>

      <div className="input-group my-3">
        <input className="form-control" value={input} onChange={e => setInput(e.target.value)} placeholder="New task..." />
        <button className="btn btn-primary" onClick={addTodo}>Add</button>
      </div>

      <ul className="list-group">
        {todos.map(t => (
          <li key={t.id} className="list-group-item d-flex align-items-center">
            <input type="checkbox" checked={t.completed} onChange={() => toggleTodo(t.id)} className="form-check-input me-2" />
            <span className={`flex-grow-1 ${t.completed ? "text-decoration-line-through" : ""}`}>{t.text}</span>
            <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(t.id)}>x</button>
          </li>
        ))}
      </ul>

    </div>
  );
}
