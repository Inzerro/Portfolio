const facts = [
  { label: "Location", value: "Bishkek, Kyrgyzstan" },
  { label: "Focus", value: "React · Next.js · TypeScript" },
  { label: "Approach", value: "Design-driven development" },
  { label: "Status", value: "Open to opportunities" },
];

export function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-36 px-5 md:px-12 max-w-6xl mx-auto"
      aria-labelledby="about-heading"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
        {/* Left — label + bio */}
        <div>
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <div className="w-1.5 h-1.5 bg-blue flex-shrink-0" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-blue uppercase font-sans">
              01 / About
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <h2
            id="about-heading"
            className="text-[clamp(1.7rem,6vw,2.5rem)] md:text-4xl font-black tracking-tight text-foreground text-balance mb-6 md:mb-8 leading-tight"
          >
            Building interfaces
            <br />
            that feel inevitable.
          </h2>

          <div className="space-y-4 md:space-y-5 text-[15px] md:text-base text-muted-foreground leading-relaxed font-light text-pretty">
            <p>
              I&apos;m a frontend developer with a strong focus on the
              intersection of engineering and design. I care deeply about the
              craft — from component architecture to micro-interactions, every
              detail matters.
            </p>
            <p>
              My work centers on React and its ecosystem. I believe the best
              interfaces are the ones users don&apos;t have to think about —
              fast, intuitive, and polished to the last pixel.
            </p>
            <p>
              When I&apos;m not building, I&apos;m studying design systems,
              exploring new frontend patterns, or contributing to open-source
              projects.
            </p>
          </div>
        </div>

        {/* Right — facts table */}
        <div>
          {/* Facts — larger tap rows on mobile */}
          <div className="border border-border divide-y divide-border">
            {facts.map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center px-5 md:px-6 py-5 md:py-5 group hover:bg-accent active:bg-accent transition-colors duration-150 min-h-[56px]"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase font-sans">
                  {label}
                </span>
                <span className="text-xs font-semibold text-foreground text-right group-hover:text-blue transition-colors duration-150 font-sans max-w-[55%] leading-snug">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Download CV — full-width, 56px minimum tap height */}
          {/* Replace href="#" with the actual resume file path when ready */}
          <a
            href="/resume.pdf"
            aria-label="Download Resume (PDF)"
            className="mt-3 flex items-center justify-between w-full px-5 md:px-6 py-5 border border-blue/30 bg-blue-glow hover:bg-blue/10 active:bg-blue/10 transition-colors duration-200 group min-h-[56px] touch-manipulation"
          >
            <span className="text-xs font-bold tracking-[0.15em] text-blue uppercase font-sans">
              Download Resume
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="text-blue group-hover:translate-y-0.5 transition-transform duration-200 flex-shrink-0"
            >
              <path
                d="M7 1v8M3 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
