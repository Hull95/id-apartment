import type { ReactNode } from "react";

export type IconName =
  | "pin"
  | "calendar"
  | "viber"
  | "whatsapp"
  | "chevronLeft"
  | "chevronRight"
  | "sync"
  | "arrowUpRight"
  | "plus"
  | "navigate"
  | "phone"
  | "wifi"
  | "parking"
  | "ac"
  | "tv"
  | "kitchen"
  | "washer";

const FILLED: ReadonlySet<IconName> = new Set(["viber", "whatsapp"]);

const PATHS: Record<IconName, ReactNode> = {
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
    </>
  ),
  viber: <path d="M11.4 0C9.5.1 5.5.4 3.2 2.5 1.6 4.1 1 6.5.9 9.5.8 12.4.8 17.9 6.1 19.4v2.3s0 .9.6 1.1c.7.2 1.1-.4 1.8-1.2l1.3-1.5c3.6.3 6.4-.4 6.7-.5.7-.2 4.8-.8 5.5-6.2.7-5.6-.4-9.2-2.3-10.8C19.4.4 15.7-.2 11.4 0z" />,
  whatsapp: <path d="M.1 24l1.7-6.2C.7 15.9.1 13.7.1 11.5.1 5.1 5.3 0 11.7 0c3.1 0 6 1.2 8.2 3.4 2.2 2.2 3.4 5.1 3.4 8.2 0 6.4-5.2 11.5-11.6 11.5-1.9 0-3.8-.5-5.5-1.4L.1 24zM6.5 20l.4.2c1.5.9 3.2 1.3 4.9 1.3 5.3 0 9.6-4.3 9.6-9.5 0-2.6-1-4.9-2.8-6.7s-4.2-2.8-6.7-2.8c-5.3 0-9.6 4.3-9.6 9.5 0 1.8.5 3.6 1.5 5.1l.3.4-1 3.6 3.7-.9z" />,
  chevronLeft: <path d="M15 18l-6-6 6-6" />,
  chevronRight: <path d="M9 18l6-6-6-6" />,
  sync: <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16" />,
  arrowUpRight: <path d="M7 17L17 7M7 7h10v10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  navigate: <path d="M3 11l19-9-9 19-2-8-8-2z" />,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  wifi: <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />,
  parking: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </>
  ),
  ac: <path d="M3 8h18M3 8a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2M7 19v-2M12 19v-2M17 19v-2" />,
  tv: (
    <>
      <rect x="2" y="7" width="20" height="12" rx="2" />
      <path d="M8 3l4 4 4-4" />
    </>
  ),
  kitchen: <path d="M8 2v20M8 8h6a2 2 0 0 0 2-2V2M16 8v14" />,
  washer: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M7 6h.01" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 18, className }: IconProps) {
  const isFilled = FILLED.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? undefined : "currentColor"}
      strokeWidth={isFilled ? undefined : 2}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
