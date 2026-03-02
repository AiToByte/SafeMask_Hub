import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. 静态导出：必须开启，生成的 out 目录即为 GitHub Pages 部署内容 */
  output: 'export',
  
  /* 2. 图片优化：GitHub Pages 是静态托管，不支持 Next.js 默认的 Node.js 图片处理服务 */
  images: {
    unoptimized: true,
  },

  /**
   * 3. 基础路径配置 (非常重要!)
   * 部署到 https://AiToByte.github.io/SafeMask_Hub/ 时，必须设置 basePath。
   * 它会自动为所有的 <Link>、图片和静态资源添加前缀。
   */
  basePath: '/SafeMask_Hub',

  /**
   * 4. 资源前缀
   * 确保生成的 JS/CSS 文件路径也包含仓库名。
   */
  assetPrefix: '/SafeMask_Hub/',

  /* 5. 你的 Webpack 配置（保持 WASM 支持） */
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // 针对 WASM 在客户端运行的额外优化
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // 防止 WASM 依赖 fs 模块报错
      };
    }

    return config;
  },

  /* 6. 其他优化：禁用尾部斜杠，确保路径与 GitHub Pages 匹配一致 */
  trailingSlash: true,
};

export default nextConfig;