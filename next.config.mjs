/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['raw.githubusercontent.com'],
  },
  webpack: (config) => {
    // This is needed for Leaflet to work properly
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource',
    });
    return config;
  },
  // Enable CSS modules for node_modules
  experimental: {
    serverComponentsExternalPackages: ['leaflet'],
  },
}

export default nextConfig
