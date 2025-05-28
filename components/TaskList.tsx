import React from 'react';
import { api } from '../utils/trpc';

type Task = {
  id: number;
  title: string;
  description?: string;
  // add other task fields as needed
};

export const TaskList: React.FC = () => {
  const { data: tasks, isLoading, error } = api.task.getAll.useQuery();

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error loading tasks: {error.message}</div>;
  if (!tasks || tasks.length === 0) return <div>No tasks found.</div>;

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>
            {task.description && <p>{task.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
