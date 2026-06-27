import { viberLink } from "@/lib/config";
import type { Availability as AvailabilityData } from "@/lib/availability";
import { Calendar } from "@/components/Calendar";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

function formatRange(start: string, end: string, monthsShort: string[]): string {
  const s = new Date(start);
  const e = new Date(end);
  const endDay = new Date(e.getTime() - 86400000); // zadnja noć
  return `${s.getDate()}. — ${endDay.getDate()}. ${monthsShort[endDay.getMonth()]} ${endDay.getFullYear()}`;
}

export function Availability({
  data,
  t,
  cal,
  message,
}: {
  data: AvailabilityData;
  t: Dictionary["availability"];
  cal: Dictionary["calendar"];
  message: string;
}) {
  const { busy, nextFree } = data;
  const nextLabel = nextFree ? formatRange(nextFree.start, nextFree.end, cal.monthsShort) : t.noFree;
  const nextNights = nextFree ? nextFree.nights : 0;

  return (
    <section id="availability">
      <div className="cal-head reveal">
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="h2">{t.title}</h2>
        </div>
        <span className="sync">
          <Icon name="sync" size={12} /> {t.sync}
        </span>
      </div>
      <div className="cal-layout reveal">
        <Calendar busy={busy} t={cal} />
        <div className="cal-info">
          <div className="info-card">
            <div className="glow" />
            <div className="lbl">{t.nextLabel}</div>
            <div className="date">{nextLabel}</div>
            <div className="sub">{nextNights > 0 ? `${nextNights} ${t.nightsInRow}` : t.contactForDetails}</div>
            <div className="info-row">
              {t.pills.map((p) => (
                <div className="info-pill" key={p.l}>
                  <div className="pn">{p.n}</div>
                  <div className="pl">{p.l}</div>
                </div>
              ))}
            </div>
            <a href={viberLink(message)} className="ibtn">
              <Icon name="viber" size={17} />
              {t.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
