'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/supabase-js'

interface Employee {
  id: string
  email: string
}

interface Task {
  id: string
  title: string
  description: string
  due_date: string
  status: string
}

export default function DashboardPage() {
  const [message, setMessage] = useState<string>("")
  const [session, setSession] = useState<Session | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [status, setStatus] = useState('To Do')
  const [assignedTo, setAssignedTo] = useState<string>('')
  const [tags, setTags] = useState<string>('')

  const [employees, setEmployees] = useState<Employee[]>([])
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([])

  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/login')
      } else {
        setSession(data.session)
      }
    }

    const getEmployees = async () => {
      const { data, error } = await supabase
        .from('users') // replace with your actual employee table if needed
        .select('id, email')

      if (!error && data) {
        setEmployees(data)
      }
    }

    getSession()
    getEmployees()
  }, [router, supabase])

  // Fetch tasks assigned to this user
  useEffect(() => {
    if (!session) return

    const fetchAssignedTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
 .select(`
    *,
    due_date::text
  `)        .eq('assignedToId', session.user.id)
console.log(data,"data")
      if (!error && data) {
        setAssignedTasks(data)
      }
    }

    fetchAssignedTasks()
  }, [session])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const task = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority,
      status,
      createdById: session?.user.id,
      assignedToId: assignedTo,
      tags: tags.split(',').map(tag => tag.trim()),
    }

    const res = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage("✅ Task created successfully!")
      setTitle('')
      setDescription('')
      setDueDate('')
      setPriority('Medium')
      setStatus('To Do')
      setAssignedTo('')
      setTags('')
    } else {
      setMessage("❌ Failed to create task: " + data.error)
    }
  }

  if (!session) return <p>Loading dashboard...</p>

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Welcome, {session.user.email}!
        </h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">Create a Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional task description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Assign To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. frontend, urgent"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>

      {/* Assigned Tasks Section */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-10 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Assigned Tasks</h3>
        {assignedTasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned to you.</p>
        ) : (
          <ul className="space-y-4">
            {assignedTasks.map((task) => (
              
              <li key={task.id} className="border border-gray-200 p-4 rounded-lg">
                <h4 className="font-bold text-gray-800">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
            
                    Due: {new Date(task.due_date).toLocaleDateString()}

                </p>
                <p className="text-sm text-gray-500">Status: {task.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
