import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { ShopInfoLinks } from "@/components/shop/ShopInfoLinks";
import { shopConfig } from "@/data/shop-config";

export const metadata: Metadata = {
  title: "Retoure & Rückgabe",
  description:
    "Informationen zu Retoure und Rückgabe im Clean24 Shop. Der Rückgabeprozess wird vor dem Live-Verkauf definiert.",
};

/** Shop info page — no invented return periods, no final legal claims. */
export default function RetourePage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Retoure & Rückgabe"
        lead="Der Rückgabe- und Erstattungsprozess wird vor dem Live-Verkauf definiert und hier veröffentlicht."
      />

      <Section tone="mist">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight text-navy-900">
              Aktueller Stand
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-navy-600">
              <li>
                Die Bedingungen für Rückgaben und Erstattungen werden vor dem
                Start des Online-Verkaufs festgelegt.
              </li>
              <li>
                Rückgabefristen, Ablauf und allfällige Ausnahmen werden hier
                und in den AGB veröffentlicht, sobald sie verbindlich sind.
              </li>
              <li>
                Bis dahin gelten keine hier zugesicherten Rückgabe- oder
                Erstattungsansprüche.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold tracking-tight text-navy-900">
              Nach dem Start des Shops
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-navy-600">
              <li>
                Prüfen Sie erhaltene Produkte nach der Lieferung auf Zustand
                und Vollständigkeit.
              </li>
              <li>
                Bei Fragen zu einer Bestellung oder einem Produkt kontaktieren
                Sie Clean24 direkt — wir finden gemeinsam eine Lösung.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50/60 p-6 sm:p-8">
          <p className="text-sm leading-6 text-navy-700">
            {shopConfig.checkoutDisabledMessage} Auch die Rückgabebedingungen
            werden vor dem Live-Verkauf finalisiert.
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
          <ShopInfoLinks exclude="/shop/retoure" className="mt-3" />
        </div>
      </Section>
    </>
  );
}
