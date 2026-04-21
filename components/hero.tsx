"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const raf = requestAnimationFrame(() => {
      el.style.transition =
        "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-[100svh] flex flex-col justify-center px-5 md:px-12 max-w-6xl mx-auto pt-24 md:pt-40 pb-32 md:pb-24"
      aria-label="Hero"
    >
      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.28 0.01 265) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 80% at 20% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 80% at 20% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Blue glow behind name */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 264 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div ref={containerRef}>
        {/* Name — tighter on mobile */}
        <h1 className="text-[clamp(2.6rem,12vw,5.5rem)] md:text-7xl lg:text-[88px] font-black tracking-tight text-foreground leading-[0.92] text-balance mb-4 md:mb-5">
          Temirlan
          <br />
          <span className="text-blue">Turdugulov</span>
        </h1>

        {/* Role line */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="h-px w-8 md:w-10 bg-blue flex-shrink-0" />
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] md:tracking-[0.35em] text-muted-foreground uppercase font-sans">
            Frontend Developer
          </span>
        </div>

        {/* Intro */}
        <p className="text-[15px] md:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-12 font-light text-pretty max-w-[520px]">
          I build fast, accessible, and visually refined web interfaces. Focused
          on React and Next.js — where clean code meets thoughtful design.
        </p>

        {/* CTA buttons — stacked full-width on mobile, inline on md+ */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleScroll("projects")}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 md:py-3.5 bg-blue text-white text-xs font-bold tracking-[0.15em] uppercase font-sans hover:bg-blue-dim transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-manipulation"
          >
            View Projects
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path
                d="M2 6h8M6 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={() => handleScroll("contact")}
            className="inline-flex items-center justify-center px-8 py-4 md:py-3.5 border border-border text-foreground text-xs font-bold tracking-[0.15em] uppercase font-sans hover:border-blue hover:text-blue transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-manipulation"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* Stats row — pinned to bottom of hero, respects section padding */}
      <div className="absolute bottom-8 md:bottom-10 left-5 right-5 md:left-12 md:right-12 grid grid-cols-3 md:flex md:flex-wrap md:gap-8 border-t border-border pt-6 md:pt-8">
        {[
          { value: "3+", label: "Years" },
          { value: "20+", label: "Projects" },
          { value: "100%", label: "Passion" },
        ].map(({ value, label }, i) => (
          <div
            key={label}
            className={`flex flex-col gap-1.5 md:gap-1 ${
              i > 0 ? "pl-5 md:pl-0 border-l border-border md:border-none" : ""
            }`}
          >
            <span className="text-xl md:text-2xl font-black text-foreground leading-none">
              {value}
            </span>
            <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase font-sans">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="hidden md:flex absolute bottom-10 right-12 flex-col items-center gap-2">
        <span className="text-[9px] font-semibold tracking-[0.35em] text-muted-foreground uppercase font-sans [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  );
}
