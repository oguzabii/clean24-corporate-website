import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { ShopInfoLinks } from "@/components/shop/ShopInfoLinks";
import { formatChf } from "@/data/shop";
import { shopConfig } from "@/data/shop-config";

export const metadata: Metadata = {
  title: "Versand & Zahlung",
  description:
    "Informationen zu Versand und Zahlung im Clean24 Shop. Versandoptionen, Kosten und Zahlungsarten werden vor dem Live-Verkauf finalisiert.",
};

/** Shop info page — honest prelaunch state, no shipping/payment claims. */
export default function VersandZahlungPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Versand & Zahlung"
        lead="Der Online-Shop befindet sich im Aufbau. Hier finden Sie den aktuellen Stand zu Versand und Zahlung."
      />

      <Section tone="mist">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight text-navy-900">
              Versand
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-navy-600">
              <li>
                Versandoptionen und Versandkosten werden vor dem Live-Verkauf
                festgelegt und hier transparent ausgewiesen.
              </li>
              <li>{shopConfig.shippingNotice}</li>
              {/* Free-shipping line renders only when a threshold is actually
                  configured — no unbacked free-shipping claims. */}
              {shopConfig.freeShippingThresholdCents !== null ? (
                <li>
                  Gratisversand ab{" "}
                  {formatChf(shopConfig.freeShippingThresholdCents)}.
                </li>
              ) : null}
              <li>
                Angaben zu Lieferfristen folgen, sobald der Versandprozess
                final definiert ist.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight text-navy-900">
              Zahlung
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-navy-600">
              <li>
                Zahlungsarten werden ergänzt, sobald der Online-Checkout live
                geht.
              </li>
              <li>
                Zahlung per Karte und weitere in der Schweiz gängige
                Zahlungsarten werden geprüft.
              </li>
              <li>
                Preise werden in CHF {shopConfig.vatDisplayText} ausgewiesen,
                sofern angegeben.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50/60 p-6 sm:p-8">
          <p className="text-sm leading-6 text-navy-700">
            {shopConfig.checkoutDisabledMessage} Für Fragen zu Produkten oder
            Bestellungen ausserhalb des Online-Shops erreichen Sie uns
            jederzeit direkt.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop" variant="primary" size="md">
              Zum Shop
            </Button>
            <Button href="/kontakt" variant="outline" size="md">
              Kontakt aufnehmen
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-500">
            Weitere Shop-Informationen
          </h2>
          <ShopInfoLinks exclude="/shop/versand-zahlung" className="mt-3" />
        </div>
      </Section>
    </>
  );
}
