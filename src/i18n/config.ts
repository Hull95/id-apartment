export const locales = ["sr", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sr";

export const localeNames: Record<Locale, string> = {
  sr: "SR",
  en: "EN",
  de: "DE",
};

/** OpenGraph locale oznake po jeziku */
export const ogLocale: Record<Locale, string> = {
  sr: "sr_BA",
  en: "en_US",
  de: "de_DE",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
