import { useState, FormEvent } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Task created successfully!");
      setName("");
      setEmail("");
    } else {
      setMessage("Failed to create task: " + data.error);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
