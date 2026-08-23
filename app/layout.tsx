import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { contact } from "@/data/contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://clean-24.ch";
const homeTitle =
  "Clean24 | Reinigung & Facility Services in Zürich und Umgebung";
const homeDescription =
  "Professionelle Reinigung für Unternehmen, Verwaltungen und private Kunden. Clean24 bietet klare Abläufe, transparente Offerten und zuverlässige Reinigung in Zürich und Umgebung.";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Clean24",
  legalName: contact.company,
  url: siteUrl,
  logo: `${siteUrl}/brand/clean24-logo.png`,
  foundingDate: "2022",
  email: contact.email,
  telephone: contact.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    postalCode: contact.zip,
    addressLocality: contact.city,
    addressCountry: "CH",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s | Clean24",
  },
  description: homeDescription,
  applicationName: "Clean24",
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Clean24",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de-CH"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        {/* Progressive enhancement: if JS is unavailable, reveal-animated
            content must still be fully visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
