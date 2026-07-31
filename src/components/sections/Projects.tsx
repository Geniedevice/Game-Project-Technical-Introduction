"use client";

import { useCallback, useEffect, useState } from "react";
import { projects, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectOverlay } from "@/components/project/ProjectOverlay";

/**
 * 프로젝트 갤러리.
 *
 * 목록에서는 카드만 보여주고, 카드를 누르면 상세가 그 위로 펼쳐집니다.
 * 첫 프로젝트는 대표작이라 한 줄을 다 쓰는 큰 카드로 둡니다.
 */
export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = openSlug ? projects.find((p) => p.slug === openSlug) : null;

  const [featured, ...rest] = projects;

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
          title="문제를 어떻게 구조로 풀었는가"
          description="완성된 화면보다, 그 화면을 만들기 위해 무엇을 바꿨는지를 적었습니다. 카드를 누르면 기술 소개가 펼쳐집니다."
        />

        <div className="mt-16 flex flex-col gap-6">
          <Reveal>
            <ProjectCard
              project={featured}
              index={0}
              featured
              onOpen={() => openProject(featured)}
            />
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80} className="h-full">
                <ProjectCard
                  project={project}
                  index={i + 1}
                  onOpen={() => openProject(project)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {open && <ProjectOverlay project={open} onClose={close} />}
    </section>
  );
}
