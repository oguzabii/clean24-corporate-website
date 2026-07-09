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
  key: string; // `${productSlug}:${variantId}`
  productSlug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  priceCents: number;
  visual: string;
  image?: string;
  qty: number;
}

export type CheckoutState = "idle" | "preparing";

interface CartApi {
  lines: CartLine[];
  isOpen: boolean;
  count: number;
  subtotalCents: number;
  checkoutState: CheckoutState;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  startCheckout: () => void;
}

const CartContext = createContext<CartApi | null>(null);
const STORAGE_KEY = "clean24-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState<CheckoutState>("idle");
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

  const addLine = useCallback(
    (line: Omit<CartLine, "key" | "qty">, qty = 1) => {
      const key = `${line.productSlug}:${line.variantId}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, qty: l.qty + qty } : l,
          );
        }
        return [...prev, { ...line, key, qty }];
      });
      setCheckoutState("idle");
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

  // Future: POST to /api/checkout → Stripe Checkout Session with these line
  // items. For now we only surface a "checkout is being prepared" state — no
  // network call, no fake success.
  const startCheckout = useCallback(() => setCheckoutState("preparing"), []);

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
    checkoutState,
    openCart,
    closeCart,
    addLine,
    setQty,
    removeLine,
    startCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
