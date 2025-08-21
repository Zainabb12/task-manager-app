"use client";

import { useState } from "react";
import { PlusCircle, Pencil, AlignLeft, CheckCircle } from "lucide-react";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = { title, description, status };

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (res.ok) {
        alert("✅ Task created successfully!");
        setTitle("");
        setDescription("");
        setStatus("To Do");
      } else {
        alert("❌ Failed to create task");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg space-y-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 justify-center">
        <PlusCircle className="w-6 h-6 text-indigo-600" />
        Add New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <Pencil className="w-4 h-4 text-indigo-500" />
            Title
          </label>
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <AlignLeft className="w-4 h-4 text-indigo-500" />
            Description
          </label>
          <textarea
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        {/* Status */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
            <CheckCircle className="w-4 h-4 text-indigo-500" />
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        {/* Submit Button */}
{/* Submit Button */}
<div className="flex justify-center">
  <button
    type="submit"
    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md flex items-center gap-2 transition duration-200"
  >
    <PlusCircle className="w-5 h-5" />
    Create Task
  </button>
</div>



            
      </form>
    </div>
  );
}
