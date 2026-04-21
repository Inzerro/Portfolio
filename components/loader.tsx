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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      aria-label="Loading"
      role="progressbar"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Monogram */}
      <div className="mb-14 select-none flex flex-col items-center gap-3">
        <span className="text-xs font-semibold tracking-[0.5em] text-muted-foreground uppercase font-sans">
          TT
        </span>
        <div className="w-px h-6 bg-border" />
      </div>

      {/* Counter */}
      <div className="relative flex items-end gap-1">
        <span
          className="font-mono text-8xl font-bold tabular-nums text-foreground leading-none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {String(count).padStart(2, "0")}
        </span>
        <span className="font-mono text-xl text-muted-foreground mb-3">%</span>
      </div>

      {/* Progress bar */}
      <div className="mt-10 w-56 h-px bg-border overflow-hidden">
        <div
          className="h-full bg-blue transition-all duration-75"
          style={{ width: `${count}%` }}
        />
      </div>

      {/* Label */}
      <p className="mt-6 text-[10px] font-semibold tracking-[0.35em] text-muted-foreground uppercase font-sans">
        Loading
      </p>
    </div>
  );
}
