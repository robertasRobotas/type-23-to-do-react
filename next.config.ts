import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    BASE_URL: "https://to-do-api-88ux.onrender.com",
  },
};

export default nextConfig;
