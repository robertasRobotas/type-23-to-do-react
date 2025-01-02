import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    BASE_URL: "http://localhost:3002",
  },
};

export default nextConfig;
