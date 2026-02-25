import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 🚀 必须开启此项以支持 WASM 模块导入 */
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