import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  transpilePackages: ['@mui/x-data-grid'],
};

export default nextConfig;
