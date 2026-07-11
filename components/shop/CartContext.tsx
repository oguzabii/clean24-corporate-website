"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartLine {
  key: string; // `${productId}:${variantId}`
  productId: string;
  productSlug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  /** Concrete price in Rappen. Only purchasable (priced) variants get here. */
  priceCents: number;
  visual: string;
  image?: string;
  qty: number;
}

interface CartApi {
  lines: CartLine[];
  isOpen: boolean;
  count: number;
  subtotalCents: number;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
}

const CartContext = createContext<CartApi | null>(null);
const STORAGE_KEY = "clean24-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load the persisted cart once after mount. This is a legitimate one-time
  // sync from an external store (localStorage) and must run post-hydration to
  // avoid an SSR mismatch, so the set-state-in-effect rule is disabled here.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration load
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (once hydrated).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [lines, hydrated]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  // Only purchasable (available + priced) variants ever reach this call — the
  // ProductCard gates it via isVariantPurchasable(), so the cart can never hold
  // coming-soon / out-of-stock / price-less items. Subtotals are therefore
  // always over real, addable items.
  const addLine = useCallback(
    (line: Omit<CartLine, "key" | "qty">, qty = 1) => {
      const key = `${line.productId}:${line.variantId}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, qty: l.qty + qty } : l,
          );
        }
        return [...prev, { ...line, key, qty }];
      });
      setIsOpen(true);
    },
    [],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  // ---------------------------------------------------------------------------
  // FUTURE CHECKOUT (not implemented — do NOT fake success):
  // The cart drawer links to shopConfig.checkoutPath (/checkout), which is a
  // scaffold page while shopConfig.checkoutEnabled is false. The real flow
  // will live there later:
  //   1. POST cart lines to `/api/checkout`.
  //   2. Map each { productId, variantId } → a server-side price ID.
  //   3. Create a Stripe Checkout Session (card) and/or TWINT payment.
  //   4. Apply shipping rates and discount codes server-side.
  //   5. Redirect to the payment provider; confirm via webhook, not client.
  // ---------------------------------------------------------------------------

  const { count, subtotalCents } = useMemo(() => {
    return lines.reduce(
      (acc, l) => ({
        count: acc.count + l.qty,
        subtotalCents: acc.subtotalCents + l.qty * l.priceCents,
      }),
      { count: 0, subtotalCents: 0 },
    );
  }, [lines]);

  const value: CartApi = {
    lines,
    isOpen,
    count,
    subtotalCents,
    openCart,
    closeCart,
    addLine,
    setQty,
    removeLine,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
