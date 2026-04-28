import { Button } from "@/components/ui/button";

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
      className="page-shell section-shell"
      aria-labelledby="about-heading"
    >
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-24">
        <div>
          <div className="section-header md:mb-10">
            <div className="h-1.5 w-1.5 shrink-0 bg-blue" />
            <span className="section-kicker">
              01 / About
            </span>
            <div className="section-divider" />
          </div>

          <h2 id="about-heading" className="section-title mb-6 md:mb-8">
            Building interfaces
            <br />
            that feel inevitable.
          </h2>

          <div className="section-copy space-y-4 md:space-y-5">
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

        <div>
          <div className="surface-panel overflow-hidden">
            {facts.map(({ label, value }) => (
              <div
                key={label}
                className="interactive-row group"
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </span>
                <span className="motion-soft max-w-[55%] text-right font-sans text-xs font-semibold leading-snug text-foreground group-hover:text-blue">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <Button asChild variant="secondary" size="lg" className="mt-4 w-full justify-between">
            <a href="/resume.pdf" aria-label="Download Resume (PDF)">
              <span>Download Resume</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
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
          </Button>
        </div>
      </div>
    </section>
  );
}
