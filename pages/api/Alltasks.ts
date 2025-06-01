import { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabase = createServerSupabaseClient({ req, res })

    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        assignedUser:users!tasks_assignedtoid_fkey(email),
        createdUser:users!tasks_created_by_id_fkey(email)
      `)

    if (error) throw error

    res.status(200).json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch tasks" })
  }
}
