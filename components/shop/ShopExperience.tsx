"use client";

import { CartProvider, useCart } from "./CartContext";
import { ProductCard } from "./ProductCard";
import { CartDrawer } from "./CartDrawer";
import { products } from "@/data/shop";

/** Sticky cart toggle showing the current item count. */
function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      className="inline-flex items-center gap-2 rounded-md border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-800 shadow-sm transition-colors hover:border-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
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

export function ShopExperience() {
  return (
    <CartProvider>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-navy-600">
          Der Clean24 Shop befindet sich im Aufbau. Produkte, Preise und
          Verfügbarkeit sind Beispielangaben – der Online-Checkout wird aktuell
          vorbereitet.
        </p>
        <div className="shrink-0">
          <CartButton />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <CartDrawer />
    </CartProvider>
  );
}
