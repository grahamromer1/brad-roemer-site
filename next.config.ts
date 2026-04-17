import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project so it ignores the stray
  // ~/package-lock.json in the user's home directory.
  turbopack: {
    root: path.join(__dirname),
  },
  // Required for PostHog reverse proxy rewrites to work correctly.
  skipTrailingSlashRedirect: true,
  // Reverse-proxy PostHog through our own domain so ad blockers don't
  // silently drop ~20-30% of analytics events. First-party /ingest path
  // is indistinguishable from app traffic.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
};

export default nextConfig;
