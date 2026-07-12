import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  generateOrderNumber,
  ORDER_NUMBER_PATTERN,
} from "@/lib/shop/order-number";

describe("order number generation", () => {
  it("matches the public C24-YYYYMM-XXXXXX format", () => {
    for (let i = 0; i < 200; i++) {
      const n = generateOrderNumber();
      assert.match(n, ORDER_NUMBER_PATTERN);
    }
  });

  it("embeds the given UTC year+month", () => {
    const n = generateOrderNumber(new Date(Date.UTC(2026, 6, 15)));
    assert.equal(n.startsWith("C24-202607-"), true);
  });

  it("uses no ambiguous characters (0/O, 1/I/L)", () => {
    for (let i = 0; i < 200; i++) {
      const random = generateOrderNumber().split("-")[2];
      assert.doesNotMatch(random, /[01OIL]/);
    }
  });

  it("is not a visible increment (two consecutive numbers differ randomly)", () => {
    const a = generateOrderNumber();
    const b = generateOrderNumber();
    assert.notEqual(a, b);
  });
});
