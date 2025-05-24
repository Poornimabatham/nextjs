// components/SignupForm.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Signup successful! Check your email to confirm.')
    }
  }

  return (
    <div>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
      <p>{message}</p>
    </div>
  )
}
