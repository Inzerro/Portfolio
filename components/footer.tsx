const LINKS = [
  { label: "GitHub", href: "https://github.com/Inzerro" },
  { label: "Telegram", href: "https://t.me/Turdugulov_Temirlan" },
  { label: "Email", href: "mailto:Indrovichgit@gmail.com" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80" aria-label="Site footer">
      <div className="page-shell py-8 md:py-10">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.32em] text-foreground/90">
              TT
            </span>
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Temirlan Turdugulov
            </span>
          </div>

          <nav aria-label="Social links">
            <ul className="flex items-center gap-0 sm:gap-6" role="list">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="motion-soft block px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground touch-manipulation hover:text-blue active:text-blue sm:px-0"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="font-sans text-[10px] font-semibold tracking-[0.1em] text-muted-foreground">
            &copy; {year} — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
