import { mapsSearch } from "@/lib/config";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

export function Nearby({ nearby }: { nearby: Dictionary["nearby"] }) {
  return (
    <section>
      <div className="nearby-box reveal">
        <div className="nb-glow" />
        <span className="eyebrow">{nearby.eyebrow}</span>
        <h2>
          {nearby.titlePre}
          <em>{nearby.titleEm}</em>
          {nearby.titlePost}
        </h2>
        <p>{nearby.text}</p>
        <div className="place-links">
          {nearby.places.map((p) => (
            <a key={p.label} className="place" href={mapsSearch(p.query)} target="_blank" rel="noopener noreferrer">
              {p.label} <Icon name="arrowUpRight" size={15} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
