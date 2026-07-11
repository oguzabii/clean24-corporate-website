"use client";

import { useMemo, useState } from "react";
import { CartProvider, useCart } from "./CartContext";
import { ProductCard } from "./ProductCard";
import { CartDrawer } from "./CartDrawer";
import { categories, products, sortedProducts } from "@/data/shop";
import { shopConfig } from "@/data/shop-config";

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

/** Category filter tabs: "Alle" + one per category, in catalog order. */
const FILTERS = [{ id: "all", label: "Alle" }, ...categories];

export function ShopExperience() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const visibleProducts = useMemo(() => {
    const all = sortedProducts(products);
    return activeCategory === "all"
      ? all
      : all.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory]);

  return (
    <CartProvider>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-navy-600">
          Produkte, Preise und Verfügbarkeit sind editierbare Katalogangaben –
          der Online-Checkout wird aktuell vorbereitet.
        </p>
        <div className="shrink-0">
          <CartButton />
        </div>
      </div>

      {/* Category filter tabs */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Produktkategorien"
      >
        {FILTERS.map((filter) => {
          const active = filter.id === activeCategory;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveCategory(filter.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                active
                  ? "border-navy-800 bg-navy-800 text-white"
                  : "border-navy-200 bg-white text-navy-700 hover:border-teal-300"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-navy-100 bg-white p-8 text-center text-sm text-navy-500">
          In dieser Kategorie sind derzeit keine Produkte verfügbar.
        </p>
      )}

      {/* Catalog / checkout status note */}
      <p className="mt-10 max-w-3xl text-sm leading-6 text-navy-500">
        Der Online-Checkout wird vorbereitet. {shopConfig.prelaunchNotice}
      </p>

      <CartDrawer />
    </CartProvider>
  );
}
