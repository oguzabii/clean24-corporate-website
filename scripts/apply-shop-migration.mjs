#!/usr/bin/env node
/**
 * Apply the shop-orders migration to the Neon database — DELIBERATELY, never
 * automatically.
 *
 * Usage:  npm run db:migrate     (loads .env.local if present)
 *
 *  - Uses DATABASE_URL_UNPOOLED (direct connection, best for DDL) and falls
 *    back to DATABASE_URL. Fails closed when neither is set.
 *  - Runs the whole migration in ONE transaction; any error rolls back.
 *  - Prints only the target HOSTNAME for the audit trail — never
 *    credentials, never the full connection string.
 *  - The migration is additive and non-idempotent by design (plain
 *    `create table`): applying it twice fails loudly instead of silently
 *    diverging.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationPath = path.join(
  root,
  "migrations",
  "20260711120000_create_shop_orders.sql",
);

const candidates = [
  process.env.DATABASE_URL_UNPOOLED?.trim(),
  process.env.DATABASE_URL?.trim(),
];
// "[SENSITIVE]" is the placeholder `vercel env pull` writes for
// sensitive-typed variables — it is not configuration.
const connectionString = candidates.find(
  (v) => v && !v.includes("[SENSITIVE]"),
);
if (!connectionString) {
  console.error(
    "✖ No usable DATABASE_URL_UNPOOLED / DATABASE_URL (unset or sensitive-placeholder) — aborting.",
  );
  process.exit(1);
}

let hostname = "(unparseable)";
try {
  hostname = new URL(connectionString).hostname;
} catch {
  /* keep placeholder */
}
console.log(`Applying shop-orders migration to host: ${hostname}`);

const sql = readFileSync(migrationPath, "utf8");
const client = new pg.Client({ connectionString });

try {
  await client.connect();
  await client.query("begin");
  await client.query(sql);
  await client.query("commit");
  console.log("✔ Migration applied and committed.");
} catch (error) {
  try {
    await client.query("rollback");
  } catch {
    /* connection may already be gone */
  }
  // PostgreSQL error messages contain SQL context, not credentials.
  console.error(`✖ Migration failed and was rolled back: ${error.message}`);
  process.exitCode = 1;
} finally {
  await client.end();
}
