"use client";

import Image from "next/image";
import type { Project } from "@/content/projects";
import { ProjectIcon } from "./ProjectIcon";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/** 배너 이미지가 없을 때 쓰는 배경 — 프로젝트 표면 색을 따릅니다. */
const fallback = {
  dark: "bg-tile-1 text-sky",
  light: "bg-pearl text-primary",
  parchment: "bg-parchment text-primary",
} as const;

/**
 * 목록의 항목 한 칸.
 * 게임 프로젝트는 대표 아트를 16:9 배너로 보여주고,
 * 그 외에는 선 아이콘으로 대신합니다. 누르면 상세가 펼쳐집니다.
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
      className="press group flex w-full flex-col gap-4 text-left"
    >
      {/* 배너 */}
      <span
        className={cn(
          "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-hairline",
          "transition-colors duration-300 group-hover:border-ink-48/40",
          !project.banner && fallback[project.surface],
        )}
      >
        {project.banner ? (
          <Image
            src={asset(project.banner)}
            alt=""
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectIcon
            name={project.icon}
            className="size-[26%] transition-transform duration-500 group-hover:scale-110"
          />
        )}

        {/* 펼침 표시 — 마우스를 올리면 나타납니다 */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full",
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
      <span className="flex flex-col gap-1 px-0.5">
        <span className="text-body-strong text-balance text-ink">
          {project.title}
        </span>
        <span className="text-caption text-ink-48">{project.label}</span>
      </span>
    </button>
  );
}
