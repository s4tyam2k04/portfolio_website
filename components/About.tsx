"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { revealStyle } from "@/lib/animation";



// ─── Animated count-up for stat numbers ──────────────────────────────────────

function CountUp({
  target,
  suffix = "",
  duration = 1200,
  trigger,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVal(target); return; }

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);

  return <>{val}{suffix}</>;
}

// ─── Stat block ───────────────────────────────────────────────────────────────

function StatBlock({
  value,
  suffix,
  label,
  visible,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      style={revealStyle(visible, delay)}
      className="flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm"
    >
      <span className="font-mono text-2xl font-semibold text-neutral-900">
        <CountUp target={value} suffix={suffix ?? ""} trigger={visible} />
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
        {label}
      </span>
    </div>
  );
}

// ─── Identity pillar ──────────────────────────────────────────────────────────

function Pillar({
  accent,
  eyebrow,
  title,
  body,
  visible,
  delay,
}: {
  accent: "blue" | "amber" | "violet";
  eyebrow: string;
  title: string;
  body: string;
  visible: boolean;
  delay: number;
}) {
  const colors = {
    blue: {
      bar:    "bg-blue-600",
      label:  "text-blue-600",
      border: "border-blue-100",
      bg:     "bg-blue-50/60",
    },
    amber: {
      bar:    "bg-amber-500",
      label:  "text-amber-600",
      border: "border-amber-100",
      bg:     "bg-amber-50/60",
    },
    violet: {
      bar:    "bg-violet-500",
      label:  "text-violet-600",
      border: "border-violet-100",
      bg:     "bg-violet-50/60",
    },
  }[accent];

  return (
    <div
      style={revealStyle(visible, delay)}
      className={`relative flex flex-col gap-3 overflow-hidden rounded-2xl border p-6 ${colors.border} ${colors.bg}`}
    >
      {/* Accent top bar */}
      <div className={`absolute inset-x-0 top-0 h-[3px] ${colors.bar}`} aria-hidden="true" />

      <p className={`text-[11px] font-semibold uppercase tracking-[0.1em] ${colors.label}`}>
        {eyebrow}
      </p>
      <p className="text-base font-semibold text-neutral-900">{title}</p>
      <p className="text-sm leading-relaxed text-neutral-600">{body}</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function About() {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-white px-5 py-24 sm:px-8"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="mx-auto max-w-6xl"
      >

        {/* ── Section label ───────────────────────────────────────────── */}
        <p
          style={revealStyle(visible, 0)}
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400"
        >
          About
        </p>

        {/* ── Opening statement ───────────────────────────────────────── */}
        <h2
          id="about-heading"
          style={revealStyle(visible, 80)}
          className="mb-12 max-w-2xl text-3xl font-semibold leading-snug tracking-tight text-neutral-900 sm:text-4xl"
        >
          B.Tech AI & ML student {" "}
          <span className="text-neutral-400">building real, deployed systems</span>{" "}
          — not just notebooks.
        </h2>

        {/* ── Main grid — two columns ─────────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">

          {/* Left — narrative + pillars */}
          <div className="flex flex-col gap-10">

            {/* Primary paragraph — technical + builder identity */}
            <div style={revealStyle(visible, 160)} className="flex flex-col gap-4">
              <p className="text-base leading-[1.75] text-neutral-600">
                I'm a Satyam Kumar, a third-year b.tech student specialising in Artificial Intelligence &amp;
                Machine Learning at VIPS-TC, GGSIPU. My focus isn't on completing
                assignments — it's on building things that work in the real world.
                My current projects are trained, deployed, and publicly accessible:
                a YOLOv8 marine debris detector on HuggingFace Spaces and a full ML
                regression pipeline with a live Gradio interface.
              </p>
              <p className="text-base leading-[1.75] text-neutral-600">
                I care about the full stack of a project — from data engineering and
                model selection through deployment and interface design. The gap between
                "a trained model" and "something a person can actually use" is where
                most student projects stop. That's where mine start.
              </p>
            </div>

            {/* Three identity pillars */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Pillar
                accent="blue"
                eyebrow="Technical"
                title="AI Engineer & Builder"
                body="Python, ML pipelines, computer vision, and deployment. Every project I build is live and accessible — no local-only demos."
                visible={visible}
                delay={260}
              />
              <Pillar
                accent="amber"
                eyebrow="Discipline"
                title="NCC Cadet"
                body="1 Delhi Air Squadron. Three years of structured training that built accountability, follow-through, and the ability to operate under pressure."
                visible={visible}
                delay={340}
              />
              <Pillar
                accent="violet"
                eyebrow="Creative"
                title="Graphic Designer"
                body="Five years of freelance design work. Branding, UI, motion, and print — the reason my technical work looks like a product, not a school project."
                visible={visible}
                delay={420}
              />
            </div>

            {/* Education highlight — given extra visual weight */}
            <div
              style={revealStyle(visible, 500)}
              className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              {/* Subtle left accent */}
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-blue-600"
              />
              <div className="pl-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-600">
                  Education
                </p>
                <p className="mb-0.5 text-base font-semibold text-neutral-900">
                  B.Tech — Artificial Intelligence &amp; Machine Learning
                </p>
                <p className="mb-4 text-sm text-neutral-500">
                  VIPS-TC, GGSIPU · 2023–2027 · CGPA: 7.58
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Machine Learning",
                    "Computer Vision",
                    "Data Structures",
                    "DBMS",
                    "Mobile App Dev",
                    "Digital Image Processing",
                  ].map((course) => (
                    <span
                      key={course}
                      className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-[11px] text-neutral-600"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right — stats + quick facts */}
          <div className="flex flex-col gap-6">

            {/* Stat grid */}
            <div>
              <p
                style={revealStyle(visible, 200)}
                className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-400"
              >
                At a glance
              </p>
              <div className="grid grid-cols-2 gap-3">
                <StatBlock value={2}    suffix=""   label="Deployed AI Projects" visible={visible} delay={280} />
                <StatBlock value={16}   suffix=""   label="Detection Classes"    visible={visible} delay={340} />
                <StatBlock value={6}    suffix=""  label="Years Design Prac."   visible={visible} delay={400} />
                <StatBlock value={65}   suffix=".6%" label="mAP50 — Marine Det." visible={visible} delay={460} />
              </div>
            </div>

            {/* Currently building card */}
            <div
              style={revealStyle(visible, 540)}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
                  Currently building
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  {
                    label: "Marine Trash Detection",
                    detail: "YOLOv8m-seg · 65.6% mAP50 · Live",
                    dot: "bg-blue-500",
                  },
                  {
                    label: "House Price Predictor",
                    detail: "Linear Regression · R² 0.99 · Live",
                    dot: "bg-emerald-500",
                  },
                  {
                    label: "Portfolio v2",
                    detail: "Next.js 14 · Tailwind · This site",
                    dot: "bg-violet-500",
                  },
                ].map(({ label, detail, dot }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dot}`}
                    />
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{label}</p>
                      <p className="font-mono text-[11px] text-neutral-400">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* What drives me — NCC callout */}
            <div
              style={revealStyle(visible, 620)}
              className="rounded-2xl border border-amber-100 bg-amber-50/70 p-5"
            >
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-amber-600">
                What discipline looks like
              </p>
              <p className="text-sm italic leading-relaxed text-neutral-700">
                "NCC gave me something no curriculum provides — the habit of showing up
                consistently, taking ownership without being asked, and finishing what
                I start. That's the baseline I bring to every project."
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
