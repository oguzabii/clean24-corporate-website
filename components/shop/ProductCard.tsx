"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductVisual } from "./ProductVisual";
import { useCart } from "./CartContext";
import { formatChf, type Product } from "@/data/shop";

/** A single shop product with variant selector and add-to-cart. */
export function ProductCard({ product }: { product: Product }) {
  const { addLine } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

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
        {product.availability === "coming-soon" ? (
          <span className="absolute left-4 top-4 rounded-full bg-navy-950/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Bald verfügbar
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
          {product.category}
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
              {formatChf(variant.priceCents)}
            </div>
            <div className="text-xs text-navy-500">inkl. MwSt.</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            addLine({
              productSlug: product.slug,
              variantId: variant.id,
              name: product.name,
              variantLabel: variant.label,
              priceCents: variant.priceCents,
              visual: product.visual,
              image: product.image,
            })
          }
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-navy-800 px-6 text-sm font-medium text-white transition-colors hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2"
        >
          In den Warenkorb
        </button>
      </div>
    </div>
  );
}
