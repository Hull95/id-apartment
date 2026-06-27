import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import { site } from "@/lib/config";
import { locales, isLocale, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getDictionary(locale).meta;
  return {
    metadataBase: new URL(site.domain),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: { sr: "/sr", en: "/en", de: "/de", "x-default": "/sr" },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      siteName: site.name,
      title: m.ogTitle,
      description: m.ogDescription,
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Apartment",
  name: site.name,
  url: site.domain,
  description: "Moderan, potpuno opremljen apartman na dan u centru Banjaluke.",
  numberOfRooms: 1,
  occupancy: { "@type": "QuantitativeValue", maxValue: 3 },
  floorSize: { "@type": "QuantitativeValue", value: 42, unitCode: "MTK" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Prvog krajiškog korpusa 13",
    addressLocality: "Banja Luka",
    postalCode: "78000",
    addressCountry: "BA",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.location.lat, longitude: site.location.lng },
  telephone: site.phone.display,
};

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
