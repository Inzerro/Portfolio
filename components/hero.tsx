"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="page-shell relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-36 md:pt-40 md:pb-24"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(oklch(0.28_0.01_265)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_70%_80%_at_20%_50%,black_30%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_70%_80%_at_20%_50%,black_30%,transparent_100%)]" />
      <div className="pointer-events-none absolute top-1/2 left-0 -z-10 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.22_264_/_0.08)_0%,transparent_70%)] md:h-[32rem] md:w-[32rem]" />

      <div className="motion-entrance">
        <h1 className="mb-4 text-[clamp(2.9rem,12vw,5.75rem)] leading-[0.9] font-black tracking-tight text-balance text-foreground md:mb-5 md:text-7xl lg:text-[88px]">
          Temirlan
          <br />
          <span className="text-blue">Turdugulov</span>
        </h1>

        <div className="mb-6 flex items-center gap-4 md:mb-8">
          <div className="h-px w-8 shrink-0 bg-blue md:w-10" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground md:text-xs md:tracking-[0.35em]">
            Frontend Developer
          </span>
        </div>

        <p className="mb-8 max-w-[36rem] text-[15px] leading-relaxed font-light text-pretty text-muted-foreground md:mb-12 md:text-lg">
          I build fast, accessible, and visually refined web interfaces. Focused
          on React and Next.js — where clean code meets thoughtful design.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={() => handleScroll("projects")}
            variant="primary"
            size="lg"
            className="group w-full sm:w-auto"
          >
            View Projects
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 6h8M6 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <Button
            onClick={() => handleScroll("contact")}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Contact Me
          </Button>
        </div>
      </div>

      <div className="absolute right-5 bottom-8 left-5 grid grid-cols-3 border-t border-border pt-6 md:right-12 md:bottom-10 md:left-12 md:flex md:flex-wrap md:gap-8 md:pt-8">
        {[
          { value: "2+", label: "Years" },
          { value: "3+", label: "Projects" },
          { value: "100%", label: "Passion" },
        ].map(({ value, label }, i) => (
          <div
            key={label}
            className={`flex flex-col gap-1.5 md:gap-1 ${
              i > 0 ? "border-l border-border pl-5 md:border-none md:pl-0" : ""
            }`}
          >
            <span className="text-xl leading-none font-black text-foreground md:text-2xl">
              {value}
            </span>
            <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-[10px]">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute right-12 bottom-10 hidden flex-col items-center gap-2 md:flex">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.35em] text-muted-foreground [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}
