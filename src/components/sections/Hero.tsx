import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n";

export function Hero({ hero, images = [] }: { hero: Dictionary["hero"]; images?: string[] }) {
  // Jedan slajd po slici; bez slika → 4 gradijent placeholdera.
  // CSS (>1500px) skriva prvi slajd i prikazuje zadnji (pogled_1).
  const slides = images.length > 0 ? images : ["", "", "", ""];
  return (
    <header className="hero">
      <div className="hero-slides">
        {slides.map((src, i) => (
          <div key={i} className={`hero-slide sl${i + 1}`}>
            {src && (
              <Image
                src={src}
                alt={i === 0 ? hero.imageAlt : ""}
                fill
                priority={i <= 1}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center 60%" }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="hero-scrim" />
      <div className="hero-dots">
        <i className="on" />
        <i />
        <i />
        <i />
      </div>
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-anim s2">
            {hero.titlePre}
            <span className="accent">{hero.titleEm}</span>
            {hero.titlePost}
          </h1>
          <p className="hero-anim s3">{hero.subtitle}</p>
          <div className="cta-row hero-anim s4">
            <Button href="#closing" variant="terra">
              <Icon name="calendar" size={16} />
              {hero.ctaAvailability}
            </Button>
            <Button href="#gallery" variant="light">
              {hero.ctaGallery}
            </Button>
          </div>
          <div className="hero-facts hero-anim s5">
            {hero.facts.map((f) => (
              <div className="hero-fact" key={f.l}>
                <div className="n">{f.n}</div>
                <div className="l">{f.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
