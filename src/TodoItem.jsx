import React from "react";

export default function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        margin: "0.25rem 0",
        padding: "0.5rem",
        background: "pink", // kast pink
        borderRadius: "5px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        transition: "all 0.3s",
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={onToggle}
        style={{ marginRight: "0.5rem" }}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.done ? "line-through" : "none",
          fontSize: "1.1rem",
        }}
      >
        {todo.text}
      </span>
      <button onClick={onRemove} style={{ marginLeft: "0.5rem" }}>
        ❌
      </button>
    </li>
  );
}
