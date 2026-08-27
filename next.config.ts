import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow trusted development origins so HMR works when the site is accessed
  // over the local network.
  allowedDevOrigins: [
    "192.168.1.115",
    "192.168.1.116",
    "192.168.1.119",
    "localhost",
  ],

  async redirects() {
    return [
      {
        // PRM Centre Mall was merged into PRM Centrepoint Malda (same project).
        // Keep the old URL working by pointing it at the combined project.
        source: "/projects/commercial-buildings/prm-centre-mall",
        destination: "/projects/commercial-buildings/prm-centrepoint-malda",
        permanent: true,
      },
    ];
  },

  images: {
    // Allow every quality value requested by <Image> across the app.
    qualities: [75, 80, 85, 88, 90, 95, 100],
  },
};

export default nextConfig;