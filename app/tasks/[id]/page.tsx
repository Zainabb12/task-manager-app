"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TaskDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
  if (!id) return;

  let ignore = false;

  const fetchTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${id}`);

      if (!res.ok) {
        // If task is deleted (404), just setTask(null) and stop
        if (res.status === 404) {
          if (!ignore) setTask(null);
          return;
        }
        throw new Error("Failed to fetch task");
      }

      const data = await res.json();
      if (!ignore) setTask(data);
    } catch (error) {
      // 👇 no console.error here
      if (!ignore) setTask(null);
    } finally {
      if (!ignore) setLoading(false);
    }
  };

  fetchTask();

  return () => {
    ignore = true;
  };
}, [id]);


  if (loading) {
    return <p className="p-6 text-gray-600">Loading task...</p>;
  }

  if (!task) {
    return <p className="p-6 text-red-600">❌ Task not found</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center py-12 px-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          📝 Task Details
        </h1>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-sm text-gray-500 uppercase">Title</h2>
            <p className="text-xl font-semibold text-gray-800">{task.title}</p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm text-gray-500 uppercase">Description</h2>
            <p className="text-gray-700 bg-gray-50 rounded-lg p-4 shadow-inner">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* Status */}
          <div>
            <h2 className="text-sm text-gray-500 uppercase">Status</h2>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : task.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => router.push(`/tasks/${id}/edit`)}
          >
            ✏️ Edit
          </button>
          <button
            className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            onClick={async () => {
              const confirmed = confirm("Are you sure you want to delete?");
              if (!confirmed) return;

              await fetch(`/api/tasks/${id}`, {
                method: "DELETE",
              });

              router.push("/tasks");
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
