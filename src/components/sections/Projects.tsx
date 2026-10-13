"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectOverlay } from "@/components/project/ProjectOverlay";

/**
 * 프로젝트 목록.
 *
 * 아이콘과 제목만 늘어놓고, 누르면 상세가 그 위로 펼쳐집니다.
 * 프로젝트가 늘어나도 한 줄에서 옆으로 넘겨 보도록 가로 스크롤로 둡니다.
 */
export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = openSlug ? projects.find((p) => p.slug === openSlug) : null;
  const rowRef = useRef<HTMLUListElement>(null);

  /** 한 칸(첫 카드 너비 + 간격)만큼 옆으로 넘긴다 */
  const scrollRow = (dir: 1 | -1) => {
    const row = rowRef.current;
    const card = row?.firstElementChild as HTMLElement | null;
    if (!row || !card) return;
    row.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  /**
   * 전용 페이지가 있는 프로젝트만 주소를 바꿉니다.
   * 그래야 열린 상태로 새로고침해도 같은 내용이 뜹니다.
   * (페이지가 없는 프로젝트에서 주소를 바꾸면 새로고침 시 404가 됩니다)
   */
  const openProject = useCallback((project: Project) => {
    setOpenSlug(project.slug);

    if (project.detail) {
      window.history.pushState(
        { project: project.slug },
        "",
        `projects/${project.slug}/`,
      );
    }
  }, []);

  const close = useCallback(() => {
    const project = openSlug ? projects.find((p) => p.slug === openSlug) : null;
    setOpenSlug(null);
    if (project?.detail) window.history.back();
  }, [openSlug]);

  // 뒤로 가기로 닫힌 경우 상태만 정리합니다
  useEffect(() => {
    function onPopState() {
      setOpenSlug(null);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <section id="projects" className="scroll-mt-28 bg-parchment px-6 py-24 sm:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Projects"
          title="지금까지 만든 것들"
          description="작업해온 프로젝트의 기록입니다."
        />

        {/*
          한 줄 가로 스크롤. 칸 너비는 3열 격자와 같고, 넘치는 칸은 옆으로 넘겨 봅니다.
          스크롤바는 숨기고 버튼으로 한 칸씩 넘깁니다 — 마우스 휠만으로는 가로로 못 가서.
        */}
        <div className="mx-auto mt-16 max-w-[1120px]">
          <div className="mb-4 flex justify-end gap-2">
            {(["이전", "다음"] as const).map((label, dir) => (
              <button
                key={label}
                type="button"
                aria-label={`${label} 프로젝트`}
                onClick={() => scrollRow(dir ? 1 : -1)}
                className="press flex size-9 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:border-ink-48/40"
              >
                <svg viewBox="0 0 16 16" className={cn("size-3.5", dir === 0 && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </button>
            ))}
          </div>
          <ul
            ref={rowRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, i) => (
              <Reveal
                as="li"
                key={project.slug}
                delay={(i % 3) * 70}
                className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <ProjectCard project={project} onOpen={() => openProject(project)} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {open && <ProjectOverlay project={open} onClose={close} />}
    </section>
  );
}
