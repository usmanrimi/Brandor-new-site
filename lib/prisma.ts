import { PrismaClient } from '@prisma/client'

/**
 * Shared Prisma client.
 *
 * Previously every page, route and server action created its own
 * `new PrismaClient()`, which opened a separate connection pool per module.
 * On Vercel/serverless this multiplied connections to the Supabase pooler and
 * added connection-setup latency to every request. A single cached instance
 * is reused across modules (and across hot reloads in development).
 */
const globalForPrisma = globalThis as unknown as { __brandorPrisma?: PrismaClient }

export const prisma: PrismaClient =
  globalForPrisma.__brandorPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

globalForPrisma.__brandorPrisma = prisma

export default prisma
