import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailedProjects, getProject } from "@/content/projects";
import { site } from "@/content/site";
import { GlobalNav } from "@/components/layout/GlobalNav";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetail } from "@/components/project/ProjectDetail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return detailedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: new URL(`projects/${slug}/`, site.siteUrl).toString() },
    openGraph: { title: project.title, description: project.tagline },
  };
}

/**
 * 프로젝트 전용 페이지.
 *
 * 메인에서 카드를 누르면 같은 내용이 오버레이로 펼쳐지고 주소만 이 경로로 바뀝니다.
 * 이 페이지는 그 주소를 직접 열었을 때(공유 링크 · 새로고침 · 검색)를 위한 것입니다.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.detail) notFound();

  return (
    <>
      <GlobalNav />
      <main className="pt-11">
        <ProjectDetail project={project} variant="page" />
      </main>
      <Footer />
    </>
  );
}
