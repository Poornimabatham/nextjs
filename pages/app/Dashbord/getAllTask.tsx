"use client";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  title?: string | null;
  description?: string | null;
  due_date?: string | null;
  status?: string | null;
  priority?: string | null;
  tags?: string[] | null;
  assignedToId?: string | null;
  email?: string | null; // assigned user email, from your data
  createdById?: string | null;
  createdByEmail?: string | null;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/Alltasks");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === "all" || task.status === statusFilter;
    const priorityMatch = priorityFilter === "all" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Dashboard</h1>
      <h4 className="text-2xl text-center font-semibold mb-6">All Task List</h4>

      {/* Filters */}
      <div className="flex gap-4 mb-6 justify-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Loading and Error */}
      {loading && <p className="text-center">Loading tasks...</p>}
      {error && <p className="text-red-600 text-center">Error: {error}</p>}

      {/* No tasks found */}
      {!loading && !error && filteredTasks.length === 0 && (
        <p className="text-center">No tasks found matching your filters.</p>
      )}

      {/* Tasks table */}
      {!loading && !error && filteredTasks.length > 0 && (
        <table className="min-w-full border-collapse border border-gray-300 mx-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Due Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Priority</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tags</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Assigned To</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Created By</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{task.title ?? "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{task.description ?? "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.due_date ? new Date(task.due_date).toLocaleDateString() : "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{task.status ?? "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{task.priority ?? "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.tags?.length ? task.tags.join(", ") : "None"}
                </td>
                <td className="border border-gray-300 px-4 py-2">{task.email ?? "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{task.email ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
