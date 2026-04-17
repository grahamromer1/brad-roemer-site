/**
 * Shared build-time font loader for next/og ImageResponse routes.
 *
 * Satori (the engine behind next/og) needs actual font binary data; it can't
 * use system fonts. We fetch JetBrains Mono WOFF from the @fontsource CDN at
 * build time so the resulting PNGs are statically baked and social crawlers
 * pay zero runtime cost.
 */

type Weight = 400 | 700;

const JETBRAINS_MONO_VERSION = "5.0.19";

export async function loadJetBrainsMono(weight: Weight): Promise<ArrayBuffer> {
  const url = `https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@${JETBRAINS_MONO_VERSION}/files/jetbrains-mono-latin-${weight}-normal.woff`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch JetBrains Mono ${weight}: ${res.status} ${res.statusText}`,
    );
  }
  return res.arrayBuffer();
}
