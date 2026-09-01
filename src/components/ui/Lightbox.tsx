"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

export type LightboxImage = {
  src: string;
  alt: string;
  /** 확대 화면 아래에 붙는 설명 */
  caption?: string;
  /** 확대 화면 위에 붙는 이름. 없으면 alt를 씁니다 */
  title?: string;
};

/**
 * 눌러서 크게 보는 이미지.
 *
 * 목록에서는 자리에 맞춰 줄어들어 글자가 안 읽히는 그림이 많습니다.
 * 그래서 누르면 화면 가득 펼치고, 거기서 한 번 더 누르면 원본 픽셀 크기로 커집니다.
 * (원본이 화면보다 작으면 더 커지지 않으므로 그 경우엔 확대 단계가 없습니다)
 *
 * children으로 평소에 보이는 모습을 그대로 넘기면 됩니다.
 */
export function ZoomTrigger({
  image,
  className,
  children,
}: {
  image: LightboxImage;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${image.title ?? image.alt} 크게 보기`}
        className={cn("press group relative block w-full text-left", className)}
      >
        {children}

        {/* 눌러서 확대할 수 있다는 표시 */}
        <span
          aria-hidden="true"
          className="absolute right-3 bottom-3 flex size-7 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-70"
        >
          <ZoomIcon className="size-3.5" />
        </span>
      </button>

      {open && <Lightbox image={image} onClose={() => setOpen(false)} />}
    </>
  );
}

/** 화면을 덮는 확대 보기. 바깥 클릭 · 닫기 버튼 · Esc로 닫힙니다. */
export function Lightbox({
  image,
  onClose,
}: {
  image: LightboxImage;
  onClose: () => void;
}) {
  /** true면 원본 픽셀 크기로 그리고 스크롤로 훑습니다 */
  const [actualSize, setActualSize] = useState(false);
  /** 원본이 화면보다 크지 않으면 확대할 것이 없습니다 */
  const [canZoom, setCanZoom] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  /**
   * 화면에 맞춘 크기와 원본을 견줍니다.
   *
   * load 이벤트는 캐시된 그림에서 놓칠 수 있고 배치 전에 오기도 해서,
   * 크기가 정해지는 순간을 ResizeObserver로 받습니다. (관찰을 시작할 때 한 번 옵니다)
   * 원본 크기로 보는 중에는 둘이 같으므로 재지 않습니다 — 되돌아갈 수 있어야 합니다.
   */
  useEffect(() => {
    const el = img.current;
    if (!el) return;

    const check = () => {
      if (!el.naturalWidth || actualSize) return;
      setCanZoom(
        el.naturalWidth > el.clientWidth + 1 ||
          el.naturalHeight > el.clientHeight + 1,
      );
    };

    const observer = new ResizeObserver(check);
    observer.observe(el);
    el.addEventListener("load", check);

    return () => {
      observer.disconnect();
      el.removeEventListener("load", check);
    };
  }, [actualSize]);

  /** 원본 크기로 커지면 왼쪽 위가 아니라 그림 한가운데부터 보여줍니다 */
  useEffect(() => {
    const el = scroller.current;
    if (!el || !actualSize) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
  }, [actualSize]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // 상세 오버레이도 Esc로 닫히므로, 위에서 먼저 잡아 그림만 닫습니다
      e.stopPropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  const title = image.title ?? image.alt;

  /**
   * body에 직접 붙입니다.
   * 등장 애니메이션의 transform 안에 있으면 fixed가 화면이 아니라
   * 그 요소를 기준으로 잡혀 엉뚱한 곳에 그려집니다.
   * (이 컴포넌트는 클릭한 뒤에만 그려지므로 document는 항상 있습니다)
   */
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-4 bg-black/95 p-4 sm:p-8"
    >
      <div className="flex w-full max-w-[1400px] items-start justify-between gap-4">
        <p className="text-body-strong text-white">{title}</p>

        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="press flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="m4 4 8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>

      <div
        ref={scroller}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-[1400px] flex-1",
          // 화면에 맞춘 상태에서는 그림만 보이게 — 판을 깔면 위아래 여백이 하얗게 뜹니다
          actualSize
            ? "overflow-auto rounded-lg bg-white"
            : "flex items-center justify-center",
        )}
      >
        <button
          type="button"
          onClick={() => canZoom && setActualSize((v) => !v)}
          aria-label={actualSize ? "화면에 맞추기" : "원본 크기로 보기"}
          aria-disabled={!canZoom}
          className={cn(
            canZoom && (actualSize ? "cursor-zoom-out" : "cursor-zoom-in"),
            !canZoom && "cursor-default",
          )}
        >
          {/*
            next/image는 images.unoptimized 설정이라 결국 <img>로 나가는데,
            여기서는 원본 픽셀 크기를 미리 알 수 없어 그냥 <img>를 씁니다.
            크기는 불러온 뒤 naturalWidth로 확인합니다.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(image.src)}
            alt={image.alt}
            ref={img}
            className={cn(
              actualSize
                ? "max-w-none"
                : "h-auto max-h-[74vh] w-auto max-w-full rounded-lg bg-white",
            )}
          />
        </button>
      </div>

      <p className="max-w-[1400px] text-caption text-pretty text-white/60">
        {image.caption}
        {image.caption && canZoom && " · "}
        {canZoom &&
          (actualSize
            ? "그림을 누르면 화면에 맞춰집니다"
            : "그림을 누르면 원본 크기로 볼 수 있습니다")}
      </p>
    </div>,
    document.body,
  );
}

export function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5 14 14M7 5v4M5 7h4" />
    </svg>
  );
}
