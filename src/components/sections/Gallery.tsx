"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { SectionHead } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n";

// Iz putanje slike ("/gallery/dnevna_soba_3.JPG") izvuci ključ prostorije ("dnevna_soba").
function roomKey(src: string): string {
  const base = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  return base.toLowerCase().replace(/_\d+$/, "");
}

export function Gallery({ gallery, images = [] }: { gallery: Dictionary["gallery"]; images?: string[] }) {
  const has = images.length > 0;
  const rooms = gallery.rooms as Record<string, string>;
  // Opisni natpis + alt po slici (SEO/pristupačnost).
  const label = useCallback((src: string) => rooms[roomKey(src)] ?? "ID Apartment", [rooms]);
  const alt = useCallback((src: string) => `${label(src)} — ID Apartment, stan na dan Banja Luka`, [label]);

  // Prva slika je istaknuta (velika); ostale su ravnomjerne ćelije.
  const isBig = (i: number) => i === 0;

  // Lightbox: index otvorene slike (null = zatvoreno)
  const [open, setOpen] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const wrap = useCallback((i: number) => ((i % images.length) + images.length) % images.length, [images.length]);
  const show = useCallback((i: number) => has && setOpen(wrap(i)), [has, wrap]);
  const close = useCallback(() => setOpen(null), []);

  // Resetuj "loaded" na svaku promjenu slike (za spinner dok se učitava)
  useEffect(() => setLoaded(false), [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") setOpen((v) => (v === null ? v : wrap(v + 1)));
      else if (e.key === "ArrowLeft") setOpen((v) => (v === null ? v : wrap(v - 1)));
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, wrap]);

  return (
    <section id="gallery">
      <SectionHead eyebrow={gallery.eyebrow} title={gallery.title} lead={gallery.lead} leadStyle={{ marginBottom: 30 }} />
      <div className="gal reveal">
        {images.map((src, i) => (
          <div
            className={`cell${isBig(i) ? " big" : ""}`}
            key={src}
            onClick={() => show(i)}
            role="button"
            tabIndex={0}
            aria-label={`${label(src)} — ${gallery.view}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                show(i);
              }
            }}
          >
            <Image
              src={src}
              alt={alt(src)}
              fill
              sizes={isBig(i) ? "(max-width:640px) 100vw, 50vw" : "(max-width:640px) 50vw, 25vw"}
              style={{ objectFit: "cover" }}
            />
            <span className="cap">{label(src)}</span>
            <span className="cell-view" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </span>
          </div>
        ))}
      </div>

      {open !== null && has && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery.title} onClick={close}>
          <button className="lb-close" type="button" aria-label={gallery.close} onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="lb-count">
            {open + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <button
              className="lb-nav prev"
              type="button"
              aria-label={gallery.prev}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => (v === null ? v : wrap(v - 1)));
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
            {!loaded && <span className="lb-spin" aria-hidden />}
            <Image
              src={images[open]}
              alt={alt(images[open])}
              fill
              sizes="92vw"
              priority
              onLoad={() => setLoaded(true)}
              style={{ objectFit: "contain", opacity: loaded ? 1 : 0, transition: "opacity .25s var(--ease)" }}
            />
            {loaded && <span className="lb-cap">{label(images[open])}</span>}
          </div>

          {/* Preload susjednih slika (N±1) da prebacivanje bude trenutno */}
          <div aria-hidden style={{ position: "absolute", width: 1, height: 1, left: -99999, top: 0, opacity: 0, pointerEvents: "none" }}>
            {[wrap(open - 1), wrap(open + 1)].map((i) => (
              <span key={i} style={{ position: "absolute", width: "92vw", height: "74vh" }}>
                <Image src={images[i]} alt="" fill sizes="92vw" priority style={{ objectFit: "contain" }} />
              </span>
            ))}
          </div>

          {images.length > 1 && (
            <button
              className="lb-nav next"
              type="button"
              aria-label={gallery.next}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => (v === null ? v : wrap(v + 1)));
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {images.length > 1 && (
            <div className="lb-thumbs" onClick={(e) => e.stopPropagation()}>
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`lb-thumb${i === open ? " on" : ""}`}
                  aria-label={`${label(src)} — ${i + 1} / ${images.length}`}
                  onClick={() => setOpen(i)}
                >
                  <Image src={src} alt="" fill sizes="72px" style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
