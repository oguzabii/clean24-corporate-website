# Clean24 – Produktbilder / Product photos

Legen Sie echte Produktfotos in **diesem Ordner** ab
(`public/shop/products/`).

## Bildvorgaben / Image specs

- **Empfohlene Grösse:** `1200 × 1200` px (quadratisch) oder `1200 × 1500` px
  (Hochformat 4:5).
- **Akzeptierte Formate:** `.jpg`, `.png`, `.webp`.
- **Hintergrund:** sauber, hell und professionell — neutraler Studio- oder
  Weisshintergrund.
- **Bildausschnitt:** Produkt zentriert, genügend Rand, keine starken Filter
  oder Effekte.

## Namenskonvention / Naming convention

Dateinamen folgen dem Produkt-Slug aus `data/shop.ts`:

```text
produkt-slug-main.jpg     ← Hauptbild
produkt-slug-01.jpg       ← Galeriebild 1
produkt-slug-02.jpg       ← Galeriebild 2
```

Beispiel für `mikrofasertuecher-set`:

```text
mikrofasertuecher-set-main.jpg
mikrofasertuecher-set-01.jpg
mikrofasertuecher-set-02.jpg
```

## Einbinden in `data/shop.ts` / How to reference

```ts
image: "/shop/products/mikrofasertuecher-set-main.jpg",
gallery: [
  "/shop/products/mikrofasertuecher-set-01.jpg",
  "/shop/products/mikrofasertuecher-set-02.jpg",
],
```

Danach `imageStatus` des Produkts auf `"provided"` (bzw. nach finaler Freigabe
`"final"`) setzen und `npm run validate:shop` ausführen — das Skript prüft,
dass alle referenzierten Dateien existieren.

## Regeln / Rules

- **Keine zufälligen Stock-Fotos.** Nur Original-Produktfotos verwenden.
- **Keine erfundenen Etiketten, Zertifikate oder Produktversprechen** auf
  Verpackungen abbilden, solange diese nicht real und geprüft sind.
- Solange kein `image` gesetzt ist, wird automatisch der markenkonforme
  CSS-Platzhalter (`visual`) aus
  [`components/shop/ProductVisual.tsx`](../../../components/shop/ProductVisual.tsx)
  angezeigt.
