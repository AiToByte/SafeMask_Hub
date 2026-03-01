import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. 静态导出 */
  output: 'export',
  
  /* 2. 图片优化关闭（GitHub Pages 必须） */
  images: {
    unoptimized: true,
  },

  /* 3. 你的 Webpack WASM 配置 */
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