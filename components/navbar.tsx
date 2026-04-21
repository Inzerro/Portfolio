"use client";

import { useEffect, useState } from "react";

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
    // Small delay so the drawer animates out first
    setTimeout(() => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 280);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-6xl mx-auto px-5 md:px-12 h-[60px] md:h-[68px] flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group"
            aria-label="Temirlan Turdugulov — home"
          >
            <span className="text-[11px] font-bold tracking-[0.32em] text-foreground/90 uppercase font-sans transition-colors duration-200 group-hover:text-blue">
              TT
            </span>
            <span className="hidden sm:block text-xs font-semibold tracking-[0.2em] text-foreground uppercase font-sans">
              Temirlan
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
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
                    className={`relative px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-colors duration-200 font-sans ${
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

          {/* Desktop CTA + mobile hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-blue text-white text-xs font-semibold tracking-[0.1em] uppercase font-sans hover:bg-blue-dim transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Feedback
            </a>

            {/* Hamburger — larger tap area */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-3 -mr-3 touch-manipulation"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-200 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-200 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground transition-all duration-200 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 md:hidden flex flex-col bg-background transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Drawer top padding to clear the navbar */}
        <div className="flex-1 flex flex-col justify-center px-8 pb-16 pt-20">
          {/* Nav links — large touch targets */}
          <ul className="flex flex-col" role="list">
            {NAV_LINKS.map((link, i) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                    className={`flex items-baseline justify-between py-5 border-b border-border/40 group transition-colors duration-150 touch-manipulation ${
                      isActive ? "text-blue" : "text-foreground"
                    }`}
                    style={{
                      transitionDelay: menuOpen ? `${i * 50 + 60}ms` : "0ms",
                      transform: menuOpen
                        ? "translateY(0)"
                        : "translateY(12px)",
                      opacity: menuOpen ? 1 : 0,
                      transition: `opacity 0.3s ease ${i * 50 + 60}ms, transform 0.3s ease ${i * 50 + 60}ms, color 0.15s`,
                    }}
                  >
                    <span className="text-3xl font-black tracking-tight leading-none">
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

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#contact");
            }}
            className="mt-10 flex items-center justify-center py-5 bg-blue text-white font-bold tracking-[0.15em] uppercase text-sm font-sans touch-manipulation"
            style={{
              transitionDelay: menuOpen ? "260ms" : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(12px)",
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.3s ease 260ms, transform 0.3s ease 260ms`,
            }}
          >
            Feedback
          </a>

          {/* Social quick links */}
          <div
            className="mt-10 flex items-center gap-6"
            style={{
              transitionDelay: menuOpen ? "300ms" : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(8px)",
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.3s ease 300ms, transform 0.3s ease 300ms`,
            }}
          >
            {[
              { label: "GitHub", href: "https://github.com/enzerro" },
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
                className="text-[10px] font-semibold tracking-[0.25em] text-muted-foreground uppercase font-sans hover:text-blue transition-colors touch-manipulation"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom safe area */}
        <div className="px-8 pb-8">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground/50 uppercase font-sans">
            Temirlan Turdugulov &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
}
