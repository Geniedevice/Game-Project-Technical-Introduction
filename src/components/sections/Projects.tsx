import { projects, type Project } from "@/content/projects";
import { getPost, postHref } from "@/content/til";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const surface = {
  dark: "bg-tile-1",
  light: "bg-canvas",
  parchment: "bg-parchment",
} as const;

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="bg-canvas px-6 py-24 sm:py-32">
        <SectionHeading
          eyebrow="Projects"
          title="문제를 어떻게 구조로 풀었는가"
          description="완성된 화면보다, 그 화면을 만들기 위해 무엇을 바꿨는지를 적었습니다. 각 판단의 근거는 학습 기록으로 연결됩니다."
        />
      </div>

      {projects.map((project, i) => (
        <ProjectTile key={project.slug} project={project} index={i} />
      ))}
    </section>
  );
}

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const onDark = project.surface === "dark";

  return (
    <article className={cn("px-6 py-20 sm:py-28", surface[project.surface])}>
      <div className="container-tight">
        {/* 헤더 */}
        <Reveal className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "font-mono text-fine tabular-nums",
                onDark ? "text-sky" : "text-primary",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden="true"
              className={cn("h-px flex-1", onDark ? "bg-white/15" : "bg-hairline")}
            />
            <span className={cn("text-fine", onDark ? "text-[#cccccc]" : "text-ink-48")}>
              {project.period}
            </span>
          </div>

          <h3
            className={cn(
              "text-display-fluid text-balance",
              onDark ? "text-white" : "text-ink",
            )}
          >
            {project.title}
          </h3>

          <p
            className={cn(
              "max-w-[52ch] text-lead font-normal text-pretty",
              onDark ? "text-[#cccccc]" : "text-ink-80",
            )}
          >
            {project.tagline}
          </p>
        </Reveal>

        {/* 메타 */}
        <Reveal delay={80}>
          <dl
            className={cn(
              "mt-10 grid grid-cols-1 gap-x-8 gap-y-5 border-t pt-8 sm:grid-cols-3",
              onDark ? "border-white/12" : "border-hairline",
            )}
          >
            {[
              { k: "역할", v: project.role },
              { k: "규모", v: project.teamSize },
              { k: "스택", v: project.stack.join(" · ") },
            ].map((item) => (
              <div key={item.k} className="flex flex-col gap-1.5">
                <dt
                  className={cn(
                    "text-fine tracking-[0.1em] uppercase",
                    onDark ? "text-white/45" : "text-ink-48",
                  )}
                >
                  {item.k}
                </dt>
                <dd className={cn("text-caption", onDark ? "text-white" : "text-ink")}>
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* 문제 → 접근 */}
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal delay={120} className="flex flex-col gap-3">
            <h4
              className={cn(
                "text-caption font-semibold tracking-[0.12em] uppercase",
                onDark ? "text-sky" : "text-primary",
              )}
            >
              문제
            </h4>
            <p
              className={cn(
                "text-body text-pretty",
                onDark ? "text-[#cccccc]" : "text-ink-80",
              )}
            >
              {project.problem}
            </p>
          </Reveal>

          <Reveal delay={180} className="flex flex-col gap-3">
            <h4
              className={cn(
                "text-caption font-semibold tracking-[0.12em] uppercase",
                onDark ? "text-sky" : "text-primary",
              )}
            >
              접근
            </h4>
            <ul className="flex flex-col gap-3">
              {project.approach.map((line) => (
                <li key={line} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-[11px] size-1 shrink-0 rounded-full",
                      onDark ? "bg-sky" : "bg-primary",
                    )}
                  />
                  <span
                    className={cn(
                      "text-body text-pretty",
                      onDark ? "text-[#cccccc]" : "text-ink-80",
                    )}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* 결과 */}
        <Reveal delay={220}>
          <div
            className={cn(
              "mt-14 grid gap-px overflow-hidden rounded-lg sm:grid-cols-3",
              onDark ? "bg-white/12" : "bg-hairline",
            )}
          >
            {project.results.map((r) => (
              <div
                key={r.label}
                className={cn(
                  "flex flex-col gap-2 p-6",
                  onDark ? "bg-tile-3" : "bg-canvas",
                )}
              >
                <span
                  className={cn(
                    "text-fine tracking-[0.1em] uppercase",
                    onDark ? "text-white/45" : "text-ink-48",
                  )}
                >
                  {r.label}
                </span>
                <span
                  className={cn(
                    "text-tagline font-semibold tabular-nums",
                    onDark ? "text-white" : "text-ink",
                  )}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 근거 링크 — TIL 연결 */}
        {project.relatedPosts.length > 0 && (
          <Reveal delay={260}>
            <div
              className={cn(
                "mt-12 border-t pt-8",
                onDark ? "border-white/12" : "border-hairline",
              )}
            >
              <p
                className={cn(
                  "text-fine tracking-[0.1em] uppercase",
                  onDark ? "text-white/45" : "text-ink-48",
                )}
              >
                이 판단의 근거
              </p>

              <ul className="mt-4 flex flex-col gap-2.5">
                {project.relatedPosts.map((id) => {
                  const post = getPost(id);
                  if (!post) return null;

                  return (
                    <li key={id}>
                      <a
                        href={postHref(post)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "press group inline-flex items-start gap-2 text-body",
                          onDark ? "text-sky" : "text-primary",
                        )}
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
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        )}

        {/* 외부 링크 */}
        {project.links && project.links.length > 0 && (
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "press rounded-full border px-[22px] py-[11px] text-body",
                    onDark
                      ? "border-sky/60 text-sky hover:border-sky hover:bg-sky/10"
                      : "border-primary text-primary hover:bg-primary/6",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </article>
  );
}
