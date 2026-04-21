const SKILLS = [
  {
    category: "Core",
    icon: "{ }",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES2024+)"],
  },
  {
    category: "Styling",
    icon: "//",
    items: ["Tailwind CSS", "CSS / SCSS", "Framer Motion", "Radix UI"],
  },
  {
    category: "Tooling",
    icon: "//",
    items: ["Git / GitHub", "Vite", "ESLint / Prettier", "Figma"],
  },
  {
    category: "Craft",
    icon: "[]",
    items: [
      "UI / UX Sensibility",
      "Responsive Design",
      "Accessibility",
      "Performance",
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-36 px-5 md:px-12 max-w-6xl mx-auto"
      aria-labelledby="skills-heading"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-10 md:mb-16">
        <div className="w-1.5 h-1.5 bg-blue flex-shrink-0" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-blue uppercase font-sans">
          02 / Skills
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-end mb-10 md:mb-16">
        <h2
          id="skills-heading"
          className="text-[clamp(1.7rem,6vw,2.5rem)] md:text-4xl font-black tracking-tight text-foreground text-balance leading-tight"
        >
          The tools I reach
          <br />
          for every day.
        </h2>
        <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed font-light text-pretty">
          A modern frontend stack refined over years of building production
          applications — focused on developer experience and user delight.
        </p>
      </div>

      {/* Skills grid:
          Mobile  → 1 col, cards separated by gap (no gap-px tricks needed)
          sm      → 2 col
          lg      → 4 col, gap-px mosaic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-px sm:bg-border sm:border sm:border-border">
        {SKILLS.map(({ category, icon, items }) => (
          <div
            key={category}
            className="bg-surface-1 sm:bg-background border border-border sm:border-0 p-6 md:p-8 group hover:bg-surface-1 active:bg-surface-1 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <p className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground uppercase font-sans">
                {category}
              </p>
              <span className="font-mono text-xs text-muted-foreground group-hover:text-blue transition-colors duration-200">
                {icon}
              </span>
            </div>
            <ul className="space-y-3.5 md:space-y-3" role="list">
              {items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2.5 text-[15px] md:text-sm font-medium text-foreground leading-none"
                >
                  <span className="w-1 h-1 rounded-full bg-blue flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
