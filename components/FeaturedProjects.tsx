"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  thumbnail: string; // path to image, e.g. "/projects/marine-thumb.jpg"
  thumbnailAlt: string;
  tech: string[];
  metric: { value: string; label: string };
  href: string; // internal route, e.g. "/projects/marine-trash-detection"
  accentColor: "blue" | "emerald" | "violet" | "amber" | "rose" | "cyan";
}

// ─── Project registry ─────────────────────────────────────────────────────────
// Add new projects here. Nothing else in the component needs to change.

const PROJECTS: Project[] = [
  {
    id: "marine-trash-detection",
    number: "01",
    title: "Marine Trash Detection",
    description:
      "Fine-tuned YOLOv8m-seg on 7,212 underwater images to detect and segment 16 classes of marine debris and sea life in real time.",
    thumbnail: "/projects/marine-thumb.jpg",
    thumbnailAlt:
      "YOLOv8 segmentation masks overlaid on an underwater scene showing detected plastic debris and fish",
    tech: ["Python", "YOLOv8", "Gradio", "HuggingFace"],
    metric: { value: "65.6%", label: "mAP50" },
    href: "/projects/marine-trash-detection",
    accentColor: "blue",
  },
  {
    id: "house-price-prediction",
    number: "02",
    title: "House Price Prediction",
    description:
      "End-to-end ML pipeline on an Ames-style housing dataset — full EDA, feature engineering, outlier handling, and Linear Regression deployed via Gradio.",
    thumbnail: "/projects/house-price-thumb.jpg",
    thumbnailAlt:
      "Correlation heatmap from exploratory data analysis of the housing dataset",
    tech: ["Python", "Scikit-Learn", "Pandas", "Gradio"],
    metric: { value: "0.99", label: "R²" },
    href: "/projects/house-price-prediction",
    accentColor: "emerald",
  },
  // ↓ Future projects slot in here — no layout changes needed
];

// ─── Accent colour map ────────────────────────────────────────────────────────
// Tailwind requires complete class strings (no dynamic concatenation at runtime).

const ACCENT: Record<
  Project["accentColor"],
  {
    chip: string;       // tag pill
    metric: string;     // metric value text
    border: string;     // card hover border
    glow: string;       // thumbnail overlay glow
    dot: string;        // number dot
  }
> = {
  blue: {
    chip:   "bg-blue-50 text-blue-700 border-blue-100",
    metric: "text-blue-600",
    border: "hover:border-blue-200",
    glow:   "from-blue-500/20",
    dot:    "bg-blue-100 text-blue-600",
  },
  emerald: {
    chip:   "bg-emerald-50 text-emerald-700 border-emerald-100",
    metric: "text-emerald-600",
    border: "hover:border-emerald-200",
    glow:   "from-emerald-500/20",
    dot:    "bg-emerald-100 text-emerald-600",
  },
  violet: {
    chip:   "bg-violet-50 text-violet-700 border-violet-100",
    metric: "text-violet-600",
    border: "hover:border-violet-200",
    glow:   "from-violet-500/20",
    dot:    "bg-violet-100 text-violet-600",
  },
  amber: {
    chip:   "bg-amber-50 text-amber-700 border-amber-100",
    metric: "text-amber-600",
    border: "hover:border-amber-200",
    glow:   "from-amber-500/20",
    dot:    "bg-amber-100 text-amber-600",
  },
  rose: {
    chip:   "bg-rose-50 text-rose-700 border-rose-100",
    metric: "text-rose-600",
    border: "hover:border-rose-200",
    glow:   "from-rose-500/20",
    dot:    "bg-rose-100 text-rose-600",
  },
  cyan: {
    chip:   "bg-cyan-50 text-cyan-700 border-cyan-100",
    metric: "text-cyan-600",
    border: "hover:border-cyan-200",
    glow:   "from-cyan-500/20",
    dot:    "bg-cyan-100 text-cyan-600",
  },
};


// ─── Thumbnail placeholder ────────────────────────────────────────────────────
// Shown while the real image loads or when no image is provided.

function ThumbnailPlaceholder({ accent }: { accent: Project["accentColor"] }) {
  const colors: Record<Project["accentColor"], string> = {
    blue:    "from-blue-50 to-blue-100",
    emerald: "from-emerald-50 to-emerald-100",
    violet:  "from-violet-50 to-violet-100",
    amber:   "from-amber-50 to-amber-100",
    rose:    "from-rose-50 to-rose-100",
    cyan:    "from-cyan-50 to-cyan-100",
  };
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${colors[accent]} flex items-center justify-center`}>
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-30">
        <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 26l9-7 7 6 5-4 11 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const a = ACCENT[project.accentColor];
  const [imgError, setImgError] = useState(false);

  return (
    <article
      ref={ref}
      aria-labelledby={`project-title-${project.id}`}
      style={{
        opacity:         visible ? 1 : 0,
        transform:       visible ? "translateY(0)" : "translateY(28px)",
        transition:      "opacity 0.55s ease, transform 0.55s ease",
        transitionDelay: `${index * 120}ms`,
      }}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "border border-neutral-200 bg-white",
        "shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        "transition-all duration-300",
        "hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:-translate-y-1",
        a.border,
      ].join(" ")}
    >
      {/* ── Thumbnail ──────────────────────────────────────────────────── */}
      <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
        {/* Accent glow overlay — appears on hover */}
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0 z-10 bg-gradient-to-t opacity-0",
            "transition-opacity duration-300 group-hover:opacity-100",
            a.glow, "to-transparent",
          ].join(" ")}
        />

        {/* Placeholder — always rendered, hidden when image loads */}
        {(imgError) && <ThumbnailPlaceholder accent={project.accentColor} />}

        {!imgError && (
          <img
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            onError={() => setImgError(true)}
            className="absolute inset-0 h-full w-full object-cover
                       transition-transform duration-500 ease-out
                       group-hover:scale-[1.04]"
          />
        )}

        {/* Project number badge */}
        <span
          aria-hidden="true"
          className={[
            "absolute top-3 left-3 z-20",
            "rounded-full px-2.5 py-0.5",
            "font-mono text-[11px] font-semibold",
            a.dot,
          ].join(" ")}
        >
          {project.number}
        </span>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-4 p-5">

        {/* Title + metric */}
        <div className="flex items-start justify-between gap-3">
          <h3
            id={`project-title-${project.id}`}
            className="text-base font-semibold leading-snug text-neutral-900"
          >
            {project.title}
          </h3>
          {/* Key metric */}
          <div className="flex-shrink-0 text-right">
            <p className={`font-mono text-lg font-semibold leading-none ${a.metric}`}>
              {project.metric.value}
            </p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-neutral-400">
              {project.metric.label}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-neutral-500 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tech.map((t) => (
            <span
              key={t}
              className={[
                "rounded-full border px-2.5 py-0.5",
                "font-mono text-[11px] font-medium",
                a.chip,
              ].join(" ")}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Spacer pushes button to bottom */}
        <div className="flex-1" />

        {/* CTA */}
        <a
          href={project.href}
          aria-label={`View ${project.title} project details`}
          className={[
            "group/btn inline-flex items-center justify-center gap-2",
            "rounded-lg border border-neutral-200 bg-neutral-50",
            "px-4 py-2.5 text-sm font-semibold text-neutral-700",
            "transition-all duration-150",
            "hover:border-neutral-300 hover:bg-white hover:text-neutral-900 hover:shadow-sm",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-blue-600 focus-visible:ring-offset-2",
          ].join(" ")}
        >
          View Project
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-150 group-hover/btn:translate-x-0.5"
          >
            <path
              d="M1 7h12M7.5 1.5L13 7l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}

// ─── Section heading reveal ───────────────────────────────────────────────────

function SectionHeading({ projectCount }: { projectCount: number }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Featured Projects
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Deployed systems.{" "}
          <span className="text-neutral-400">Live demos.</span>
        </h2>
      </div>

      {projectCount > 3 && (
        <a
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500
                     transition-colors duration-150 hover:text-neutral-900
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:rounded-sm"
        >
          View all projects
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
        </a>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-neutral-50 px-5 py-24 sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">

        <SectionHeading projectCount={PROJECTS.length} />

        {/* Grid — auto-fills columns; each card is min 300px */}
        <ul
          role="list"
          aria-label="Featured projects"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS.map((project, i) => (
            <li key={project.id}>
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>

        {/* Empty-state — shown only when registry is empty (shouldn't happen, but safe) */}
        {PROJECTS.length === 0 && (
          <p className="text-center text-sm text-neutral-400">
            Projects coming soon.
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Re-export type so project pages can import it ───────────────────────────
export type { Project as ProjectType };
