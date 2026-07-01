"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { SectionHead } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n";

const CELL_ICONS = [
  <path key="p" d="M21 15l-5-5L5 21" />,
  <path key="p" d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />,
  <path key="p" d="M3 11h18M5 11V7a2 2 0 0 1 2-2h2M9 5v6M21 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />,
  <path key="p" d="M4 12V6a2 2 0 0 1 2-2h2M4 12h16M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />,
];

export function Gallery({ gallery, images = [] }: { gallery: Dictionary["gallery"]; images?: string[] }) {
  const has = images.length > 0;
  // 4 vidljive ćelije (1 velika + 3); ostatak slika ide u "+N" ćeliju.
  const cells = [0, 1, 2, 3];
  const remaining = Math.max(0, images.length - 4);

  // Lightbox: index otvorene slike (null = zatvoreno)
  const [open, setOpen] = useState<number | null>(null);
  const wrap = useCallback((i: number) => ((i % images.length) + images.length) % images.length, [images.length]);
  const show = useCallback((i: number) => has && setOpen(wrap(i)), [has, wrap]);
  const close = useCallback(() => setOpen(null), []);

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

  const openProps = (i: number) =>
    has
      ? {
          onClick: () => show(i),
          role: "button" as const,
          tabIndex: 0,
          "aria-label": gallery.captions[i] ?? gallery.view,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              show(i);
            }
          },
        }
      : {};

  return (
    <section id="gallery">
      <SectionHead eyebrow={gallery.eyebrow} title={gallery.title} lead={gallery.lead} leadStyle={{ marginBottom: 30 }} />
      <div className="gal reveal">
        {cells.map((i) => (
          <div className={`cell${i === 0 ? " big" : ""}`} key={i} {...openProps(i)}>
            {has && images[i] ? (
              <Image
                src={images[i]}
                alt={gallery.captions[i] ?? "ID Apartment"}
                fill
                sizes={i === 0 ? "(max-width:640px) 100vw, 50vw" : "(max-width:640px) 50vw, 25vw"}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {i === 0 ? (
                  <>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M21 15l-5-5L5 21" />
                  </>
                ) : (
                  CELL_ICONS[i]
                )}
              </svg>
            )}
            {gallery.captions[i] && <span className="cap">{gallery.captions[i]}</span>}
            {has && (
              <span className="cell-view" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </span>
            )}
          </div>
        ))}
        <div
          className="cell more"
          {...(has
            ? {
                onClick: () => show(4 < images.length ? 4 : 0),
                role: "button" as const,
                tabIndex: 0,
                "aria-label": gallery.view,
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    show(4 < images.length ? 4 : 0);
                  }
                },
              }
            : {})}
        >
          {has ? (remaining > 0 ? `+${remaining}` : `${images.length}`) : gallery.moreCount}
          <span style={{ fontSize: 11, opacity: 0.75 }}>{gallery.moreLabel}</span>
        </div>
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
            <Image
              src={images[open]}
              alt={gallery.captions[open] ?? "ID Apartment"}
              fill
              sizes="92vw"
              priority
              style={{ objectFit: "contain" }}
            />
            {gallery.captions[open] && <span className="lb-cap">{gallery.captions[open]}</span>}
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
                  aria-label={`${i + 1} / ${images.length}`}
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