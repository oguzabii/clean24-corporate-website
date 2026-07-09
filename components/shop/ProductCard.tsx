"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductVisual } from "./ProductVisual";
import { useCart } from "./CartContext";
import {
  categoryLabel,
  isVariantPurchasable,
  variantPriceLabel,
  type Product,
  type ProductVariant,
} from "@/data/shop";

/** Small badge on the product visual for non-available states / marketing. */
function availabilityBadge(product: Product): string | null {
  if (product.availability === "coming-soon") return "Bald verfügbar";
  if (product.availability === "out-of-stock") return "Nicht verfügbar";
  return product.badge ?? null;
}

/** Add-to-cart button label + disabled state for the selected variant. */
function addButtonState(
  product: Product,
  variant: ProductVariant,
): { label: string; disabled: boolean } {
  if (isVariantPurchasable(product, variant)) {
    return { label: "In den Warenkorb", disabled: false };
  }
  // Not purchasable — surface the most specific reason.
  const availability =
    product.availability === "available"
      ? variant.availability
      : product.availability;
  if (availability === "out-of-stock") {
    return { label: "Nicht verfügbar", disabled: true };
  }
  // coming-soon, or available-but-not-yet-priced.
  return { label: "Bald verfügbar", disabled: true };
}

/** A single shop product with variant selector and availability-aware cart. */
export function ProductCard({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  const badge = availabilityBadge(product);
  const { label: buttonLabel, disabled } = addButtonState(product, variant);
  const priced = typeof variant.priceCents === "number";

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-[4/3]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <ProductVisual kind={product.visual} className="h-full w-full" />
        )}
        {badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-navy-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
          {categoryLabel(product.categoryId)}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-navy-900">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-navy-600">
          {product.description}
        </p>

        {/* Variant selector */}
        <div className="mt-5">
          <span className="text-xs font-medium text-navy-500">Variante</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
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
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-lg font-semibold text-navy-900">
              {variantPriceLabel(variant)}
            </div>
            <div className="text-xs text-navy-500">
              {priced && variant.vatIncluded ? "inkl. MwSt." : " "}
            </div>
          </div>
        </div>

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
          className={`mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md px-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 ${
            disabled
              ? "cursor-not-allowed bg-navy-100 text-navy-400"
              : "bg-navy-800 text-white hover:bg-navy-700"
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
