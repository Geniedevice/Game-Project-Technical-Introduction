import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "ghost-on-dark" | "utility";
type Size = "md" | "lg";

const base =
  "press inline-flex items-center justify-center gap-1.5 font-normal whitespace-nowrap select-none";

const variants: Record<Variant, string> = {
  // 시그니처 Action Blue 필 — 모든 주요 액션
  primary: "rounded-full bg-primary text-white hover:bg-primary-focus",
  // 같은 필 문법의 고스트. 라이트 표면 전용
  ghost:
    "rounded-full border border-primary text-primary bg-transparent hover:bg-primary/6",
  // 다크 타일 위에서는 Sky Link Blue
  "ghost-on-dark":
    "rounded-full border border-sky/60 text-sky bg-transparent hover:border-sky hover:bg-sky/10",
  // 유틸리티 사각 — 네비 액션
  utility: "rounded-sm bg-ink text-white hover:bg-ink-80",
};

const sizes: Record<Size, string> = {
  md: "px-[22px] py-[11px] text-body",
  lg: "px-7 py-3.5 text-[18px] font-light leading-none",
};

const utilitySize = "px-[15px] py-2 text-caption";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "className" | "children">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const isExternal = typeof props.href === "string" && props.href.startsWith("http");

  return (
    <Link
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        base,
        variants[variant],
        variant === "utility" ? utilitySize : sizes[size],
        className,
      )}
    >
      {children}
      {isExternal && <ExternalIcon />}
    </Link>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-[0.85em] shrink-0 opacity-70"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h7v7" />
      <path d="M13 3 3.5 12.5" />
    </svg>
  );
}
