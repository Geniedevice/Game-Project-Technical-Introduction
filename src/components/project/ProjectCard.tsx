"use client";

import type { Project } from "@/content/projects";
import { ProjectIcon } from "./ProjectIcon";
import { cn } from "@/lib/cn";

/** 아이콘 타일의 배경 — 프로젝트 표면 색을 따릅니다. */
const tile = {
  dark: "bg-tile-1 text-sky",
  light: "bg-pearl text-primary",
  parchment: "bg-parchment text-primary",
} as const;

/**
 * 목록의 항목 한 칸.
 * 앱 아이콘처럼 아이콘 · 제목 · 짧은 꼬리표만 보여주고,
 * 누르면 상세가 그 위로 펼쳐집니다. (ProjectOverlay)
 */
export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${project.title} 기술 소개 펼치기`}
      className="press group flex flex-col items-center gap-4 text-center"
    >
      {/* 아이콘 타일 */}
      <span
        className={cn(
          "relative flex aspect-square w-full items-center justify-center rounded-[22%] border border-hairline",
          "transition-colors duration-300 group-hover:border-ink-48/40",
          tile[project.surface],
        )}
      >
        <ProjectIcon
          name={project.icon}
          className="size-[38%] transition-transform duration-500 group-hover:scale-110"
        />

        {/* 펼침 표시 — 마우스를 올리면 나타납니다 */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-2.5 bottom-2.5 flex size-7 items-center justify-center rounded-full",
            "bg-canvas/85 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-300",
            "group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
        >
          <svg
            viewBox="0 0 16 16"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.5 2.5H13.5V6.5" />
            <path d="M6.5 13.5H2.5V9.5" />
            <path d="M13.5 2.5 9 7M2.5 13.5 7 9" />
          </svg>
        </span>
      </span>

      {/* 제목 */}
      <span className="flex flex-col gap-1">
        <span className="text-caption font-semibold text-balance text-ink">
          {project.title}
        </span>
        <span className="text-fine text-ink-48">{project.label}</span>
      </span>
    </button>
  );
}
