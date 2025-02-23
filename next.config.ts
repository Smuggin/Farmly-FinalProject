import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bundui-images.netlify.app',
        port: '',
        pathname: '/products/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
