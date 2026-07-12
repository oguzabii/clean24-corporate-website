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
| `shippingNotes`  |  nein   | Produktspezifischer Versandhinweis (öffentlich, Detailseite)    |
| `careInstructions` | nein  | „Pflegehinweise“ auf der Detailseite                            |
| `ingredientsOrMaterials` | nein | „Material / Inhalt“ auf der Detailseite                    |
| `warningNotes`   |  nein   | „Wichtige Hinweise“ auf der Detailseite                         |
| Readiness-Felder |  nein   | **Interne** Status-Felder (nie öffentlich) — siehe Abschnitt 10 |

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
  `image: "/shop/products/mikrofasertuecher-set-main.jpg"`
  (Namenskonvention `produkt-slug-main.jpg` — siehe README im Bilder-Ordner).
- Ohne `image` wird automatisch der gebrandete CSS-Platzhalter
  ([`components/shop/ProductVisual.tsx`](../components/shop/ProductVisual.tsx))
  angezeigt. Es werden **keine** zufälligen Stock-Fotos verwendet.

---

## 3. Produkt-Detailseiten (`/shop/[slug]`)

Jedes Produkt erhält automatisch eine eigene Detailseite unter
`/shop/<slug>`, z. B. `/shop/mikrofasertuecher-set`. Die Seiten werden zur
Build-Zeit aus `data/shop.ts` generiert (`generateStaticParams` in
`app/shop/[slug]/page.tsx`); unbekannte Slugs liefern eine 404-Seite. Alle
Detail-URLs erscheinen automatisch in der Sitemap (`app/sitemap.ts`).

> **Slug ändern = URL ändern.** Slugs möglichst stabil halten (SEO/Verlinkung).
> Kleinbuchstaben, Bindestriche, keine Umlaute.

### Inhalte pflegen (optionale Felder)

Die Detailseite rendert nur Felder, die tatsächlich gepflegt sind — leere
Abschnitte erscheinen **nicht**:

| Feld in `data/shop.ts`      | Abschnitt auf der Detailseite       |
| --------------------------- | ----------------------------------- |
| `longDescription` (Text)    | „Beschreibung“                      |
| `suitableFor` (Liste)       | „Geeignet für“ (Aufzählung)         |
| `usageNotes` (Text)         | „Anwendung / Hinweise“              |
| `safetyNote` (Text)         | „Sicherheitshinweis“                |
| `careInstructions` (Text)   | „Pflegehinweise“                    |
| `ingredientsOrMaterials`    | „Material / Inhalt“                 |
| `warningNotes` (Text)       | „Wichtige Hinweise“                 |
| `shippingNotes` (Text)      | Zusatz unter „Lieferung & Verfügbarkeit“ |
| Varianten-`availability`    | „Lieferung & Verfügbarkeit“ (immer) |

Interne Readiness-Felder (`dataStatus`, `pricingStatus`, `imageStatus`,
`stockStatus`, `legalStatus`, `productDataNote`) werden **nie** öffentlich
angezeigt. Produkte ohne `dataStatus: "ready"` zeigen im Kaufbereich einen
neutralen Hinweis, dass Produktdaten vor dem Live-Verkauf finalisiert werden.

Beispiel:

```ts
longDescription: "…",
suitableFor: ["Glasflächen", "Spiegel"],
usageNotes: "…",
safetyNote: "…",
```

### Ähnliche Produkte

„Das könnte Sie auch interessieren“ zeigt bis zu **3** Produkte
(`getRelatedProducts`): zuerst Produkte derselben Kategorie, danach mit
`featured: true` markierte Produkte als Auffüllung — nie das Produkt selbst.

### Bilder & Galerie

- `image` → Hauptbild auf Karte **und** Detailseite
  (Pfad: `/shop/products/…`, Dateien in `public/shop/products/`).
- `gallery` → weitere Bilder, als Thumbnails unter dem Hauptbild.
- Ohne `image` erscheint der gebrandete CSS-Platzhalter (`visual`).

> Der Online-Checkout ist weiterhin **nicht** live — auch von Detailseiten aus
> gibt es keine Zahlung und keine Bestellbestätigung.

---

## 4. Verfügbarkeit (`availability`)

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

## 5. Varianten (`variants`)

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

## 6. Preise (Rappen / CHF-Cents)

- Preise werden **in Rappen** gespeichert (Ganzzahl). Beispiel: `2490` =
  **CHF 24.90**.
- Formatierung über `formatChf(cents)` → `"CHF 24.90"`.
- Ist kein finaler Preis bekannt, `priceCents` **weglassen** → die UI zeigt
  **„Preis folgt“** (`variantPriceLabel`).
- Platzhalterpreise sind im Code klar markiert:
  `// Editable placeholder price — replace before production checkout.`
  Diese vor dem Live-Verkauf ersetzen.
- Der interne `pricingStatus` (Abschnitt 10) dokumentiert den Stand:
  `missing` → kein Preis, `placeholder` → Testpreis, `final` → verbindlich.

---

## 7. Warenkorb-Verhalten

- Nur verkäufliche (verfügbare + bepreiste) Varianten können hinzugefügt werden.
- Eine Warenkorb-Zeile speichert: `productId`, `productSlug`, `variantId`,
  `name`, `variantLabel`, `priceCents`, `image`/`visual`, `qty` (plus den
  abgeleiteten Schlüssel `key` = `productId:variantId`).
- Der Warenkorb wird in `localStorage` (`clean24-cart-v1`) persistiert.
- Die Zwischensumme summiert nur real hinzugefügte (also verfügbare) Artikel.
- Der Button „Zum Checkout“ führt zur Scaffold-Seite `/checkout`
  (Abschnitt 13). Er löst **keinen** Kauf aus: Solange
  `checkoutEnabled: false` ist, zeigt `/checkout` nur den
  Vorbereitungsstatus. Es gibt **keine** vorgetäuschte Bestellbestätigung,
  der Warenkorb wird nicht geleert und es werden keine Kundendaten erfasst.

---

## 8. Was vor dem echten Checkout noch fehlt

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

> ⚠️ **Checkout nicht aktivieren** (`checkoutEnabled` in
> `data/shop-config.ts` bleibt `false`), bevor echte Preise, Produktdaten,
> Lagerbestände, MwSt-Wording, Versand, Retouren, rechtliche Bedingungen
> **und** die Stripe-/TWINT-Integration vollständig geprüft und verbindlich
> sind. Vor jeder Freigabe zusätzlich `npm run validate:shop` ausführen.

---

## 9. Shop-Konfiguration (`data/shop-config.ts`)

Zentrale Konfiguration für wiederkehrende Shop-Texte und den Checkout-Gate.
Komponenten lesen diese Werte, statt Texte zu duplizieren:

| Feld                        | Bedeutung                                              |
| --------------------------- | ------------------------------------------------------ |
| `currency` / `locale`       | `"CHF"` / `"de-CH"` — Referenzwerte für Anzeige und künftige Formatierung (`formatChf` nutzt derzeit ein festes Format) |
| `vatDisplayText`            | „inkl. MwSt.“ neben konkreten Preisen                  |
| `checkoutEnabled`           | **`false`** bis zum verifizierten Launch               |
| `checkoutDisabledMessage`   | Hinweis beim Klick auf „Checkout“                      |
| `shippingNotice`            | Neutraler Versandhinweis im Warenkorb                  |
| `freeShippingThresholdCents`| Gratisversand-Schwelle in Rappen; `null` = offen       |
| `defaultShippingCountry`    | `"CH"`                                                 |
| `shopStatus`                | `"prelaunch"` → später `"live"` / `"paused"`           |
| `prelaunchNotice`           | Neutraler Satz „Produktdaten … werden finalisiert.“    |
| `checkoutPath`              | Route des Checkout-Scaffolds (`/checkout`)             |
| `shopInfoLinks`             | Links zu Versand & Zahlung / Retoure / Shop FAQ        |
| `checkoutSteps`             | Schritt-Labels der künftigen Checkout-Strecke          |
| `checkoutDisabledTitle` / `…CtaLabel` / `…CtaHref` | Texte/Ziel der Scaffold-Seite   |
| `checkoutProvider` / `checkoutMode` | `"stripe"` / `"test"` bis zum verifizierten Launch |
| `orderPersistenceEnabled`   | **`false`** bis Phase 13B (durable Order-Speicherung)  |
| `webhookFulfilmentEnabled`  | **`false`** bis Phase 13B (idempotentes Fulfilment)    |

Verwendet in: `ProductCard`, `ProductPurchasePanel`, `CartDrawer`,
`ShopExperience` (Grid-Hinweis) und im „Gut zu wissen“-Panel der
Detailseiten. Die Validierung schlägt fehl, wenn `checkoutEnabled: true`
gesetzt wird, solange `shopStatus` noch `"prelaunch"` ist.

---

## 10. Produktdaten-Readiness (interne Felder)

Interne Felder pro Produkt — **nie öffentlich sichtbar**, aber Grundlage für
Validierung und Launch-Freigabe:

| Feld             | Werte                                            | Bedeutung                                                   |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| `dataStatus`     | `draft` → `needs-review` → `ready`               | Redaktioneller Stand des Eintrags. Nur `ready` = final.     |
| `pricingStatus`  | `missing` / `placeholder` / `final`              | `missing` = kein Preis („Preis folgt“), `placeholder` = Test-Preis (vor Launch ersetzen!), `final` = verbindlich. |
| `imageStatus`    | `placeholder` / `provided` / `final`             | CSS-Platzhalter → echte Fotos vorhanden → final freigegeben. |
| `stockStatus`    | `unknown` / `limited` / `in-stock` / `out-of-stock` | Was wir über den physischen Bestand **wissen**.          |
| `legalStatus`    | `needs-review` / `reviewed`                      | Rechtliche Prüfung des Produkt-Wordings.                    |
| `productDataNote`| Freitext                                         | Interne Notiz, was noch fehlt.                              |

**`availability` vs. `stockStatus`:** `availability` steuert, was der Shop
*tut* (kaufbar / „Bald verfügbar“ / „Nicht verfügbar“); `stockStatus`
dokumentiert, was wir über den Bestand *wissen*. Ein Produkt kann z. B.
`availability: "coming-soon"` und `stockStatus: "in-stock"` haben, solange
der Verkauf noch nicht freigegeben ist.

**Freigabe-Regel:** `dataStatus: "ready"` verlangt `pricingStatus: "final"`,
`imageStatus: "provided"`/`"final"` und `legalStatus: "reviewed"` — sonst
schlägt die Validierung fehl. Kein Platzhalter-Produkt darf `ready` sein.

> Hinweis: „Intern“ heisst *nicht angezeigt*. Die Felder sind Teil der
> statischen Katalogdaten und damit technisch im Seitenquelltext enthalten —
> **keine vertraulichen Inhalte** (Einkaufspreise, Lieferanten, interna) in
> `productDataNote` & Co. eintragen.

---

## 11. Katalog-Validierung

```bash
npm run validate:shop
```

Prüft `data/shop.ts` und `data/shop-config.ts` (Skript:
`scripts/validate-shop-catalog.mjs`, keine zusätzlichen Abhängigkeiten):

- **Fehler** (Exit-Code 1): doppelte IDs/Slugs, fehlende Varianten, doppelte
  Varianten-IDs, unbekannte `categoryId`, verfügbare Produkte/Varianten ohne
  Preis, ungültige Preise (müssen positive Ganzzahlen in Rappen sein),
  fehlende Bilddateien unter `public/`, inkonsistente Readiness-Status
  (z. B. `ready` ohne `legalStatus: "reviewed"`), `checkoutEnabled` im
  Prelaunch.
- **Warnungen** (nicht blockierend): verkäufliche Produkte mit
  Platzhalter-Preisen, unbekanntem Bestand oder ungeprüftem Legal-Status;
  fehlende `dataStatus`-Angaben.

Empfohlen nach **jeder** Katalog-Änderung; vor einem späteren Launch Pflicht.

---

## 12. Neue Produkte erfassen

Für jedes echte Produkt das Intake-Template ausfüllen:
[`docs/shop-product-intake-template.md`](./shop-product-intake-template.md)

Es enthält alle Pflicht- und Optionalfelder, ein fertiges Code-Snippet für
`data/shop.ts` und die Checkliste vor Veröffentlichung (Preis, MwSt,
Bestand, Foto, Sicherheitstexte, Versand/Retouren/AGB, Validierung).

---

## 13. Checkout-Scaffold & Shop-Informationsseiten

**`/checkout`** (`app/checkout/page.tsx`) ist ein **Scaffold**, kein echter
Checkout. Der Warenkorb-Button „Zum Checkout“ führt dorthin. Solange
`checkoutEnabled: false` ist, zeigt die Seite:

- die geplanten Checkout-Schritte (`shopConfig.checkoutSteps`) als Vorschau,
- eine schreibgeschützte Warenkorb-Übersicht (aus `localStorage`),
- CTAs zurück zum Shop und zum Kontakt.

Es werden **keine** Kundendaten erfasst, keine Zahlungen verarbeitet und
keine Bestellungen bestätigt.

Seit Phase 13A existiert das **deaktivierte Stripe-Test-Backbone**:
`/api/checkout` (server-autoritative Preisauflösung, lehnt alles ab, solange
`checkoutEnabled: false`), `/api/webhooks/stripe` (Signaturprüfung, verweigert
Fulfilment) sowie `/checkout/success` und `/checkout/cancel` (noindex, ehrlich:
Redirect ≠ Zahlungsbestätigung, Warenkorb bleibt erhalten). Details und
Aktivierungs-Checkliste:
[`docs/stripe-checkout-architecture.md`](./stripe-checkout-architecture.md).

**Der Checkout bleibt deaktiviert.** Phase 13B muss zuerst durable
Order-Persistenz und idempotentes Webhook-Fulfilment liefern
(`orderPersistenceEnabled` / `webhookFulfilmentEnabled`), bevor eine
Aktivierung überhaupt validierbar ist.

**Shop-Informationsseiten** (verlinkt via `shopConfig.shopInfoLinks` auf
`/shop`, den Produkt-Detailseiten und im Footer):

| Seite                   | Route                  | Inhalt (Prelaunch-ehrlich)                    |
| ----------------------- | ---------------------- | --------------------------------------------- |
| Versand & Zahlung       | `/shop/versand-zahlung`| Versand/Zahlarten werden vor Launch finalisiert |
| Retoure & Rückgabe      | `/shop/retoure`        | Rückgabeprozess wird vor Launch definiert     |
| Shop FAQ                | `/shop/faq`            | Ehrliche Antworten zum aktuellen Stand        |

**`checkoutEnabled` erst aktivieren, wenn ALLES erfüllt ist:**

- [ ] Produktdaten final (`dataStatus: "ready"`)
- [ ] Preise final (`pricingStatus: "final"`)
- [ ] Bestand verifiziert (`stockStatus` gepflegt)
- [ ] Versand verifiziert (Optionen, Kosten, Abwicklung)
- [ ] Retouren- und Rechtstexte verifiziert (AGB, Widerruf)
- [ ] Zahlungsanbieter konfiguriert (Stripe und/oder TWINT)
- [ ] Testbestellung erfolgreich durchgeführt

Die Validierung (`npm run validate:shop`) blockiert `checkoutEnabled: true`,
solange `shopStatus` `"prelaunch"` ist oder kein Produkt gleichzeitig
`available` und `pricingStatus: "final"` ist.
