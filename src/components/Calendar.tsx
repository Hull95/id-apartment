"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Dictionary } from "@/i18n";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Calendar({ busy, t }: { busy: string[]; t: Dictionary["calendar"] }) {
  const set = new Set(busy);
  const today = new Date();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(view.y, view.m + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const canBack = view.y > today.getFullYear() || (view.y === today.getFullYear() && view.m > today.getMonth());

  const shift = (delta: number) =>
    setView((v) => {
      const m = v.m + delta;
      return { y: v.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });

  const isPast = (d: number) => new Date(view.y, view.m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isBusy = (d: number) => set.has(`${view.y}-${pad(view.m + 1)}-${pad(d)}`);

  return (
    <div className="cal">
      <div className="cal-nav">
        <button onClick={() => shift(-1)} disabled={!canBack} aria-label={t.prevMonth} style={!canBack ? { opacity: 0.3 } : undefined}>
          <Icon name="chevronLeft" size={16} />
        </button>
        <span className="m">
          {t.months[view.m]} {view.y}
        </span>
        <button onClick={() => shift(1)} aria-label={t.nextMonth}>
          <Icon name="chevronRight" size={16} />
        </button>
      </div>
      <div className="grid7">
        {t.weekdays.map((w) => (
          <span key={w} className="wd">
            {w}
          </span>
        ))}
        {cells.map((d, i) =>
          d === null ? (
            <span key={`e${i}`} />
          ) : (
            <span key={d} className={`day ${isPast(d) ? "" : isBusy(d) ? "busy" : "free"}`} style={isPast(d) ? { color: "var(--line)" } : undefined}>
              {d}
            </span>
          ),
        )}
      </div>
      <div className="legend">
        <span>
          <span className="dot" style={{ background: "var(--cream)", border: "1px solid var(--line)" }} /> {t.free}
        </span>
        <span>
          <span className="dot" style={{ background: "var(--terra)" }} /> {t.busy}
        </span>
      </div>
    </div>
  );
}
