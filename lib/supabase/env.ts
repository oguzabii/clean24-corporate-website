import "server-only";

/**
 * Server-only environment readers for shop order persistence.
 *
 *  - SUPABASE_SERVICE_ROLE_KEY bypasses RLS. It must never be exposed with a
 *    NEXT_PUBLIC_ prefix, never reach client components, never be logged.
 *  - Secret VALUES never appear in errors — only variable NAMES.
 *  - Persistence code fails closed: missing configuration yields a
 *    controlled ORDER_DATABASE_NOT_CONFIGURED error, never a fallback.
 */

export function getSupabaseUrl(): string | null {
  const value = process.env.SUPABASE_URL;
  return value && value.trim().length > 0 ? value.trim() : null;
}

export function getSupabaseServiceRoleKey(): string | null {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return value && value.trim().length > 0 ? value.trim() : null;
}

export interface PersistenceEnvStatus {
  configured: boolean;
  /** Names (never values) of missing required variables. */
  missing: string[];
}

export function getPersistenceEnvStatus(): PersistenceEnvStatus {
  const missing: string[] = [];
  if (!getSupabaseUrl()) missing.push("SUPABASE_URL");
  if (!getSupabaseServiceRoleKey()) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  return { configured: missing.length === 0, missing };
}
