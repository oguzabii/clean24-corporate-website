# Clean24 Shop – Order-Persistenz & Webhook-Idempotenz (Phase 13B1/13B1-N)

> **Status:** **Alle Aktivierungs-Flags bleiben `false`** (`checkoutEnabled`,
> `orderPersistenceEnabled`, `webhookFulfilmentEnabled`). Die Migration wurde
> bewusst und einmalig auf die Neon-Datenbank der Marketplace-Ressource
> `clean24-corporate-website` angewendet; Integrationstests laufen gegen
> diese Datenbank und räumen ihre Testdaten vollständig wieder ab.

## Architektur

- **Datenbank:** Neon PostgreSQL über die **Vercel-Marketplace-Ressource**
  `clean24-corporate-website` (Team `oguzabiis-projects`, Free-Plan),
  verbunden **ausschliesslich** mit dem Vercel-Projekt
  `clean24-corporate-website`. Keine Verbindung zu Lead-Autopilot- oder
  Sales-Engine-Tabellen; deren Repositories/Migrationen bleiben unberührt.
- **Zugriff:** ausschliesslich serverseitig über `DATABASE_URL`
  (`lib/db/server.ts`, node-postgres-Pool, `import "server-only"`, lazy).
  Der Connection-String enthält Credentials — er darf nie in den Browser,
  nie in Logs, nie mit `NEXT_PUBLIC_`-Präfix existieren.
- **RLS:** auf allen Shop-Tabellen aktiviert, **ohne** Policies
  (Defense-in-Depth): die App verbindet als Tabellen-Owner (umgeht RLS);
  jede künftige eingeschränkte Rolle kann nichts lesen oder schreiben.

## Tabellen (`migrations/20260711120000_create_shop_orders.sql`)

| Tabelle | Zweck |
| --- | --- |
| `shop_orders` | Ein Datensatz pro Checkout-Versuch: Status-Lebenszyklus, Beträge (Rappen), Stripe-Referenzen (`stripe_checkout_session_id` unique, `stripe_payment_intent_id` unique), `order_number` (unique, öffentlich), Zeitstempel (`paid_at`, `expired_at`, `cancelled_at`), `metadata` jsonb. |
| `shop_order_items` | **Unveränderliche Verkaufs-Snapshots** pro Position: Name, Varianten-Label, Menge (1–20), `unit_amount_cents`/`line_amount_cents` (> 0), MwSt-Flag, Versand-Flag, `product_snapshot` jsonb. Spätere Katalog-Änderungen in `data/shop.ts` dürfen historische Bestellzeilen **nie** umschreiben. Unique auf (order, product, variant) — Duplikate werden vor der Persistenz zusammengeführt. |
| `shop_stripe_events` | Durable Idempotenz-Ledger: Primärschlüssel = **Stripe `event.id`**, Verarbeitungsstatus (`received/processing/processed/ignored/failed`), `attempt_count`, Fehlercode, Order-Verknüpfung. |

`updated_at` wird über die wiederverwendbare Trigger-Funktion
`shop_set_updated_at()` gepflegt.

## Order-Lebenszyklus

```text
pending_checkout ──► checkout_created ──► payment_pending ──► paid ──► refunded
      │                    │                    │
      │                    ├──► paid            ├──► payment_failed
      │                    ├──► payment_failed  │
      ├──► checkout_failed ├──► expired         ├──► expired
      ├──► expired         └──► cancelled       └──► cancelled
      └──► cancelled
```

Verbotene Übergänge (durch `lib/shop/order-state-machine.ts` erzwungen):

- `paid` darf **nie** zurückfallen (`paid → payment_pending/-failed/expired` unmöglich).
- `expired → paid` ist gesperrt, bis eine explizit geprüfte
  Late-Payment-Regel existiert.
- Terminale Zustände (`expired`, `cancelled`, `refunded`, `checkout_failed`)
  haben keine ausgehenden Übergänge.

## Checkout-Persistenz-Fluss (`/api/checkout`, hinter den Flags)

1. Launch-/Config-Gates (unverändert aus Phase 13A).
2. Client sendet **nur** `productId`/`variantId`/`quantity`; der Katalog-
   Resolver berechnet alle Preise serverseitig.
3. **Atomare** Anlage von Bestellung + Item-Snapshots über die RPC
   `create_shop_pending_order` (eine Transaktion; validiert Mengen, Beträge
   und `line = unit × qty`; Ausführungsrechte für anon/authenticated
   entzogen). Schlägt sie fehl → **kein** Stripe-Call.
4. Stripe-Session mit `metadata.order_id`, `metadata.order_number` und
   `client_reference_id = order.id`.
5. Session-Verknüpfung + Übergang `pending_checkout → checkout_created`
   (guarded Update). Schlägt das Verknüpfen fehl → Bestellung wird
   `checkout_failed`, Antwort ist ein kontrollierter Fehler — es wird **nie**
   so getan, als wäre der Checkout gelungen.
6. Stripe-Fehler → `checkout_failed` mit sicherem Fehlercode
   (`STRIPE_SESSION_CREATE_FAILED` / `STRIPE_SESSION_NO_URL`).
7. Antwort an den Client: nur `{ url }`.

## Order-Nummern (`lib/shop/order-number.ts`)

Format `C24-YYYYMM-XXXXXX` (z. B. `C24-202607-A4K9Q2`), serverseitig mit
Krypto-Zufall aus einem verwechslungsfreien Alphabet erzeugt — **kein**
zählbarer Inkrement. Die Unique-Constraint der Datenbank ist die letzte
Autorität; bei (seltener) Kollision wird mit neuer Nummer erneut versucht.
Die Bestellnummer ist eine öffentliche Referenz, **kein**
Authentifizierungs-Geheimnis.

## Webhook-Idempotenz (`/api/webhooks/stripe` → `lib/shop/stripe-webhook-processor.ts`)

Reihenfolge pro Request: Signaturprüfung über den **rohen** Body → Flags-
Gate → durable Verarbeitung:

1. **Claim** über `shop_stripe_events` (Insert auf Primärschlüssel
   `event.id`). Existiert der Datensatz: `processed/ignored` → idempotentes
   200; `processing` (frisch) → 409, Stripe versucht später erneut;
   `failed`/stale `processing` (> 5 min) → Übernahme mit `attempt_count + 1`.
2. Order-Auflösung: `metadata.order_id` → `client_reference_id` →
   gespeicherte Session-ID. Abweichende Order/Session-Referenzen werden
   abgelehnt (`SESSION_ORDER_MISMATCH`).
3. Statusübergang ausschliesslich über die pure State-Machine:
   `completed` (payment_status `paid`) → `paid`, sonst `payment_pending`;
   `async_payment_succeeded` → `paid`; `async_payment_failed` →
   `payment_failed`; `expired` → `expired` **ausser** die Bestellung ist
   bereits `paid` (settled — wird nie überschrieben).
4. Bei `completed` werden nur die nötigen Felder gespeichert:
   `customer_email`, `stripe_customer_id`, `stripe_payment_intent_id`,
   `stripe_payment_status`. Keine Adressen, keine Kartendaten, kein Logging
   von Kundendaten.
5. Transiente Persistenzfehler → non-2xx (503) → Stripe-Retry; der Ledger
   macht Wiederholungen idempotent. Permanente Konflikte (unbekannte Order,
   Terminalzustand) → als `failed` dokumentiert + 200 (kein endloser Retry).
6. **Noch keine Fulfilment-Seiteneffekte:** keine E-Mails, keine
   Bestandsänderung, kein Versand.

## Success-/Cancel-Verhalten

- `/checkout/success` nutzt `session_id` **nur als Lookup-Schlüssel** gegen
  die Datenbank: `paid` → „Zahlung bestätigt“ + Bestellnummer;
  `payment_pending` → „Zahlung wird verarbeitet“; unbekannte Referenz →
  „Die Zahlungsreferenz konnte noch nicht zugeordnet werden.“; Datenbank
  nicht erreichbar → neutraler Prüf-Status (**nie** ein erfundener Status).
  Keine internen UUIDs, keine Kundendaten, Warenkorb wird nicht geleert.
- `/checkout/cancel` verändert **nichts**: Browser-Navigation ist kein
  durabler Beleg einer Stornierung. `cancelled` darf nur aus verifizierten
  Stripe-Events, kontrollierten Server-Aktionen oder administrativen
  Eingriffen entstehen.

## Umgebungsvariablen

| Variable | Sichtbarkeit | Zweck |
| --- | --- | --- |
| `DATABASE_URL` | **nur Server** | Gepoolter Neon-Connection-String (Laufzeit-Queries) |
| `DATABASE_URL_UNPOOLED` | **nur Server** | Direktverbindung, für Migrations-DDL |

Beide werden von der Neon-Marketplace-Ressource für **Production, Preview
und Development** bereitgestellt; lokal via `vercel env pull .env.local`.
Plus die Stripe-Variablen aus
[`docs/stripe-checkout-architecture.md`](./stripe-checkout-architecture.md).
Vorlage: [`.env.example`](../.env.example). Fehlende Konfiguration führt zu
kontrollierten `ORDER_DATABASE_NOT_CONFIGURED`-Fehlern (fail closed) — nie
zu einem stillen Fallback.

## Migration anwenden (bewusst, nie automatisch)

```bash
# nutzt DATABASE_URL_UNPOOLED (Fallback DATABASE_URL) aus .env.local,
# läuft in EINER Transaktion und druckt nur den Ziel-Hostnamen:
npm run db:migrate
# oder direkt:
psql "$DATABASE_URL" -f migrations/20260711120000_create_shop_orders.sql
```

**Rollback-Überlegungen:** Die Migration ist additiv (nur neue Objekte).
Ein Rollback (`drop table shop_stripe_events, shop_order_items, shop_orders;
drop function create_shop_pending_order, shop_set_updated_at;`) vernichtet
Bestell-Historie — nach echtem Live-Betrieb nur mit Backup/Export.
Stale-`processing`-Claims im Event-Ledger werden nach 5 Minuten automatisch
übernommen (kein manueller Eingriff nötig).

## Lokales/Test-Setup

1. `vercel env pull .env.local` (verlinktes Projekt
   `clean24-corporate-website`) — lädt `DATABASE_URL` +
   `DATABASE_URL_UNPOOLED` der Neon-Ressource.
2. Migration anwenden (oben), falls noch nicht geschehen.
3. `npm test` — die DB-Integrationstests laufen nur, wenn `DATABASE_URL`
   gesetzt ist, werden sonst **ehrlich übersprungen** und löschen ihre
   Testdaten (Orders mit `metadata.source = "db-integration-test"`,
   Events mit Präfix `evt_test_integration_`) vollständig wieder.
4. Stripe-Test-Modus + `stripe listen` gemäss Architektur-Dokument.

## Was vor der Aktivierung noch fehlt

- [x] Migration angewendet und verifiziert (Neon, Phase 13B1-N)
- [x] DB-Integrationstests gegen die Neon-Datenbank grün (Phase 13B1-N)
- [ ] Stripe-Test-Credentials + End-to-End-Testbestellung inkl. Webhook
- [ ] Entscheidung Warenkorb-Leerung nach bestätigter Zahlung
- [ ] Fulfilment-Phase (E-Mail, Bestand, Versand) — separat geprüft
- [ ] Finale Produktdaten/Preise/Recht (siehe Aktivierungs-Checkliste im
      Architektur-Dokument)
- [ ] Erst dann: `orderPersistenceEnabled` → `webhookFulfilmentEnabled` →
      `shopStatus: "live"` → `checkoutEnabled: true` (Validator erzwingt die
      Reihenfolge)
