"use client";

import { useState } from "react";
import { CartProvider, useCart } from "./CartContext";
import { CartDrawer } from "./CartDrawer";
import {
  formatChf,
  getAddToCartState,
  getProductAvailabilityLabel,
  isProductPurchasable,
  isProductReady,
  isVariantPurchasable,
  variantPriceLabel,
  type Product,
} from "@/data/shop";
import { shopConfig } from "@/data/shop-config";

/** Compact cart toggle for the product detail page. */
function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      className="inline-flex items-center gap-2 rounded-md border border-navy-200 bg-white px-3.5 py-2 text-sm font-medium text-navy-800 shadow-sm transition-colors hover:border-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6 5 3H3" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      Warenkorb
      {count > 0 ? (
        <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-teal-500 px-1.5 text-xs font-semibold text-navy-950">
          {count}
        </span>
      ) : null}
    </button>
  );
}

function PurchasePanel({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  const { label: buttonLabel, disabled } = getAddToCartState(product, variant);
  const priced = typeof variant.priceCents === "number";
  const purchasable = isProductPurchasable(product);
  const availabilityLabel = getProductAvailabilityLabel(product);

  return (
    <div>
      {/* Availability + cart access */}
      <div className="flex items-center justify-between gap-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
            product.availability === "available"
              ? "bg-teal-50 text-teal-800"
              : "bg-navy-50 text-navy-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              product.availability === "available"
                ? "bg-teal-500"
                : "bg-navy-300"
            }`}
            aria-hidden
          />
          {availabilityLabel}
        </span>
        <CartButton />
      </div>

      {/* Variant selector */}
      <div className="mt-6">
        <span className="text-xs font-medium uppercase tracking-wide text-navy-500">
          Variante
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.variants.map((v) => {
            const active = v.id === variantId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-teal-400 bg-teal-500 text-white"
                    : "border-navy-200 bg-white text-navy-700 hover:border-teal-300"
                }`}
              >
                {v.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-navy-500">
          Einheit: {variant.unit}
        </p>
      </div>

      {/* Price */}
      <div className="mt-6">
        <div className="text-2xl font-semibold tracking-tight text-navy-900">
          {variantPriceLabel(variant)}
        </div>
        <div className="mt-1 text-xs text-navy-500">
          {/* "Preis folgt" explanation only when there is truly no price —
              a priced, VAT-exclusive variant must not claim otherwise. */}
          {!priced
            ? "Der Preis wird vor dem Live-Verkauf festgelegt."
            : variant.vatIncluded
              ? shopConfig.vatDisplayText
              : " "}
        </div>
        {typeof variant.compareAtPriceCents === "number" ? (
          <div className="mt-1 text-sm text-navy-400 line-through">
            {formatChf(variant.compareAtPriceCents)}
          </div>
        ) : null}
      </div>

      {/* Add to cart */}
      <button
        type="button"
        disabled={disabled}
        aria-disabled={disabled}
        onClick={() => {
          // Guard: never add a non-purchasable variant to the cart.
          if (!isVariantPurchasable(product, variant)) return;
          addLine({
            productId: product.id,
            productSlug: product.slug,
            variantId: variant.id,
            name: product.name,
            variantLabel: variant.label,
            priceCents: variant.priceCents as number,
            visual: product.visual,
            image: product.image,
          });
        }}
        className={`mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 ${
          disabled
            ? "cursor-not-allowed bg-navy-100 text-navy-400"
            : "bg-navy-800 text-white hover:bg-navy-700"
        }`}
      >
        {buttonLabel}
      </button>

      {/* Neutral prelaunch notice: not-yet-purchasable products explain why;
          purchasable-but-not-ready entries still flag non-final data. */}
      {!purchasable ? (
        <p className="mt-3 text-xs leading-5 text-navy-500">
          Dieses Produkt ist noch nicht online bestellbar.{" "}
          {shopConfig.prelaunchNotice}
        </p>
      ) : !isProductReady(product) ? (
        <p className="mt-3 text-xs leading-5 text-navy-500">
          {shopConfig.prelaunchNotice}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Client purchase area for /shop/[slug]. Self-contained: brings its own
 * CartProvider + CartDrawer. Cart contents persist via localStorage, so the
 * cart stays consistent between the shop grid and detail pages.
 */
export function ProductPurchasePanel({ product }: { product: Product }) {
  return (
    <CartProvider>
      <PurchasePanel product={product} />
      <CartDrawer />
    </CartProvider>
  );
}
