import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  
  // 告诉 Next.js 16，如果使用 Turbopack，也请允许某些 Webpack 逻辑
  experimental: {
    // 如果你坚持要用 Turbopack，这里需要配置规则，
    // 但目前最稳妥的是在命令行加 --webpack
  },

  /* 🚀 Webpack 配置 */
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;