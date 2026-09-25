import { ImageResponse } from "next/og";
export const runtime = "edge";
export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get("t") || "An agency you can watch working.";
  return new ImageResponse(
    (<div style={{ width: "100%", height: "100%", background: "#F4F1EC", color: "#0E0E0E", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", fontFamily: "Helvetica, Arial, sans-serif" }}>
      <div style={{ fontSize: 22, color: "#8A8781", letterSpacing: 2 }}>RELAY</div>
      <div style={{ fontSize: t.length > 60 ? 56 : 72, fontWeight: 500, lineHeight: 1.05, letterSpacing: -2, maxWidth: 960 }}>{t}</div>
      <div style={{ fontSize: 22, color: "#8A8781", borderTop: "1px solid rgba(14,14,14,.18)", paddingTop: 20 }}>we-relay.studio</div>
    </div>),
    { width: 1200, height: 630 },
  );
}
