"use client";

import { useEffect, useRef, useState } from "react";

// ─── Animation helper ────────────────────────────────────────────────────────
function useMountAnimation(count: number, baseDelay = 80) {
  const [ready, setReady] = useState(false);
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const style = (index: number): React.CSSProperties =>
    prefersReduced
      ? {}
      : {
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(18px)",
          transition: `opacity 0.55s ease, transform 0.55s ease`,
          transitionDelay: `${index * baseDelay}ms`,
        };

  return style;
}

// ─── Scroll-fade hook for profile image ──────────────────────────────────────
function useScrollFade(fadeOutBy = 300) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const onScroll = () => {
      const fade = Math.max(0, 1 - window.scrollY / fadeOutBy);
      setOpacity(fade);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fadeOutBy]);

  return opacity;
}

// ─── Dot grid background ──────────────────────────────────────────────────────
function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 opacity-[0.35]"
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" className="fill-neutral-400" />
          </pattern>
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect width="100%" height="100%" fill="url(#grid-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-grid)"
          mask="url(#grid-mask)"
        />
      </svg>
      <div className="absolute -top-32 -right-32 z-20 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[96px]" />
    </div>
  );
}

// ─── Credential chip ──────────────────────────────────────────────────────────
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm backdrop-blur-sm">
      {children}
    </span>
  );
}

// ─── Profile image — fades out on scroll ─────────────────────────────────────
function ProfileImage({ opacity }: { opacity: number }) {
  return (
    <div
      className="hidden lg:flex flex-shrink-0 items-center justify-center"
      style={{ opacity, transition: "opacity 0.08s linear" }}
      aria-hidden="true"
    >
      <div className="relative h-[380px] w-[360px] overflow-hidden -translate-x-36">
        <img
          src="/profile.jpg"
          alt=""
          className="h-full w-full object-cover object-top"
        />
        {/* Bottom fade — blends into page background */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
        {/* Right-edge fade */}
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/40 to-transparent" />
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const animate = useMountAnimation(7, 75);
  const imageOpacity = useScrollFade(400);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-white px-5 py-24 sm:px-8"
    >
      <GridBackground />

      {/* ── Two-column layout ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-row items-center gap-12 lg:gap-16">

        {/* Left — all your existing content, unchanged */}
        <div className="flex flex-1 flex-col items-start gap-6">

          {/* Credential chips */}
          <div
            style={animate(0)}
            className="flex flex-wrap gap-2"
            aria-label="Credentials"
          >
            <Chip>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              B.Tech AI &amp; ML · VIPS-TC
            </Chip>
            <Chip>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              NCC Cadet · 1 Delhi Air Squadron
            </Chip>
            <Chip>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              6 yrs design practice
            </Chip>
          </div>

          {/* Name — your gradient style kept exactly */}
          <div style={animate(1)}>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-800 bg-[length:200%_auto] bg-clip-text text-transparent animate-textShine">
              Satyam Kumar
            </h1>
          </div>

          {/* Role line — your style kept exactly */}
          <p
            style={animate(2)}
            className="mb-1 text-sm font-medium tracking-widest text-neutral-400 uppercase select-none"
          >
            <span className="text-blue-600">AI Engineer</span>
            <br />
            <span>&amp; Graphic Designer</span>
          </p>

          {/* Subheadline */}
          <p
            style={animate(3)}
            className="max-w-[500px] text-lg leading-relaxed text-neutral-500 sm:text-xl"
          >
            Building intelligent systems with machine learning, computer vision,
            and creative thinking.
          </p>

          {/* CTAs */}
          <div style={animate(4)} className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-sm
                         transition-all duration-150
                         hover:bg-neutral-700 hover:shadow-md hover:-translate-y-px
                         active:translate-y-0 active:shadow-none
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
            >
              View Projects
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              >
                <path
                  d="M1 7h12M7.5 1.5L13 7l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume (opens PDF)"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 shadow-sm
                         transition-all duration-150
                         hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-md hover:-translate-y-px
                         active:translate-y-0 active:shadow-none
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
            >
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7 1v8M3.5 5.5L7 9l3.5-3.5M1.5 11.5h11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Resume
            </a>
          </div>

          {/* Stat strip */}
          <div
            style={animate(5)}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2"
            aria-label="At a glance"
          >
            {[
              { value: "2",  label: "deployed AI projects" },
              { value: "6",  label: "years design practice" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-semibold text-neutral-900">
                  {value}
                </span>
                <span className="text-xs text-neutral-400">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — profile image, fades on scroll */}
        <ProfileImage opacity={imageOpacity} />
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <div
        style={animate(6)}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1.5 text-neutral-400">
          <span className="text-[10px] font-medium tracking-widest uppercase">
            Scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <path
              d="M2 5l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
