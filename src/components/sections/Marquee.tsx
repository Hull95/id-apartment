import { Icon, type IconName } from "@/components/ui/Icon";

const ICONS: IconName[] = ["wifi", "parking", "ac", "tv", "kitchen", "pin"];

export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[0, 1].map((set) => (
          <div className="mq-set" key={set} aria-hidden={set === 1}>
            {items.map((label, i) => (
              <span className="mq-chip" key={label}>
                <Icon name={ICONS[i % ICONS.length]} size={16} /> {label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
