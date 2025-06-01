'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    setMessage('')
    setLoading(true)

    // 1. Sign up with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (!data.user) {
      setMessage('Signup failed: No user data returned.')
      setLoading(false)
      return
    }

    // 2. Call your backend API to insert the user in your "users" table
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          user_id: data.user.id, // pass Supabase user id
        }),
      })

      const result = await res.json()

      if (!res.ok) {
        setMessage(result.error || result.message || 'Failed to save user data')
      } else {
        setMessage('Signup successful! Check your email to confirm.')
      }
    } catch (fetchError) {
      setMessage('Error calling signup API')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSignup}
        disabled={loading}
        className={`w-full ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-semibold py-2 px-4 rounded-md transition duration-200`}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>

      {message && (
        <p
          className={`mt-4 text-sm text-center ${
            message.toLowerCase().includes('successful') ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
