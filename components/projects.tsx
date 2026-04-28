import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    demo: "https://carkg.vercel.app/",
    github: null,
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="page-shell section-shell"
      aria-labelledby="projects-heading"
    >
      <div className="section-header">
        <div className="h-1.5 w-1.5 shrink-0 bg-blue" />
        <span className="section-kicker">03 / Projects</span>
        <div className="section-divider" />
      </div>

      <div className="mb-10 grid items-end gap-6 md:mb-16 md:grid-cols-2 md:gap-16">
        <h2 id="projects-heading" className="section-title">
          Selected work.
        </h2>
        <p className="section-copy">
          A curated set of projects that showcase my approach to building
          production-ready, polished web applications.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {PROJECTS.map((project) => (
          <article key={project.number} className="surface-panel group overflow-hidden">
            <div className="md:hidden">
              <div className="flex items-center justify-between border-b border-border/60 px-5 pt-5 pb-3">
                <span className="font-mono text-[10px] font-bold text-blue">
                  {project.number}
                </span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="outline" className="font-mono text-[9px]">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="px-5 pt-4 pb-3">
                <h3 className="motion-soft mb-2 text-lg font-bold tracking-tight text-foreground group-hover:text-blue">
                  {project.title}
                </h3>
                <p className="mb-4 text-[14px] leading-relaxed font-light text-pretty text-muted-foreground">
                  {project.description}
                </p>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-2" role="list">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-[12px] leading-snug font-medium text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border/60 px-5 py-4">
                {project.demo ? (
                  <Button asChild variant="primary" size="default" className="w-full">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  </Button>
                ) : (
                  <span className="inline-flex min-h-12 w-full cursor-default select-none items-center justify-center rounded-md border border-border/50 bg-surface-2 px-4 py-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground/50">
                    Soon
                  </span>
                )}
              </div>
            </div>

            <div className="hidden items-start gap-10 px-8 py-10 md:grid md:grid-cols-[48px_1fr_auto]">
              <span className="mt-1 font-mono text-[10px] font-bold text-blue">
                {project.number}
              </span>

              <div>
                <h3 className="motion-soft mb-3 text-lg font-bold tracking-tight text-foreground group-hover:text-blue">
                  {project.title}
                </h3>
                <p className="mb-4 max-w-lg text-sm leading-relaxed font-light text-pretty text-muted-foreground">
                  {project.description}
                </p>
                <ul className="mb-5 grid max-w-lg grid-cols-2 gap-x-6 gap-y-2" role="list">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-[11px] leading-snug font-medium text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="motion-soft font-mono group-hover:border-blue/30 group-hover:text-blue/70"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                {project.demo ? (
                  <Button asChild variant="primary" className="min-w-[11rem] whitespace-nowrap">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  </Button>
                ) : (
                  <span className="inline-flex cursor-default select-none items-center rounded-md border border-border/40 px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.12em] whitespace-nowrap text-muted-foreground/40">
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
