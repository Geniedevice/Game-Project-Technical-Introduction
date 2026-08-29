"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { cn } from "@/lib/cn";

/** 글로벌 네비 바로 아래 붙는 프로스티드 서브 네비. 현재 섹션을 표시합니다. */
export function SubNav() {
  const [active, setActive] = useState<string>(nav[0].href);

  useEffect(() => {
    const sections = nav
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 화면에 보이는 섹션 중 가장 위에 있는 것을 현재 섹션으로 본다
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-112px 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-x-0 top-12 z-40 h-16 border-b border-black/5 bg-parchment/80 backdrop-blur-xl backdrop-saturate-[1.8]">
      <nav
        aria-label="섹션"
        className="container-wide flex h-full items-center justify-between gap-4"
      >
        <span className="text-tagline font-semibold text-ink">기술 소개서</span>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "press rounded-full px-4 py-2 text-body",
                  active === item.href
                    ? "bg-white text-ink"
                    : "text-ink-80 hover:text-ink",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
