import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.dummyjson.com",  "via.placeholder.com"], // Add allowed image domains here
  },
};

export default nextConfig;
