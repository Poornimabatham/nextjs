// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.log('Wrong method:', req.method)
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password } = req.body
  console.log('Attempting login with:', email)

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.log('Login failed:', error.message)
    return res.status(401).json({ message: 'Invalid credentials', error: error.message })
  }

  console.log('Login successful:', data.user)
  return res.status(200).json({ message: 'Login successful', user: data.user })
}
