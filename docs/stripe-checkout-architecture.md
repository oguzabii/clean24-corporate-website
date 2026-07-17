# Clean24 Shop – Stripe Checkout Architektur (Phase 13A/13B1)

> **Aktueller Status: DEAKTIVIERTES Test-Mode-Scaffold.**
> `checkoutEnabled: false`, `checkoutMode: "test"`, `shopStatus: "prelaunch"`,
> `orderPersistenceEnabled: false`, `webhookFulfilmentEnabled: false`.
> Es können keine Zahlungen erstellt werden.
>
> Seit **Phase 13B1/13B1-N** existiert zusätzlich die durable
> Order-Persistenz (Neon PostgreSQL via Vercel Marketplace, atomare
> Order-Anlage, idempotente Webhook-Verarbeitung über `shop_stripe_events`)
> — Migration angewendet und integrationsgetestet, Aktivierungs-Flags
> weiterhin `false`. Details:
> [`docs/shop-order-persistence.md`](./shop-order-persistence.md).

## Sicherheitsmodell (nicht aufweichen)

1. **Der Browser sendet nur Identifikatoren.**
   `POST /api/checkout` akzeptiert ausschliesslich
   `{ items: [{ productId, variantId, quantity }] }`.
   Namen, Preise, Zwischensummen, Währung, Verfügbarkeit und MwSt-Status aus
   dem Client (z. B. `localStorage`-Warenkorb) werden **nie** gelesen.
2. **Der Server berechnet alle Preise neu** aus `data/shop.ts`
   (`lib/shop/catalog-server.ts`). Nur Varianten mit
   `availability: "available"`, konkretem `priceCents` **und**
   `pricingStatus: "final"` sind bezahlbar — Platzhalterpreise können nie
   bezahlbar werden.
3. **Redirects beweisen nichts.** Die Success-Seite
   (`/checkout/success`) zeigt bewusst *„Zahlung wird geprüft“* — sie
   bestätigt keine Bestellung, zeigt keine Bestellnummer und leert den
   Warenkorb nicht. `session_id` aus der URL wird client-seitig nicht
   vertraut und nicht angezeigt.
4. **Der Webhook ist die einzige Quelle der Zahlungsbestätigung.**
   `/api/webhooks/stripe` verifiziert die `Stripe-Signature` über den
   **rohen** Request-Body (`request.text()`) **vor** jedem JSON-Parsing.
5. **Secrets bleiben serverseitig.** `STRIPE_SECRET_KEY` und
   `STRIPE_WEBHOOK_SECRET` werden nur in `lib/shop/env.ts` /
   `lib/stripe/server.ts` gelesen (`import "server-only"`), erscheinen nie
   in Fehlermeldungen, Logs oder Client-Bundles.
6. **Fail closed.** Fehlende Konfiguration → kontrollierte Fehlercodes
   (`CHECKOUT_NOT_CONFIGURED`, Webhook 503), niemals ein permissiver
   Fallback.

## Request-Lebenszyklus (`POST /api/checkout`)

| Schritt | Prüfung | Fehlercode (HTTP) |
| --- | --- | --- |
| 1 | `checkoutEnabled` ist `false` | `CHECKOUT_DISABLED` (503) |
| 2 | `shopStatus` ist nicht `"live"` | `SHOP_PRELAUNCH` (503) |
| 3 | `orderPersistenceEnabled` oder `webhookFulfilmentEnabled` ist `false` | `ORDER_PERSISTENCE_DISABLED` (503) |
| 4 | Body-/Mengenvalidierung (Ganzzahl 1–20, Duplikate zusammengeführt) | `INVALID_PAYLOAD` / `EMPTY_CART` (400) |
| 5 | Katalogauflösung + serverseitige Preisberechnung | `PRODUCT_NOT_FOUND` / `VARIANT_NOT_FOUND` (404), `PRODUCT_UNAVAILABLE` / `VARIANT_UNAVAILABLE` / `PRICE_NOT_FINAL` (409) |
| 6 | Stripe-Umgebung konfiguriert | `CHECKOUT_NOT_CONFIGURED` (503) |
| 7 | Checkout Session (mode `payment`, CHF) erstellen | `PROVIDER_ERROR` (502) |

Antwort im Erfolgsfall: `{ "url": "https://checkout.stripe.com/…" }` — nur
die URL, keine Session-Objekte.

Session-Eigenschaften: Währung CHF, einmalige Produkte via `price_data`
(serverseitige Beträge), `billing_address_collection: "required"`,
Lieferadresse nur Schweiz (wenn eine Position `requiresShipping` hat),
`success_url = {NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
`cancel_url = {NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
`productId`/`variantId` als Metadata pro Position. Zahlarten (Karte, TWINT
für CHF) werden über das Stripe-Dashboard konfiguriert — die UI behauptet
**nicht**, dass TWINT aktiv ist, solange der Checkout deaktiviert ist.

## Webhook (`POST /api/webhooks/stripe`)

- Verifiziert nur diese Event-Typen: `checkout.session.completed`,
  `checkout.session.async_payment_succeeded`,
  `checkout.session.async_payment_failed`, `checkout.session.expired`.
- Solange `webhookFulfilmentEnabled`/`orderPersistenceEnabled` `false` sind:
  Signatur prüfen, in Entwicklung nur Event-ID/-Typ loggen, **keine**
  Fulfilment-Aktion, Antwort `{ received: true, fulfilled: false }` (200).
  Das ist sicher, weil bei deaktiviertem Checkout keine legitimen Sessions
  dieses Shops existieren können.
- Sind beide Flags `true`, verarbeitet
  `lib/shop/stripe-webhook-processor.ts` verifizierte Events **durable und
  idempotent**: Stripes `event.id` ist Primärschlüssel im Ledger
  `shop_stripe_events` (Dedup, Retry-Übernahme, Fehlerprotokoll). Bewusst
  **keine** In-Memory-Idempotenz — sie wäre über Neustarts/Instanzen hinweg
  nicht durable. Details: [`docs/shop-order-persistence.md`](./shop-order-persistence.md).

## Umgebungsvariablen

| Variable | Sichtbarkeit | Zweck |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | **nur Server** | Stripe-API (Test-Modus: `sk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | **nur Server** | Webhook-Signaturprüfung (`whsec_…`) |
| `NEXT_PUBLIC_SITE_URL` | öffentlich | Basis der Success-/Cancel-URLs |

Vorlage: [` .env.example`](../.env.example). Lokale `.env*`-Dateien sind
gitignored; **nie** echte Keys committen oder loggen.

## Stripe Test-Modus einrichten (später, mit echten Test-Credentials)

1. Stripe-Konto → Test-Modus → `sk_test_…` in `.env.local` eintragen.
2. Webhook lokal testen (Platzhalter-Anleitung):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   # gibt ein whsec_… aus → als STRIPE_WEBHOOK_SECRET in .env.local
   stripe trigger checkout.session.completed
   ```
3. TWINT/Karte im Dashboard (Test-Modus) aktivieren; Währung CHF.
4. Erst danach sind End-to-End-Tests möglich — ohne Test-Credentials kann
   keine echte Session-Erstellung getestet werden.

## Verbote (dauerhaft)

- Success-Seite darf **nie** fulfillen, bestätigen oder den Warenkorb leeren.
- Warenkorb-Preise aus `localStorage` sind **nie** vertrauenswürdig.
- Keine Secrets im Client, in Logs, in Fehlermeldungen, in Metadata.
- Keine erfundenen Stripe-IDs (`stripePriceId`/`stripeProductId` nur mit
  echten Dashboard-Werten füllen).

## Aktivierungs-Checkliste (Reihenfolge einhalten)

1. [ ] Produktdaten final (`dataStatus: "ready"`, geprüfte Texte)
2. [ ] Preise final (`pricingStatus: "final"`, MwSt-Wording geprüft)
3. [ ] Bestand verifiziert
4. [ ] Versand verifiziert (Kosten, Gebiete, Gewichte)
5. [ ] Retouren/AGB/Rechtstexte verbindlich
6. [ ] **Order-Migration angewendet + DB-Integrationstests grün**
      (13B1-Code existiert; siehe `docs/shop-order-persistence.md`), dann
      `orderPersistenceEnabled: true`
7. [ ] **Webhook-Fulfilment geprüft** (idempotenter Ledger verifiziert),
      dann `webhookFulfilmentEnabled: true`
8. [ ] Stripe konfiguriert (Keys, Zahlarten, Webhook-Endpoint)
9. [ ] Testbestellung im Test-Modus erfolgreich (inkl. Webhook + Order-Status)
10. [ ] `shopStatus: "live"`, dann `checkoutEnabled: true`
11. [ ] `npm run validate:shop` fehlerfrei

Die Validierung blockiert eine Aktivierung, solange Punkte 6/7/10 nicht
erfüllt sind.
