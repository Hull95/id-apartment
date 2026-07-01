import { notFound } from "next/navigation";
// import { getAvailability } from "@/lib/availability"; // TODO: vrati kad se spoji Booking
import { getSiteImages } from "@/lib/gallery";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

import { ClientEffects } from "@/components/ClientEffects";
import { Intro } from "@/components/sections/Intro";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
// import { Availability } from "@/components/sections/Availability"; // TODO: vrati kad se spoji Booking
import { Nearby } from "@/components/sections/Nearby";
import { Location } from "@/components/sections/Location";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";
import { FabStack } from "@/components/sections/FabStack";

// ISR — osvježava dostupnost sa Bookinga svakih sat
export const revalidate = 3600;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  // const data = await getAvailability(); // TODO: vrati kad se spoji Booking
  const images = getSiteImages();
  const message = dict.contact.message;

  return (
    <>
      <ClientEffects />
      <Intro brand={dict.brand} />
      <div className="progress" id="progress" />

      <Nav brand={dict.brand} nav={dict.nav} locale={locale} />
      <Hero hero={dict.hero} images={images.hero} />
      <Marquee items={dict.marquee} />

      <div className="wrap">
        <Gallery gallery={dict.gallery} images={images.gallery} />
        <About about={dict.about} />
        {/* TODO: vrati sekciju Dostupnost kad se spoji Booking
        <Availability data={data} t={dict.availability} cal={dict.calendar} message={message} /> */}
        <Nearby nearby={dict.nearby} />
        <Location location={dict.location} />
        <Faq faq={dict.faq} />
      </div>

      <Closing closing={dict.closing} message={message} />
      <Footer brand={dict.brand} rights={dict.footer.rights} />
      <FabStack fab={dict.fab} message={message} />
    </>
  );
}
