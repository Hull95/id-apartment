import { viberLink, whatsappLink, telLink } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

export function Closing({ closing, message }: { closing: Dictionary["closing"]; message: string }) {
  return (
    <section className="closing" id="closing">
      <div className="wrap">
        <div className="closing-in">
          <div className="reveal">
            <h2>
              {closing.titlePre}
              <strong>{closing.titleEm}</strong>
            </h2>
            <p>{closing.text}</p>
            <span className="resp">
              <span className="pd" /> {closing.resp}
            </span>
          </div>
          <div className="closing-card reveal d1">
            <div className="ct">{closing.cardTitle}</div>
            <div className="cs">{closing.cardSub}</div>
            <div className="actions">
              <Button href={viberLink(message)} variant="sage">
                <Icon name="viber" size={18} /> {closing.viber}
              </Button>
              <Button href={whatsappLink(message)} variant="sage">
                <Icon name="whatsapp" size={18} /> {closing.whatsapp}
              </Button>
              <Button href={telLink()} variant="outline">
                <Icon name="phone" size={18} /> {closing.call}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
