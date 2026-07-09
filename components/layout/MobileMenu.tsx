"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/data/navigation";
import { cta } from "@/data/cta";
import { contact } from "@/data/contact";

/**
 * Mobile navigation: a hamburger button that opens a full-height drawer with
 * stacked links. Grouped items use native <details> accordions (accessible,
 * no extra state). Closes on link click, Escape, or overlay click.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menü öffnen"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-800 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {/* Portal to <body>: the header's backdrop-blur creates a containing
          block that would otherwise trap this fixed overlay inside the header. */}
      {open
        ? createPortal(
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl"
            role="dialog"
            aria-label="Navigation"
          >
            <div className="flex h-16 items-center justify-between border-b border-navy-100 px-5">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-navy-500">
                Menü
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Menü schliessen"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-800 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Mobile Navigation">
              {mainNav.map((item) =>
                item.items ? (
                  <details key={item.label} className="group border-b border-navy-100/70">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-3.5 text-base font-medium text-navy-900 marker:content-none">
                      {item.label}
                      <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 text-navy-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M2.5 4.5 6 8l3.5-3.5" />
                      </svg>
                    </summary>
                    <ul className="pb-2">
                      {item.items.map((link, i) => (
                        <li key={`${link.label}-${i}`}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-md px-6 py-2.5 text-sm text-navy-600 transition-colors hover:bg-mist hover:text-navy-900"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-navy-100/70 px-3 py-3.5 text-base font-medium text-navy-900 transition-colors hover:text-teal-600"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="space-y-3 border-t border-navy-100 px-5 py-5">
              <Button
                href={cta.primary.href}
                size="md"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {cta.primary.label}
              </Button>
              <div className="flex items-center justify-between text-sm">
                <a href={contact.phoneHref} className="font-medium text-navy-800 hover:text-teal-600">
                  {contact.phone}
                </a>
                <a href={contact.emailHref} className="font-medium text-navy-800 hover:text-teal-600">
                  {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>,
            document.body,
          )
        : null}
    </div>
  );
}
