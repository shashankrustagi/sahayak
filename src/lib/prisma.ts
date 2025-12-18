import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pool),
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
