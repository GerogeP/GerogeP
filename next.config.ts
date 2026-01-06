import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Pages 需要显式设置基础路径
  // 如果您的仓库名称不是 "GerogeP"，请替换为实际的仓库名称
  // 例如：如果仓库是 "my-awesome-app"，则设置为 "/my-awesome-app"
  basePath: '/GerogeP',
};

export default nextConfig;
