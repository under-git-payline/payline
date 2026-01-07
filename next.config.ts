import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'paylinedatav2.wpenginepowered.com',
        pathname: '/wp-content/uploads/**',
      },
      // Add your production WordPress domain here when ready
      // {
      //   protocol: 'https',
      //   hostname: 'your-production-domain.com',
      //   pathname: '/wp-content/uploads/**',
      // },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/14-best-website-builders-for-freelancers',
        destination: '/blog/15-best-website-builders-for-freelancers',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
