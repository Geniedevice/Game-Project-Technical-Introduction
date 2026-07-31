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
  /**
   * public/ 자산 경로에는 basePath가 자동으로 붙지 않습니다.
   * (unoptimized 이미지, <video>, <source> 모두 해당)
   * 그래서 값을 클라이언트로 넘겨 src/lib/asset.ts에서 직접 붙입니다.
   */
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // GitHub Pages에는 Next.js 이미지 최적화 서버가 없습니다
  images: { unoptimized: true },
  // /about → /about/index.html 로 내보내 새로고침 404를 막습니다
  trailingSlash: true,
};

export default nextConfig;
