import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n";
import { isLocale, defaultLocale } from "@/i18n/config";
import { site } from "@/lib/config";

export const alt = "Apartman Kukić — Banja Luka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0F766E 0%, #0B403B 100%)",
          color: "#FCFAF8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, opacity: 0.85, marginBottom: 28 }}>
          {site.location.address}
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: "-2px" }}>{site.name}</div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 28, maxWidth: 960, opacity: 0.92 }}>{dict.meta.ogTitle}</div>
      </div>
    ),
    size,
  );
}
