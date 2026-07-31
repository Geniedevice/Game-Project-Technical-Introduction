"use client";

import Image from "next/image";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

const coverSurface = {
  dark: "bg-tile-1",
  light: "bg-parchment",
  parchment: "bg-tile-3",
} as const;

/**
 * 갤러리의 카드 한 장.
 * 누르면 상세가 그 자리에서 펼쳐집니다. (ProjectOverlay)
 */
export function ProjectCard({
  project,
  index,
  featured = false,
  onOpen,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${project.title} 기술 소개 펼치기`}
      className={cn(
        "press group flex h-full w-full flex-col overflow-hidden rounded-lg border border-hairline bg-canvas text-left",
        "hover:border-ink-48/40",
      )}
    >
      {/* 커버 */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          featured ? "aspect-[21/9]" : "aspect-video",
          !project.cover && coverSurface[project.surface],
        )}
      >
        {project.cover ? (
          <Image
            src={asset(project.cover)}
            alt=""
            fill
            sizes={featured ? "(min-width: 980px) 980px, 100vw" : "(min-width: 980px) 480px, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <TypographicCover project={project} index={index} />
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="font-mono text-fine tabular-nums text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
          <span className="text-fine text-ink-48">{project.period}</span>
        </div>

        <h3
          className={cn(
            "font-semibold text-balance text-ink",
            featured ? "text-display-fluid" : "text-tagline",
          )}
        >
          {project.title}
        </h3>

        <p
          className={cn(
            "text-pretty text-ink-80",
            featured ? "max-w-[52ch] text-lead-airy font-light" : "text-caption",
          )}
        >
          {project.tagline}
        </p>

        <ul className="mt-1 flex flex-wrap gap-1.5">
          {project.stack.slice(0, featured ? 5 : 3).map((s) => (
            <li
              key={s}
              className="rounded-full border border-divider bg-pearl px-2.5 py-1 text-fine text-ink-48"
            >
              {s}
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-caption text-primary">
          기술 소개 펼치기
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
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
      </div>
    </button>
  );
}

/** 대표 이미지가 없는 프로젝트의 커버 — 제목과 번호만으로 구성합니다. */
function TypographicCover({ project, index }: { project: Project; index: number }) {
  const onDark = project.surface !== "light";

  return (
    <div className="flex size-full flex-col justify-between p-7">
      <span
        className={cn(
          "font-mono text-fine tabular-nums",
          onDark ? "text-white/40" : "text-ink-48",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={cn(
          "text-display-fluid text-balance",
          onDark ? "text-white/90" : "text-ink",
        )}
      >
        {project.title}
      </span>
    </div>
  );
}
