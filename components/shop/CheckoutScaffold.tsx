"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CartProvider, useCart } from "./CartContext";
import { ProductVisual } from "./ProductVisual";
import { formatChf, type ProductVisual as VisualKind } from "@/data/shop";
import { shopConfig } from "@/data/shop-config";
import type {
  CheckoutErrorCode,
  CheckoutErrorResponse,
  CreateCheckoutRequest,
} from "@/lib/shop/checkout-types";

/** User-facing German messages for typed checkout errors. */
const checkoutErrorMessages: Partial<Record<CheckoutErrorCode, string>> = {
  CHECKOUT_DISABLED: "Der Online-Checkout wird aktuell vorbereitet.",
  SHOP_PRELAUNCH: "Der Shop ist noch nicht für den Verkauf freigeschaltet.",
  EMPTY_CART: "Ihr Warenkorb ist leer.",
  INVALID_PAYLOAD: "Die Anfrage war ungültig. Bitte laden Sie die Seite neu.",
  PRODUCT_NOT_FOUND: "Ein Produkt im Warenkorb ist nicht mehr im Sortiment.",
  VARIANT_NOT_FOUND: "Eine Variante im Warenkorb ist nicht mehr im Sortiment.",
  PRODUCT_UNAVAILABLE: "Ein Produkt im Warenkorb ist derzeit nicht verfügbar.",
  VARIANT_UNAVAILABLE: "Eine Variante im Warenkorb ist derzeit nicht verfügbar.",
  PRICE_NOT_FINAL: "Ein Preis im Warenkorb ist noch nicht final.",
  CHECKOUT_NOT_CONFIGURED: "Der Checkout ist derzeit nicht möglich.",
  ORDER_PERSISTENCE_DISABLED: "Der Checkout ist derzeit nicht möglich.",
  PROVIDER_ERROR: "Der Zahlungsanbieter ist derzeit nicht erreichbar.",
};

/**
 * FUTURE enabled-mode start button — renders only when
 * shopConfig.checkoutEnabled is true, i.e. NOT in this phase.
 *
 * Contract: sends ONLY { productId, variantId, quantity } per line. Prices,
 * names and subtotals from localStorage are display-only and are never sent
 * as trusted checkout values — the server reprices everything.
 */
function StartCheckoutButton() {
  const { lines } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    // Duplicate-click guard: ignore while a request is in flight.
    if (busy || lines.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const payload: CreateCheckoutRequest = {
        items: lines.map((l) => ({
          productId: l.productId,
          variantId: l.variantId,
          quantity: l.qty,
        })),
      };
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: unknown = await res.json().catch(() => null);
      const url =
        res.ok && data && typeof (data as { url?: unknown }).url === "string"
          ? (data as { url: string }).url
          : null;
      // Only follow Stripe-hosted checkout URLs (no open redirects). Extend
      // deliberately if a custom Stripe checkout domain is configured later.
      if (url && url.startsWith("https://checkout.stripe.com/")) {
        window.location.assign(url);
        return; // stay "busy" during the redirect
      }
      const code = (data as Partial<CheckoutErrorResponse> | null)?.code;
      setError(
        (code && checkoutErrorMessages[code]) ??
          "Der Checkout ist derzeit nicht möglich.",
      );
      setBusy(false);
    } catch {
      setError("Der Checkout ist derzeit nicht möglich.");
      setBusy(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        disabled={busy || lines.length === 0}
        onClick={startCheckout}
        className="inline-flex h-12 w-full items-center justify-center rounded-md bg-teal-500 px-6 text-sm font-semibold text-navy-950 transition-colors hover:bg-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Weiterleitung …" : "Zur Zahlung"}
      </button>
      {error ? (
        <p role="alert" className="mt-2 text-xs leading-5 text-navy-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

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
      {/* Enabled-mode path stays INACTIVE this phase: checkoutEnabled is
          false, so the disabled/preparation experience is unchanged and no
          request to /api/checkout is ever made. */}
      {shopConfig.checkoutEnabled ? <StartCheckoutButton /> : null}
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
