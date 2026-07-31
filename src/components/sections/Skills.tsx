import { skillGroups } from "@/content/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";

/** 기술 스택 — 파치먼트 캔버스 위 뱃지 그리드. */
export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-canvas px-6 py-24 sm:py-32">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Skills"
          title="무엇을 쓸 수 있는가"
          description="계속 공부하며 하나씩 숙달해가고 있습니다."
        />

        <div className="mt-16 flex flex-col gap-12">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 80}>
              <div className="rounded-lg border border-hairline bg-pearl p-6 sm:p-8">
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
      </div>
    </section>
  );
}
