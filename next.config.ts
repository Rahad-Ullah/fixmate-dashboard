import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      {
        // Allow all URLs from https protocols
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "72.61.167.20",
        port: "5000",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "10.10.7.94",
        port: "5005",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
