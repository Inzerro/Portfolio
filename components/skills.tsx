const SKILLS = [
  {
    category: "Core",
    icon: "{ }",
    items: ["React", "Next.js", "JavaScript (ES6+)"],
  },
  {
    category: "Styling",
    icon: "//",
    items: ["Tailwind CSS", "CSS", "Framer Motion"],
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
      className="page-shell section-shell"
      aria-labelledby="skills-heading"
    >
      <div className="section-header">
        <div className="h-1.5 w-1.5 shrink-0 bg-blue" />
        <span className="section-kicker">02 / Skills</span>
        <div className="section-divider" />
      </div>

      <div className="mb-10 grid items-end gap-6 md:mb-16 md:grid-cols-2 md:gap-16">
        <h2 id="skills-heading" className="section-title">
          The tools I reach
          <br />
          for every day.
        </h2>
        <p className="section-copy">
          A modern frontend stack refined over years of building production
          applications — focused on developer experience and user delight.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map(({ category, icon, items }) => (
          <div key={category} className="surface-panel group p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between md:mb-6">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                {category}
              </p>
              <span className="motion-soft font-mono text-xs text-muted-foreground group-hover:text-blue">
                {icon}
              </span>
            </div>
            <ul className="space-y-3.5 md:space-y-3" role="list">
              {items.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-2.5 text-[15px] leading-none font-medium text-foreground md:text-sm"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
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
