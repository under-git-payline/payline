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
      {
        source: '/blog/top-7-cloud-based-hr-and-payroll-software',
        destination: '/blog/top-8-cloud-based-hr-and-payroll-software',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
