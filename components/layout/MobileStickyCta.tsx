"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/cta";
import { contact } from "@/data/contact";

/**
 * Mobile-only sticky conversion bar fixed to the bottom of the viewport.
 * Hidden on large screens. The leading spacer prevents the fixed bar from
 * covering page content. Pure CSS — no client-side JavaScript.
 */
export function MobileStickyCta() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px", threshold: 0.01 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="h-20 lg:hidden" aria-hidden />
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-navy-100 bg-white/95 backdrop-blur transition-transform duration-300 lg:hidden ${
          hidden ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          <div className="min-w-0 flex-1">
            <Button
              href={contact.phoneHref}
              variant="outline"
              size="md"
              className="h-11 w-full px-3 text-sm"
            >
              Anrufen
            </Button>
          </div>
          <div className="min-w-0 flex-1">
            <Button
              href={cta.primary.href}
              variant="accent"
              size="md"
              className="h-11 w-full px-3 text-sm"
            >
              {cta.primary.label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
