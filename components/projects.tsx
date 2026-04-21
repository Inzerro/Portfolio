const PROJECTS = [
  {
    number: "01",
    title: "ScoutPro",
    description:
      "A modern digital platform built around streamlined workflows and a clean dashboard experience. Emphasis on scalable component architecture, intuitive navigation, and performance-first rendering.",
    highlights: [
      "Responsive dashboard UI",
      "Scalable component system",
      "Smooth UX flows",
      "Performance optimized",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    demo: "https://v0-scout-pro-one.vercel.app/",
    github: null,
  },
  {
    number: "02",
    title: "AutoKG",
    description:
      "An automotive web platform for browsing, showcasing, and managing vehicle listings. Focused on clarity, speed, and a polished product browsing experience with mobile-first responsive layouts.",
    highlights: [
      "Mobile-first layout",
      "Vehicle listing system",
      "Polished card UI",
      "Clean filtering UX",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "REST API"],
    demo: "https://v0-car-sales-app-tau.vercel.app/",
    github: null,
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 md:py-36 px-5 md:px-12 max-w-6xl mx-auto"
      aria-labelledby="projects-heading"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-10 md:mb-16">
        <div className="w-1.5 h-1.5 bg-blue flex-shrink-0" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-blue uppercase font-sans">
          03 / Projects
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-end mb-10 md:mb-16">
        <h2
          id="projects-heading"
          className="text-[clamp(1.7rem,6vw,2.5rem)] md:text-4xl font-black tracking-tight text-foreground text-balance leading-tight"
        >
          Selected work.
        </h2>
        <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed font-light text-pretty">
          A curated set of projects that showcase my approach to building
          production-ready, polished web applications.
        </p>
      </div>

      {/* Mobile: stacked card list. Desktop: table-list with 3-col grid */}
      <div className="flex flex-col gap-3 md:gap-0 md:border md:border-border md:divide-y md:divide-border">
        {PROJECTS.map((project) => (
          <article
            key={project.number}
            className="group bg-surface-1 md:bg-background border border-border md:border-0 hover:bg-surface-1 active:bg-surface-1 transition-colors duration-200"
          >
            {/* Mobile layout: number header bar + body + action row */}
            <div className="md:hidden">
              {/* Number bar */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border/40">
                <span className="font-mono text-[10px] font-bold text-blue">
                  {project.number}
                </span>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] font-bold tracking-[0.1em] text-muted-foreground border border-border px-2 py-0.5 uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="px-5 pt-4 pb-3">
                <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight group-hover:text-blue transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed font-light text-pretty mb-4">
                  {project.description}
                </p>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-2" role="list">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-[12px] text-muted-foreground font-medium leading-snug"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action row */}
              <div className="border-t border-border/40 px-5 py-4">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-blue bg-blue px-4 py-3 font-sans text-xs font-bold tracking-[0.14em] uppercase text-white shadow-[0_0_0_1px_rgba(59,130,246,0.18),0_14px_34px_rgba(37,99,235,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-dim hover:shadow-[0_0_0_1px_rgba(96,165,250,0.28),0_18px_40px_rgba(37,99,235,0.3)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring touch-manipulation"
                    aria-label={`Open live project for ${project.title}`}
                  >
                    View Project
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 8L8 2M8 2H4M8 2v4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-border/50 bg-surface-2 px-4 py-3 font-sans text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground/50 cursor-default select-none">
                    Soon
                  </span>
                )}
              </div>
            </div>

            {/* Desktop layout: original 3-column grid */}
            <div className="hidden md:grid px-8 py-10 md:grid-cols-[48px_1fr_auto] gap-10 items-start">
              {/* Number */}
              <span className="font-mono text-[10px] font-bold text-blue mt-1">
                {project.number}
              </span>

              {/* Content */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight group-hover:text-blue transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-lg font-light text-pretty">
                  {project.description}
                </p>
                <ul
                  className="grid grid-cols-2 gap-x-6 gap-y-2 mb-5 max-w-lg"
                  role="list"
                >
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium leading-snug"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] font-bold tracking-[0.12em] text-muted-foreground border border-border px-2.5 py-1 uppercase group-hover:border-blue/30 group-hover:text-blue/70 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 items-end">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-w-[172px] items-center justify-center gap-2 rounded-md border border-blue bg-blue px-5 py-3 font-sans text-xs font-bold tracking-[0.14em] uppercase text-white shadow-[0_0_0_1px_rgba(59,130,246,0.16),0_16px_40px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-dim hover:shadow-[0_0_0_1px_rgba(96,165,250,0.3),0_20px_46px_rgba(37,99,235,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
                    aria-label={`Open live project for ${project.title}`}
                  >
                    View Project
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 8L8 2M8 2H4M8 2v4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-md border border-border/40 px-4 py-2.5 font-sans text-xs font-bold tracking-[0.12em] uppercase text-muted-foreground/40 whitespace-nowrap cursor-default select-none">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
