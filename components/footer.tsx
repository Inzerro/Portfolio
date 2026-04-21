const LINKS = [
  { label: "GitHub", href: "https://github.com/enzerro" },
  { label: "Telegram", href: "https://t.me/TurdugulovTurdugulov" },
  { label: "Email", href: "mailto:Indrovichgit@gmail.com" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border" aria-label="Site footer">
      <div className="max-w-6xl mx-auto px-5 md:px-12 py-8 md:py-10">
        {/* Mobile: stacked center-aligned. Desktop: single row spread. */}
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:items-center sm:gap-0">
          {/* Wordmark / logo */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-[0.32em] text-foreground/90 uppercase font-sans">
              TT
            </span>
            <span className="text-[10px] font-semibold tracking-[0.3em] text-muted-foreground uppercase font-sans">
              Temirlan Turdugulov
            </span>
          </div>

          {/* Social links — larger tap areas on mobile */}
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
                    className="block px-4 sm:px-0 py-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase font-sans hover:text-blue active:text-blue transition-colors duration-200 touch-manipulation"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground font-sans">
            &copy; {year} — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
