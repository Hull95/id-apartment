import fs from "fs";
import path from "path";

export type SiteImages = {
  /** Kurirane slike za hero slideshow (rotiraju) */
  hero: string[];
  /** Sve slike za galeriju, u kuriranom redoslijedu */
  gallery: string[];
};

const IMG_RE = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Kurirani redoslijed galerije po baznom imenu fajla (bez ekstenzije).
 * Prve 4 slike su vidljive u gridu (velika + 3) i prate captions iz
 * rječnika: Dnevni boravak, Spavaća, Kupatilo, Kuhinja. Ostatak ide u
 * "+N" ćeliju. Nepoznati/novi fajlovi se dodaju na kraj abecedno.
 */
const GALLERY_ORDER = [
  "dnevna_soba",
  "spavaca_soba_1",
  "kupatilo",
  "kuhinja",
  "dnevna_soba_1",
  "dnevna_soba_2",
  "dnevna_soba_3",
  "spavaca_soba_2",
  "hodnik",
  "pogled_iz_stana",
  "parking",
];

/** Kurirane slike za hero slideshow — 3× dnevna soba + 1× spavaća, rotiraju. */
const HERO_ORDER = ["dnevna_soba", "dnevna_soba_1", "dnevna_soba_2", "spavaca_soba_1"];

const base = (f: string) => f.replace(IMG_RE, "").toLowerCase();

/**
 * Čita public/gallery na build-u i vraća kurirane nizove slika za hero i
 * galeriju. Ako folder nema slika, vraća prazne nizove (sajt pada na
 * placeholdere).
 */
export function getSiteImages(): SiteImages {
  const dir = path.join(process.cwd(), "public", "gallery");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMG_RE.test(f));
  } catch {
    files = [];
  }
  files.sort();

  const byBase = new Map(files.map((f) => [base(f), f]));
  const url = (f: string) => `/gallery/${f}`;

  // Hero: kurirane najbolje slike koje postoje, u zadatom redoslijedu.
  const hero = HERO_ORDER.map((n) => byBase.get(n))
    .filter((f): f is string => Boolean(f))
    .map(url);

  // Galerija: kurirani redoslijed + ostatak abecedno (sve slike ostaju).
  const ordered = GALLERY_ORDER.map((n) => byBase.get(n)).filter((f): f is string => Boolean(f));
  const used = new Set(ordered);
  const rest = files.filter((f) => !used.has(f));
  const gallery = [...ordered, ...rest].map(url);

  return { hero, gallery };
}