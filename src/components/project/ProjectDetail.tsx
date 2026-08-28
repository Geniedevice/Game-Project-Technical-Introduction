import Link from "next/link";
import type {
  DetailCompare,
  DetailSection,
  DetailTable,
  FactGroup,
  Hypothesis,
  Project,
  SectionKind,
} from "@/content/projects";
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

          <Reveal delay={240}>
            <div className="mt-12">
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
            <span className="text-caption-strong text-primary">
              Overview
            </span>
          </Reveal>

          {/* 1. 프로젝트 소개 */}
          <Reveal delay={40}>
            <h2 className="mt-5 text-display-fluid text-balance text-ink">
              프로젝트 소개
            </h2>
          </Reveal>

          {detail.overviewVideo && (
            <Reveal delay={60}>
              <div className="mt-8">
                <Media slot={detail.overviewVideo} />
              </div>
            </Reveal>
          )}

          {detail.overview.length > 0 && (
            <div className="mt-10 flex flex-col gap-5">
              {detail.overview.map((p, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="max-w-[62ch] text-lead-airy font-light text-pretty text-ink-80">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          )}

          {detail.overviewMedia && detail.overviewMedia.length > 0 && (
            <div className="mt-12 flex flex-col gap-10">
              {detail.overviewMedia.map((slot, i) => (
                <Reveal key={i} delay={120 + i * 60}>
                  <Media slot={slot} />
                </Reveal>
              ))}
            </div>
          )}

          {/* 2·3. 기간 · 팀 규모 / 개발 환경 — 제목을 단 블록으로 나눠서 */}
          <div className="mt-16 flex flex-col gap-6">
            {detail.factGroups.map((g, i) => (
              <FactGroupBlock key={g.title} group={g} delay={i * 60} />
            ))}
          </div>

          {/* 4. 담당 영역 — 팀 성과와 구분 */}
          <Reveal delay={140}>
            <div className="mt-6 rounded-lg border border-hairline bg-canvas p-7 sm:p-9">
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
                      <span className="text-body-strong text-ink">{s.title}</span>
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
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={cn(
                      "text-caption-strong",
                      onDark ? "text-sky" : "text-primary",
                    )}
                  >
                    {section.eyebrow}
                  </span>
                  <KindTag kind={section.kind} onDark={onDark} />
                </div>

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

              {section.headerMedia && section.headerMedia.length > 0 && (
                <div className="mt-8 flex flex-col gap-8">
                  {section.headerMedia.map((slot, k) => (
                    <Reveal key={k} delay={60 + k * 60}>
                      <Media slot={slot} onDark={onDark} />
                    </Reveal>
                  ))}
                </div>
              )}

              {section.mediaPosition === "top" && (
                <SectionMedia section={section} onDark={onDark} />
              )}

              {section.body && section.body.length > 0 && (
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
              )}

              {section.table && <DetailTableView table={section.table} onDark={onDark} />}

              {section.compare && (
                <CompareView compare={section.compare} onDark={onDark} />
              )}

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
                            "shrink-0 text-caption-strong sm:w-44",
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

              {section.mediaPosition !== "top" && (
                <SectionMedia section={section} onDark={onDark} />
              )}

              <SectionEvidence section={section} onDark={onDark} />
            </div>
          </section>
        );
      })}

      {/* 트러블슈팅 — 기록해둔 게 있을 때만 */}
      {detail.troubleshooting.length > 0 && (
      <section className="bg-parchment px-6 py-24">
        <div className="container-tight">
          <Reveal className="flex flex-col gap-4">
            <span className="text-caption-strong text-primary">
              Troubleshooting
            </span>
            <h2 className="text-display-fluid text-balance text-ink">트러블 슈팅</h2>
            <p className="max-w-[56ch] text-lead-airy font-light text-pretty text-ink-80">
              원인을 찾기까지 오래 걸렸던 것만 남겼습니다. 문제 → 가설 검증 → 해결방안 →
              결과 순서이고, 기각된 가설도 함께 적었습니다. 팀원이 해결한 것도 배운 게 있어
              같이 넣되 누가 해결했는지는 구분했습니다.
            </p>
          </Reveal>

          <ul className="mt-14 flex flex-col gap-5">
            {detail.troubleshooting.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 60}>
                <div className="rounded-lg border border-hairline bg-canvas p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/30 bg-primary/8 px-2.5 py-1 text-fine text-primary">
                      트러블 슈팅
                    </span>
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
                    <h3 className="mt-1 w-full text-body-strong text-balance text-ink">
                      {t.title}
                    </h3>
                  </div>

                  <div className="mt-5">
                    <Row k="문제" v={t.problem} />
                  </div>

                  <HypothesisTable hypotheses={t.hypotheses} />

                  <div className="mt-6 flex flex-col gap-4">
                    {[
                      { k: "해결방안", v: t.fix },
                      ...(t.result ? [{ k: "결과", v: t.result }] : []),
                      ...(t.lesson ? [{ k: "배운 점", v: t.lesson }] : []),
                    ].map((row) => (
                      <Row key={row.k} k={row.k} v={row.v} />
                    ))}
                  </div>

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
      )}

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
 * 개요의 정보 블록 하나.
 * 제목을 달고 한 줄에 하나씩 — 라벨과 값이 나란히 놓입니다.
 */
function FactGroupBlock({ group, delay }: { group: FactGroup; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-lg border border-hairline bg-canvas p-7 sm:p-9">
        <h2 className="text-tagline font-semibold text-ink">{group.title}</h2>

        <dl className="mt-6 flex flex-col">
          {group.items.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-10",
                i > 0 && "border-t border-hairline",
              )}
            >
              <dt className="shrink-0 text-caption text-ink-48 sm:w-40">
                {item.label}
              </dt>
              <dd className="text-tagline text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}

/** 섹션의 이미지 · 영상. 두 장 이상이면 좌우로 놓아 비교가 되게 합니다. */
function SectionMedia({
  section,
  onDark,
}: {
  section: DetailSection;
  onDark: boolean;
}) {
  if (!section.media || section.media.length === 0) return null;

  return (
    <div
      className={cn(
        "mt-10 grid gap-6",
        section.media.length > 1 && "sm:grid-cols-2",
      )}
    >
      {section.media.map((slot, k) => (
        <Reveal key={k} delay={k * 80}>
          <Media slot={slot} onDark={onDark} />
        </Reveal>
      ))}
    </div>
  );
}

/** 트러블 슈팅 카드의 한 줄 — 라벨과 내용. */
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-6">
      <span className="shrink-0 text-fine text-ink-48 sm:w-24 sm:pt-1">{k}</span>
      <span className="text-caption text-pretty text-ink-80">{v}</span>
    </div>
  );
}

/**
 * 세운 가설과 검증 결과.
 * 기각된 것도 남깁니다 — 무엇을 지웠는지가 추론 과정 그 자체라서요.
 */
function HypothesisTable({ hypotheses }: { hypotheses: Hypothesis[] }) {
  return (
    <div className="mt-6">
      <p className="text-fine text-ink-48">가설 검증</p>

      <ol className="mt-3 flex flex-col gap-px overflow-hidden rounded-lg bg-hairline">
        {hypotheses.map((h, i) => (
          <li key={h.text} className="flex flex-col gap-2 bg-pearl p-5 sm:flex-row sm:gap-5">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-fine",
                h.verdict === "확인"
                  ? "bg-primary text-white"
                  : "border border-divider bg-canvas text-ink-48",
              )}
            >
              {i + 1}
            </span>

            <div className="flex flex-1 flex-col gap-1.5">
              <span
                className={cn(
                  "text-caption-strong text-pretty",
                  h.verdict === "확인" ? "text-ink" : "text-ink-48 line-through",
                )}
              >
                {h.text}
              </span>
              <span className="text-caption text-pretty text-ink-80">
                확인 방법 — {h.test}
              </span>
            </div>

            <span
              className={cn(
                "h-fit shrink-0 rounded-full px-2.5 py-1 text-fine",
                h.verdict === "확인"
                  ? "border border-primary/30 bg-primary/8 text-primary"
                  : "border border-divider bg-canvas text-ink-48",
              )}
            >
              {h.verdict}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** 기능 구현 / 트러블 슈팅 — 제목 옆 꼬리표. 무엇을 읽는 중인지 먼저 알려줍니다. */
function KindTag({ kind, onDark }: { kind: SectionKind; onDark: boolean }) {
  const isTrouble = kind === "trouble";

  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-1 text-fine",
        onDark
          ? isTrouble
            ? "border-white/25 bg-white/8 text-white/70"
            : "border-sky/45 bg-sky/10 text-sky"
          : isTrouble
            ? "border-divider bg-pearl text-ink-48"
            : "border-primary/30 bg-primary/8 text-primary",
      )}
    >
      {isTrouble ? "트러블 슈팅" : "기능 구현"}
    </span>
  );
}

/**
 * 적용 전 · 후 비교.
 * 왼쪽이 적용 전, 오른쪽이 적용 후입니다 — 읽는 순서와 같게 둡니다.
 */
function CompareView({
  compare,
  onDark,
}: {
  compare: DetailCompare;
  onDark: boolean;
}) {
  const columns = [
    { tag: "적용 전", slot: compare.before, highlight: false },
    { tag: "적용 후", slot: compare.after, highlight: true },
  ];

  return (
    <div className="mt-12">
      <p
        className={cn(
          "text-caption-strong",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {compare.title} — 적용 전 · 후
      </p>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        {columns.map((c, i) => (
          <Reveal key={c.tag} delay={i * 80}>
            <div className="flex flex-col gap-3">
              <span
                className={cn(
                  "inline-flex w-fit rounded-full border px-2.5 py-1 text-fine",
                  c.highlight
                    ? onDark
                      ? "border-sky/45 bg-sky/10 text-sky"
                      : "border-primary/30 bg-primary/8 text-primary"
                    : onDark
                      ? "border-white/20 bg-white/6 text-white/60"
                      : "border-divider bg-pearl text-ink-48",
                )}
              >
                {c.tag}
              </span>
              <Media slot={c.slot} onDark={onDark} />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** 규칙 비교표. 좁은 화면에서는 표만 가로로 스크롤됩니다. */
function DetailTableView({
  table,
  onDark,
}: {
  table: DetailTable;
  onDark: boolean;
}) {
  return (
    <Reveal delay={80}>
      <div className="mt-12">
        <div
          className={cn(
            "overflow-x-auto rounded-lg border",
            onDark ? "border-white/12" : "border-hairline",
          )}
        >
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr>
                {table.headers.map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className={cn(
                      "px-6 py-4 text-caption-strong",
                      onDark
                        ? "bg-tile-3 text-white"
                        : "bg-pearl text-ink",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    "border-t",
                    onDark ? "border-white/12" : "border-hairline",
                  )}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={cn(
                        "px-6 py-4 align-top text-caption text-pretty",
                        j === 0
                          ? onDark
                            ? "text-white"
                            : "text-ink"
                          : onDark
                            ? "text-[#cccccc]"
                            : "text-ink-80",
                        onDark ? "bg-tile-1" : "bg-canvas",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {table.caption && (
          <p
            className={cn(
              "mt-3 text-fine text-pretty",
              onDark ? "text-white/45" : "text-ink-48",
            )}
          >
            {table.caption}
          </p>
        )}
      </div>
    </Reveal>
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
    "text-fine",
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
            <p className={label}>{section.postsLabel ?? "그때 공부한 것"}</p>
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
