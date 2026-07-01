import Image from "next/image";
import { LangSwitcher } from "@/components/LangSwitcher";
import { MobileNav } from "@/components/MobileNav";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

export function Nav({ brand, nav, locale }: { brand: string; nav: Dictionary["nav"]; locale: Locale }) {
  return (
    <nav id="nav">
      <div className="nav-in">
        <div className="brand">
          <Image src="/logo_ap.png" alt={brand} width={363} height={159} className="brand-logo" priority />
        </div>
        <div className="nav-links">
          <a href="#about">{nav.about}</a>
          {/* TODO: vrati kad se spoji Booking
          <a href="#availability">{nav.availability}</a> */}
          <a href="#gallery">{nav.gallery}</a>
          <a href="#location">{nav.location}</a>
          <a href="#faq">{nav.faq}</a>
        </div>
        <div className="nav-right">
          <a href="#closing" className="nav-cta">
            {nav.cta}
          </a>
          <LangSwitcher current={locale} />
          <MobileNav brand={brand} nav={nav} locale={locale} />
        </div>
      </div>
    </nav>
  );
}
