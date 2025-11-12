import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import TodoForm from "../components/TodoFrom";
import TodoList from "../components/TodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data } = await axiosInstance.get("/todo/all");
    console.log(data.data);
    setTodos(data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-red-600 mt-8 mb-4 text-center">
        Your Todos
      </h2>

      {/* Todo Form */}
      <div className="w-full max-w-6xl px-4 sm:px-8">
        <TodoForm onAdd={fetchTodos} />
      </div>

      {/* Todo List */}
      <div className="w-full max-w-6xl px-4 sm:px-8 mt-6 pb-10">
        <TodoList todos={todos} onChange={fetchTodos} />
      </div>
    </div>
  );
};

export default Home;
