# Clean24 Shop – Produkt-Intake-Template

Copy/Paste-Vorlage für die Erfassung **echter** Produkte. Pro Produkt eine
Kopie dieses Templates ausfüllen; danach den Eintrag in
[`data/shop.ts`](../data/shop.ts) übernehmen (siehe Code-Snippet unten) und
`npm run validate:shop` ausführen.

> ⚠️ Kein Produkt auf `availability: "available"` stellen, bevor Preis,
> Bestand und rechtliche Angaben verifiziert sind. Interne Status-Felder
> (`dataStatus`, `pricingStatus`, …) ehrlich pflegen — sie sind die
> Grundlage der Launch-Freigabe.

---

## Produkt-Grunddaten

| Feld               | Wert |
| ------------------ | ---- |
| Produktname        |      |
| Slug (URL)         |      |
| Kategorie          | `reinigungsprodukte` / `zubehoer` / `wohnungsabgabe` / `objektpflege` / `sets` |
| Kurzbeschreibung   |      |
| Lange Beschreibung |      |
| Badge (optional, ehrlich) |      |
| Tags (optional)    |      |

## Varianten

*Eine Zeile pro Variante — mindestens eine.*

| Varianten-Label | Einheit | SKU | Preis CHF inkl. MwSt. | Streichpreis (optional) | Verfügbarkeit | Versandklasse |
| --------------- | ------- | --- | --------------------- | ----------------------- | ------------- | ------------- |
|                 |         |     |                       |                         | `available` / `coming-soon` / `out-of-stock` |               |

## Medien

| Feld                    | Wert |
| ----------------------- | ---- |
| Hauptbild-Dateiname     | `produkt-slug-main.jpg` |
| Galerie-Dateinamen      | `produkt-slug-01.jpg`, … |
| Bild-Status             | `placeholder` / `provided` / `final` |

Bildvorgaben: siehe [`public/shop/products/README.md`](../public/shop/products/README.md).

## Produkt-Readiness (intern)

| Feld           | Wert |
| -------------- | ---- |
| Data-Status    | `draft` / `needs-review` / `ready` |
| Pricing-Status | `missing` / `placeholder` / `final` |
| Stock-Status   | `unknown` / `limited` / `in-stock` / `out-of-stock` |
| Legal-Status   | `needs-review` / `reviewed` |
| Interne Notiz  |      |

## Öffentliche Detailfelder (optional)

| Feld                        | Wert |
| --------------------------- | ---- |
| Geeignet für (Liste)        |      |
| Anwendung / Hinweise        |      |
| Pflegehinweise              |      |
| Material / Inhalt           |      |
| Sicherheits-/Warnhinweise   |      |
| Versandhinweise             |      |

---

## Code-Snippet für `data/shop.ts`

```ts
{
  id: "produkt-slug",
  slug: "produkt-slug",
  name: "Produktname",
  categoryId: "zubehoer",
  description: "Kurzbeschreibung.",
  longDescription: "Lange Beschreibung.",
  image: "/shop/products/produkt-slug-main.jpg",
  gallery: ["/shop/products/produkt-slug-01.jpg"],
  visual: "set", // Fallback, falls Bild fehlt
  availability: "coming-soon", // erst nach Verifikation auf "available"
  sortOrder: 90,
  // Öffentliche Detailfelder (nur ausfüllen, was geprüft ist)
  suitableFor: ["…"],
  usageNotes: "…",
  careInstructions: "…",
  ingredientsOrMaterials: "…",
  warningNotes: "…",
  shippingNotes: "…",
  // Interne Readiness — ehrlich pflegen
  dataStatus: "needs-review",
  productDataNote: "…",
  imageStatus: "provided",
  pricingStatus: "final",
  stockStatus: "in-stock",
  legalStatus: "needs-review",
  variants: [
    {
      id: "standard",
      label: "Standard",
      unit: "Stück",
      sku: "C24-XXX-001",
      priceCents: 1990, // CHF 19.90, in Rappen
      vatIncluded: true,
      availability: "coming-soon",
      shippingClass: "standard",
    },
  ],
},
```

---

## Checkliste vor Veröffentlichung

- [ ] Produktname verifiziert
- [ ] Preis verifiziert (inkl. MwSt., in Rappen erfasst)
- [ ] MwSt-Wording geprüft
- [ ] Bestand verifiziert (`stockStatus` gesetzt)
- [ ] Produktfoto verifiziert (Original, keine Stock-Fotos)
- [ ] Sicherheits-/Warntexte geprüft
- [ ] Versand / Retouren / AGB geprüft
- [ ] `npm run validate:shop` ohne Fehler
- [ ] Checkout-Test durchgeführt (erst möglich, wenn der Online-Checkout in
      einer späteren Phase live geht)
