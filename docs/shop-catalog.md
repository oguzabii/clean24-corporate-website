# Clean24 Shop – Produktkatalog (Editier-Leitfaden)

Dieser Leitfaden beschreibt den **editierbaren Produktkatalog** des Clean24
Shops. Der Katalog ist bewusst so aufgebaut, dass später echte, physische
Produkte verkauft werden können, **ohne die Seite neu strukturieren zu müssen**.

> ⚠️ **Aktueller Stand:** Der Online-Checkout ist **nicht** aktiv. Es gibt keine
> Zahlung, keine Bestellbestätigung und keine garantierten Lagerbestände. Die
> Katalogdaten sind editierbare Platzhalter und müssen vor dem Live-Verkauf
> vollständig geprüft werden.

Zentrale Datei: [`data/shop.ts`](../data/shop.ts)

---

## 1. Produkte bearbeiten (`data/shop.ts`)

Jedes Produkt ist ein Eintrag im Array `products`. Wichtige Felder:

| Feld             | Pflicht | Bedeutung                                                        |
| ---------------- | :-----: | ---------------------------------------------------------------- |
| `id`             |   ja    | Eindeutige, stabile ID (für Warenkorb-Zeilen & spätere Price-IDs)|
| `slug`           |   ja    | URL-tauglicher Bezeichner                                        |
| `name`           |   ja    | Anzeigename                                                      |
| `shortName`      |  nein   | Kurzform für enge UI                                             |
| `categoryId`     |   ja    | Verweis auf eine Kategorie-`id` (siehe unten)                    |
| `description`    |   ja    | Kurzbeschreibung auf der Produktkarte                           |
| `longDescription`|  nein   | Längerer Text für eine spätere Produkt-Detailseite              |
| `image`          |  nein   | Pfad zu echtem Foto (`/shop/products/...`)                       |
| `gallery`        |  nein   | Weitere echte Fotos                                             |
| `visual`         |   ja    | Stil des CSS-Platzhalters, solange kein `image` gesetzt ist      |
| `badge`          |  nein   | Ehrliches Marketing-Label (z. B. „Neu“)                          |
| `tags`           |  nein   | Freie Filter-/Suchbegriffe                                      |
| `suitableFor`    |  nein   | „Geeignet für …“-Hinweise                                       |
| `usageNotes`     |  nein   | Kurze Anwendungshinweise                                        |
| `safetyNote`     |  nein   | Kurzer Sicherheits-/Handhabungshinweis                          |
| `availability`   |   ja    | `available` \| `coming-soon` \| `out-of-stock`                  |
| `variants`       |   ja    | Liste der Varianten (siehe unten)                              |
| `featured`       |  nein   | Für spätere „Featured“-Bereiche                                 |
| `sortOrder`      |  nein   | Kleinere Zahl = weiter vorne im Grid                            |

### Neues Produkt hinzufügen

1. Neuen Eintrag im `products`-Array ergänzen.
2. Eine gültige `categoryId` setzen.
3. `availability` auf **`"coming-soon"`** lassen, bis das Produkt real
   verkäuflich ist.
4. Passenden `visual` wählen (bis ein echtes Foto existiert).

---

## 2. Echte Produktbilder hinzufügen

- Fotos ablegen in: [`public/shop/products/`](../public/shop/products/)
  (siehe die dortige `README.md`).
- Empfohlenes Format: `.jpg` oder `.png`.
- Empfohlenes Seitenverhältnis: quadratisch (1:1) oder Hochformat 4:5.
- Danach im Produkt das Feld `image` setzen, z. B.
  `image: "/shop/products/mikrofasertuecher-set.jpg"`.
- Ohne `image` wird automatisch der gebrandete CSS-Platzhalter
  ([`components/shop/ProductVisual.tsx`](../components/shop/ProductVisual.tsx))
  angezeigt. Es werden **keine** zufälligen Stock-Fotos verwendet.

---

## 3. Verfügbarkeit (`availability`)

Es gibt drei Zustände, auf Produkt- **und** Varianten-Ebene:

| Wert           | Bedeutung                     | Verhalten im Shop                                  |
| -------------- | ----------------------------- | -------------------------------------------------- |
| `available`    | Verkäuflich (real geprüft)    | „In den Warenkorb“ aktiv (nur bei gesetztem Preis) |
| `coming-soon`  | In Vorbereitung               | Badge „Bald verfügbar“, Button deaktiviert         |
| `out-of-stock` | Aktuell nicht verfügbar       | Badge „Nicht verfügbar“, Button deaktiviert        |

**Einzige Quelle der Wahrheit:** die Funktion `isVariantPurchasable(product,
variant)`. Eine Variante ist nur dann in den Warenkorb legbar, wenn **Produkt
UND Variante `available` sind UND ein Preis (`priceCents`) gesetzt ist**.
Dadurch können `coming-soon`/`out-of-stock`/preislose Artikel niemals in den
Warenkorb gelangen.

> Standard für neue Einträge ist `coming-soon`. Setze `available` erst, wenn
> Bestand, Preis und Fulfilment real existieren.

---

## 4. Varianten (`variants`)

Jedes Produkt hat mindestens eine Variante. Felder:

| Feld                  | Pflicht | Bedeutung                                             |
| --------------------- | :-----: | ----------------------------------------------------- |
| `id`                  |   ja    | Eindeutig innerhalb des Produkts                      |
| `label`               |   ja    | Anzeige, z. B. „Standard Set“, „Nachfüllung“          |
| `unit`                |   ja    | Einheit, z. B. „Set“, „Packung“, „Download“           |
| `sku`                 |  nein   | Artikelnummer (später, bei echtem Fulfilment)         |
| `priceCents`          |  nein   | Preis in Rappen; **fehlt** → Anzeige „Preis folgt“    |
| `compareAtPriceCents` |  nein   | Streichpreis für spätere Aktionen                     |
| `vatIncluded`         |   ja    | Ob der Preis inkl. MwSt. ist                          |
| `availability`        |   ja    | Verfügbarkeit dieser Variante                         |
| `shippingClass`       |  nein   | Hinweis für spätere Versandkosten-Logik               |

---

## 5. Preise (Rappen / CHF-Cents)

- Preise werden **in Rappen** gespeichert (Ganzzahl). Beispiel: `2490` =
  **CHF 24.90**.
- Formatierung über `formatChf(cents)` → `"CHF 24.90"`.
- Ist kein finaler Preis bekannt, `priceCents` **weglassen** → die UI zeigt
  **„Preis folgt“** (`variantPriceLabel`).
- Platzhalterpreise sind im Code klar markiert:
  `// Editable placeholder price — replace before production checkout.`
  Diese vor dem Live-Verkauf ersetzen.

---

## 6. Warenkorb-Verhalten

- Nur verkäufliche (verfügbare + bepreiste) Varianten können hinzugefügt werden.
- Eine Warenkorb-Zeile speichert: `productId`, `variantId`, `name`,
  `variantLabel`, `priceCents`, `image`/`visual`, `qty`.
- Der Warenkorb wird in `localStorage` (`clean24-cart-v1`) persistiert.
- Die Zwischensumme summiert nur real hinzugefügte (also verfügbare) Artikel.
- Der Checkout-Button löst **keinen** Kauf aus. Er zeigt ausschliesslich:
  *„Der Online-Checkout wird aktuell vorbereitet. Produktdaten, Versand und
  Zahlung werden vor dem Live-Verkauf finalisiert.“*
  Es gibt **keine** vorgetäuschte Bestellbestätigung.

---

## 7. Was vor dem echten Checkout noch fehlt

Diese Phase ist **kein** Checkout/Payment. Noch offen (spätere Phasen):

- [ ] `/api/checkout`-Route (serverseitig)
- [ ] Stripe Checkout (Karte) und/oder TWINT
- [ ] Zuordnung `productId`/`variantId` → serverseitige **Price-IDs**
- [ ] Versandkosten / Versandzonen (`shippingClass`)
- [ ] Rabattcodes
- [ ] Bestell-Webhooks & echte Bestellbestätigung
- [ ] Reale Produktdaten, Preise und **geprüfte Lagerbestände**
- [ ] Korrekte **MwSt-Ausweisung** und Preisangaben-Wording
- [ ] Rechtliche Grundlagen: AGB, Widerruf/Retouren, Versand- & Zahlungsinfos

> ⚠️ **Nicht live schalten**, bevor Produktdaten, Preise, Lagerbestände,
> MwSt-Wording, Versand und rechtliche Bedingungen vollständig geprüft und
> verbindlich sind.
