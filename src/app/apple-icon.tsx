import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

async function loadMonoBold(): Promise<ArrayBuffer> {
  const url =
    "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.19/files/jetbrains-mono-latin-700-normal.woff";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch JetBrains Mono 700: ${res.status} ${res.statusText}`,
    );
  }
  return res.arrayBuffer();
}

export default async function AppleIcon() {
  const mono = await loadMonoBold();

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
