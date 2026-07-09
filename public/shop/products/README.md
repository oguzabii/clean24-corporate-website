# Clean24 – Produktbilder / Product photos

Legen Sie echte Produktfotos in **diesem Ordner** ab
(`public/shop/products/`).

## Nutzung / How to use

1. Foto hier ablegen, z. B. `mikrofasertuecher-set.jpg`.
2. In [`data/shop.ts`](../../../data/shop.ts) beim jeweiligen Produkt das
   Feld `image` setzen:

   ```ts
   image: "/shop/products/mikrofasertuecher-set.jpg",
   ```

3. Solange kein `image` gesetzt ist, wird automatisch der markenkonforme
   CSS-Platzhalter (`visual`) aus
   [`components/shop/ProductVisual.tsx`](../../../components/shop/ProductVisual.tsx)
   angezeigt.

## Empfehlungen / Recommendations

- **Format:** `.jpg` oder `.png` (`.webp` ebenfalls möglich).
- **Seitenverhältnis:** quadratisch (1:1) oder Hochformat 4:5.
- **Auflösung:** mind. 1000 × 1000 px, sauber freigestellt oder neutraler
  Hintergrund.
- **Keine erfundenen Etiketten, Zertifikate oder Produktversprechen** auf
  Verpackungen abbilden, solange diese nicht real und geprüft sind.

> Hinweis: Es werden keine zufälligen Stock-Produktfotos verwendet. Bis echte
> Fotos vorliegen, bleiben die gebrandeten Platzhalter aktiv.
