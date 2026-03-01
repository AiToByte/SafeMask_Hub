import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. 静态导出模式：将项目打包为静态 HTML/JS/CSS (out 文件夹) */
  output: 'export',

  /* 2. 图像优化处理：GitHub Pages 不支持 Node.js 运行时图片处理 */
  images: {
    unoptimized: true,
  },

  /* 3. 如果你的 GitHub 仓库名不是 <username>.github.io */
  /* 例如仓库名是 safemask-hub，则需要取消下面这一行的注释 */
  // basePath: '/safemask-hub',

  /* 4. 你的原始 WebAssembly & Webpack 配置 */
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // 针对 WASM 的兼容性优化（可选，防止在某些环境下找不到模块）
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
};

export default nextConfig;