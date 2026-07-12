/**
 * Server-side order-reference generator.
 *
 * Format: C24-YYYYMM-XXXXXX  (e.g. C24-202607-A4K9Q2)
 *
 *  - Generated server-side with crypto randomness — NOT a client-visible
 *    increment, so order volume is not inferable.
 *  - The database UNIQUE constraint on shop_orders.order_number is the final
 *    authority; the repository retries on the (rare) collision.
 *  - The order number is a public reference, NOT an authentication secret —
 *    never gate data access on knowledge of it alone.
 */

import { randomInt } from "node:crypto";

/** Unambiguous alphabet (no 0/O, 1/I/L) for human-readable references. */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const RANDOM_LENGTH = 6;

export const ORDER_NUMBER_PATTERN = /^C24-\d{6}-[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/;

export function generateOrderNumber(now: Date = new Date()): string {
  const year = now.getUTCFullYear().toString().padStart(4, "0");
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  let random = "";
  for (let i = 0; i < RANDOM_LENGTH; i++) {
    random += ALPHABET[randomInt(ALPHABET.length)];
  }
  return `C24-${year}${month}-${random}`;
}
