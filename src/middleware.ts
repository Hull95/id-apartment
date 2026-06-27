import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Već ima prefiks jezika? Pusti dalje.
  const hasLocale = locales.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`));
  if (hasLocale) return NextResponse.next();

  // Default je uvijek SR (defaultLocale) — bez obzira na jezik browsera.
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Izuzmi statiku, API i Next interne rute.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
