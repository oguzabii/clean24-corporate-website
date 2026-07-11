import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopExperience } from "@/components/shop/ShopExperience";
import { ShopInfoLinks } from "@/components/shop/ShopInfoLinks";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Clean24 Shop – Reinigungssets und Zubehör für Objektpflege und Wohnungsabgaben. Der Shop befindet sich im Aufbau; der Online-Checkout wird vorbereitet.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Shop"
        lead="Ausgewählte Produkte rund um Reinigung, Pflege und Wohnungsabgaben – direkt von Clean24."
      />

      <Section tone="mist">
        <ShopExperience />

        {/* Shop information pages (Versand, Retoure, FAQ) */}
        <div className="mt-12 border-t border-navy-100 pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-500">
            Shop-Informationen
          </h2>
          <ShopInfoLinks className="mt-3" />
        </div>
      </Section>
    </>
  );
}
