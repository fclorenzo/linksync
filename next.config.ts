import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //reactStrictMode: false, // Disable React Strict Mode
  devIndicators: false,
    eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
