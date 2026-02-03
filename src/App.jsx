import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { text: newTodo, done: false }]);
    setNewTodo("");
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.done;
    if (filter === "Done") return todo.done;
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#a8ceef",
        padding: "2rem 1rem",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sisemine kast – maks 400px, keskel */}
      <div
        style={{
          width: "90%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Todo App</h1>

        {/* Input ja Lisa nupp */}
        <div style={{ display: "flex", marginBottom: "1rem", width: "100%" }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            placeholder="Lisa uus todo"
            style={{ flex: 1, padding: "0.5rem", fontSize: "1rem" }}
          />
          <button
            onClick={addTodo}
            style={{
              marginLeft: "0.5rem",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
            }}
          >
            Lisa
          </button>
        </div>

        {/* Filter */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          {["All", "Active", "Done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                margin: "0.25rem",
                padding: "0.3rem 0.6rem",
                background: filter === f ? "#007bff" : "pink",
                color: filter === f ? "#fff" : "#333",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Todo list – scrollib vajadusel */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)", // et list ei läheks ekraanist välja
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                onToggle={() => toggleTodo(index)}
                onRemove={() => removeTodo(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
