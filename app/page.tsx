"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  expiresAt: string | null;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  function addTodo() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false, expiresAt: expiresAt || null }]);
    setInput("");
    setExpiresAt("");
  }

  function toggleTodo(id: number) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <main className="min-h-screen bg-gray-100 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Todo App</h1>

        <div className="flex flex-col gap-2 mb-6">
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <input
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No tasks yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => {
              const today = new Date().toISOString().slice(0, 10);
              const isExpired = !todo.completed && todo.expiresAt && todo.expiresAt < today;
              return (
              <li
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 group ${isExpired ? "border-red-300 bg-red-50" : "border-gray-100"}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 accent-blue-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <span
                    className={`block text-gray-700 ${todo.completed ? "line-through text-gray-400" : ""}`}
                  >
                    {todo.text}
                  </span>
                  {todo.expiresAt && (
                    <span className={`text-xs ${isExpired ? "text-red-500 font-medium" : "text-gray-400"}`}>
                      {isExpired ? "Expired: " : "Due: "}{todo.expiresAt}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 text-lg leading-none"
                  aria-label="Delete"
                >
                  ✕
                </button>
              </li>
              );
            })}
          </ul>
        )}

        {todos.length > 0 && (
          <p className="text-sm text-gray-400 mt-4 text-right">
            {remaining} task{remaining !== 1 ? "s" : ""} remaining
          </p>
        )}
      </div>
    </main>
  );
}
