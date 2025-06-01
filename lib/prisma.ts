// lib/prisma.ts ya jahan bhi aapka prisma client initialize ho raha hai

import { PrismaClient } from '@prisma/client'

declare global {
  // TypeScript ke liye
  // @ts-ignore
  var prisma: PrismaClient | undefined
}

// Prevent multiple instances of PrismaClient in development (important)
export const prisma = global.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
