// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global prisma in dev to avoid hot‑reload multiple instances
  let prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['query'], // optional
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
