# Fotografije apartmana

Samo ubaci slike u ovaj folder (`public/gallery/`) i sajt će ih automatski pokupiti.
Podržani formati: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

## Pravilo imenovanja

- **Hero slideshow** (velike slike u vrhu): ime mora počinjati sa `hero`
  - `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` … (poredak po imenu)
- **Galerija** (sve ostalo): bilo koje ime
  - `dnevni-boravak.jpg`, `spavaca.jpg`, `kupatilo.jpg`, `kuhinja.jpg` …

## Preporuke
- Hero slike: pejzažne (landscape), bar 1920×1080 px.
- Galerija: bilo koji odnos, bar ~1200 px po dužoj strani.
- Slike se automatski optimizuju (next/image → WebP/AVIF, lazy load).

> Napomena: nakon dodavanja slika u **produkciji**, ponovo pokreni build
> (`npm run build`). U dev modu (`npm run dev`) se vide odmah.
