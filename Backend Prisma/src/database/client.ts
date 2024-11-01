import { PrismaClient } from '@prisma/client';

// Declaración para el contexto global (evita múltiples instancias en modo desarrollo)
declare const global: typeof globalThis & { prisma?: PrismaClient };

// Usar una instancia única de Prisma en desarrollo
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
