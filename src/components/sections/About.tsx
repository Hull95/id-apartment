import { Icon, type IconName } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

const STAT_ICONS = [
  <path key="p" d="M21 3 3 21M21 8V3h-5M3 16v5h5" />,
  <path key="p" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  <path key="p" d="M3 22V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M3 12h18" />,
  <path key="p" d="M4 20h16M4 20V10l8-6 8 6v10" />,
];

const AMENITY_ICONS: IconName[] = ["wifi", "parking", "ac", "tv", "washer", "kitchen"];

export function About({ about }: { about: Dictionary["about"] }) {
  return (
    <section id="about">
      <div className="about-grid">
        <div className="reveal">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="h2">{about.title}</h2>
          <p className="lead">{about.lead}</p>
          <div className="stats">
            {about.stats.map((s, i) => (
              <span key={s}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--terra)" strokeWidth="2">
                  {STAT_ICONS[i]}
                </svg>{" "}
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="amen reveal d1">
          {about.amenities.map((a, i) => (
            <div key={a}>
              <Icon name={AMENITY_ICONS[i]} size={22} /> {a}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
