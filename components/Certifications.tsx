"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Certificate {
  id: string;
  title: string;
  category: string;
  year: string;
  href: string; // URL to the certificate — replace "#" with real link
  accent: "blue" | "emerald" | "violet" | "amber";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const CERTIFICATES: Certificate[] = [
  {
    id: "research-paper",
    title: "Research Paper Presentation",
    category: "Academic",
    year: "2025",
    href: "/certificates/research-paper.png",
    accent: "blue",
  },
  {
    id: "hackathon",
    title: "Hackathon Participation",
    category: "Competition",
    year: "2024",
    href: "/certificates/hackathon.png",
    accent: "violet",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing — Comprehensive Studies",
    category: "Professional",
    year: "2023",
    href: "/certificates/digital-marketing.png",
    accent: "emerald",
  },
  {
    id: "agentic-automation",
    title: "Introduction to Agentic Automation",
    category: "AI / ML",
    year: "2025",
    href: "/certificates/agentic-automation.png",
    accent: "amber",
  },
];

// ─── Accent map ───────────────────────────────────────────────────────────────

const ACCENT = {
  blue: {
    icon:   "bg-blue-50 border-blue-100 text-blue-600",
    badge:  "bg-blue-50 text-blue-600 border-blue-100",
    hover:  "hover:border-blue-200",
    btn:    "text-blue-600 hover:bg-blue-50",
  },
  emerald: {
    icon:   "bg-emerald-50 border-emerald-100 text-emerald-600",
    badge:  "bg-emerald-50 text-emerald-600 border-emerald-100",
    hover:  "hover:border-emerald-200",
    btn:    "text-emerald-600 hover:bg-emerald-50",
  },
  violet: {
    icon:   "bg-violet-50 border-violet-100 text-violet-600",
    badge:  "bg-violet-50 text-violet-600 border-violet-100",
    hover:  "hover:border-violet-200",
    btn:    "text-violet-600 hover:bg-violet-50",
  },
  amber: {
    icon:   "bg-amber-50 border-amber-100 text-amber-600",
    badge:  "bg-amber-50 text-amber-600 border-amber-100",
    hover:  "hover:border-amber-200",
    btn:    "text-amber-600 hover:bg-amber-50",
  },
} satisfies Record<Certificate["accent"], Record<string, string>>;

// ─── Icons (per category) ─────────────────────────────────────────────────────

function CertIcon({ category }: { category: string }) {
  if (category === "Academic") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L2 6l7 4 7-4-7-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M2 6v5c0 2 3.134 3.5 7 3.5s7-1.5 7-3.5V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (category === "Competition") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l1.854 3.756L15 6.572l-3 2.924.708 4.129L9 11.5l-3.708 2.125L6 9.496 3 6.572l4.146-.816L9 2z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }
  if (category === "Professional") {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6 5V4a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M2 10h14" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  // AI / ML
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.1 4.1l1.4 1.4M12.5 12.5l1.4 1.4M12.5 5.5l1.4-1.4M4.1 13.9l1.4-1.4"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}



// ─── Certificate card ─────────────────────────────────────────────────────────

function CertCard({
  cert,
  visible,
  delay,
}: {
  cert: Certificate;
  visible: boolean;
  delay: number;
}) {
  const a = ACCENT[cert.accent];

  return (
    <li
      style={{
        opacity:         visible ? 1 : 0,
        transform:       visible ? "translateY(0)" : "translateY(16px)",
        transition:      "opacity 0.5s ease, transform 0.5s ease",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className={[
          "group flex h-full flex-col justify-between gap-3",
          "rounded-xl border border-neutral-200 bg-white p-4",
          "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
          "transition-all duration-200",
          "hover:-translate-y-0.5 hover:shadow-md",
          a.hover,
        ].join(" ")}
      >
        {/* Top: icon + meta */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          <div
            className={[
              "flex h-9 w-9 flex-shrink-0 items-center justify-center",
              "rounded-lg border",
              a.icon,
            ].join(" ")}
            aria-hidden="true"
          >
            <CertIcon category={cert.category} />
          </div>

          {/* Year */}
          <span className="font-mono text-[11px] font-medium text-neutral-400">
            {cert.year}
          </span>
        </div>

        {/* Title */}
        <p className="text-sm font-semibold leading-snug text-neutral-900">
          {cert.title}
        </p>

        {/* Bottom: category badge + CTA */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={[
              "rounded-full border px-2 py-0.5",
              "text-[10px] font-semibold uppercase tracking-wider",
              a.badge,
            ].join(" ")}
          >
            {cert.category}
          </span>

          <a
            href={cert.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View certificate: ${cert.title}`}
            className={[
              "inline-flex items-center gap-1 rounded-md px-2.5 py-1",
              "text-[11px] font-semibold transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-blue-600 focus-visible:ring-offset-1",
              a.btn,
            ].join(" ")}
          >
            View
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M2 9L9 2M9 2H4.5M9 2V6.5"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </li>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Certifications() {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="bg-neutral-50 px-5 py-16 sm:px-8"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="mx-auto max-w-6xl"
      >
        {/* Header row — inline with cards, not stacked above */}
        <div
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
          className="mb-6 flex items-end justify-between gap-4"
        >
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
              Certifications
            </p>
            <h2
              id="certifications-heading"
              className="text-xl font-semibold tracking-tight text-neutral-900"
            >
              Achievements &amp; credentials.
            </h2>
          </div>

          {/* Count pill */}
          <span className="flex-shrink-0 rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-xs font-semibold text-neutral-500 shadow-sm">
            {CERTIFICATES.length} certs
          </span>
        </div>

        {/* 4-column card grid */}
        <ul
          role="list"
          aria-label="Certifications"
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {CERTIFICATES.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              visible={visible}
              delay={80 + i * 70}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
