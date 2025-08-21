"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (!res.ok) throw new Error("Failed to fetch task");
        const data = await res.json();
        setTask(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const updatedTask = {
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
    };

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (res.ok) {
        router.push(`/tasks/${id}`); // go back to detail page
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) return <p className="p-6">Loading task...</p>;
  if (!task) return <p className="p-6 text-red-600">Task not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">✏️ Edit Task</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={task.title}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={task.description}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Status</label>
            <select
              name="status"
              defaultValue={task.status}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => router.push(`/tasks/${id}`)}
              className="px-5 py-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
