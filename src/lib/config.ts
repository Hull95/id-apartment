/**
 * Centralna konfiguracija — sve što mijenjaš je ovdje (ili u .env.local).
 *
 * TELEFON: postavi broj samo na jednom mjestu — u .env.local:
 *   NEXT_PUBLIC_PHONE_INTL=38765123456     (međunarodni, bez + i razmaka)
 *   NEXT_PUBLIC_PHONE_DISPLAY=+387 65 123 456
 * Iz toga se automatski grade Viber, WhatsApp i tel: linkovi.
 */
export const site = {
  name: "ID Apartment",
  domain: "https://apartmanbanjaluka.com",

  phone: {
    display: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "+387 65 089 633",
    international: process.env.NEXT_PUBLIC_PHONE_INTL || "38765089633",
  },

  location: {
    address: "Prvog krajiškog korpusa 13, Banja Luka",
    lat: 44.7722,
    lng: 17.191,
  },

  // Booking.com iCal export:
  // Booking Extranet -> Rates & Availability -> Sync Calendars -> Export your Calendar
  // Stavi link u .env.local kao BOOKING_ICAL_URL=...
  bookingICalUrl: process.env.BOOKING_ICAL_URL || "",
  airbnbICalUrl: process.env.AIRBNB_ICAL_URL || "",
} as const;

export function viberLink(msg: string) {
  return `viber://chat?number=%2B${site.phone.international}&text=${encodeURIComponent(msg)}`;
}
export function whatsappLink(msg: string) {
  return `https://wa.me/${site.phone.international}?text=${encodeURIComponent(msg)}`;
}
export function telLink() {
  return `tel:${site.phone.display.replace(/\s/g, "")}`;
}
export function mapsSearch(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
export function mapsDir() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.location.address)}`;
}
export function mapsEmbed() {
  return `https://www.google.com/maps?q=${encodeURIComponent(site.location.address)}&output=embed`;
}
