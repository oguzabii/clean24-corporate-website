"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { ProductVisual } from "./ProductVisual";
import { formatChf, type ProductVisual as VisualKind } from "@/data/shop";
import { shopConfig } from "@/data/shop-config";

/** Right-side Warenkorb drawer. Full-width on mobile, panel on desktop. */
export function CartDrawer() {
  const { lines, isOpen, subtotalCents, closeCart, setQty, removeLine } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden
      />
      <div
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
        role="dialog"
        aria-label="Warenkorb"
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-navy-100 px-5">
          <span className="text-base font-semibold tracking-tight text-navy-900">
            Warenkorb
          </span>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Warenkorb schliessen"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-800 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-medium text-navy-900">
                Ihr Warenkorb ist leer.
              </p>
              <p className="mt-2 text-sm text-navy-500">
                Fügen Sie Produkte hinzu, um sie hier zu sehen.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-navy-100">
                    {line.image ? (
                      <Image
                        src={line.image}
                        alt={line.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <ProductVisual
                        kind={line.visual as VisualKind}
                        className="h-full w-full"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-navy-900">
                          {line.name}
                        </p>
                        <p className="text-xs text-navy-500">
                          {line.variantLabel}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        aria-label={`${line.name} entfernen`}
                        className="text-navy-400 transition-colors hover:text-navy-800"
                      >
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                          <path d="M5 5l10 10M15 5L5 15" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      {/* Quantity controls */}
                      <div className="inline-flex items-center rounded-md border border-navy-200">
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty - 1)}
                          aria-label="Menge verringern"
                          className="flex h-8 w-8 items-center justify-center text-navy-700 transition-colors hover:bg-navy-50"
                        >
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                            <path d="M3 8h10" />
                          </svg>
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums text-navy-900">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty + 1)}
                          aria-label="Menge erhöhen"
                          className="flex h-8 w-8 items-center justify-center text-navy-700 transition-colors hover:bg-navy-50"
                        >
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                            <path d="M8 3v10M3 8h10" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-navy-900">
                        {formatChf(line.priceCents * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / checkout */}
        {lines.length > 0 ? (
          <div className="border-t border-navy-100 px-5 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-navy-600">
                Zwischensumme
              </span>
              <span className="text-lg font-semibold text-navy-900">
                {formatChf(subtotalCents)}
              </span>
            </div>
            <p className="mt-2 text-xs text-navy-500">
              {shopConfig.shippingNotice}
            </p>

            {/* Leads to the /checkout scaffold. While
                shopConfig.checkoutEnabled is false that page only shows the
                preparation state — no payment, no data collection, no fake
                success. This block renders only when the cart has items. */}
            <Link
              href={shopConfig.checkoutPath}
              onClick={closeCart}
              className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-md bg-teal-500 px-6 text-sm font-semibold text-navy-950 transition-colors hover:bg-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
            >
              Zum Checkout
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
