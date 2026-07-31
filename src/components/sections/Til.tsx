"use client";

import { useState } from "react";
import { series, totalPostCount } from "@/content/til";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const PREVIEW_COUNT = 12;

/** 학습 기록 — 다크 타일. 시리즈별로 실제 블로그 글에 연결됩니다. */
export function Til() {
  const [activeId, setActiveId] = useState(series[0]?.id ?? "");
  const [expanded, setExpanded] = useState(false);

  const active = series.find((s) => s.id === activeId) ?? series[0];
  const visible = expanded ? active.posts : active.posts.slice(0, PREVIEW_COUNT);
  const hidden = active.posts.length - visible.length;

  function selectSeries(id: string) {
    setActiveId(id);
    setExpanded(false);
  }

  return (
    <section id="til" className="scroll-mt-24 bg-tile-1 px-6 py-24 sm:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Today I Learned"
          title={`${totalPostCount}편의 기록`}
          description="개인적으로 공부하며 남긴 기록입니다."
          onDark
        />

        {/* 시리즈 탭 */}
        <Reveal delay={80}>
          <div
            role="tablist"
            aria-label="학습 기록 시리즈"
            className="mt-14 flex flex-wrap justify-center gap-2"
          >
            {series.map((s) => {
              const isActive = s.id === active.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectSeries(s.id)}
                  className={cn(
                    "press inline-flex items-center gap-2 rounded-full border px-4 py-2 text-caption",
                    isActive
                      ? "border-white bg-white text-ink"
                      : "border-white/20 text-white/70 hover:border-white/40 hover:text-white",
                  )}
                >
                  {s.title}
                  <span
                    className={cn(
                      "text-fine tabular-nums",
                      isActive ? "text-ink-48" : "text-white/40",
                    )}
                  >
                    {s.posts.length}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 시리즈 설명 */}
        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <h3 className="text-tagline font-semibold text-white">{active.title}</h3>
          <p className="max-w-[52ch] text-caption text-pretty text-[#cccccc]">
            {active.caption}
          </p>
        </div>

        {/* 글 목록 */}
        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post, i) => (
            <li key={post.id} className="bg-tile-3">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="press group flex h-full items-start gap-3 p-5"
              >
                <span className="mt-0.5 text-fine tabular-nums text-white/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-caption text-pretty text-white underline-offset-4 group-hover:text-sky group-hover:underline">
                  {post.title}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {hidden > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="press rounded-full border border-white/20 px-5 py-2.5 text-caption text-white/80 hover:border-white/40 hover:text-white"
            >
              {hidden}편 더 보기
            </button>
          </div>
        )}

        <Reveal delay={120}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <Button href={site.blogUrl} variant="ghost-on-dark" size="lg">
              블로그 전체 보기
            </Button>
            <Button href={active.source} variant="ghost-on-dark" size="lg">
              {active.title} 원본 노트
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
