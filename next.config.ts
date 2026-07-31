import type { NextConfig } from "next";

/**
 * GitHub Pages 정적 배포 설정.
 *
 * - `username.github.io` 저장소에 올린다면 BASE_PATH를 비워두세요.
 * - `username.github.io/repo-name` 형태라면 BASE_PATH=/repo-name 으로 설정합니다.
 *   (.github/workflows/deploy.yml에서 자동으로 넣어줍니다)
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // GitHub Pages에는 Next.js 이미지 최적화 서버가 없습니다
  images: { unoptimized: true },
  // /about → /about/index.html 로 내보내 새로고침 404를 막습니다
  trailingSlash: true,
};

export default nextConfig;
