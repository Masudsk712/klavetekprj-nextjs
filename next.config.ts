import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.116"],
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
