import { viberLink, whatsappLink } from "@/lib/config";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

export function FabStack({ fab, message }: { fab: Dictionary["fab"]; message: string }) {
  return (
    <div className="fab-stack">
      <a className="fab v" href={viberLink(message)} aria-label={fab.viberAria}>
        <Icon name="viber" size={24} />
        <span className="fl">{fab.label}</span>
      </a>
      <a className="fab w" href={whatsappLink(message)} aria-label={fab.whatsappAria}>
        <Icon name="whatsapp" size={24} />
        <span className="fl">{fab.label}</span>
      </a>
    </div>
  );
}
