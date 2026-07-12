import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Zahlung nicht abgeschlossen",
  description:
    "Der Zahlungsvorgang wurde abgebrochen oder nicht abgeschlossen. Der Warenkorb bleibt erhalten.",
  // Transaction-state page: never index, not in the sitemap.
  robots: { index: false, follow: false },
};

/**
 * Stripe cancel-redirect landing page. The cart is NOT touched — it lives in
 * localStorage and this page never clears or modifies it.
 */
export default function CheckoutCancelPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Zahlung nicht abgeschlossen"
        lead="Der Zahlungsvorgang wurde abgebrochen oder nicht abgeschlossen. Ihr Warenkorb bleibt erhalten."
      />

      <Section tone="mist">
        <div className="mx-auto max-w-2xl rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
          <h2 className="text-base font-semibold tracking-tight text-navy-900">
            Wie möchten Sie fortfahren?
          </h2>
          <p className="mt-3 text-sm leading-6 text-navy-600">
            Es wurde keine Zahlung ausgeführt. Ihre Warenkorb-Artikel sind
            weiterhin gespeichert — Sie können den Checkout jederzeit erneut
            starten oder weiter einkaufen.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/checkout" variant="primary" size="md">
              Zurück zum Checkout
            </Button>
            <Button href="/shop" variant="outline" size="md">
              Zurück zum Shop
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
