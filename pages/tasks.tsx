import React from 'react';
import { api } from '../utils/trpc'; // Make sure this is correctly set up

// ✅ Define Task type
type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date?: string;
  priority?: string;
  created_by_id?: string;
};

const TaskList = () => {
  // ✅ Fetch tasks using tRPC
  const { data: tasks, isLoading, error } = api.task.getAll.useQuery();

  if (isLoading) return <p className="p-4">Loading tasks...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      {tasks && tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task: Task) => (
            <li key={task.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p>Status: <span className="font-medium">{task.status}</span></p>
              {task.due_date && <p>Due Date: {task.due_date}</p>}
              {task.priority && <p>Priority: {task.priority}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
