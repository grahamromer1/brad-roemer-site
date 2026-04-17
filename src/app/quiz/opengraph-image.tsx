import { ImageResponse } from "next/og";
import { loadJetBrainsMono } from "@/lib/og-fonts";

export const alt =
  "AI Readiness Quiz — 0to1.AI. 5 minutes, see where you stand with AI today.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [mono400, mono700] = await Promise.all([
    loadJetBrainsMono(400),
    loadJetBrainsMono(700),
  ]);

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
              style={{ marginLeft: "14px", fontSize: "18px", color: textDim }}
            >
              quiz.md
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
              <span>./quiz --start</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "92px",
                fontWeight: 700,
                color: textPrimary,
                lineHeight: 1.05,
                marginBottom: "28px",
              }}
            >
              <span>AI Readiness</span>
              <span>Quiz.</span>
            </div>

            <div style={{ display: "flex", fontSize: "30px", color: green, marginBottom: "40px" }}>
              <span>5 minutes · 2 high-leverage actions this week.</span>
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
                <span>Free · No email required</span>
              </span>
              <span style={{ color: green, fontWeight: 700 }}>
                get0to1.ai/quiz
              </span>
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
