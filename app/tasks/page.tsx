import Link from "next/link";
import { prisma } from "@/lib/prisma";


// export default async function TasksPage() {
//   const res = await fetch("http://localhost:3000/api/tasks", { cache: "no-store" });
//   const tasks = await res.json();

//   return (
//     <div>
//       <h1 className="text-xl font-bold">Tasks</h1>
//       <ul>
//         {tasks.map((task: any) => (
//           <li key={task.id} className="p-2 border-b">
//             <Link href={`/tasks/${task.id}`}>{task.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// export default async function TasksPage() {
//   const tasks = await prisma.task.findMany();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Tasks Dashboard</h1>
//       <Link href="/tasks/new" className="text-blue-500 underline">
//         + Add New Task
//       </Link>

//       <ul className="mt-4 space-y-2">
//         {tasks.map((task) => (
//           <li key={task.id} className="border p-2 rounded">
//             <Link href={`/tasks/${task.id}`}>
//               <div className="font-semibold">{task.title}</div>
//               <div className="text-sm text-gray-600">{task.description}</div>
//               <div className="text-sm">Status: {task.status}</div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



async function getTasks() {
  return await prisma.task.findMany();
}

export default async function TaskListPage() {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">📋 Tasks Dashboard</h1>

      <a
        href="/tasks/new"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Add New Task
      </a>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition"
          >
            <a href={`/tasks/${task.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {task.title}
            </a>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <span
              className={`mt-3 inline-block px-3 py-1 text-sm font-medium rounded-full 
                ${task.status === "Completed" ? "bg-green-100 text-green-700" :
                  task.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-700"}`}
            >
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}








