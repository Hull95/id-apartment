import type { CSSProperties, ReactNode } from "react";

type Variant = "terra" | "sage" | "light" | "outline";

type ButtonProps = {
  href: string;
  variant: Variant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Otvara u novom tabu sa rel=noopener */
  external?: boolean;
  ariaLabel?: string;
};

/** Generičko dugme/link — varijante terra | sage | light | outline */
export function Button({ href, variant, children, className, style, external, ariaLabel }: ButtonProps) {
  const cls = ["btn", `btn-${variant}`, className].filter(Boolean).join(" ");
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} className={cls} style={style} aria-label={ariaLabel} {...ext}>
      {children}
    </a>
  );
}
