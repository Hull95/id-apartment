import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

export function Faq({ faq }: { faq: Dictionary["faq"] }) {
  return (
    <section id="faq">
      <span className="eyebrow reveal">{faq.eyebrow}</span>
      <h2 className="h2 reveal">{faq.title}</h2>
      <div className="reveal" style={{ marginTop: 28 }}>
        {faq.items.map((item) => (
          <div className="faq-item" key={item.q}>
            <div className="faq-q" role="button" tabIndex={0} aria-expanded="false">
              <span>{item.q}</span>
              <span className="ic">
                <Icon name="plus" size={18} />
              </span>
            </div>
            <div className="faq-a">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
