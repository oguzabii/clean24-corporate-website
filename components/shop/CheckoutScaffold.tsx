"use client";

import Image from "next/image";
import Link from "next/link";
import { CartProvider, useCart } from "./CartContext";
import { ProductVisual } from "./ProductVisual";
import { formatChf, type ProductVisual as VisualKind } from "@/data/shop";
import { shopConfig } from "@/data/shop-config";

/**
 * Read-only cart summary for the /checkout scaffold. Shows the persisted
 * cart (localStorage via CartProvider) — no data collection, no submission,
 * no payment. The cart itself stays managed in the shop (drawer).
 */
function CartSummary() {
  const { lines, subtotalCents } = useCart();

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
        <h2 className="text-base font-semibold tracking-tight text-navy-900">
          Ihr Warenkorb
        </h2>
        <p className="mt-3 text-sm leading-6 text-navy-600">
          Ihr Warenkorb wird im Shop verwaltet.
        </p>
        <p className="mt-1 text-sm leading-6 text-navy-500">
          Fügen Sie im{" "}
          <Link
            href="/shop"
            className="font-medium text-teal-700 underline-offset-4 hover:underline"
          >
            Shop
          </Link>{" "}
          Produkte hinzu, um sie hier zu sehen.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
      <h2 className="text-base font-semibold tracking-tight text-navy-900">
        Ihr Warenkorb
      </h2>
      <ul className="mt-4 divide-y divide-navy-100">
        {lines.map((line) => (
          <li key={line.key} className="flex items-center gap-4 py-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-navy-100">
              {line.image ? (
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                <ProductVisual
                  kind={line.visual as VisualKind}
                  className="h-full w-full"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-navy-900">
                {line.name}
              </p>
              <p className="text-xs text-navy-500">
                {line.variantLabel} · {line.qty} ×{" "}
                {formatChf(line.priceCents)}
              </p>
            </div>
            <span className="text-sm font-semibold tabular-nums text-navy-900">
              {formatChf(line.priceCents * line.qty)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-4">
        <span className="text-sm font-medium text-navy-600">Zwischensumme</span>
        <span className="text-base font-semibold text-navy-900">
          {formatChf(subtotalCents)}
        </span>
      </div>
      <p className="mt-2 text-xs leading-5 text-navy-500">
        {shopConfig.shippingNotice}
      </p>
    </div>
  );
}

/** Client island of the /checkout scaffold — only reads persisted cart state. */
export function CheckoutScaffold() {
  return (
    <CartProvider>
      <CartSummary />
    </CartProvider>
  );
}
