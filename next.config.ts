import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  images: {
    domains: [
        'ohtsnsoxzgjbgatxkknb.supabase.co',
        'platform-lookaside.fbsbx.com',
        'ui-avatars.com',
        'lh3.googleusercontent.com'
      ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
        port: '',
        pathname: '/platform/profilepic/',
        search: '',
      },
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
