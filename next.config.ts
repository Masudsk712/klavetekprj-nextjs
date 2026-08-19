import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow trusted development origins so HMR works when the site is accessed
  // over the local network (e.g. http://192.168.1.115:3000) without Next.js
  // blocking the webpack-HMR cross-origin request.
  allowedDevOrigins: ["192.168.1.115", "192.168.1.116", "localhost"],
  images: {
    // Allow every quality value requested by <Image> across the app.
    // Next.js 16 restricts the optimizer to this list by default [75];
    // the MD portrait (95), journey timeline (88) and navbar logo (100)
    // would otherwise be rejected with a 400 and render broken/empty.
    qualities: [75, 80, 85, 88, 90, 95, 100],
  },
};

export default nextConfig;
