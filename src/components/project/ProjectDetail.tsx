import Link from "next/link";
import type { DetailSection, Project } from "@/content/projects";
import { getPost } from "@/content/til";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Media, VideoEmbed } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * 프로젝트 상세 본문.
 *
 * 두 곳에서 같은 내용을 씁니다.
 *  - /projects/{slug} 전용 페이지 (직접 링크 · 검색 노출용)
 *  - 메인에서 카드를 눌렀을 때 펼쳐지는 오버레이
 *
 * variant는 상단 이동 수단만 바꿉니다. "page"는 돌아가기 링크,
 * "overlay"는 닫기 버튼(오버레이가 직접 그림)이라 아무것도 그리지 않습니다.
 */
export function ProjectDetail({
  project,
  variant = "page",
}: {
  project: Project;
  variant?: "page" | "overlay";
}) {
  const detail = project.detail;
  if (!detail) return null;

  return (
    <div>
      {/* 히어로 — 다크 */}
      <section
        className={cn(
          "bg-tile-1 px-6 pb-20",
          variant === "page" ? "pt-24 sm:pt-32" : "pt-16",
        )}
      >
        <div className="container-tight">
          {variant === "page" && (
            <Reveal>
              <Link
                href="/#projects"
                className="press inline-flex items-center gap-2 text-caption text-sky"
              >
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="size-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 3 5 8l5 5" />
                </svg>
                기술 소개서로 돌아가기
              </Link>
            </Reveal>
          )}

          <Reveal delay={60}>
            <h1
              className={cn(
                "text-hero-fluid text-balance text-white",
                variant === "page" && "mt-8",
              )}
            >
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-5 max-w-[52ch] text-lead font-normal text-pretty text-[#cccccc]">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/12 pt-8 sm:grid-cols-4">
              {detail.facts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <dt className="text-fine tracking-[0.1em] text-white/45 uppercase">
                    {f.label}
                  </dt>
                  <dd className="text-caption text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10">
              <Media slot={detail.keyArt} onDark />
            </div>
          </Reveal>

          {detail.youtubeId && (
            <Reveal delay={280}>
              <div className="mt-8">
                <VideoEmbed youtubeId={detail.youtubeId} title={project.title} />
              </div>
            </Reveal>
          )}

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap gap-3">
              {detail.demoVideoUrl && (
                <Button href={detail.demoVideoUrl} size="lg">
                  시연 영상 보기
                </Button>
              )}
              {project.links?.map((l) => (
                <Button key={l.href} href={l.href} variant="ghost-on-dark" size="lg">
                  {l.label}
                </Button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 개요 — 파치먼트 */}
      <section className="bg-parchment px-6 py-24">
        <div className="container-tight">
          <Reveal>
            <span className="text-caption font-semibold tracking-[0.14em] text-primary uppercase">
              Overview
            </span>
          </Reveal>

          <div className="mt-6 flex flex-col gap-5">
            {detail.overview.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className="max-w-[62ch] text-lead-airy font-light text-pretty text-ink-80">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {detail.overviewMedia && (
            <Reveal delay={120}>
              <div className="mt-12">
                <Media slot={detail.overviewMedia} />
              </div>
            </Reveal>
          )}

          {/* 담당 영역 — 팀 성과와 구분 */}
          <Reveal delay={140}>
            <div className="mt-16 rounded-lg border border-hairline bg-canvas p-7 sm:p-9">
              <h2 className="text-tagline font-semibold text-ink">제가 맡은 부분</h2>
              <p className="mt-2 max-w-[62ch] text-caption text-pretty text-ink-48">
                {detail.teamNote}
              </p>

              <ul className="mt-7 grid gap-6 sm:grid-cols-2">
                {detail.myScope.map((s) => (
                  <li key={s.title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-body font-semibold text-ink">{s.title}</span>
                      <span className="text-caption text-pretty text-ink-80">
                        {s.text}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 본문 섹션 — 라이트/다크 교차 */}
      {detail.sections.map((section, i) => {
        const onDark = i % 2 === 1;

        return (
          <section
            key={section.id}
            id={section.id}
            className={cn("px-6 py-24", onDark ? "bg-tile-1" : "bg-canvas")}
          >
            <div className="container-tight">
              <Reveal className="flex flex-col gap-4">
                <span
                  className={cn(
                    "text-caption font-semibold tracking-[0.14em] uppercase",
                    onDark ? "text-sky" : "text-primary",
                  )}
                >
                  {section.eyebrow}
                </span>

                <h2
                  className={cn(
                    "text-display-fluid text-balance",
                    onDark ? "text-white" : "text-ink",
                  )}
                >
                  {section.title}
                </h2>

                <p
                  className={cn(
                    "max-w-[56ch] text-lead-airy font-light text-pretty",
                    onDark ? "text-[#cccccc]" : "text-ink-80",
                  )}
                >
                  {section.lead}
                </p>
              </Reveal>

              <div className="mt-10 flex flex-col gap-5">
                {section.body.map((p, j) => (
                  <Reveal key={j} delay={j * 50}>
                    <p
                      className={cn(
                        "max-w-[62ch] text-body text-pretty",
                        onDark ? "text-[#cccccc]" : "text-ink-80",
                      )}
                    >
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>

              {section.bullets && (
                <Reveal delay={80}>
                  <dl
                    className={cn(
                      "mt-12 grid gap-px overflow-hidden rounded-lg",
                      onDark ? "bg-white/12" : "bg-hairline",
                    )}
                  >
                    {section.bullets.map((b) => (
                      <div
                        key={b.label}
                        className={cn(
                          "flex flex-col gap-2 p-6 sm:flex-row sm:gap-8",
                          onDark ? "bg-tile-3" : "bg-canvas",
                        )}
                      >
                        <dt
                          className={cn(
                            "shrink-0 text-caption font-semibold sm:w-44",
                            onDark ? "text-white" : "text-ink",
                          )}
                        >
                          {b.label}
                        </dt>
                        <dd
                          className={cn(
                            "text-caption text-pretty",
                            onDark ? "text-[#cccccc]" : "text-ink-80",
                          )}
                        >
                          {b.text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              )}

              {section.media && section.media.length > 0 && (
                <div
                  className={cn(
                    "mt-12 grid gap-6",
                    section.media.length > 1 && "sm:grid-cols-2",
                  )}
                >
                  {section.media.map((slot, k) => (
                    <Reveal
                      key={k}
                      delay={k * 80}
                      className={cn(
                        // 영상은 한 줄을 다 쓰게 둡니다
                        slot.video && section.media!.length > 1 && "sm:col-span-2",
                      )}
                    >
                      <Media slot={slot} onDark={onDark} />
                    </Reveal>
                  ))}
                </div>
              )}

              <SectionEvidence section={section} onDark={onDark} />
            </div>
          </section>
        );
      })}

      {/* 트러블슈팅 */}
      <section className="bg-parchment px-6 py-24">
        <div className="container-tight">
          <Reveal className="flex flex-col gap-4">
            <span className="text-caption font-semibold tracking-[0.14em] text-primary uppercase">
              Troubleshooting
            </span>
            <h2 className="text-display-fluid text-balance text-ink">막혔던 지점들</h2>
            <p className="max-w-[56ch] text-lead-airy font-light text-pretty text-ink-80">
              원인을 찾기까지 오래 걸렸던 것들만 남겼습니다. 팀원이 해결한 것도 배운 게
              있어 함께 적되, 누가 해결했는지는 구분했습니다.
            </p>
          </Reveal>

          <ul className="mt-14 flex flex-col gap-5">
            {detail.troubleshooting.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 60}>
                <div className="rounded-lg border border-hairline bg-canvas p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-fine",
                        t.mine
                          ? "bg-primary text-white"
                          : "border border-divider bg-pearl text-ink-48",
                      )}
                    >
                      {t.mine ? "직접 해결" : "팀원 해결"}
                    </span>
                    <h3 className="text-body font-semibold text-balance text-ink">
                      {t.title}
                    </h3>
                  </div>

                  <dl className="mt-5 flex flex-col gap-4">
                    {[
                      { k: "원인", v: t.cause },
                      { k: "해결", v: t.fix },
                      ...(t.lesson ? [{ k: "배운 점", v: t.lesson }] : []),
                    ].map((row) => (
                      <div
                        key={row.k}
                        className="flex flex-col gap-1 sm:flex-row sm:gap-6"
                      >
                        <dt className="shrink-0 text-fine tracking-[0.1em] text-ink-48 uppercase sm:w-20 sm:pt-1">
                          {row.k}
                        </dt>
                        <dd className="text-caption text-pretty text-ink-80">{row.v}</dd>
                      </div>
                    ))}
                  </dl>

                  {t.postUrl && (
                    <a
                      href={t.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press mt-6 inline-flex items-center gap-1.5 text-caption text-primary underline-offset-4 hover:underline"
                    >
                      기록 보기
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="size-3 opacity-70"
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
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 마무리 */}
      <section className="bg-canvas px-6 py-24">
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="text-display-fluid text-balance text-ink">
              다른 작업도 보시겠어요?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button href="/#projects">전체 프로젝트</Button>
              <Button href={site.blogUrl} variant="ghost">
                학습 기록
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/**
 * 섹션 하단의 근거 링크.
 * 이 프로젝트를 만들며 쓴 개발 기록과, 그때 공부한 학습 기록을 나눠서 보여줍니다.
 */
function SectionEvidence({
  section,
  onDark,
}: {
  section: DetailSection;
  onDark: boolean;
}) {
  const studyPosts = (section.posts ?? [])
    .map((id) => getPost(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const devPosts = section.blogPosts ?? [];

  if (studyPosts.length === 0 && devPosts.length === 0) return null;

  const chip = cn(
    "press inline-flex rounded-full border px-3.5 py-2 text-caption",
    onDark
      ? "border-sky/50 text-sky hover:bg-sky/10"
      : "border-primary/40 text-primary hover:bg-primary/6",
  );

  const label = cn(
    "text-fine tracking-[0.1em] uppercase",
    onDark ? "text-white/45" : "text-ink-48",
  );

  return (
    <Reveal delay={120}>
      <div
        className={cn(
          "mt-12 flex flex-col gap-8 border-t pt-8",
          onDark ? "border-white/12" : "border-hairline",
        )}
      >
        {devPosts.length > 0 && (
          <div>
            <p className={label}>개발 기록</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {devPosts.map((p) => (
                <li key={p.url}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={chip}>
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {studyPosts.length > 0 && (
          <div>
            <p className={label}>그때 공부한 것</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {studyPosts.map((p) => (
                <li key={p.id}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={chip}>
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Reveal>
  );
}
