import React, { useState } from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast"; // ✅ import toast

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() ) {
      toast.error("Title is Required !  ❌");
      return;
    }

    try {
      await axiosInstance.post("/todo/add", { title, description });
      setTitle("");
      setDescription("");
      onAdd();
      toast.success("Todo added successfully ✅");
    } catch (error) {
      console.error("Add Todo Error:", error);
      toast.error(error.response?.data?.message || "Failed to add todo ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-gray-100 shadow-md p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 mt-6 border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-red-600 sm:w-1/4 text-center sm:text-left">
        Add Todo
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-3/4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the Title"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-red-500 transition-all"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the Description"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:border-red-500 transition-all"
        />

        <button
          type="submit"
          className="bg-red-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-200 w-full sm:w-auto"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
