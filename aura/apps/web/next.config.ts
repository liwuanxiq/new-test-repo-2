import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: true,
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ['@aura/ui', '@aura/shared'],
};

export default nextConfig;
