import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' })

  const { email, password } = req.body

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return res.status(400).json({ message: error.message })

  return res.status(200).json({ message: 'Signup successful', user: data.user })
}
