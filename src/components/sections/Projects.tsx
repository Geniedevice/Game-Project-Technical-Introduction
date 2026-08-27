"use client";

import { useCallback, useEffect, useState } from "react";
import { projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectOverlay } from "@/components/project/ProjectOverlay";

/**
 * 프로젝트 목록.
 *
 * 아이콘과 제목만 늘어놓고, 누르면 상세가 그 위로 펼쳐집니다.
 * 프로젝트가 늘어나도 줄만 추가되도록 균일한 그리드로 둡니다.
 */
export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = openSlug ? projects.find((p) => p.slug === openSlug) : null;

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
    <section id="projects" className="scroll-mt-24 bg-parchment px-6 py-24 sm:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Projects"
          title="지금까지 만든 것들"
          description="작업해온 프로젝트의 기록입니다."
        />

        {/*
          격자 대신 flex + justify-center로 둡니다.
          프로젝트 수가 3의 배수가 아닐 때도 마지막 줄이 가운데로 모이고,
          칸 너비는 3열 격자와 똑같이 유지됩니다. (가로 간격 24px 기준)
        */}
        <ul className="mx-auto mt-16 flex max-w-[1120px] flex-wrap justify-center gap-x-6 gap-y-10">
          {projects.map((project, i) => (
            <Reveal
              as="li"
              key={project.slug}
              delay={(i % 3) * 70}
              className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <ProjectCard project={project} onOpen={() => openProject(project)} />
            </Reveal>
          ))}
        </ul>
      </div>

      {open && <ProjectOverlay project={open} onClose={close} />}
    </section>
  );
}
