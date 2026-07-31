import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  onDark = false,
  align = "center",
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <span
        className={cn(
          "text-caption font-semibold tracking-[0.14em] uppercase",
          onDark ? "text-sky" : "text-primary",
        )}
      >
        {eyebrow}
      </span>

      <h2
        className={cn(
          "text-display-fluid text-balance",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "max-w-[62ch] text-lead-airy font-light text-pretty",
            onDark ? "text-[#cccccc]" : "text-ink-80",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
