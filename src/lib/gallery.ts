import fs from "fs";
import path from "path";

export type SiteImages = {
  /** Slike za hero slideshow (fajlovi koji počinju sa "hero") */
  hero: string[];
  /** Ostale slike za galeriju */
  gallery: string[];
};

const IMG_RE = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Čita public/gallery na build-u i kategoriše slike po imenu fajla:
 *   hero-*.jpg   -> hero slideshow
 *   ostalo.jpg   -> galerija
 * Ako folder nema slika, vraća prazne nizove (sajt pada na placeholdere).
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
  const hero = files.filter((f) => /^hero[-_.]/i.test(f)).map((f) => `/gallery/${f}`);
  const gallery = files.filter((f) => !/^hero[-_.]/i.test(f)).map((f) => `/gallery/${f}`);
  return { hero, gallery };
}
