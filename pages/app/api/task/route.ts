import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Your logic here: e.g., insert a task, fetch data, etc.

  return NextResponse.json({ message: 'Success' })
}
