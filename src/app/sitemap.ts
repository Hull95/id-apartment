import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${site.domain}/${l}`]));
  return locales.map((loc) => ({
    url: `${site.domain}/${loc}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: loc === "sr" ? 1 : 0.8,
    alternates: { languages },
  }));
}
