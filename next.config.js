/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  // GitHub Pages 部署在 /<repo> 子路径下，仅在构建时注入；本地 dev 保持根路径
  ...(basePath ? { basePath, trailingSlash: true } : {}),
};

module.exports = nextConfig;
