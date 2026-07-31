import type { ProjectIconName } from "@/content/projects";

/**
 * 프로젝트 목록에 쓰는 선 아이콘.
 * 새 프로젝트에 새 모양이 필요하면 여기에 추가하고
 * projects.ts의 ProjectIconName에 이름을 넣으세요.
 */
const paths: Record<ProjectIconName, React.ReactNode> = {
  // 톱니 — 엔진 · 시스템
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.9 1.9M16.8 16.8l1.9 1.9M18.7 5.3l-1.9 1.9M7.2 16.8l-1.9 1.9" />
    </>
  ),
  // 터미널 — 콘솔 · C++
  terminal: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="m7 9.5 3 2.5-3 2.5M13.5 14.5H17" />
    </>
  ),
  // 그래프 — 알고리즘 · 자료구조
  nodes: (
    <>
      <circle cx="6" cy="17.5" r="2.4" />
      <circle cx="12" cy="5.5" r="2.4" />
      <circle cx="18" cy="17.5" r="2.4" />
      <path d="M7.7 15.4 10.5 7.7M13.5 7.7l2.8 7.7M8.4 17.5h7.2" />
    </>
  ),
  // 네트워크 — 멀티플레이 · 서버
  network: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5a9.5 9.5 0 0 1 0 19 9.5 9.5 0 0 1 0-19Z" />
      <path d="M2.5 12h6.5M15 12h6.5" />
    </>
  ),
  // 큐브 — 3D · 에셋
  cube: (
    <>
      <path d="M12 2.8 21 7.6v8.8L12 21.2 3 16.4V7.6Z" />
      <path d="m3 7.6 9 4.8 9-4.8M12 12.4v8.8" />
    </>
  ),
};

export function ProjectIcon({
  name,
  className,
}: {
  name: ProjectIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
