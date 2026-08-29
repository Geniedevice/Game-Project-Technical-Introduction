import Image from "next/image";
import type { MediaSlot } from "@/content/projects";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

const aspect = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
} as const;

/**
 * 이미지 한 장.
 * src가 비어 있으면 "여기에 무엇을 넣으면 되는지" 안내가 대신 표시됩니다.
 * 자리표시자도 레이아웃을 그대로 차지하므로, 나중에 파일만 넣으면 됩니다.
 */
export function Media({
  slot,
  onDark = false,
  className,
}: {
  slot: MediaSlot;
  onDark?: boolean;
  className?: string;
}) {
  const ratio = aspect[slot.aspect ?? "16/9"];

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      {slot.youtubeId ? (
        <VideoEmbed youtubeId={slot.youtubeId} title={slot.alt} />
      ) : slot.video ? (
        <video
          controls
          playsInline
          preload="none"
          poster={slot.src ? asset(slot.src) : undefined}
          className={cn("w-full rounded-lg bg-black", ratio, "object-cover")}
        >
          <source src={asset(slot.video)} type="video/mp4" />
          이 브라우저는 영상 재생을 지원하지 않습니다.
        </video>
      ) : slot.src ? (
        <div className={cn("relative overflow-hidden rounded-lg", ratio)}>
          <Image
            src={asset(slot.src)}
            alt={slot.alt}
            fill
            sizes="(min-width: 980px) 900px, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <Placeholder hint={slot.hint} ratio={ratio} onDark={onDark} />
      )}

      {/* 설명이 없으면 빈 줄을 남기지 않습니다 */}
      {slot.caption && (
        <figcaption
          className={cn("text-caption", onDark ? "text-white/50" : "text-ink-48")}
        >
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Placeholder({
  hint,
  ratio,
  onDark,
}: {
  hint: string;
  ratio: string;
  onDark: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 text-center",
        ratio,
        onDark ? "border-white/20 bg-white/4" : "border-hairline bg-pearl",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("size-7", onDark ? "text-white/30" : "text-ink-48/60")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m3 16 5-4 4 3 3-2 6 5" />
      </svg>

      <p className={cn("text-caption", onDark ? "text-white/50" : "text-ink-48")}>
        {hint}
      </p>
    </div>
  );
}

/** 유튜브 영상. id가 없으면 아무것도 그리지 않습니다. */
export function VideoEmbed({
  youtubeId,
  title,
}: {
  youtubeId: string | null | undefined;
  title: string;
}) {
  if (!youtubeId) return null;

  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-black">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="size-full border-0"
      />
    </div>
  );
}
