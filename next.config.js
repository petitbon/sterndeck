/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Changed from true to false
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
