import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { getPublicOrderStatusForSession } from "@/lib/shop/order-repository";
import type { PublicOrderStatus } from "@/lib/shop/order-types";

export const metadata: Metadata = {
  title: "Checkout-Status",
  description:
    "Der Status Ihrer Zahlung wird serverseitig geprüft. Eine Weiterleitung allein gilt nicht als Zahlungsbestätigung.",
  // Transaction-state page: never index, not in the sitemap.
  robots: { index: false, follow: false },
};

/**
 * Stripe success-redirect landing page (Phase 13B1).
 *
 * HONESTY RULES (do not weaken):
 *  - The session_id query param is ONLY a lookup key — the persisted,
 *    webhook-driven order status is the sole authority. Reaching this page
 *    proves nothing.
 *  - "Zahlung bestätigt" is shown EXCLUSIVELY when the database says the
 *    order is `paid` (set by the verified webhook), never from the redirect.
 *  - No internal UUIDs, no address/customer data, no fake status when the
 *    database is unavailable.
 *  - The cart is NOT cleared here (deliberate — future, separately reviewed
 *    behavior once real orders exist).
 */

function statusContent(status: PublicOrderStatus): {
  title: string;
  lead: string;
  detail: string[];
  orderNumber?: string;
} {
  switch (status.kind) {
    case "paid":
      return {
        title: "Zahlung bestätigt",
        lead: "Ihre Zahlung wurde serverseitig bestätigt.",
        detail: [
          `Ihre Bestellnummer: ${status.orderNumber}`,
          "Sie erreichen uns bei Fragen zu Ihrer Bestellung jederzeit direkt — bitte geben Sie dabei Ihre Bestellnummer an.",
        ],
        orderNumber: status.orderNumber,
      };
    case "processing":
      return {
        title: "Zahlung wird verarbeitet",
        lead: "Die Zahlung ist eingegangen und wird verarbeitet. Die endgültige Bestätigung erfolgt serverseitig.",
        detail: [
          "Bei einigen Zahlungsarten dauert die Bestätigung etwas länger. Der Status wird automatisch aktualisiert, sobald der Zahlungsanbieter das Ergebnis meldet.",
        ],
      };
    case "unknown":
      return {
        title: "Zahlung wird geprüft",
        lead: "Die Zahlungsreferenz konnte noch nicht zugeordnet werden.",
        detail: [
          "Die definitive Bestätigung erfolgt über eine verifizierte Rückmeldung des Zahlungsanbieters an unseren Server. Bei Fragen erreichen Sie uns jederzeit direkt.",
        ],
      };
    case "unavailable":
      return {
        title: "Zahlung wird geprüft",
        lead: "Die Zahlung wird serverseitig bestätigt. Eine erfolgreiche Weiterleitung allein gilt noch nicht als Zahlungsbestätigung.",
        detail: [
          "Eine Zahlungsreferenz wurde übermittelt und wird ausschliesslich serverseitig geprüft. Der Status kann derzeit nicht abgerufen werden — bitte betrachten Sie diese Seite nicht als Bestellbestätigung.",
        ],
      };
    case "not-confirmed":
      return {
        title: "Zahlung wird geprüft",
        lead: "Die Zahlung ist noch nicht bestätigt.",
        detail: [
          "Sobald der Zahlungsanbieter das Ergebnis verbindlich meldet, wird der Status serverseitig aktualisiert. Diese Seite gilt nicht als Bestellbestätigung.",
        ],
      };
    case "no-reference":
    default:
      return {
        title: "Zahlung wird geprüft",
        lead: "Die Zahlung wird serverseitig bestätigt. Eine erfolgreiche Weiterleitung allein gilt noch nicht als Zahlungsbestätigung.",
        detail: [
          "Die definitive Bestätigung der Zahlung erfolgt über eine verifizierte Rückmeldung des Zahlungsanbieters an unseren Server — nicht über diese Seite.",
        ],
      };
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const status = await getPublicOrderStatusForSession(session_id);
  const content = statusContent(status);

  return (
    <>
      <PageHeader eyebrow="Shop" title={content.title} lead={content.lead} />

      <Section tone="mist">
        <div className="mx-auto max-w-2xl rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
          <h2 className="text-base font-semibold tracking-tight text-navy-900">
            {status.kind === "paid" ? "Ihre Bestellung" : "Was passiert jetzt?"}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-navy-600">
            {content.detail.map((line) => (
              <li key={line}>{line}</li>
            ))}
            {status.kind !== "paid" ? (
              <li>
                Ihr Warenkorb bleibt unverändert erhalten, bis eine Bestellung
                verbindlich bestätigt ist.
              </li>
            ) : null}
          </ul>
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
