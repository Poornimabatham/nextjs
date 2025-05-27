// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
    const router = useRouter()
    // Temporarily no session check
    return (
      <div>
        <h1>Dashboard</h1>
        {/* <button onClick={() => router.push('/login')}>Go to Login</button> */}
      </div>
    )
  }