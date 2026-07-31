import type { Project } from "@/content/projects";
import { getPost, postHref } from "@/content/til";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 상세 페이지가 아직 없는 프로젝트의 본문.
 * 문제 → 접근 → 결과 → 근거 순서는 상세와 동일합니다.
 */
export function ProjectSummary({ project }: { project: Project }) {
  return (
    <div>
      {/* 헤더 — 다크 */}
      <section className="bg-tile-1 px-6 pt-16 pb-16">
        <div className="container-tight">
          <Reveal>
            <h1 className="text-hero-fluid text-balance text-white">{project.title}</h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-5 max-w-[52ch] text-lead font-normal text-pretty text-[#cccccc]">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/12 pt-8 sm:grid-cols-4">
              {[
                { k: "기간", v: project.period },
                { k: "역할", v: project.role },
                { k: "규모", v: project.teamSize },
                { k: "스택", v: project.stack.join(" · ") },
              ].map((item) => (
                <div key={item.k} className="flex flex-col gap-1.5">
                  <dt className="text-fine tracking-[0.1em] text-white/45 uppercase">
                    {item.k}
                  </dt>
                  <dd className="text-caption text-white">{item.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 문제 → 접근 */}
      <section className="bg-canvas px-6 py-20">
        <div className="container-tight">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <Reveal className="flex flex-col gap-3">
              <h2 className="text-caption font-semibold tracking-[0.12em] text-primary uppercase">
                문제
              </h2>
              <p className="text-body text-pretty text-ink-80">{project.problem}</p>
            </Reveal>

            <Reveal delay={80} className="flex flex-col gap-3">
              <h2 className="text-caption font-semibold tracking-[0.12em] text-primary uppercase">
                접근
              </h2>
              <ul className="flex flex-col gap-3">
                {project.approach.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[11px] size-1 shrink-0 rounded-full bg-primary"
                    />
                    <span className="text-body text-pretty text-ink-80">{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* 결과 */}
          <Reveal delay={140}>
            <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-hairline sm:grid-cols-3">
              {project.results.map((r) => (
                <div key={r.label} className="flex flex-col gap-2 bg-canvas p-6">
                  <span className="text-fine tracking-[0.1em] text-ink-48 uppercase">
                    {r.label}
                  </span>
                  <span className="text-tagline font-semibold tabular-nums text-ink">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 근거 */}
      {project.relatedPosts.length > 0 && (
        <section className="bg-parchment px-6 py-20">
          <div className="container-tight">
            <Reveal>
              <p className="text-fine tracking-[0.1em] text-ink-48 uppercase">
                이 판단의 근거
              </p>
            </Reveal>

            <ul className="mt-5 flex flex-col gap-2.5">
              {project.relatedPosts.map((id) => {
                const post = getPost(id);
                if (!post) return null;

                return (
                  <Reveal as="li" key={id}>
                    <a
                      href={postHref(post)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press group inline-flex items-start gap-2 text-body text-primary"
                    >
                      <span className="underline-offset-4 group-hover:underline">
                        {post.title}
                      </span>
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="mt-[7px] size-3 shrink-0 opacity-70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 3h7v7" />
                        <path d="M13 3 3.5 12.5" />
                      </svg>
                    </a>
                  </Reveal>
                );
              })}
            </ul>

            {project.links && project.links.length > 0 && (
              <Reveal delay={100}>
                <div className="mt-10 flex flex-wrap gap-3">
                  {project.links.map((l) => (
                    <Button key={l.href} href={l.href} variant="ghost">
                      {l.label}
                    </Button>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
