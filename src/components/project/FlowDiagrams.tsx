import Image from "next/image";
import type { FlowDiagram } from "@/content/projects";
import { ZoomTrigger } from "@/components/ui/Lightbox";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

/**
 * 프로젝트 소개 아래에 놓이는 흐름도 묶음.
 *
 * 도식은 글자가 작아 목록에서는 전부 읽히지 않습니다.
 * 그래서 목록은 "무엇이 있는지"만 보여주고, 누르면 화면 가득 펼칩니다. (Lightbox.tsx)
 *
 * 잘라내면 흐름이 끊기므로 목록에서도 object-contain으로 비율을 지킵니다.
 */
export function FlowDiagrams({ flows }: { flows: FlowDiagram[] }) {
  return (
    <div
      className={cn(
        "grid gap-5",
        flows.length > 1 && "sm:grid-cols-2",
        flows.length === 3 && "lg:grid-cols-3",
      )}
    >
      {flows.map((flow) => (
        <figure key={flow.src} className="flex flex-col gap-3">
          <ZoomTrigger
            image={{
              src: flow.src,
              alt: flow.alt,
              caption: flow.caption,
              title: flow.title,
            }}
            className="rounded-lg border border-hairline bg-canvas p-3"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={asset(flow.src)}
                alt={flow.alt}
                fill
                sizes="(min-width: 980px) 420px, 100vw"
                className="object-contain"
              />
            </div>
          </ZoomTrigger>

          <figcaption className="flex flex-col gap-1">
            <span className="text-body-strong text-ink">{flow.title}</span>
            <span className="text-caption text-pretty text-ink-48">
              {flow.caption}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
