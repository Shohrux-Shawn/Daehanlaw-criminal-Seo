const path = require('path');

/** @type {import('next').NextConfig} */
const monorepoRoot = path.resolve(process.cwd(), '../..');
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@daehanlaw/ui', '@daehanlaw/graphql', '@daehanlaw/config'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.join(monorepoRoot, 'node_modules/react'),
      'react-dom': path.join(monorepoRoot, 'node_modules/react-dom'),
      graphql: path.join(monorepoRoot, 'node_modules/graphql'),
    };
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { message: /only differ in casing/ },
    ];
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.daehanlaw.com' },
      { protocol: 'https', hostname: 'daehanlaw.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.daehanlaw.com/graphql',
  },
  async rewrites() {
    return [
      { source: '/practice/solatium', destination: '/solatium' },
    ];
  },
  async redirects() {
    return [
      { source: '/wp-admin/:path*',    destination: '/', permanent: true },
      { source: '/wp-content/:path*',  destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/index.php/:path*',   destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
