import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseServiceRoleKey, getSupabaseUrl } from "./env";

/**
 * Lazy, server-only Supabase admin client for shop order persistence.
 *
 *  - Constructed on first use at REQUEST time — static builds succeed with
 *    no database variables present.
 *  - Uses the SERVICE-ROLE key: full access, BYPASSES RLS. This module must
 *    only ever be imported from server code (route handlers, server
 *    components, repositories) — `import "server-only"` enforces that.
 *  - Returns null when unconfigured; callers fail closed with
 *    ORDER_DATABASE_NOT_CONFIGURED.
 *  - Never log the key, connection string or raw database errors to clients.
 */

let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  const url = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  if (!url || !serviceRoleKey) return null;
  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}
