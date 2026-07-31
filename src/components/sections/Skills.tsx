import { skillGroups } from "@/content/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";

/** 기술 스택 — 파치먼트 캔버스 위 뱃지 그리드. */
export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-parchment px-6 py-24 sm:py-32">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Skills"
          title="무엇을 쓸 수 있는가"
          description="써본 것과 책임지고 쓸 수 있는 것을 구분했습니다. 뱃지에 마우스를 올리면 근거가 보입니다."
        />

        <div className="mt-16 flex flex-col gap-12">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="rounded-lg border border-hairline bg-canvas p-6 sm:p-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-tagline font-semibold text-ink">{group.title}</h3>
                  <p className="text-caption text-ink-48">{group.caption}</p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-fine text-ink-48">
            <li className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-sky" />
              주력
            </li>
            <li className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              실무 수준
            </li>
            <li className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-48/50" />
              경험 있음
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
