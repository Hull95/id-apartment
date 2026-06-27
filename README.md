# Apartman Kukić — sajt za stan na dan

Moderan Next.js 15 sajt za apartman na dan u Banjaluci. Hero slideshow,
kalendar dostupnosti sinhronizovan sa Booking.com, galerija, Google mapa,
direktan kontakt preko Vibera i WhatsAppa.

## Pokretanje (vidjeti kako izgleda)

```bash
npm install
npm run dev
```

Otvori http://localhost:3000

To je sve — sajt odmah radi. Kalendar prikazuje sve datume kao slobodne
dok ne dodaš Booking iCal link (vidi ispod).

## Booking.com kalendar (kasnije)

1. Uloguj se u Booking Extranet
2. Rates & Availability → Sync Calendars → Export your Calendar
3. Kopiraj iCal link
4. Napravi fajl `.env.local` i dodaj:
   ```
   BOOKING_ICAL_URL=https://...tvoj-ical-link...
   ```
5. Restartuj `npm run dev`

Kalendar tada povlači zauzete datume sa Bookinga i automatski računa
sljedeći slobodan termin (panel pored kalendara). Osvježava se svakih sat.

## Šta podesiti prije produkcije

Sve glavno je u `src/lib/config.ts`:
- `phone` — pravi broj (za Viber/WhatsApp/poziv)
- `location.lat` / `location.lng` — tačne koordinate ako treba finije
- `domain` — konačni domen

## Slike

- Galerija/hero su sad placeholderi. Slike idu u `public/gallery/`.
- Za hero slideshow: zamijeni `.hero-slide.sl1..4` gradijente u
  `src/app/globals.css` sa `background:url('/gallery/01.jpg')`.

## Deploy

Push na GitHub → import na Vercel → dodaj `BOOKING_ICAL_URL` u env → deploy.

## Stack

Next.js 15, React 19, TypeScript, node-ical (Booking sync),
Schema.org + Open Graph (SEO). Fontovi: Outfit + Fraunces.
