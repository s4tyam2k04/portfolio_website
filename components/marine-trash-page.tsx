"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { revealStyle } from "@/lib/animation";

// ─── Section wrapper with reveal ─────────────────────────────────────────────

function Section({
  id,
  label,
  className = "",
  children,
}: {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`px-5 py-20 sm:px-8 ${className}`}
    >
      <div className="mx-auto max-w-4xl">
        <p
          id={`${id}-eyebrow`}
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-500"
        >
          {label}
        </p>
        {children}
      </div>
    </section>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
      <span className="font-mono text-2xl font-semibold text-blue-600">{value}</span>
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">{label}</span>
    </div>
  );
}

// ─── Architecture step ────────────────────────────────────────────────────────

function ArchStep({
  step,
  title,
  desc,
  last = false,
}: {
  step: string;
  title: string;
  desc: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-blue-50 font-mono text-xs font-bold text-blue-600">
          {step}
        </div>
        {!last && <div className="mt-1 w-px flex-1 bg-neutral-200" />}
      </div>
      <div className={`pb-8 ${last ? "" : ""}`}>
        <p className="mb-1 text-sm font-semibold text-neutral-900">{title}</p>
        <p className="text-sm leading-relaxed text-neutral-500">{desc}</p>
      </div>
    </div>
  );
}

// ─── Gallery image ────────────────────────────────────────────────────────────

function GalleryItem({
  src,
  alt,
  caption,
  onClick,
}: {
  src: string;
  alt: string;
  caption: string;
  onClick: () => void;
}) {
  const [err, setErr] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Enlarge: ${caption}`}
      className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 text-left
                 transition-all duration-200 hover:border-blue-200 hover:shadow-md
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <div className="relative h-44 w-full overflow-hidden">
        {err ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <span className="text-xs text-blue-400">Image placeholder</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onError={() => setErr(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/10">
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <path
              d="M8 3H3v5M17 8V3h-5M12 17h5v-5M3 12v5h5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <p className="px-3 py-2 text-xs text-neutral-500">{caption}</p>
    </button>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; alt: string; caption: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.caption}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-2xl bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="max-h-[80vh] w-full object-contain"
        />
        <p className="px-4 py-3 text-center text-sm text-neutral-400">{img.caption}</p>

        {/* Nav */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white
                         transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white
                         transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white
                     transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "65.6%", label: "mAP50" },
  { value: "16",    label: "Object classes" },
  { value: "7,212", label: "Training images" },
  { value: "75",    label: "Epochs" },
];

const ARCH_STEPS = [
  {
    step: "1",
    title: "Dataset preparation",
    desc: "TrashCan 1.0 dataset — 7,212 annotated underwater images split into train/val/test. COCO-format segmentation masks for all 16 classes.",
  },
  {
    step: "2",
    title: "Augmentation pipeline",
    desc: "Mosaic (4-image composite), mixup=0.1, copy_paste=0.1, HSV colour jitter, random flips. Handles turbid water and varied lighting across footage.",
  },
  {
    step: "3",
    title: "YOLOv8m-seg fine-tuning",
    desc: "Medium backbone chosen for accuracy-speed balance on Kaggle P100 GPU. SGD with cosine LR decay (lr0=0.01 → lrf=0.001), batch=16, img_size=640.",
  },
  {
    step: "4",
    title: "Evaluation",
    desc: "mAP50 computed across all 16 classes. Confusion matrix and per-class precision-recall curves analysed to identify underperforming categories.",
  },
  {
    step: "5",
    title: "Deployment",
    desc: "best.pt exported and pushed to HuggingFace Hub. Gradio interface wraps the model for live inference — accepts any image, returns annotated output with class labels and confidence scores.",
    last: true,
  },
];

const CLASSES = {
  trash: [
    "trash_plastic", "trash_metal", "trash_fabric",
    "trash_fishing_gear", "trash_rubber", "trash_wood",
    "trash_paper", "trash_etc",
  ],
  life: [
    "animal_fish", "animal_starfish", "animal_shells",
    "animal_crab", "animal_eel", "animal_etc",
    "plant", "rov",
  ],
};

const GALLERY_IMAGES = [
  {
    src: "/projects/marine/val_batch0_pred.jpg",
    alt: "Validation batch predictions showing segmentation masks over underwater footage",
    caption: "Validation predictions — val_batch0_pred.jpg",
  },
  {
    src: "/projects/marine/confusion_matrix.png",
    alt: "Confusion matrix across all 16 object classes",
    caption: "Confusion matrix — all 16 classes",
  },
  {
    src: "/projects/marine/training_curves.png",
    alt: "Training loss and mAP curves over 75 epochs",
    caption: "Training curves — 75 epochs",
  },
  {
    src: "/projects/marine/class_distribution.png",
    alt: "Bar chart showing class distribution across the training dataset",
    caption: "Class distribution in TrashCan 1.0",
  },
  {
    src: "/projects/marine/results.png",
    alt: "Final results grid from YOLOv8 training run",
    caption: "Results summary grid",
  },
  {
    src: "/projects/marine/gradio-ui.png",
    alt: "Screenshot of the Gradio demo interface deployed on HuggingFace Spaces",
    caption: "Gradio demo interface",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarineTrashDetectionPage() {
  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox  = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)), []);
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % GALLERY_IMAGES.length)), []);

  // Hero mount animation
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setHeroReady(true)); }, []);

  // Section reveals
  const overviewReveal   = useReveal();
  const problemReveal    = useReveal();
  const datasetReveal    = useReveal();
  const archReveal       = useReveal();
  const resultsReveal    = useReveal();
  const galleryReveal    = useReveal();
  const demoReveal       = useReveal();
  const githubReveal     = useReveal();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="project-hero"
        aria-label="Project: Marine Trash Detection"
        className="relative overflow-hidden bg-neutral-950 px-5 py-24 sm:px-8"
      >
        {/* Underwater tint overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-neutral-950 to-neutral-950" />
          <div className="absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-blue-700/20 blur-[120px]" />
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col gap-6">
          {/* Back link */}
          <div style={revealStyle(heroReady, 0)}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded-sm"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All projects
            </Link>
          </div>

          {/* Tags */}
          <div style={revealStyle(heroReady, 80)} className="flex flex-wrap gap-2">
            {["Computer Vision", "Instance Segmentation", "HuggingFace", "Deployment"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-blue-700/50 bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-300"
              >
                {t}
              </span>
            ))}
            <span className="rounded-full border border-emerald-700/50 bg-emerald-900/40 px-3 py-1 text-xs font-medium text-emerald-400">
              ● Live
            </span>
          </div>

          {/* Headline */}
          <h1
            style={revealStyle(heroReady, 160)}
            className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Marine Trash<br />
            <span className="text-blue-400">Detection System</span>
          </h1>

          {/* Tagline */}
          <p
            style={revealStyle(heroReady, 240)}
            className="max-w-xl text-lg leading-relaxed text-neutral-400"
          >
            Fine-tuned YOLOv8m-seg on 7,212 underwater images to detect and
            segment marine debris and sea life across 16 distinct classes — deployed
            as a live inference demo.
          </p>

          {/* Stats row */}
          <div
            style={revealStyle(heroReady, 320)}
            className="flex flex-wrap gap-6 border-t border-neutral-800 pt-6"
            aria-label="Key metrics"
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-mono text-2xl font-semibold text-white">{value}</span>
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={revealStyle(heroReady, 400)} className="flex flex-wrap gap-3">
            <a
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white
                         shadow-sm transition-all hover:bg-blue-500 hover:-translate-y-px hover:shadow-md
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              Try Live Demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://github.com/s4tyam2k04/marine_trash_detection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/60 px-5 py-2.5 text-sm font-semibold text-neutral-300
                         transition-all hover:border-neutral-600 hover:bg-neutral-800 hover:-translate-y-px
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://huggingface.co/spaces/s4tyam2k04/marine_trash_detector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/60 px-5 py-2.5 text-sm font-semibold text-neutral-300
                         transition-all hover:border-neutral-600 hover:bg-neutral-800 hover:-translate-y-px
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
            >
              HuggingFace ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Project Overview ──────────────────────────────────────────────── */}
      <Section id="overview" label="Project Overview" className="bg-white">
        <div ref={overviewReveal.ref as React.RefObject<HTMLDivElement>}>
          <h2
            id="overview-heading"
            style={revealStyle(overviewReveal.visible, 0)}
            className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900"
          >
            What this project does
          </h2>
          <div
            style={revealStyle(overviewReveal.visible, 100)}
            className="grid gap-6 sm:grid-cols-2"
          >
            <p className="text-base leading-relaxed text-neutral-600">
              This system uses instance segmentation — not just bounding boxes — to
              identify precise pixel-level boundaries of each detected object. That
              distinction matters for cleanup pipelines: a bounding box tells you
              roughly where debris is; a segmentation mask tells you exactly how much
              space it occupies and what shape it is.
            </p>
            <p className="text-base leading-relaxed text-neutral-600">
              The model was trained on the TrashCan 1.0 dataset from the University of
              Minnesota, covering a wide range of real underwater footage. It runs live
              on HuggingFace Spaces — upload any underwater image and the model returns
              annotated predictions in seconds.
            </p>
          </div>
          <div
            style={revealStyle(overviewReveal.visible, 200)}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map(({ value, label }) => (
              <Stat key={label} value={value} label={label} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Problem Statement ─────────────────────────────────────────────── */}
      <Section id="problem" label="Problem Statement" className="bg-neutral-50">
        <div ref={problemReveal.ref as React.RefObject<HTMLDivElement>}>
          <h2
            id="problem-heading"
            style={revealStyle(problemReveal.visible, 0)}
            className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900"
          >
            Why this problem matters
          </h2>
          <div
            style={revealStyle(problemReveal.visible, 100)}
            className="grid gap-8 md:grid-cols-2"
          >
            {/* Problem side */}
            <div className="rounded-2xl border border-red-100 bg-red-50/60 p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-red-400">
                The challenge
              </p>
              <ul className="space-y-3">
                {[
                  "Ocean cleanup depends on knowing where and what debris concentrates — data that human divers cannot collect at scale.",
                  "ROV cameras generate thousands of hours of footage per survey. Manual review is too slow and too expensive.",
                  "Debris and marine life often co-exist in the same frame. A system that misclassifies one for the other causes active harm.",
                  "Underwater footage varies wildly — turbid water, poor visibility, changing light conditions — making generalisation hard.",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-red-400" aria-hidden="true">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 5l6 6M11 5L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            {/* Goal side */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-emerald-500">
                Success criteria
              </p>
              <ul className="space-y-3">
                {[
                  "Pixel-level segmentation masks — not just bounding boxes — for precise debris boundary mapping.",
                  "16-class discrimination: 8 debris categories and 8 marine life categories in a single model pass.",
                  "Real-time capable inference speed suitable for processing ROV video streams.",
                  "A publicly accessible demo — verifiable by anyone, deployable without a local GPU.",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-700">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-emerald-500" aria-hidden="true">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Dataset ───────────────────────────────────────────────────────── */}
      <Section id="dataset" label="Dataset" className="bg-white">
        <div ref={datasetReveal.ref as React.RefObject<HTMLDivElement>}>
          <h2
            id="dataset-heading"
            style={revealStyle(datasetReveal.visible, 0)}
            className="mb-4 text-3xl font-semibold tracking-tight text-neutral-900"
          >
            TrashCan 1.0
          </h2>
          <p
            style={revealStyle(datasetReveal.visible, 80)}
            className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-600"
          >
            Published by the University of Minnesota, TrashCan 1.0 is the largest publicly
            available annotated dataset for underwater marine debris detection. Images were
            collected from ROV deployments in multiple ocean environments, spanning a wide
            range of visibility conditions and debris types.
          </p>

          <div
            style={revealStyle(datasetReveal.visible, 160)}
            className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { value: "7,212", label: "Total images" },
              { value: "5,765", label: "Training" },
              { value: "722",   label: "Validation" },
              { value: "725",   label: "Test" },
            ].map(({ value, label }) => (
              <Stat key={label} value={value} label={label} />
            ))}
          </div>

          {/* Class grid */}
          <div
            style={revealStyle(datasetReveal.visible, 240)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="rounded-xl border border-neutral-200 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Debris classes (8)
              </p>
              <div className="flex flex-wrap gap-2">
                {CLASSES.trash.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 font-mono text-[11px] text-blue-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Marine life classes (8)
              </p>
              <div className="flex flex-wrap gap-2">
                {CLASSES.life.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-emerald-100 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] text-emerald-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Model Architecture ────────────────────────────────────────────── */}
      <Section id="architecture" label="Model Architecture" className="bg-neutral-50">
        <div ref={archReveal.ref as React.RefObject<HTMLDivElement>}>
          <h2
            id="architecture-heading"
            style={revealStyle(archReveal.visible, 0)}
            className="mb-3 text-3xl font-semibold tracking-tight text-neutral-900"
          >
            How it was built
          </h2>
          <p
            style={revealStyle(archReveal.visible, 80)}
            className="mb-10 max-w-xl text-base leading-relaxed text-neutral-600"
          >
            Five deliberate steps from raw dataset to deployed model. Each decision was made
            for a specific reason, not by default.
          </p>

          <div
            style={revealStyle(archReveal.visible, 160)}
            className="grid gap-10 md:grid-cols-2"
          >
            {/* Steps */}
            <div>
              {ARCH_STEPS.map(({ step, title, desc, last }) => (
                <ArchStep key={step} step={step} title={title} desc={desc} last={last} />
              ))}
            </div>

            {/* Key decisions */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Key engineering decisions
              </p>
              {[
                {
                  q: "Why YOLOv8m and not small or large?",
                  a: "YOLOv8s underfit on 16-class segmentation. YOLOv8l exceeded the Kaggle P100 memory budget. Medium was the operational sweet spot.",
                },
                {
                  q: "Why instance segmentation over detection?",
                  a: "Debris cleanup requires exact pixel boundaries, not bounding boxes. Segmentation masks allow precise area calculations for cleanup volume estimates.",
                },
                {
                  q: "Why mosaic + copy_paste augmentation?",
                  a: "Minority classes like trash_paper appeared in under 2% of images. copy_paste=0.1 synthetically redistributed rare instances without requiring more labels.",
                },
                {
                  q: "Training config",
                  a: "SGD, lr0=0.01, lrf=0.001, cosine decay, batch=16, img_size=640, 75 epochs on Kaggle P100 GPU.",
                },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="mb-2 text-sm font-semibold text-neutral-800">{q}</p>
                  <p className="text-sm leading-relaxed text-neutral-500">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Results ───────────────────────────────────────────────────────── */}
      <Section id="results" label="Results" className="bg-white">
        <div ref={resultsReveal.ref as React.RefObject<HTMLDivElement>}>
          <h2
            id="results-heading"
            style={revealStyle(resultsReveal.visible, 0)}
            className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900"
          >
            What the model achieved
          </h2>

          <div
            style={revealStyle(resultsReveal.visible, 100)}
            className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map(({ value, label }) => (
              <Stat key={label} value={value} label={label} />
            ))}
          </div>

          <div
            style={revealStyle(resultsReveal.visible, 200)}
            className="grid gap-4 md:grid-cols-2"
          >
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
              <p className="mb-2 text-sm font-semibold text-neutral-800">Honest context</p>
              <p className="text-sm leading-relaxed text-neutral-600">
                65.6% mAP50 on a 16-class underwater instance segmentation task is a strong
                result for a student project on constrained compute. The hardest classes —
                <code className="mx-1 rounded bg-blue-100 px-1 font-mono text-xs text-blue-700">trash_paper</code>
                and
                <code className="mx-1 rounded bg-blue-100 px-1 font-mono text-xs text-blue-700">trash_rubber</code>
                — are underrepresented in the dataset and would benefit most from longer training.
              </p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="mb-2 text-sm font-semibold text-neutral-800">Improvement paths</p>
              <ul className="space-y-1.5 text-sm text-neutral-600">
                {[
                  "YOLOv8l with higher VRAM budget for larger backbone",
                  "Class-weighted loss to address minority class imbalance",
                  "Longer training (150+ epochs) with early stopping",
                  "Test-time augmentation for marginal mAP gains",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Screenshot Gallery ────────────────────────────────────────────── */}
      <Section id="gallery" label="Screenshots" className="bg-neutral-50">
        <div ref={galleryReveal.ref as React.RefObject<HTMLDivElement>}>
          <h2
            id="gallery-heading"
            style={revealStyle(galleryReveal.visible, 0)}
            className="mb-3 text-3xl font-semibold tracking-tight text-neutral-900"
          >
            Visuals
          </h2>
          <p
            style={revealStyle(galleryReveal.visible, 80)}
            className="mb-8 text-sm text-neutral-500"
          >
            Click any image to enlarge. All visuals are real outputs from the training run.
          </p>
          <div
            style={revealStyle(galleryReveal.visible, 160)}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {GALLERY_IMAGES.map((img, i) => (
              <GalleryItem
                key={img.src}
                src={img.src}
                alt={img.alt}
                caption={img.caption}
                onClick={() => openLightbox(i)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Live Demo ─────────────────────────────────────────────────────── */}
      <Section id="demo" label="Live Demo" className="bg-white">
        <div ref={demoReveal.ref as React.RefObject<HTMLDivElement>}>
          <h2
            id="demo-heading"
            style={revealStyle(demoReveal.visible, 0)}
            className="mb-2 text-3xl font-semibold tracking-tight text-neutral-900"
          >
            Try the model
          </h2>
          <p
            style={revealStyle(demoReveal.visible, 80)}
            className="mb-6 text-base text-neutral-500"
          >
            Upload any underwater image — the model returns segmentation masks, class labels,
            and confidence scores in real time. Powered by HuggingFace Spaces.
          </p>

          {/* iframe embed */}
          <div
            style={revealStyle(demoReveal.visible, 160)}
            className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
          >
            <iframe
              src="https://s4tyam2k04-marine-trash-detector.hf.space"
              title="Marine Trash Detection — live Gradio demo"
              width="100%"
              height="600"
              loading="lazy"
              allow="camera"
              className="block w-full border-0 bg-neutral-50"
            />
          </div>

          {/* Fallback link */}
          <p
            style={revealStyle(demoReveal.visible, 240)}
            className="mt-3 text-center text-sm text-neutral-400"
          >
            Demo not loading?{" "}
            <a
              href="https://huggingface.co/spaces/s4tyam2k04/marine_trash_detector"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 underline-offset-2 hover:underline
                         focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Open on HuggingFace Spaces ↗
            </a>
          </p>
        </div>
      </Section>

      {/* ── GitHub ────────────────────────────────────────────────────────── */}
      <Section id="github" label="Source Code" className="bg-neutral-50">
        <div ref={githubReveal.ref as React.RefObject<HTMLDivElement>}>
          <h2
            id="github-heading"
            style={revealStyle(githubReveal.visible, 0)}
            className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900"
          >
            Code &amp; repository
          </h2>

          {/* Repo card */}
          <div
            style={revealStyle(githubReveal.visible, 100)}
            className="mb-6 flex flex-col items-start gap-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm
                       sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-700" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">
                  s4tyam2k04 / marine_trash_detection
                </p>
                <p className="text-sm text-neutral-500">
                  YOLOv8m-seg · TrashCan 1.0 · Gradio · HuggingFace
                </p>
              </div>
            </div>
            <a
              href="https://github.com/s4tyam2k04/marine_trash_detection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white
                         transition-all hover:bg-neutral-700 hover:-translate-y-px hover:shadow-md
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700 focus-visible:ring-offset-2"
            >
              View on GitHub
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* File structure */}
          <div
            style={revealStyle(githubReveal.visible, 200)}
            className="grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                label: "Key files",
                items: ["train.py", "predict.py", "app.py", "data.yaml", "requirements.txt"],
              },
              {
                label: "Model outputs",
                items: ["best.pt", "results.csv", "training_curves.png", "confusion_matrix.png"],
              },
              {
                label: "Run locally",
                items: ["git clone <repo>", "pip install -r requirements.txt", "python app.py"],
              },
            ].map(({ label, items }) => (
              <div key={label} className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  {label}
                </p>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="font-mono text-xs text-neutral-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom nav */}
          <div
            style={revealStyle(githubReveal.visible, 300)}
            className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500
                         transition-colors hover:text-neutral-900
                         focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All projects
            </Link>
            <Link
              href="/projects/house-price-prediction"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500
                         transition-colors hover:text-neutral-900
                         focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Next project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Lightbox ──────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
