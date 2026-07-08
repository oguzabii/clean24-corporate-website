import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: "%s | Clean24",
  },
  description: homeDescription,
  applicationName: "Clean24",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Clean24",
    url: siteUrl,
    title: homeTitle,
    description: homeDescription,
    images: [
      {
        url: "/media/clean24/hero-facility-cleaning.jpg",
        width: 2048,
        height: 1152,
        alt: "Clean24 – professionelle Gebäude- und Facility-Reinigung.",
      },
    ],
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
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
