import { NextApiRequest, NextApiResponse } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = createServerSupabaseClient({ req, res })

  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession()

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { title, description, dueDate, priority, status ,createdById,assignedToId,created_at} = req.body

console.log(req.body,"opooo")

  try {
    const { error } = await supabase.from('tasks').insert([
      {
        title,
        description,
        due_date: dueDate,
        priority,
        status,
        created_by_id: createdById,
        assignedToId:assignedToId,
        created_at

      },
    ])

    if (error) {
      console.error('Insert error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ message: 'Task created' })
  } catch (err) {
    console.error('Unexpected error:', err)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
