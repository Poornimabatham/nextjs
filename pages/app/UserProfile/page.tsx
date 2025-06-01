"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";

interface Employee {
  id: string;
  email: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: string;
  priority: string;
  tags: string[];
}

export default function DashboardPage() {
  const [message, setMessage] = useState<string>("");
  const [session, setSession] = useState<Session | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      } else {
        setSession(data.session);
      }
    };

    const getEmployees = async () => {
      const { data, error } = await supabase.from("users").select("id, email");

      if (!error && data) {
        setEmployees(data);
      }
    };

    getSession();
    getEmployees();
  }, []);

  useEffect(() => {
    if (!session) return;

    const fetchAssignedTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("assignedToId", session.user.id);

      if (!error && data) {
        setAssignedTasks(data);
      }
    };

    fetchAssignedTasks();
  }, [session]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const task = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority,
      status,
      createdById: session?.user.id,
      assignedToId: assignedTo,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    const res = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Task created successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setStatus("To Do");
      setAssignedTo("");
      setTags("");
    } else {
      setMessage("❌ Failed to create task: " + data.error);
    }
  }

  if (!session) return <p>Loading dashboard...</p>;

  return (

    
    <div className="min-h-screen bg-gray-100 p-6">
      <button
      onClick={() => router.push("/app/Dashbord/getAllTask")}
      className="absolute top-6 right-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
    >
      Go to Dashboard
    </button>
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Welcome, {session.user.email}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Create a Task
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows={3}
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Assign to</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.email}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </form>
          {message && (
            <p className="mt-4 text-sm text-center text-gray-600">{message}</p>
          )}
        </div>

        {/* Assigned Tasks Section */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">
            Your Assigned Tasks
          </h2>
          {assignedTasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned to you.</p>
          ) : (
            <ul className="space-y-4">
              {assignedTasks.map((task) => (
                <li
                  key={task.id}
                  className="border border-gray-200 p-5 rounded-lg bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  <span className="font-semibold text-gray-800">
                  Task Tittle :
                      {task.title}
                      </span>{" "}

                  </h3>
                  <p className="text-gray-700 mb-3">
                  <span className="font-semibold text-gray-800">
                      Description : {task.description}
                      </span>{" "}
                      </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold text-gray-800">
                        Due Date:
                      </span>{" "}
                      {new Date(task.due_date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Status:
                      </span>{" "}
                      {task.status}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Priority:
                      </span>{" "}
                      {task.priority}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Tags:</span>{" "}
                      {task.tags?.join(", ") || "None"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
