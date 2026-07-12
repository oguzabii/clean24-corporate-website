import type { Metadata } from "next";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { CheckoutSessionNotice } from "@/components/shop/CheckoutSessionNotice";

export const metadata: Metadata = {
  title: "Zahlung wird geprüft",
  description:
    "Die Zahlung wird serverseitig bestätigt. Eine Weiterleitung allein gilt nicht als Zahlungsbestätigung.",
  // Transaction-state page: never index, not in the sitemap.
  robots: { index: false, follow: false },
};

/**
 * Stripe success-redirect landing page.
 *
 * HONESTY RULES (do not weaken):
 *  - Reaching this page proves NOTHING about payment. Confirmation comes
 *    only from the signature-verified webhook (Phase 13B persists it).
 *  - No order number, no "Bestellung bestätigt", no fake success.
 *  - The cart is NOT cleared here — only a verified, persisted order may
 *    ever justify clearing it.
 */
export default function CheckoutSuccessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Zahlung wird geprüft"
        lead="Die Zahlung wird serverseitig bestätigt. Eine erfolgreiche Weiterleitung allein gilt noch nicht als Zahlungsbestätigung."
      />

      <Section tone="mist">
        <div className="mx-auto max-w-2xl rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
          <h2 className="text-base font-semibold tracking-tight text-navy-900">
            Was passiert jetzt?
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-navy-600">
            <li>
              Die definitive Bestätigung der Zahlung erfolgt über eine
              verifizierte Rückmeldung des Zahlungsanbieters an unseren Server
              — nicht über diese Seite.
            </li>
            <li>
              Ihr Warenkorb bleibt unverändert erhalten, bis eine Bestellung
              verbindlich bestätigt ist.
            </li>
            <li>
              Bei Fragen zum Stand einer Zahlung erreichen Sie uns jederzeit
              direkt.
            </li>
          </ul>
          <Suspense fallback={null}>
            <CheckoutSessionNotice />
          </Suspense>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop" variant="primary" size="md">
              Zurück zum Shop
            </Button>
            <Button href="/kontakt" variant="outline" size="md">
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
