import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

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
