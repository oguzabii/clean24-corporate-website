import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next.js doesn't infer it from
  // an unrelated lockfile elsewhere on the machine.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
