"use client";

import { useEffect, useState } from "react";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const interval = 16;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = 1 - Math.pow(1 - current / steps, 2.5);
      setCount(Math.min(Math.round(progress * 100), 100));

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background motion-panel ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      aria-label="Loading"
      role="progressbar"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Monogram */}
      <div className="motion-entrance mb-14 flex select-none flex-col items-center gap-3">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.5em] text-muted-foreground">
          TT
        </span>
        <div className="w-px h-6 bg-border" />
      </div>

      {/* Counter */}
      <div className="motion-entrance relative flex items-end gap-1 [animation-delay:120ms]">
        <span
          className="font-mono text-8xl font-bold tabular-nums text-foreground leading-none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {String(count).padStart(2, "0")}
        </span>
        <span className="font-mono text-xl text-muted-foreground mb-3">%</span>
      </div>

      {/* Progress bar */}
      <div className="motion-entrance mt-10 h-px w-56 overflow-hidden bg-border [animation-delay:180ms]">
        <div
          className="h-full origin-left bg-blue transition-[width,opacity,transform] [transition-duration:220ms] [transition-timing-function:var(--ease-decelerate)]"
          style={{ width: `${count}%` }}
        />
      </div>

      <p className="motion-entrance mt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground [animation-delay:240ms]">
        Loading
      </p>
    </div>
  );
}
