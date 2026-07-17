import "server-only";

import { Pool } from "pg";
import { getDatabaseUrl } from "./env";

/**
 * Lazy, server-only PostgreSQL pool for shop order persistence (Neon).
 *
 *  - Constructed on first use at REQUEST time — static builds succeed with
 *    no database variables present.
 *  - Uses the pooled DATABASE_URL from the Neon Marketplace resource
 *    (`?sslmode=require` in the connection string enables TLS).
 *  - Returns null when unconfigured; callers fail closed with
 *    ORDER_DATABASE_NOT_CONFIGURED.
 *  - Never log the connection string or raw driver errors to clients.
 */

let cachedPool: Pool | null = null;

export function getDbPool(): Pool | null {
  if (cachedPool) return cachedPool;
  const connectionString = getDatabaseUrl();
  if (!connectionString) return null;
  cachedPool = new Pool({
    connectionString,
    // Small pool: serverless instances each hold few connections; Neon's
    // pooled endpoint (PgBouncer) does the heavy lifting.
    max: 5,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
  });
  return cachedPool;
}

/** Close the pool — used by tests/scripts so the process can exit cleanly. */
export async function closeDbPool(): Promise<void> {
  if (cachedPool) {
    await cachedPool.end();
    cachedPool = null;
  }
}
