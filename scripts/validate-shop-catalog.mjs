#!/usr/bin/env node
/**
 * Clean24 shop catalog validation — guardrails before real product entry.
 *
 * Usage:  npm run validate:shop
 *
 * Checks data/shop.ts + data/shop-config.ts for structural mistakes
 * (duplicate ids, broken category references, unpriced "available" variants,
 * missing image files, inconsistent readiness states, …).
 *
 * - ERRORS  block: the script exits with code 1.
 * - WARNINGS are non-blocking reminders (exit code stays 0).
 *
 * No extra dependencies: the two data modules are import-free TypeScript, so
 * we transpile them with the project's own `typescript` package and import
 * the result via a data: URL.
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Transpile an import-free TS module and import it. */
async function loadTsModule(relPath) {
  const source = readFileSync(path.join(root, relPath), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  });
  const dataUrl =
    "data:text/javascript;base64," +
    Buffer.from(outputText, "utf8").toString("base64");
  return import(dataUrl);
}

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

let products, categories, shopConfig;
try {
  ({ products, categories } = await loadTsModule("data/shop.ts"));
  ({ shopConfig } = await loadTsModule("data/shop-config.ts"));
} catch (e) {
  console.error("✖ Could not load catalog data:", e.message);
  process.exit(1);
}

if (!Array.isArray(products) || products.length === 0) {
  console.error("✖ data/shop.ts exports no products.");
  process.exit(1);
}

/* --- Allowed enum values (mirrors the TS types in data/shop.ts) ---------- */
const AVAILABILITY = new Set(["available", "coming-soon", "out-of-stock"]);
const DATA_STATUS = new Set(["draft", "needs-review", "ready"]);
const IMAGE_STATUS = new Set(["placeholder", "provided", "final"]);
const PRICING_STATUS = new Set(["missing", "placeholder", "final"]);
const STOCK_STATUS = new Set(["unknown", "limited", "in-stock", "out-of-stock"]);
const LEGAL_STATUS = new Set(["needs-review", "reviewed"]);

const categoryIds = new Set(categories.map((c) => c.id));

/** Check an image path: local paths must exist under public/. */
function checkImagePath(label, imagePath) {
  if (typeof imagePath !== "string" || imagePath.length === 0) {
    err(`${label}: image path is empty.`);
    return;
  }
  if (/^https?:\/\//.test(imagePath)) {
    warn(`${label}: external image URL ("${imagePath}") — prefer local files under public/shop/products/.`);
    return;
  }
  const filePath = path.join(root, "public", imagePath);
  if (!existsSync(filePath)) {
    err(`${label}: referenced image "${imagePath}" does not exist under public/.`);
  }
}

/* --- Checks 1 & 2: unique ids and slugs ----------------------------------- */
const seenIds = new Set();
const seenSlugs = new Set();

for (const p of products) {
  const label = `Product "${p.id ?? p.slug ?? p.name ?? "?"}"`;

  if (!p.id) err(`${label}: missing id.`);
  else if (seenIds.has(p.id)) err(`Duplicate product id "${p.id}".`);
  else seenIds.add(p.id);

  if (!p.slug) err(`${label}: missing slug.`);
  else if (seenSlugs.has(p.slug)) err(`Duplicate product slug "${p.slug}".`);
  else seenSlugs.add(p.slug);

  /* --- Check 5: category reference ---------------------------------------- */
  if (!categoryIds.has(p.categoryId)) {
    err(`${label}: categoryId "${p.categoryId}" does not exist in categories.`);
  }

  /* --- Enum sanity (types are stripped at runtime, so re-check here) ------ */
  if (!AVAILABILITY.has(p.availability)) {
    err(`${label}: invalid availability "${p.availability}".`);
  }
  if (p.dataStatus !== undefined && !DATA_STATUS.has(p.dataStatus))
    err(`${label}: invalid dataStatus "${p.dataStatus}".`);
  if (p.imageStatus !== undefined && !IMAGE_STATUS.has(p.imageStatus))
    err(`${label}: invalid imageStatus "${p.imageStatus}".`);
  if (p.pricingStatus !== undefined && !PRICING_STATUS.has(p.pricingStatus))
    err(`${label}: invalid pricingStatus "${p.pricingStatus}".`);
  if (p.stockStatus !== undefined && !STOCK_STATUS.has(p.stockStatus))
    err(`${label}: invalid stockStatus "${p.stockStatus}".`);
  if (p.legalStatus !== undefined && !LEGAL_STATUS.has(p.legalStatus))
    err(`${label}: invalid legalStatus "${p.legalStatus}".`);

  /* --- Check 3: at least one variant --------------------------------------- */
  if (!Array.isArray(p.variants) || p.variants.length === 0) {
    err(`${label}: has no variants.`);
    continue;
  }

  /* --- Check 4: variant ids unique within the product ---------------------- */
  const variantIds = new Set();
  for (const v of p.variants) {
    if (!v.id) err(`${label}: variant with missing id.`);
    else if (variantIds.has(v.id))
      err(`${label}: duplicate variant id "${v.id}".`);
    else variantIds.add(v.id);

    if (!AVAILABILITY.has(v.availability)) {
      err(`${label}, variant "${v.id}": invalid availability "${v.availability}".`);
    }

    /* --- Check 7: available variant must be priced ------------------------- */
    if (v.availability === "available" && typeof v.priceCents !== "number") {
      err(`${label}, variant "${v.id}": marked "available" but has no priceCents.`);
    }

    /* --- Check 8: prices are positive integers (Rappen) --------------------- */
    if (v.priceCents !== undefined) {
      if (!Number.isInteger(v.priceCents) || v.priceCents <= 0) {
        err(`${label}, variant "${v.id}": priceCents must be a positive integer (Rappen), got ${v.priceCents}.`);
      }
    }
    if (v.compareAtPriceCents !== undefined) {
      if (!Number.isInteger(v.compareAtPriceCents) || v.compareAtPriceCents <= 0) {
        err(`${label}, variant "${v.id}": compareAtPriceCents must be a positive integer (Rappen).`);
      }
    }
  }

  /* --- Check 6: "available" product needs a purchasable variant ------------ */
  if (p.availability === "available") {
    const availableVariants = p.variants.filter(
      (v) => v.availability === "available",
    );
    if (availableVariants.length === 0) {
      err(`${label}: availability is "available" but no variant is available.`);
    } else if (
      !availableVariants.some((v) => typeof v.priceCents === "number")
    ) {
      err(`${label}: availability is "available" but no available variant has a priceCents.`);
    }
  }

  /* --- Check 9: referenced images must exist under public/ ----------------- */
  if (p.image !== undefined) checkImagePath(`${label} (image)`, p.image);
  if (Array.isArray(p.gallery)) {
    p.gallery.forEach((g, i) =>
      checkImagePath(`${label} (gallery[${i}])`, g),
    );
  }

  /* --- Check 10: pricingStatus "final" implies real prices ----------------- */
  if (p.pricingStatus === "final") {
    for (const v of p.variants) {
      if (v.availability === "available" && typeof v.priceCents !== "number") {
        err(`${label}: pricingStatus is "final" but available variant "${v.id}" has no priceCents.`);
      }
    }
    if (p.variants.some((v) => typeof v.priceCents !== "number")) {
      warn(`${label}: pricingStatus is "final" but some variants have no priceCents.`);
    }
  }

  /* --- Check 11: dataStatus "ready" implies verified everything ------------ */
  if (p.dataStatus === "ready") {
    if (p.pricingStatus !== "final") {
      err(`${label}: dataStatus is "ready" but pricingStatus is "${p.pricingStatus}" (must be "final").`);
    }
    if (p.imageStatus !== "final" && p.imageStatus !== "provided") {
      err(`${label}: dataStatus is "ready" but imageStatus is "${p.imageStatus}" (must be "final" or "provided").`);
    }
    if (p.legalStatus !== "reviewed") {
      err(`${label}: dataStatus is "ready" but legalStatus is "${p.legalStatus}" (must be "reviewed").`);
    }
  }

  /* --- Non-blocking readiness warnings -------------------------------------- */
  if (p.dataStatus === undefined) {
    warn(`${label}: no dataStatus set — readiness is untracked.`);
  }
  if (p.availability === "available") {
    if (p.pricingStatus === "placeholder") {
      warn(`${label}: sellable with PLACEHOLDER prices — replace before production checkout.`);
    }
    if (p.stockStatus === undefined || p.stockStatus === "unknown") {
      warn(`${label}: sellable but stockStatus is unknown — verify stock before launch.`);
    }
    if (p.legalStatus !== "reviewed") {
      warn(`${label}: sellable but legalStatus is not "reviewed".`);
    }
  }
  if (
    (p.imageStatus === "provided" || p.imageStatus === "final") &&
    p.image === undefined
  ) {
    warn(`${label}: imageStatus is "${p.imageStatus}" but no image path is set.`);
  }
}

/* --- Shop config guardrails ------------------------------------------------ */
if (shopConfig.checkoutEnabled) {
  // Full launch gate: EVERY condition below must hold before payments may
  // be created. Keep checkoutEnabled false until then.
  if (shopConfig.shopStatus !== "live") {
    err(`shopConfig: checkoutEnabled is true while shopStatus is "${shopConfig.shopStatus}" (must be "live").`);
  }
  if (shopConfig.checkoutMode !== "test" && shopConfig.checkoutMode !== "live") {
    err(`shopConfig: checkoutEnabled is true but checkoutMode is not configured ("test" or "live").`);
  }
  if (shopConfig.checkoutProvider !== "stripe") {
    err(`shopConfig: checkoutEnabled is true but checkoutProvider is not configured.`);
  }
  if (shopConfig.currency !== "CHF") {
    err(`shopConfig: checkoutEnabled is true but currency is "${shopConfig.currency}" (must be "CHF").`);
  }
  if (!shopConfig.orderPersistenceEnabled) {
    err(`shopConfig: checkoutEnabled is true but orderPersistenceEnabled is false — payments without durable orders are forbidden.`);
  }
  if (!shopConfig.webhookFulfilmentEnabled) {
    err(`shopConfig: checkoutEnabled is true but webhookFulfilmentEnabled is false — fulfilment cannot be confirmed.`);
  }

  // A live checkout needs something real to sell: at least one available
  // product whose pricing has been finalized.
  const sellable = products.filter(
    (p) => p.availability === "available" && p.pricingStatus === "final",
  );
  if (sellable.length === 0) {
    err(`shopConfig: checkoutEnabled is true but no product is "available" with pricingStatus "final".`);
  }
  for (const p of products) {
    if (p.availability !== "available") continue;
    if (p.pricingStatus !== "final") {
      err(`Product "${p.id}": available while checkout is enabled but pricingStatus is "${p.pricingStatus}" (must be "final").`);
    }
    for (const v of p.variants) {
      if (v.availability === "available" && typeof v.priceCents !== "number") {
        err(`Product "${p.id}", variant "${v.id}": purchasable but has no final price while checkout is enabled.`);
      }
      if (v.availability === "available" && !v.stripePriceId) {
        warn(`Product "${p.id}", variant "${v.id}": no stripePriceId — sessions will use dynamic price_data (fine, but set real Stripe Prices if intended).`);
      }
    }
  }
}

/* --- Shipping / safety readiness warnings (available products) ------------- */
for (const p of products) {
  if (p.availability !== "available") continue;
  for (const v of p.variants) {
    const ships = v.requiresShipping !== false;
    if (ships && v.weightGrams === undefined && v.shippingClass === undefined) {
      warn(`Product "${p.id}", variant "${v.id}": shipping product without weightGrams or shippingClass — needed for shipping rates.`);
    }
  }
  if (p.pricingStatus === "final" && !p.safetyNote && !p.warningNotes) {
    warn(`Product "${p.id}": final pricing but no safetyNote/warningNotes — verify whether safety text is required.`);
  }
}
if (
  shopConfig.freeShippingThresholdCents !== null &&
  (!Number.isInteger(shopConfig.freeShippingThresholdCents) ||
    shopConfig.freeShippingThresholdCents <= 0)
) {
  err(`shopConfig: freeShippingThresholdCents must be null or a positive integer.`);
}

/* --- Report ----------------------------------------------------------------- */
console.log(`Validated ${products.length} products, ${categories.length} categories.`);

if (warnings.length > 0) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}

if (errors.length > 0) {
  console.error(`\n✖ ${errors.length} error(s):`);
  for (const e of errors) console.error(`  ✖ ${e}`);
  console.error("\nCatalog is INVALID — fix the errors above.");
  process.exit(1);
}

console.log("\n✔ Catalog is valid.");
