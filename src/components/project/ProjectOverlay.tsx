"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/content/projects";
import { ProjectDetail } from "./ProjectDetail";
import { ProjectSummary } from "./ProjectSummary";

/**
 * 카드를 누르면 그 자리에서 펼쳐지는 상세 패널.
 *
 * 페이지를 떠나지 않고 위에 겹쳐 열리고, 닫으면 원래 보던 위치로 돌아옵니다.
 * 뒤로 가기 · Esc로도 닫히며, 열려 있는 동안 뒤쪽 배경은 스크롤되지 않습니다.
 */
export function ProjectOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // 배경 스크롤 잠금 — 스크롤바 폭만큼 보정해 레이아웃이 튀지 않게 합니다
  useEffect(() => {
    const { body } = document;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, []);

  // Esc로 닫기 + 열릴 때 포커스를 패널 안으로
  useEffect(() => {
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 기술 소개`}
      className="fixed inset-0 z-100 flex justify-center overscroll-contain"
    >
      {/* 뒤 배경 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm motion-safe:animate-[fade_240ms_ease-out]"
      />

      {/* 패널 */}
      <div
        ref={panelRef}
        className="relative flex w-full max-w-[1120px] flex-col overflow-y-auto overscroll-contain bg-canvas shadow-product motion-safe:animate-[expand_420ms_cubic-bezier(0.16,1,0.3,1)] sm:my-6 sm:rounded-lg"
      >
        {/* 상단 닫기 바 — 스크롤해도 따라옵니다 */}
        <div className="sticky top-0 z-10 flex justify-end p-4">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="press flex size-11 items-center justify-center rounded-full bg-chip/70 text-ink backdrop-blur-md hover:bg-chip"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* 닫기 바가 차지한 높이를 되돌려 본문이 위에서 시작하게 합니다 */}
        <div className="-mt-19">
          {project.detail ? (
            <ProjectDetail project={project} variant="overlay" />
          ) : (
            <ProjectSummary project={project} />
          )}
        </div>
      </div>
    </div>
  );
}
