import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ShopExperience } from "@/components/shop/ShopExperience";

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
        title="Clean24 Shop."
        lead="Reinigungssets und Zubehör für Objektpflege, Küche, Bad und Wohnungsabgaben – zusammengestellt für verlässliche Ergebnisse."
      />

      <Section tone="mist">
        <ShopExperience />
      </Section>
    </>
  );
}
