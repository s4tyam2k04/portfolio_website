"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const NAV_ITEMS = [
  { label: "Home",       href: "#home"       },
  { label: "Projects",   href: "#projects"   },
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]["href"] extends `#${infer S}` ? S : never;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const menuRef   = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // ── Scroll-spy via Intersection Observer ─────────────────────────────────
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1)) as SectionId[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the greatest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold:  [0, 0.25, 0.5, 0.75,],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Backdrop blur / border on scroll ─────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on outside click ───────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current   && !menuRef.current.contains(e.target as Node) &&
        toggleRef.current && !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // ── Close menu on Escape ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  // ── Lock body scroll when menu is open ───────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Smooth scroll helper ──────────────────────────────────────────────────
  const scrollTo = useCallback((href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const isActive = (href: string) => activeSection === href.slice(1);

  return (
    <>
      {/* ── Nav bar ─────────────────────────────────────────────────────── */}
      <header
        role="banner"
        className={[
          "fixed inset-x-0 top-0 z-50 h-16",
          "transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8"
        >
          {/* Logo / name */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            aria-label="Satyam Kumar — back to top"
            className="text-sm font-semibold tracking-tight text-neutral-900
                       transition-opacity duration-150 hover:opacity-70
                       focus-visible:outline-none focus-visible:ring-2
                       focus-visible:ring-blue-600 focus-visible:ring-offset-2
                       rounded-sm"
          >
            Satyam Kumar
          </a>

          {/* Desktop links */}
          <ul
            role="list"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={[
                    "relative px-3 py-1.5 text-sm font-medium rounded-md",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                    isActive(href)
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/70",
                  ].join(" ")}
                >
                  {label}
                  {/* Active underline */}
                  {isActive(href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-blue-600
                                 animate-[slideIn_200ms_ease-out]"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
            aria-label="Go to contact section"
            className={[
              "hidden md:inline-flex items-center gap-1.5",
              "rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white",
              "transition-all duration-150",
              "hover:bg-neutral-700 active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
            ].join(" ")}
          >
            Contact
          </a>

          {/* Mobile hamburger */}
          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={[
              "md:hidden relative h-9 w-9 rounded-md",
              "flex flex-col items-center justify-center gap-[5px]",
              "transition-colors duration-150 hover:bg-neutral-100",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
            ].join(" ")}
          >
            {/* Three bars that morph into X */}
            <span
              aria-hidden="true"
              className={[
                "block h-[1.5px] w-5 rounded-full bg-neutral-800",
                "origin-center transition-transform duration-300",
                menuOpen ? "translate-y-[6.5px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              aria-hidden="true"
              className={[
                "block h-[1.5px] w-5 rounded-full bg-neutral-800",
                "transition-[opacity,transform] duration-200",
                menuOpen ? "opacity-0 scale-x-0" : "",
              ].join(" ")}
            />
            <span
              aria-hidden="true"
              className={[
                "block h-[1.5px] w-5 rounded-full bg-neutral-800",
                "origin-center transition-transform duration-300",
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile overlay ──────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={[
          "fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden",
          "transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={[
          "fixed inset-x-4 top-20 z-50 rounded-xl md:hidden",
          "bg-white border border-neutral-200 shadow-xl",
          "transition-[opacity,transform] duration-300 ease-out",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <nav aria-label="Mobile navigation">
          <ul role="list" className="flex flex-col p-2">
            {NAV_ITEMS.map(({ label, href }, i) => (
              <li key={href}>
                <a
                  href={href}
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  className={[
                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-blue-600 focus-visible:ring-inset",
                    isActive(href)
                      ? "bg-blue-50 text-blue-700"
                      : "text-neutral-700 hover:bg-neutral-100",
                  ].join(" ")}
                  style={{
                    transitionDelay: menuOpen ? `${i * 30}ms` : "0ms",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateY(0)" : "translateY(-4px)",
                  }}
                >
                  {label}
                  {isActive(href) && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-blue-600"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-neutral-100 p-3">
            <a
              href="#contact"
              tabIndex={menuOpen ? 0 : -1}
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className={[
                "flex w-full items-center justify-center rounded-lg",
                "bg-neutral-900 px-4 py-3 text-sm font-medium text-white",
                "transition-colors duration-150 hover:bg-neutral-700",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
              ].join(" ")}
            >
              Get in touch
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}


// ─── Tailwind keyframe extension needed in tailwind.config.ts ───────────────
//
// theme: {
//   extend: {
//     keyframes: {
//       slideIn: {
//         "0%":   { transform: "scaleX(0)", opacity: "0" },
//         "100%": { transform: "scaleX(1)", opacity: "1" },
//       },
//     },
//     animation: {
//       slideIn: "slideIn 200ms ease-out",
//     },
//   },
// },
