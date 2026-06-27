import type { Locale } from "./config";
import { sr, type Dictionary } from "./dictionaries/sr";
import { en } from "./dictionaries/en";
import { de } from "./dictionaries/de";

const dictionaries: Record<Locale, Dictionary> = { sr, en, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
