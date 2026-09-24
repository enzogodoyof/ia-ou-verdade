import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const FALLBACK_DATABASE_URL =
  "postgresql://postgres.wtzywspcgeixmnixbdld:EnzoExtensao2026@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

function getSanitizedDbUrl(): string {
  let url = process.env.DATABASE_URL?.trim();
  if (!url) return FALLBACK_DATABASE_URL;

  // Remove aspas acidentais no início e fim
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1).trim();
  }

  // Remove quebras de linha ou espaços
  url = url.replace(/[\r\n\t]/g, "").trim();

  return url || FALLBACK_DATABASE_URL;
}

const sanitizedUrl = getSanitizedDbUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: sanitizedUrl,
      },
    },
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
