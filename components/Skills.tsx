"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Skill {
  name: string;
  note?: string; // optional one-word context shown on hover
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  accent: "blue" | "emerald" | "violet";
  skills: Skill[];
}

// ─── Data — single source of truth ───────────────────────────────────────────
// Add or remove skills here. Nothing else in the component needs to change.

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "technical",
    label: "Technical",
    description: "Languages and frameworks I build with.",
    accent: "blue",
    skills: [
      { name: "Python",          note: "Primary"    },
      { name: "Machine Learning",note: "Core"       },
      { name: "SQL",             note: "Databases"  },
      { name: "HTML",            note: "Markup"     },
      { name: "CSS",             note: "Styling"    },
      { name: "React",           note: "UI" },
      { name: "NLP",             note: "Python"     },      
      { name: "Flutter",         note: "Mobile"     },      
    ],
  },
  {
    id: "aiml",
    label: "AI / ML Tools",
    description: "Libraries and platforms I deploy with.",
    accent: "emerald",
    skills: [
      { name: "Pandas",        note: "Data"        },
      { name: "NumPy",         note: "Numerics"    },
      { name: "YOLOv8",        note: "Vision"      },
      { name: "Gradio",        note: "Interfaces"  },
      { name: "HuggingFace",   note: "Deployment"  },
      { name: "Vercel",        note: "Web Dev"  },      
    ],
  },
  {
    id: "creative",
    label: "Creative",
    description: "Design tools I've used for 5+ years.",
    accent: "violet",
    skills: [
      { name: "Photoshop",    note: "Graphics"  },
      { name: "Premiere Pro", note: "Video"     },
      { name: "Figma",        note: "UI/UX"     },
      { name: "Canva",        note: "Social"    },
      { name: "Framer",       note: "UI/UX"  },      
    ],
  },
];

// ─── Accent colour map ────────────────────────────────────────────────────────

const ACCENT = {
  blue: {
    header:     "text-blue-600",
    headerBg:   "bg-blue-50 border-blue-100",
    chip:       "border-blue-100 bg-blue-50 text-blue-800",
    chipHover:  "hover:border-blue-300 hover:bg-blue-100 hover:text-blue-900",
    dot:        "bg-blue-500",
    note:       "text-blue-500",
    cardBorder: "hover:border-blue-200",
    glyph:      "text-blue-200",
  },
  emerald: {
    header:     "text-emerald-600",
    headerBg:   "bg-emerald-50 border-emerald-100",
    chip:       "border-emerald-100 bg-emerald-50 text-emerald-800",
    chipHover:  "hover:border-emerald-300 hover:bg-emerald-100 hover:text-emerald-900",
    dot:        "bg-emerald-500",
    note:       "text-emerald-500",
    cardBorder: "hover:border-emerald-200",
    glyph:      "text-emerald-200",
  },
  violet: {
    header:     "text-violet-600",
    headerBg:   "bg-violet-50 border-violet-100",
    chip:       "border-violet-100 bg-violet-50 text-violet-800",
    chipHover:  "hover:border-violet-300 hover:bg-violet-100 hover:text-violet-900",
    dot:        "bg-violet-500",
    note:       "text-violet-500",
    cardBorder: "hover:border-violet-200",
    glyph:      "text-violet-200",
  },
} satisfies Record<SkillCategory["accent"], Record<string, string>>;



// ─── Skill chip ───────────────────────────────────────────────────────────────
// Each individual skill is a pill with an optional hover note.

function SkillChip({
  skill,
  accent,
}: {
  skill: Skill;
  accent: SkillCategory["accent"];
}) {
  const a = ACCENT[accent];
  const [hovered, setHovered] = useState(false);

  return (
    <li>
      <div
        role="listitem"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        aria-label={skill.note ? `${skill.name} — ${skill.note}` : skill.name}
        className={[
          "relative flex cursor-default select-none items-center gap-2",
          "rounded-full border px-3.5 py-1.5",
          "text-sm font-medium",
          "outline-none transition-all duration-150",
          "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
          a.chip,
          a.chipHover,
        ].join(" ")}
      >
        {/* Accent dot */}
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${a.dot} transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-50"}`}
        />

        {/* Name */}
        <span className="leading-none">{skill.name}</span>

        {/* Note — slides in on hover */}
        {skill.note && (
          <span
            aria-hidden="true"
            className={[
              "overflow-hidden font-normal transition-all duration-200",
              a.note,
              hovered
                ? "max-w-[80px] opacity-100"
                : "max-w-0 opacity-0",
            ].join(" ")}
            style={{ fontSize: "11px", whiteSpace: "nowrap" }}
          >
            · {skill.note}
          </span>
        )}
      </div>
    </li>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  visible,
  delay,
}: {
  category: SkillCategory;
  visible: boolean;
  delay: number;
}) {
  const a = ACCENT[category.accent];

  return (
    <div
      style={{
        opacity:         visible ? 1 : 0,
        transform:       visible ? "translateY(0)" : "translateY(24px)",
        transition:      "opacity 0.55s ease, transform 0.55s ease",
        transitionDelay: `${delay}ms`,
      }}
      className={[
        "flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-6",
        "shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
        "transition-all duration-300",
        "hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
        a.cardBorder,
      ].join(" ")}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div
            className={[
              "mb-2 inline-flex items-center gap-1.5 rounded-full border",
              "px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
              a.headerBg,
              a.header,
            ].join(" ")}
          >
            {/* Category icon glyph */}
            <span aria-hidden="true">
              {category.accent === "blue"    && "{ }"}
              {category.accent === "emerald" && "⌘"}
              {category.accent === "violet"  && "✦"}
            </span>
            {category.label}
          </div>
          <p className="text-sm text-neutral-500">{category.description}</p>
        </div>

        {/* Skill count badge */}
        <span
          aria-label={`${category.skills.length} skills`}
          className={[
            "flex-shrink-0 rounded-full px-2.5 py-0.5",
            "font-mono text-xs font-semibold",
            a.chip,
          ].join(" ")}
        >
          {category.skills.length}
        </span>
      </div>

      {/* Skill chips */}
      <ul
        role="list"
        aria-label={`${category.label} skills`}
        className="flex flex-wrap gap-2"
      >
        {category.skills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} accent={category.accent} />
        ))}
      </ul>
    </div>
  );
}

// ─── Currently exploring strip ────────────────────────────────────────────────

const EXPLORING: string[] = ["RAG systems", "FastAPI", "Next.js"];

function ExploringStrip({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        opacity:         visible ? 1 : 0,
        transform:       visible ? "translateY(0)" : "translateY(16px)",
        transition:      "opacity 0.5s ease, transform 0.5s ease",
        transitionDelay: "440ms",
      }}
      className="flex flex-col gap-3 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-4 sm:flex-row sm:items-center sm:gap-6"
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Pulsing active dot */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Currently exploring
        </p>
      </div>

      <ul
        role="list"
        aria-label="Technologies currently being explored"
        className="flex flex-wrap gap-2"
      >
        {EXPLORING.map((item) => (
          <li key={item}>
            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-xs font-medium text-neutral-600">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ visible }: { visible: boolean }) {
  return (
    <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
            transitionDelay: "0ms",
          }}
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400"
        >
          Skills & Tools
        </p>
        <h2
          id="skills-heading"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            transitionDelay: "80ms",
          }}
          className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          What I work with.
        </h2>
      </div>

      <p
        style={{
          opacity:    visible ? 1 : 0,
          transition: "opacity 0.5s ease",
          transitionDelay: "160ms",
        }}
        className="max-w-xs text-sm leading-relaxed text-neutral-500 sm:text-right"
      >
        Technical depth in AI/ML, five years of design practice, and the
        foundation to build full-stack.
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Skills() {
  const { ref, visible } = useReveal(0.08);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-white px-5 py-24 sm:px-8"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="mx-auto max-w-6xl"
      >
        <SectionHeading visible={visible} />

        {/* Three-column card grid — single column on mobile */}
        <div
          className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="region"
          aria-label="Skill categories"
        >
          {SKILL_CATEGORIES.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              visible={visible}
              delay={200 + i * 100}
            />
          ))}
        </div>

        {/* Currently exploring strip */}
        <ExploringStrip visible={visible} />
      </div>
    </section>
  );
}
