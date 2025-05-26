import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })

  const { email, password } = req.body

  console.log(email,password)
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return res.status(401).json({ message: 'Invalid credentials', error: error.message })

  return res.status(200).json({ message: 'Login successful', user: data.user })
}
