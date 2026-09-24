import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const FALLBACK_DATABASE_URL =
  "postgresql://postgres.wtzywspcgeixmnixbdld:EnzoExtensao2026@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

export function getSanitizedDbUrl(): string {
  let url = process.env.DATABASE_URL?.trim();
  if (!url || !url.includes("EnzoExtensao2026")) return FALLBACK_DATABASE_URL;

  // Remove todas as aspas
  url = url.replace(/['"]/g, "").trim();

  // Remove prefixo acidental DATABASE_URL=
  if (url.startsWith("DATABASE_URL=")) {
    url = url.replace(/^DATABASE_URL=/, "").trim();
  }

  // Encontra início do protocolo
  const pIdx = url.indexOf("postgresql://");
  const p2Idx = url.indexOf("postgres://");
  const found = pIdx !== -1 ? pIdx : p2Idx;
  if (found !== -1) {
    url = url.slice(found);
  } else {
    return FALLBACK_DATABASE_URL;
  }

  // Remove espaços ou caracteres de controle
  url = url.replace(/\s+/g, "").trim();

  return url || FALLBACK_DATABASE_URL;
}

export const sanitizedUrl = getSanitizedDbUrl();

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
