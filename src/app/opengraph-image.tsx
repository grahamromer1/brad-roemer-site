import { ImageResponse } from "next/og";

export const alt =
  "0to1.AI — Personal AI guidance for solo operators. Learn AI with a guide, not a guru.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetch JetBrains Mono weights at build time from jsdelivr's @fontsource CDN.
// Satori accepts WOFF; the result is baked into the statically-generated PNG,
// so there is zero runtime cost for social crawlers.
async function loadFont(weight: 400 | 700): Promise<ArrayBuffer> {
  const url = `https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.19/files/jetbrains-mono-latin-${weight}-normal.woff`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch JetBrains Mono ${weight}: ${res.status} ${res.statusText}`,
    );
  }
  return res.arrayBuffer();
}

export default async function Image() {
  const [mono400, mono700] = await Promise.all([loadFont(400), loadFont(700)]);

  // Design tokens mirror src/app/globals.css
  const bgPrimary = "#0C0C0C";
  const bgSurface = "#18181B";
  const border = "#27272A";
  const textPrimary = "#E4E4E7";
  const textSecondary = "#A1A1AA";
  const textDim = "#8B8B94";
  const green = "#4ADE80";
  const amber = "#FBBF24";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: bgPrimary,
          padding: "56px",
          fontFamily: "JetBrains Mono",
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: "14px",
            border: `1px solid ${border}`,
            backgroundColor: bgSurface,
            overflow: "hidden",
          }}
        >
          {/* Terminal chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 22px",
              borderBottom: `1px solid ${border}`,
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                backgroundColor: "#FF5F56",
              }}
            />
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                backgroundColor: "#FFBD2E",
              }}
            />
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "9999px",
                backgroundColor: "#27C93F",
              }}
            />
            <div
              style={{
                marginLeft: "14px",
                fontSize: "18px",
                color: textDim,
              }}
            >
              0to1.md
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "54px 60px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "26px",
                color: textSecondary,
                marginBottom: "20px",
              }}
            >
              <span style={{ color: green, marginRight: "10px" }}>
                ~/0to1 $
              </span>
              <span>whoami</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "88px",
                fontWeight: 700,
                color: textPrimary,
                lineHeight: 1.05,
                marginBottom: "28px",
              }}
            >
              <span>AI-curious to</span>
              <span>AI-fluent.</span>
            </div>

            <div
              style={{
                fontSize: "30px",
                color: green,
                marginBottom: "40px",
              }}
            >
              Learn AI with a guide, not a guru.
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: textDim,
                fontSize: "22px",
              }}
            >
              <span style={{ display: "flex" }}>
                <span style={{ color: amber, marginRight: "10px" }}>[!]</span>
                <span>$295/mo · cancel anytime</span>
              </span>
              <span style={{ color: green, fontWeight: 700 }}>get0to1.ai</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: mono400, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: mono700, weight: 700, style: "normal" },
      ],
    },
  );
}
