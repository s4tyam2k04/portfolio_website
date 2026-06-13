"use client";

import { useReveal } from "@/hooks/useReveal";
import { revealStyle } from "@/lib/animation";

// ─── Types ────────────────────────────────────────────────────────────────────

export type EntryVariant = "education" | "ncc" | "role";

export interface ExperienceEntry {
  id: string;
  variant: EntryVariant;
  title: string;
  organisation: string;
  period: string;
  tags?: string[];
  description: string;
  highlight?: string; // pull-quote shown in accent block
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    id: "btech",
    variant: "education",
    title: "B.Tech — Artificial Intelligence & Machine Learning",
    organisation: "VIPS-TC, GGSIPU",
    period: "2023 – 2027",
    tags: ["CGPA: 7.58", "Machine Learning", "Computer Vision", "DSA", "DBMS"],
    description:
      "Specialising in AI/ML at Vivekananda Institute of Professional Studies – Technical Campus under Guru Gobind Singh Indraprastha University. Coursework spans machine learning, deep learning, computer vision, data structures, and mobile application development.",
  },
  {
    id: "ncc",
    variant: "ncc",
    title: "Co-Head, Social Media Team",
    organisation: "1 Delhi Air Squadron NCC",
    period: "2024 – 2027",
    tags: ["Team Leadership", "Discipline", "Teamwork", "Content Strategy"],
    description:
      "Cadet of No. 1 Delhi Air Squadron (Air Wing NCC), where training instilled a baseline of accountability, consistent execution, and structured discipline that directly translates into my engineering work. Leveraging this background, I led visual communication and content strategy for 1DAS's social media presence — managing cross-departmental coordination to produce high-impact campaign assets for recruitment drives, events, and institutional milestones while maintaining its integrity and decorum.",
    highlight:
      "Three years of NCC gave me something no curriculum provides: the habit of finishing what I start.",
  },
 {
    id: "graphic-designer",
    variant: "role",
    title: "Graphic Designer",
    organisation: "35MM Filmmaking Society · VIPS-TC",
    period: "2024 – 2026",
    tags: ["Branding", "Motion", "Event Design"],
    description:
      "Visual identity and promotional collateral for one of VIPS-TC's most active creative societies. Designed event posters, film screening promotions, and digital assets across festival seasons — applying five years of freelance design practice in a live organisational context.",
  },
];

// ─── Variant config ───────────────────────────────────────────────────────────

const VARIANT_CONFIG: Record<
  EntryVariant,
  {
    dot: string;
    dotRing: string;
    border: string;
    cardHover: string;
    tagBg: string;
    tagText: string;
    tagBorder: string;
    highlightBg: string;
    highlightBorder: string;
    highlightText: string;
    icon: string;
    iconBg: string;
    iconText: string;
  }
> = {
  education: {
    dot:             "bg-blue-500",
    dotRing:         "ring-blue-100",
    border:          "border-l-blue-300",
    cardHover:       "hover:border-blue-200",
    tagBg:           "bg-blue-50",
    tagText:         "text-blue-700",
    tagBorder:       "border-blue-100",
    highlightBg:     "",
    highlightBorder: "",
    highlightText:   "",
    icon:            "Education",
    iconBg:          "bg-blue-50 border-blue-100",
    iconText:        "text-blue-600",
  },
  ncc: {
    dot:             "bg-amber-500",
    dotRing:         "ring-amber-100",
    border:          "border-l-amber-400",
    cardHover:       "hover:border-amber-200",
    tagBg:           "bg-amber-50",
    tagText:         "text-amber-700",
    tagBorder:       "border-amber-100",
    highlightBg:     "bg-amber-50/70",
    highlightBorder: "border-amber-100",
    highlightText:   "text-amber-900",
    icon:            "NCC",
    iconBg:          "bg-amber-50 border-amber-100",
    iconText:        "text-amber-600",
  },
  role: {
    dot:             "bg-red-400",
    dotRing:         "ring-red-100",
    border:          "border-l-red-300",
    cardHover:       "hover:border-red-300",
    tagBg:           "bg-red-100",
    tagText:         "text-red-600",
    tagBorder:       "border-neutral-200",
    highlightBg:     "",
    highlightBorder: "",
    highlightText:   "",
    icon:            "Role",
    iconBg:          "bg-neutral-100 border-neutral-200",
    iconText:        "text-neutral-500",
  },
};



// ─── Timeline entry ───────────────────────────────────────────────────────────

function TimelineEntry({
  entry,
  visible,
  delay,
  isLast,
}: {
  entry: ExperienceEntry;
  visible: boolean;
  delay: number;
  isLast: boolean;
}) {
  const v = VARIANT_CONFIG[entry.variant];

  return (
    <div
      style={{
        opacity:         visible ? 1 : 0,
        transform:       visible ? "translateX(0)" : "translateX(-16px)",
        transition:      "opacity 0.55s ease, transform 0.55s ease",
        transitionDelay: `${delay}ms`,
      }}
      className="relative flex gap-5 sm:gap-7"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0" aria-hidden="true">
        <div
          className={[
            "relative z-10 flex h-9 w-9 items-center justify-center",
            "rounded-full ring-4",
            v.dotRing,
          ].join(" ")}
        >
          <div className={`h-3 w-3 rounded-full ${v.dot}`} />
        </div>
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-neutral-200" />
        )}
      </div>

      {/* Card */}
      <div
        className={[
          "mb-10 flex-1 overflow-hidden rounded-2xl border border-l-4",
          "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
          "transition-all duration-300",
          "hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:-translate-y-0.5",
          v.border,
          v.cardHover,
        ].join(" ")}
      >
        <div className="p-5 sm:p-6">

          {/* Header row */}
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span
                className={[
                  "inline-flex w-fit items-center rounded-full border px-2.5 py-0.5",
                  "text-[10px] font-semibold uppercase tracking-widest",
                  v.iconBg, v.iconText,
                ].join(" ")}
              >
                {v.icon}
              </span>
              <h3 className="text-base font-semibold leading-snug text-neutral-900 sm:text-lg">
                {entry.title}
              </h3>
              <p className="text-sm font-medium text-neutral-500">
                {entry.organisation}
              </p>
            </div>
            <span className="flex-shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 font-mono text-xs font-medium text-neutral-500">
              {entry.period}
            </span>
          </div>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <ul
              role="list"
              aria-label="Skills and tags"
              className="mb-3 flex flex-wrap gap-1.5"
            >
              {entry.tags.map((tag) => (
                <li key={tag}>
                  <span
                    className={[
                      "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                      v.tagBg, v.tagText, v.tagBorder,
                    ].join(" ")}
                  >
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Description */}
          <p className="text-sm leading-relaxed text-neutral-600">
            {entry.description}
          </p>

          {/* Highlight blockquote — NCC only */}
          {entry.highlight && (
            <blockquote
              className={[
                "mt-4 rounded-xl border-l-2 border-amber-400 py-3 pl-4 pr-3",
                v.highlightBg, v.highlightBorder,
              ].join(" ")}
            >
              <p className={`text-sm italic leading-relaxed ${v.highlightText}`}>
                "{entry.highlight}"
              </p>
            </blockquote>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Experience() {
  const { ref, visible } = useReveal(0.08);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-neutral-50 px-5 py-24 sm:px-8"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-12">
          <p
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400"
          >
            Experience & Education
          </p>
          <h2
            id="experience-heading"
            style={{
              opacity:    visible ? 1 : 0,
              transform:  visible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              transitionDelay: "80ms",
            }}
            className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
          >
            Where I've been building.
          </h2>
        </div>

        <div role="list" aria-label="Experience and education timeline">
          {EXPERIENCE_ENTRIES.map((entry, i) => (
            <div role="listitem" key={entry.id}>
              <TimelineEntry
                entry={entry}
                visible={visible}
                delay={160 + i * 120}
                isLast={i === EXPERIENCE_ENTRIES.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
