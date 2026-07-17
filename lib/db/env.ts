import "server-only";

/**
 * Server-only environment readers for shop order persistence (Neon
 * PostgreSQL via the Vercel Marketplace resource).
 *
 *  - DATABASE_URL contains credentials. It must never be exposed with a
 *    NEXT_PUBLIC_ prefix, never reach client components, never be logged.
 *  - Secret VALUES never appear in errors — only variable NAMES.
 *  - Persistence code fails closed: missing configuration yields a
 *    controlled ORDER_DATABASE_NOT_CONFIGURED error, never a fallback.
 */

/** Pooled Neon connection string (runtime queries). Null = unset. */
export function getDatabaseUrl(): string | null {
  const value = process.env.DATABASE_URL?.trim();
  if (!value) return null;
  // `vercel env pull` writes literal "[SENSITIVE]" placeholders for
  // sensitive-typed variables (the Neon Marketplace credentials are
  // sensitive). A placeholder is NOT configuration — fail closed instead of
  // handing garbage to the driver.
  if (value.includes("[SENSITIVE]")) return null;
  return value;
}

export interface PersistenceEnvStatus {
  configured: boolean;
  /** Names (never values) of missing required variables. */
  missing: string[];
}

export function getPersistenceEnvStatus(): PersistenceEnvStatus {
  const missing: string[] = [];
  if (!getDatabaseUrl()) missing.push("DATABASE_URL");
  return { configured: missing.length === 0, missing };
}
