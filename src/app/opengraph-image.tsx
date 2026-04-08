import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "HireCheck — Your CV was rejected by AI. Here's your right to demand a human."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #60a5fa 100%)",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "white",
              color: "#2563eb",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
            }}
          >
            HS
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>HireCheck</div>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.05,
            marginTop: 60,
            maxWidth: 1040,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>Your CV was rejected</div>
          <div style={{ color: "#fde047" }}>by an AI.</div>
        </div>

        <div
          style={{
            fontSize: 34,
            marginTop: 32,
            maxWidth: 980,
            lineHeight: 1.3,
            opacity: 0.95,
            display: "flex",
          }}
        >
          GDPR Article 22 gives you the right to demand a human review.
          Free letter generator + transparency wall for EU hiring.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          hirecheck.eu
        </div>
      </div>
    ),
    { ...size }
  )
}
