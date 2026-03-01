import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  
  experimental: {
    // 显式声明 turbopack 配置（哪怕为空），可以缓解部分版本下的强行检查
    turbopack: {}, 
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