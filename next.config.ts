import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next.js doesn't infer it from
  // an unrelated lockfile elsewhere on the machine.
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/leistungen",
        permanent: true,
      },
      {
        source: "/ueber-uns-2",
        destination: "/unternehmen",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/datenschutz",
        permanent: true,
      },
      {
        source: "/kontakt-2",
        destination: "/kontakt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
