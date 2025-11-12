import React, { useState } from "react";
import axiosInstance from "../api/axios";

const TodoList = ({ todos, onChange }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const toggleComplete = async (todo) => {
    await axiosInstance.patch(`/todo/${todo._id}`, {
      completed: !todo.completed,
    });
    onChange();
  };

  const deleteTodo = async (id) => {
    await axiosInstance.delete(`/todo/${id}`);
    onChange();
  };

  const startEdit = (todo) => {
    setEditingTodo(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditTitle("");
    setEditDescription("");
  };

  const updateTodo = async (id) => {
    await axiosInstance.patch(`/todo/${id}`, {
      title: editTitle,
      description: editDescription,
    });
    cancelEdit();
    onChange();
  };

  return (
    <ul className="w-full px-4 sm:px-8 mt-6 space-y-4">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="w-full bg-gray-100 shadow-md p-4 sm:p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all"
        >
          {editingTodo === todo._id ? (
            // ✏️ Edit Mode
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Edit title"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-red-500 w-full"
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Edit description"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-red-500 w-full"
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => updateTodo(todo._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // ✅ Normal Mode
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                  className="w-5 h-5 accent-red-500 mt-1"
                />
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p
                      className={`text-sm ${
                        todo.completed ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {todo.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 sm:justify-end">
                <button
                  onClick={() => startEdit(todo)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-600 hover:text-red-800 font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
