"use client";

import React, { useMemo, useState } from "react";
import { Task } from "../../types/task"; // adjust path accordingly

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        filterStatus === "All" || task.status === filterStatus;
      const priorityMatch =
        filterPriority === "All" || task.priority === filterPriority;
      return statusMatch && priorityMatch;
    });
  }, [tasks, filterStatus, filterPriority]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your Assigned Tasks
        </h2>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Task Title: {task.title}
              </h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {task.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Due Date:</span>{" "}
                  {new Date(task.due_date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> {task.status}
                </div>
                <div>
                  <span className="font-semibold">Priority:</span>{" "}
                  {task.priority}
                </div>
                <div>
                  <span className="font-semibold">Tags:</span>{" "}
                  {task.tags.join(", ") || "None"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
