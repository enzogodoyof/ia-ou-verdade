import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Função utilitária para verificar se a conexão com o banco de dados está ativa
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.participant.count();
    return true;
  } catch (err) {
    console.error("Database connection check error:", err);
    return false;
  }
}
