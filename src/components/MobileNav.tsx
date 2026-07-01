"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LangSwitcher } from "@/components/LangSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

export function MobileNav({ brand, nav, locale }: { brand: string; nav: Dictionary["nav"]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const links: [string, string][] = [
    ["#about", nav.about],
    // ["#availability", nav.availability], // TODO: vrati kad se spoji Booking
    ["#gallery", nav.gallery],
    ["#location", nav.location],
    ["#faq", nav.faq],
  ];

  // Zaključaj skrol tijela dok je meni otvoren
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menu = (
    <div className="mobile-menu">
      <div className="mm-top">
        <div className="mm-brand">
          <Image src="/logo_ap.png" alt={brand} width={363} height={159} className="brand-logo" priority />
        </div>
        <div className="mm-top-right">
          <div onClick={() => setOpen(false)}>
            <LangSwitcher current={locale} />
          </div>
          <button className="mobile-close" aria-label="Zatvori" onClick={() => setOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="mobile-menu-in">
        {links.map(([href, label], i) => (
          <a key={href} href={href} onClick={() => setOpen(false)} style={{ animationDelay: `${0.05 + i * 0.06}s` }}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <button className="nav-burger" aria-label="Meni" aria-expanded={open} onClick={() => setOpen(true)}>
        <span />
        <span />
        <span />
      </button>

      {mounted && open && createPortal(menu, document.body)}
    </>
  );
}
