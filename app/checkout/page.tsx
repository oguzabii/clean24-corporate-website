import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { CheckoutSteps } from "@/components/shop/CheckoutSteps";
import { CheckoutScaffold } from "@/components/shop/CheckoutScaffold";
import { shopConfig } from "@/data/shop-config";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Der Online-Checkout von Clean24 wird aktuell vorbereitet. Produktdaten, Versand und Zahlung werden vor dem Live-Verkauf finalisiert.",
};

/**
 * Checkout scaffold — NOT a real checkout.
 *
 * While shopConfig.checkoutEnabled is false this page only previews the
 * future flow: step indicator, read-only cart summary and CTAs back to the
 * shop. No customer data is collected, nothing is submitted, no payment
 * exists, no order is confirmed.
 *
 * FUTURE (when checkoutEnabled flips after launch verification): replace the
 * scaffold below with the real flow — customer data → shipping → payment via
 * POST /api/checkout (Stripe Checkout / TWINT), server-verified prices and
 * webhook-confirmed orders. See docs/shop-catalog.md, section 13.
 */
export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={shopConfig.checkoutDisabledTitle}
        lead={shopConfig.checkoutDisabledMessage}
      />

      <Section tone="mist">
        {/* Preview of the future checkout steps */}
        <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
          <h2 className="text-base font-semibold tracking-tight text-navy-900">
            So wird der Checkout ablaufen
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-navy-600">
            Der Online-Checkout wird in diesen Schritten aufgebaut. Aktuell
            ist noch keine Bestellung möglich.
          </p>
          <div className="mt-6">
            <CheckoutSteps activeIndex={0} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Read-only cart summary (client island, localStorage) */}
          <CheckoutScaffold />

          {/* Status + CTAs */}
          <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <h2 className="text-base font-semibold tracking-tight text-navy-900">
              Wie geht es weiter?
            </h2>
            <p className="mt-3 text-sm leading-6 text-navy-600">
              Produktdaten, Preise, Versand und Zahlung werden vor dem
              Live-Verkauf finalisiert. Für Fragen oder Bestellungen ausserhalb
              des Online-Shops erreichen Sie uns jederzeit direkt.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                href={shopConfig.checkoutDisabledCtaHref}
                variant="primary"
                size="md"
              >
                {shopConfig.checkoutDisabledCtaLabel}
              </Button>
              <Button href="/kontakt" variant="outline" size="md">
                Kontakt aufnehmen
              </Button>
            </div>
            <p className="mt-5 border-t border-navy-100 pt-4 text-xs leading-5 text-navy-500">
              Es werden keine Kundendaten erfasst und keine Zahlungen
              verarbeitet, solange der Checkout in Vorbereitung ist.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
