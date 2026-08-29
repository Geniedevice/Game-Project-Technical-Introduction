import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** 마감 섹션 — 흰 캔버스, 단일 CTA. */
export function Contact() {
  return (
    <section className="bg-canvas px-6 py-28 sm:py-36">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="text-display-fluid text-balance text-ink">
            같이 만들 이야기가 있다면
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="max-w-[48ch] text-lead-airy font-light text-pretty text-ink-80">
            기술 이야기든 협업 제안이든 편하게 연락 주세요.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Button href={site.githubUrl} variant="ghost" size="lg">
              GitHub
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
