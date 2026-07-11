import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProductVisual } from "@/components/shop/ProductVisual";
import { ProductPurchasePanel } from "@/components/shop/ProductPurchasePanel";
import { ShopInfoLinks } from "@/components/shop/ShopInfoLinks";
import {
  categoryLabel,
  getProductBySlug,
  getProductCategory,
  getRelatedProducts,
  getVariantAvailabilityLabel,
  products,
  variantPriceLabel,
  type Product,
} from "@/data/shop";
import { shopConfig } from "@/data/shop-config";

/** Pre-render every catalog product at build time. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produkt nicht gefunden" };
  return {
    title: `${product.name} – Shop`,
    description: product.description,
  };
}

/** Breadcrumb: Shop / Category / Product name. */
function Breadcrumb({ product }: { product: Product }) {
  return (
    <div className="bg-navy-950">
      <Container className="py-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <li>
              <Link
                href="/shop"
                className="text-navy-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                Shop
              </Link>
            </li>
            <li className="text-navy-500" aria-hidden>
              /
            </li>
            <li>
              <Link
                href="/shop"
                className="text-navy-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                {categoryLabel(product.categoryId)}
              </Link>
            </li>
            <li className="text-navy-500" aria-hidden>
              /
            </li>
            <li aria-current="page" className="font-medium text-white">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>
    </div>
  );
}

/** Product image / branded visual with optional gallery thumbnails. */
function ProductMedia({ product }: { product: Product }) {
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-navy-100 bg-white">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <ProductVisual kind={product.visual} className="h-full w-full" />
        )}
      </div>
      {product.gallery && product.gallery.length > 0 ? (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {product.gallery.map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-lg border border-navy-100"
            >
              <Image
                src={src}
                alt={product.name}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Titled detail card — only rendered when its content exists. */
function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-7">
      <h2 className="text-base font-semibold tracking-tight text-navy-900">
        {title}
      </h2>
      <div className="mt-3 text-sm leading-6 text-navy-600">{children}</div>
    </div>
  );
}

/** Compact related-product card linking to its detail page. */
function RelatedProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
    >
      <div className="relative aspect-[4/3]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <ProductVisual kind={product.visual} className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
          {categoryLabel(product.categoryId)}
        </p>
        <h3 className="mt-1.5 text-base font-semibold tracking-tight text-navy-900 transition-colors group-hover:text-teal-700">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-navy-600">
          {product.description}
        </p>
        <p className="mt-4 text-sm font-semibold text-navy-900">
          {variantPriceLabel(product.variants[0])}
        </p>
      </div>
    </Link>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getProductCategory(product);
  const related = getRelatedProducts(product, 3);

  return (
    <>
      <Breadcrumb product={product} />

      {/* Main product section */}
      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductMedia product={product} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
              {category?.label ?? product.categoryId}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
                {product.name}
              </h1>
              {product.badge ? (
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                  {product.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-base leading-7 text-navy-600">
              {product.description}
            </p>

            <div className="mt-8">
              <ProductPurchasePanel product={product} />
            </div>
          </div>
        </div>
      </Section>

      {/* Detail sections — only fields that actually exist are shown */}
      <Section tone="mist" className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {product.longDescription ? (
            <DetailCard title="Beschreibung">
              <p>{product.longDescription}</p>
            </DetailCard>
          ) : null}

          {product.suitableFor && product.suitableFor.length > 0 ? (
            <DetailCard title="Geeignet für">
              <ul className="list-disc space-y-1 pl-5">
                {product.suitableFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailCard>
          ) : null}

          {product.usageNotes ? (
            <DetailCard title="Anwendung / Hinweise">
              <p>{product.usageNotes}</p>
            </DetailCard>
          ) : null}

          {product.safetyNote ? (
            <DetailCard title="Sicherheitshinweis">
              <p>{product.safetyNote}</p>
            </DetailCard>
          ) : null}

          {/* Public-safe readiness fields — rendered only when maintained.
              Internal statuses (dataStatus, pricingStatus, …) are never shown. */}
          {product.careInstructions ? (
            <DetailCard title="Pflegehinweise">
              <p>{product.careInstructions}</p>
            </DetailCard>
          ) : null}

          {product.ingredientsOrMaterials ? (
            <DetailCard title="Material / Inhalt">
              <p>{product.ingredientsOrMaterials}</p>
            </DetailCard>
          ) : null}

          {product.warningNotes ? (
            <DetailCard title="Wichtige Hinweise">
              <p>{product.warningNotes}</p>
            </DetailCard>
          ) : null}

          <DetailCard title="Lieferung & Verfügbarkeit">
            <ul className="space-y-2">
              {product.variants.map((variant) => (
                <li
                  key={variant.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span>
                    {variant.label}
                    <span className="text-navy-400"> · {variant.unit}</span>
                  </span>
                  <span className="font-medium text-navy-800">
                    {getVariantAvailabilityLabel(variant)}
                  </span>
                </li>
              ))}
            </ul>
            {product.shippingNotes ? (
              <p className="mt-4 border-t border-navy-100 pt-4">
                {product.shippingNotes}
              </p>
            ) : null}
          </DetailCard>

          {/* Trust / status panel — neutral, verified statements only */}
          <DetailCard title="Gut zu wissen">
            <ul className="space-y-2">
              <li>
                Preise in {shopConfig.currency} {shopConfig.vatDisplayText},
                sofern angegeben.
              </li>
              <li>{shopConfig.prelaunchNotice}</li>
              <li>Der Online-Checkout wird aktuell vorbereitet.</li>
            </ul>
            <ShopInfoLinks className="mt-4 border-t border-navy-100 pt-4" />
          </DetailCard>
        </div>
      </Section>

      {/* Related products */}
      {related.length > 0 ? (
        <Section tone="white" className="py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-navy-900">
              Das könnte Sie auch interessieren
            </h2>
            <Link
              href="/shop"
              className="shrink-0 text-sm font-medium text-teal-700 underline-offset-4 transition-colors hover:text-teal-600 hover:underline"
            >
              Zum Shop
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <RelatedProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
