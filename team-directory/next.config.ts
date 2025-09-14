import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com'], 
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      }
    ]
  }
};

export default nextConfig;
