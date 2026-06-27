"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";

/** Mijenja jezik zadržavajući trenutnu stazu (samo zamijeni prvi segment) */
export function LangSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  const hrefFor = (loc: Locale) => {
    const parts = pathname.split("/");
    parts[1] = loc; // segment [0] je "", [1] je locale
    return parts.join("/") || `/${loc}`;
  };

  return (
    <div className="lang">
      {locales.map((loc) => (
        <Link key={loc} href={hrefFor(loc)} className={loc === current ? "on" : undefined} hrefLang={loc}>
          {localeNames[loc]}
        </Link>
      ))}
    </div>
  );
}
