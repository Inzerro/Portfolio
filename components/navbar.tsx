"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "About", href: "#about", index: "01" },
  { label: "Skills", href: "#skills", index: "02" },
  { label: "Projects", href: "#projects", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 280);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 motion-panel ${
          scrolled
            ? "border-b border-border bg-background/88 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          className="page-shell flex h-16 items-center justify-between md:h-[4.5rem]"
          aria-label="Main navigation"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-3"
            aria-label="Temirlan Turdugulov — home"
          >
            <span className="motion-soft font-sans text-[11px] font-bold uppercase tracking-[0.32em] text-foreground/90 group-hover:text-blue">
              TT
            </span>
            <span className="hidden font-sans text-xs font-semibold uppercase tracking-[0.2em] text-foreground sm:block">
              Temirlan
            </span>
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/50 px-2 py-1 shadow-[var(--shadow-xs)] md:flex" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                    className={`motion-soft relative rounded-full px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] ${
                      isActive
                        ? "text-blue"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-px bg-blue" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <Button asChild variant="primary" size="sm" className="hidden md:inline-flex">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav("#contact");
                }}
              >
                Feedback
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="-mr-2 md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-xl motion-panel md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-1 flex-col justify-center px-6 pb-14 pt-20 sm:px-8">
          <ul className="flex flex-col" role="list">
            {NAV_LINKS.map((link, i) => {
              const isActive = active === link.href.replace("#", "");
              const delayClass =
                i === 0
                  ? "delay-[60ms]"
                  : i === 1
                    ? "delay-[110ms]"
                    : i === 2
                      ? "delay-[160ms]"
                      : "delay-[210ms]";
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                    className={`group flex items-baseline justify-between border-b border-border/40 py-5 touch-manipulation motion-panel ${
                      delayClass
                    } ${
                      isActive ? "text-blue" : "text-foreground"
                    } ${
                      menuOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0"
                    }`}
                  >
                    <span className="text-3xl leading-none font-black tracking-tight">
                      {link.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {link.index}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div
            className={`mt-10 motion-panel delay-[260ms] ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <Button asChild variant="primary" size="lg" className="w-full">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav("#contact");
                }}
              >
                Feedback
              </a>
            </Button>
          </div>

          <div
            className={`mt-10 flex flex-wrap items-center gap-4 motion-panel delay-[300ms] ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {[
              { label: "GitHub", href: "https://github.com/Inzerro" },
              { label: "Telegram", href: "https://t.me/TurdugulovTurdugulov" },
              { label: "Email", href: "mailto:Indrovichgit@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                className="motion-soft font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground touch-manipulation hover:text-blue"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="px-6 pb-8 sm:px-8">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50">
            Temirlan Turdugulov &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
}
