import { site } from "@/content/site";
import { getSeries, totalPostCount } from "@/content/til";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

// 지표는 실제 학습 기록에서 계산합니다 — 손으로 고칠 필요 없습니다
const stats = [
  { k: "주력 엔진", v: "Unreal 5" },
  { k: "GAS 기록", v: `${getSeries("gas")?.posts.length ?? 0}편` },
  { k: "푼 문제", v: `${getSeries("algo")?.posts.length ?? 0}문제` },
  { k: "전체 기록", v: `${totalPostCount}편` },
];

/**
 * 히어로 — 흰 캔버스, 중앙 정렬 스택.
 * 헤드라인 → 서브카피 → 필 CTA 2개.
 * 장식 없음. 타이포와 여백만으로 무게를 만듭니다.
 */
export function Hero() {
  return (
    <section
      id="overview"
      className="scroll-mt-28 bg-canvas px-6 pt-40 pb-24 sm:pt-48 sm:pb-32"
    >
      <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
        <Reveal>
          <p className="text-caption-strong text-primary">
            {site.role}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-5 text-hero-fluid whitespace-pre-line text-balance text-ink">
            {site.headline}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-[54ch] text-lead-airy font-light text-pretty text-ink-80">
            {site.subheadline}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href="#projects" size="lg">
              프로젝트 보기
            </Button>
            <Button href={site.blogUrl} variant="ghost" size="lg">
              학습 기록 보기
            </Button>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <dl className="mt-20 grid w-full grid-cols-2 gap-y-8 border-t border-divider pt-10 sm:grid-cols-4">
            {stats.map((item) => (
              <div key={item.k} className="flex flex-col items-center gap-1">
                <dt className="text-fine text-ink-48">{item.k}</dt>
                <dd className="text-tagline font-semibold text-ink">{item.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
