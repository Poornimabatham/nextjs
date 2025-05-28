'use client';

import { trpc } from '@/utils/trpc'; // adjust if your trpc hook is elsewhere
import { useEffect } from 'react';

export default function TaskList() {
  const utils = trpc.useUtils();
  const { data: tasks, isLoading } = trpc.task.getAll.useQuery();
  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: () => {
      utils.task.getAll.invalidate(); // Refresh the list after delete
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {tasks?.map((task) => (
        <div key={task.id} className="flex justify-between items-center border p-2">
          <span>{task.name}</span>
          <button
            onClick={() => deleteTask.mutate(task.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
