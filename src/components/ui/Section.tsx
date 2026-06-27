import type { CSSProperties, ReactNode } from "react";

/** Standardni zaglavlje sekcije: eyebrow + naslov + opcioni lead (sa reveal animacijom) */
export function SectionHead({
  eyebrow,
  title,
  lead,
  leadStyle,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  leadStyle?: CSSProperties;
}) {
  return (
    <>
      <span className="eyebrow reveal">{eyebrow}</span>
      <h2 className="h2 reveal">{title}</h2>
      {lead != null && (
        <p className="lead reveal" style={leadStyle}>
          {lead}
        </p>
      )}
    </>
  );
}
