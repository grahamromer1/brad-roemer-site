import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project so it ignores the stray
  // ~/package-lock.json in the user's home directory.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
