"use client";

import { useReveal } from "@/hooks/useReveal";
import { revealStyle } from "@/lib/animation";



// ─── Contact data ─────────────────────────────────────────────────────────────

const CONTACT_LINKS = [
  {
    id:      "email",
    label:   "Email",
    display: "satyamkumar20042004@gmail.com",       // ← replace with real email
    href:    "mailto:satyamkumar20042004@gmail.com?subject=Reaching%20out%20from%20your%20portfolio",
    note:    "Fastest response",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: {
      bg:     "bg-blue-50",
      border: "border-blue-100",
      icon:   "text-blue-600",
      hover:  "hover:border-blue-300 hover:bg-blue-50/80",
      label:  "text-blue-600",
    },
  },
  {
    id:      "linkedin",
    label:   "LinkedIn",
    display: "https://www.linkedin.com/in/satyamkr04/",  // ← replace with real profile slug
    href:    "https://www.linkedin.com/in/satyamkr04/",
    note:    "Connect professionally",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M16.667 2H3.333A1.333 1.333 0 002 3.333v13.334A1.333 1.333 0 003.333 18h13.334A1.333 1.333 0 0018 16.667V3.333A1.333 1.333 0 0016.667 2zM7 15.5H4.5V8H7v7.5zm-1.25-8.548a1.452 1.452 0 110-2.904 1.452 1.452 0 010 2.904zM15.5 15.5H13v-3.675c0-.876-.016-2.003-1.22-2.003-1.222 0-1.41.954-1.41 1.94V15.5H7.87V8h2.41v1.025h.034c.335-.635 1.155-1.305 2.377-1.305C15.157 7.72 15.5 9.35 15.5 11.82v3.68z" />
      </svg>
    ),
    accent: {
      bg:     "bg-sky-50",
      border: "border-sky-100",
      icon:   "text-sky-600",
      hover:  "hover:border-sky-300 hover:bg-sky-50/80",
      label:  "text-sky-600",
    },
  },
  {
    id:      "github",
    label:   "GitHub",
    display: "github.com/s4tyam2k04",
    href:    "https://github.com/s4tyam2k04",
    note:    "Source code & projects",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
    accent: {
      bg:     "bg-neutral-50",
      border: "border-neutral-200",
      icon:   "text-neutral-700",
      hover:  "hover:border-neutral-400 hover:bg-neutral-100",
      label:  "text-neutral-700",
    },
  },
  {
    id:      "huggingface",
    label:   "HuggingFace",
    display: "huggingface.co/s4tyam2k04",
    href:    "https://huggingface.co/s4tyam2k04",
    note:    "Live model demos",
    icon: (
      // HuggingFace logo — simplified face emoji approximation in SVG
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 13s1 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path d="M7 7.5C7 6.5 8 6 9 6.5M17 7.5C17 6.5 16 6 15 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    accent: {
      bg:     "bg-amber-50",
      border: "border-amber-100",
      icon:   "text-amber-600",
      hover:  "hover:border-amber-300 hover:bg-amber-50/80",
      label:  "text-amber-600",
    },
  },
] as const;

const FOOTER_LINKS = [
  { label: "Home",       href: "#home"       },
  { label: "About",      href: "#about"      },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

// ─── Smooth scroll helper ─────────────────────────────────────────────────────

function scrollTo(href: string) {
  const id = href.startsWith("#") ? href.slice(1) : href;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── Contact link card ────────────────────────────────────────────────────────

function ContactCard({
  link,
  visible,
  delay,
}: {
  link: (typeof CONTACT_LINKS)[number];
  visible: boolean;
  delay: number;
}) {
  const a = link.accent;

  return (
    <a
      href={link.href}
      target={link.id === "email" ? undefined : "_blank"}
      rel={link.id === "email" ? undefined : "noopener noreferrer"}
      aria-label={`${link.label}: ${link.display}`}
      style={revealStyle(visible, delay)}
      className={[
        "group flex items-center gap-4 rounded-2xl border p-5",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
        a.bg, a.border, a.hover,
      ].join(" ")}
    >
      {/* Icon */}
      <div
        className={[
          "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl",
          "border transition-colors duration-200",
          a.bg, a.border, a.icon,
        ].join(" ")}
        aria-hidden="true"
      >
        {link.icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className={`mb-0.5 text-xs font-semibold uppercase tracking-wider ${a.label}`}>
          {link.label}
        </p>
        <p className="truncate text-sm font-medium text-neutral-800">
          {link.display}
        </p>
        <p className="mt-0.5 text-xs text-neutral-400">{link.note}</p>
      </div>

      {/* Arrow */}
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="flex-shrink-0 text-neutral-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-neutral-500"
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

// ─── Contact section ──────────────────────────────────────────────────────────

export function Contact() {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white px-5 py-24 sm:px-8"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="mx-auto max-w-4xl"
      >
        {/* Header */}
        <div className="mb-14 text-center">
          <p
            style={revealStyle(visible, 0)}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400"
          >
            Contact
          </p>

          <h2
            id="contact-heading"
            style={revealStyle(visible, 80)}
            className="mb-5 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl"
          >
            Let's build something.
          </h2>

          <p
            style={revealStyle(visible, 80)}
            className="mx-auto max-w-md text-base leading-relaxed text-neutral-500"
          >
            <i>Open to internships, collaborations, and conversations about AI
            systems, design, and anything in between.</i>
          </p>
        </div>

        {/* Link cards — 2×2 grid on sm+, stacked on mobile */}
        <div
          className="mb-10 grid gap-4 sm:grid-cols-2"
          role="list"
          aria-label="Contact and social links"
        >
          {CONTACT_LINKS.map((link, i) => (
            <div role="listitem" key={link.id}>
              <ContactCard link={link} visible={visible} delay={240 + i * 80} />
            </div>
          ))}
        </div>

        {/* Response signal */}
        <p
          style={revealStyle(visible, 560)}
          className="text-center text-sm text-neutral-400"
        >
          I typically respond within{" "}
          <span className="font-medium text-neutral-600">24 hours.</span>
        </p>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-neutral-200 bg-neutral-50 px-5 py-10 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">

        {/* Top row */}
        <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Identity */}
          <div>
            <p className="mb-1 text-sm font-semibold text-neutral-900">
              Satyam Kumar
            </p>
            <p className="text-xs text-neutral-400">
              AI Engineer · Builder · Designer
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul
              role="list"
              className="flex flex-wrap gap-x-5 gap-y-2"
            >
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className="text-xs font-medium text-neutral-500 transition-colors duration-150
                               hover:text-neutral-900
                               focus-visible:outline-none focus-visible:rounded-sm
                               focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icon strip */}
          <div
            className="flex items-center gap-2"
            aria-label="Social links"
          >
            {/* Email */}
            <a
              href="mailto:satyamkumar20042004@gmail.com"   // ← replace
              aria-label="Send email"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200
                         text-neutral-500 transition-all duration-150
                         hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/satyamkr04/"  // ← replace
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200
                         text-neutral-500 transition-all duration-150
                         hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M16.667 2H3.333A1.333 1.333 0 002 3.333v13.334A1.333 1.333 0 003.333 18h13.334A1.333 1.333 0 0018 16.667V3.333A1.333 1.333 0 0016.667 2zM7 15.5H4.5V8H7v7.5zm-1.25-8.548a1.452 1.452 0 110-2.904 1.452 1.452 0 010 2.904zM15.5 15.5H13v-3.675c0-.876-.016-2.003-1.22-2.003-1.222 0-1.41.954-1.41 1.94V15.5H7.87V8h2.41v1.025h.034c.335-.635 1.155-1.305 2.377-1.305C15.157 7.72 15.5 9.35 15.5 11.82v3.68z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/s4tyam2k04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200
                         text-neutral-500 transition-all duration-150
                         hover:border-neutral-400 hover:bg-neutral-100 hover:text-neutral-900
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>

            {/* HuggingFace */}
            <a
              href="https://huggingface.co/s4tyam2k04"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HuggingFace profile"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200
                         text-neutral-500 transition-all duration-150
                         hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 13.5s1.2 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="9" cy="10" r="1" fill="currentColor" />
                <circle cx="15" cy="10" r="1" fill="currentColor" />
                <path d="M7 7.5C7 6.5 8 6 9 6.5M17 7.5C17 6.5 16 6 15 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-neutral-200" role="separator" />

        {/* Bottom row */}
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-400">
            © {year} Satyam Kumar. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Designed &amp; built by{" "}
            <span className="font-medium text-neutral-600">Satyam Kumar</span>
            {" "}·{" "}
            <span className="font-mono">Next.js · Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

// ─── Combined default export (both together) ─────────────────────────────────

export default function ContactAndFooter() {
  return (
    <>
      <Contact />
      <Footer />
    </>
  );
}
