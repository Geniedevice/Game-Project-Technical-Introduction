import type { Skill } from "@/content/skills";
import { cn } from "@/lib/cn";

const tone: Record<Skill["level"], string> = {
  // 주력 — 유일하게 채워진 뱃지
  core: "bg-ink text-white border-ink",
  // 실무 수준 — 기본 하얀 칩
  working: "bg-white text-ink border-hairline",
  // 경험 있음 — 가장 조용한 칩
  familiar: "bg-pearl text-ink-48 border-divider",
};

const dot: Record<Skill["level"], string> = {
  core: "bg-sky",
  working: "bg-primary",
  familiar: "bg-ink-48/50",
};

export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <li
      title={skill.note}
      className={cn(
        "press group inline-flex items-center gap-2 rounded-full border px-3.5 py-2",
        "text-caption cursor-default",
        tone[skill.level],
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0 rounded-full", dot[skill.level])}
      />
      {skill.name}
    </li>
  );
}
