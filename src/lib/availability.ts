import ical from "node-ical";
import { site } from "./config";

function key(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function expand(start: Date, end: Date): string[] {
  const out: string[] = [];
  const cur = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const last = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  while (cur < last) {
    out.push(key(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

async function fetchBusy(url: string): Promise<string[]> {
  if (!url) return [];
  try {
    const data = await ical.async.fromURL(url);
    const busy: string[] = [];
    for (const k of Object.keys(data)) {
      const ev = data[k];
      if (ev.type === "VEVENT" && ev.start && ev.end) {
        busy.push(...expand(ev.start as Date, ev.end as Date));
      }
    }
    return busy;
  } catch (e) {
    console.error("iCal fetch failed", e);
    return [];
  }
}

export type Availability = {
  busy: string[];
  nextFree: { start: string; end: string; nights: number } | null;
};

/** Računa prvi slobodan period (>= danas) iz skupa zauzetih datuma */
function computeNextFree(busySet: Set<string>): Availability["nextFree"] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let start: Date | null = null;
  for (let i = 0; i < 180; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const isBusy = busySet.has(key(d));
    if (!isBusy && start === null) start = new Date(d);
    if (isBusy && start !== null) {
      const nights = Math.round((d.getTime() - start.getTime()) / 86400000);
      if (nights >= 1) return { start: key(start), end: key(d), nights };
      start = null;
    }
  }
  if (start) {
    const end = new Date(today);
    end.setDate(today.getDate() + 180);
    return { start: key(start), end: key(end), nights: 180 };
  }
  return null;
}

export async function getAvailability(): Promise<Availability> {
  const [b1, b2] = await Promise.all([
    fetchBusy(site.bookingICalUrl),
    fetchBusy(site.airbnbICalUrl),
  ]);
  const set = new Set([...b1, ...b2]);
  return { busy: [...set], nextFree: computeNextFree(set) };
}
