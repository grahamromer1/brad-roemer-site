import { ImageResponse } from "next/og";
import { loadJetBrainsMono } from "@/lib/og-fonts";

export const alt = "0to1.AI Blog — Field notes from learning AI in public.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [mono400, mono700] = await Promise.all([
    loadJetBrainsMono(400),
    loadJetBrainsMono(700),
  ]);

  const bgPrimary = "#0C0C0C";
  const bgSurface = "#18181B";
  const border = "#27272A";
  const textPrimary = "#E4E4E7";
  const textSecondary = "#A1A1AA";
  const textDim = "#8B8B94";
  const green = "#4ADE80";

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 22px",
              borderBottom: `1px solid ${border}`,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 9999, backgroundColor: "#FF5F56" }} />
            <div style={{ width: 14, height: 14, borderRadius: 9999, backgroundColor: "#FFBD2E" }} />
            <div style={{ width: 14, height: 14, borderRadius: 9999, backgroundColor: "#27C93F" }} />
            <div style={{ marginLeft: 14, fontSize: 18, color: textDim }}>
              blog/
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "54px 60px",
            }}
          >
            <div style={{ display: "flex", fontSize: 26, color: textSecondary, marginBottom: 20 }}>
              <span style={{ color: green, marginRight: 10 }}>~/0to1 $</span>
              <span>ls posts/</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 92,
                fontWeight: 700,
                color: textPrimary,
                lineHeight: 1.05,
                marginBottom: 28,
              }}
            >
              <span>Field notes,</span>
              <span>in public.</span>
            </div>

            <div style={{ display: "flex", fontSize: 30, color: green, marginBottom: 40 }}>
              <span>Learning AI from zero — writing what actually sticks.</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontSize: 22,
              }}
            >
              <span style={{ color: green, fontWeight: 700 }}>
                get0to1.ai/blog
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
