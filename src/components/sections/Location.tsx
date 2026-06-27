import { site, mapsDir, mapsEmbed } from "@/lib/config";
import { SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

export function Location({ location }: { location: Dictionary["location"] }) {
  return (
    <section id="location">
      <SectionHead
        eyebrow={location.eyebrow}
        title={location.title}
        lead={`${site.location.address}${location.leadSuffix}`}
        leadStyle={{ marginBottom: 28 }}
      />
      <div className="map-wrap reveal">
        <iframe src={mapsEmbed()} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={location.mapTitle} />
        <div className="map-bar">
          <div className="ad">
            <Icon name="pin" size={18} />
            {site.location.address}
          </div>
          <Button href={mapsDir()} variant="sage" external className="auto" style={{ height: 46, padding: "0 20px" }}>
            <Icon name="navigate" size={16} />
            {location.navBtn}
          </Button>
        </div>
      </div>
    </section>
  );
}
