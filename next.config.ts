import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    domains: [
        'ohtsnsoxzgjbgatxkknb.supabase.co'
      ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bundui-images.netlify.app',
        port: '',
        pathname: '/products/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'bundui-images.netlify.app',
        port: '',
        pathname: '/products/**',
        search: '',
      }
    ],
  },
  
};


export default nextConfig;
