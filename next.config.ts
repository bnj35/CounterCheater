import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow loading remote avatars from Steam
    domains: ["avatars.steamstatic.com"],
  },
};

export default nextConfig;
