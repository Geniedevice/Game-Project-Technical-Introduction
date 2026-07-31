/**
 * public/ 안의 파일 경로에 basePath를 붙입니다.
 *
 * Link와 _next 자산에는 Next.js가 basePath를 자동으로 붙이지만,
 * public/ 자산은 그렇지 않습니다. unoptimized 상태의 next/image,
 * <video poster>, <source src> 전부 해당되므로 여기를 거쳐야 합니다.
 *
 *   asset("/projects/god/train.png")
 *   → "/Game-Project-Technical-Introduction/projects/god/train.png"
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${basePath}${path.startsWith("/") ? "" : "/"}${path}`;
}
