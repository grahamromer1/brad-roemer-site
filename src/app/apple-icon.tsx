import { ImageResponse } from "next/og";
import { loadJetBrainsMono } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const mono = await loadJetBrainsMono(700);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0C0C0C",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "88px",
            fontWeight: 700,
            color: "#4ADE80",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          0/1
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "JetBrains Mono",
          data: mono,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
