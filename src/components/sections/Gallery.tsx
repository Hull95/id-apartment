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

  return (
    <section id="gallery">
      <SectionHead eyebrow={gallery.eyebrow} title={gallery.title} lead={gallery.lead} leadStyle={{ marginBottom: 30 }} />
      <div className="gal reveal">
        {cells.map((i) => (
          <div className={`cell${i === 0 ? " big" : ""}`} key={i}>
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
          </div>
        ))}
        <div className="cell more">
          {has ? (remaining > 0 ? `+${remaining}` : `${images.length}`) : gallery.moreCount}
          <span style={{ fontSize: 11, opacity: 0.75 }}>{gallery.moreLabel}</span>
        </div>
      </div>
    </section>
  );
}
