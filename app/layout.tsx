import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GPT-Image-2 中转站索引",
  description: "GPT-Image-2 生图中转站与生成平台可用渠道汇总。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
