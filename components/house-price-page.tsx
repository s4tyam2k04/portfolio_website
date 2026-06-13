"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { revealStyle } from "@/lib/animation";

// ─── Shared components ────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
      {children}
    </p>
  );
}

function SectionWrap({
  id, label, bg = "bg-white", children,
}: {
  id: string; label: string; bg?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${bg} px-5 py-20 sm:px-8`}>
      <div className="mx-auto max-w-4xl">
        <Eyebrow>{label}</Eyebrow>
        {children}
      </div>
    </section>
  );
}

function Stat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 rounded-xl border p-5 shadow-sm ${
      accent
        ? "border-emerald-200 bg-emerald-50"
        : "border-neutral-200 bg-white"
    }`}>
      <span className={`font-mono text-2xl font-semibold ${accent ? "text-emerald-700" : "text-neutral-900"}`}>
        {value}
      </span>
      <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">{label}</span>
    </div>
  );
}

// ─── EDA bar chart ────────────────────────────────────────────────────────────

function BarChart({ title, bars }: { title: string; bars: { label: string; value: number; pct: number }[] }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <p className="mb-4 text-sm font-semibold text-neutral-800">{title}</p>
      <div className="flex flex-col gap-2.5">
        {bars.map(({ label, value, pct }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="w-28 flex-shrink-0 text-right text-xs text-neutral-500">{label}</span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-sm bg-neutral-100">
              <div className="absolute inset-y-0 left-0 rounded-sm bg-emerald-400 transition-all duration-700"
                style={{ width: `${pct}%` }} aria-hidden="true" />
            </div>
            <span className="w-12 font-mono text-xs text-neutral-600">{value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Correlation grid ─────────────────────────────────────────────────────────

function CorrelationGrid() {
  const features = [
    { name: "OverallQual",  corr: 0.79 },
    { name: "GrLivArea",    corr: 0.71 },
    { name: "GarageCars",   corr: 0.64 },
    { name: "GarageArea",   corr: 0.62 },
    { name: "TotalBsmtSF",  corr: 0.61 },
    { name: "1stFlrSF",     corr: 0.61 },
    { name: "FullBath",     corr: 0.56 },
    { name: "YearBuilt",    corr: 0.52 },
    { name: "YearRemodAdd", corr: 0.51 },
    { name: "GarageYrBlt",  corr: 0.49 },
  ];
  const getColor = (v: number) => {
    if (v >= 0.75) return "bg-emerald-600 text-white";
    if (v >= 0.60) return "bg-emerald-400 text-white";
    if (v >= 0.50) return "bg-emerald-200 text-emerald-900";
    return "bg-emerald-100 text-emerald-700";
  };
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <p className="mb-1 text-sm font-semibold text-neutral-800">Top feature correlations with SalePrice</p>
      <p className="mb-4 text-xs text-neutral-400">Pearson r · darker = stronger positive correlation</p>
      <div className="flex flex-col gap-2">
        {features.map(({ name, corr }) => (
          <div key={name} className="flex items-center gap-3">
            <span className="w-32 font-mono text-xs text-neutral-600">{name}</span>
            <div className="flex-1 overflow-hidden rounded-md bg-neutral-100" style={{ height: "24px" }}>
              <div className={`flex h-full items-center justify-end pr-2 ${getColor(corr)} rounded-md transition-all duration-700`}
                style={{ width: `${corr * 100}%` }} aria-label={`${name}: ${corr}`}>
                <span className="font-mono text-[11px] font-medium">{corr}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function GalleryItem({ src, alt, caption, onClick }: { src: string; alt: string; caption: string; onClick: () => void }) {
  const [err, setErr] = useState(false);
  return (
    <button type="button" onClick={onClick} aria-label={`Enlarge: ${caption}`}
      className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 text-left
                 transition-all duration-200 hover:border-emerald-200 hover:shadow-md
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
      <div className="relative h-44 w-full overflow-hidden">
        {err ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
            <span className="text-xs text-emerald-400">Image placeholder</span>
          </div>
        ) : (
          <img src={src} alt={alt} onError={() => setErr(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none"
            className="opacity-0 transition-opacity group-hover:opacity-100">
            <path d="M8 3H3v5M17 8V3h-5M12 17h5v-5M3 12v5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="px-3 py-2 text-xs text-neutral-500">{caption}</p>
    </button>
  );
}

function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: { src: string; alt: string; caption: string }[];
  index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const img = images[index];
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);
  return (
    <div role="dialog" aria-modal="true" aria-label={img.caption}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-2xl bg-neutral-900"
        onClick={(e) => e.stopPropagation()}>
        <img src={img.src} alt={img.alt} className="max-h-[80vh] w-full object-contain" />
        <p className="px-4 py-3 text-center text-sm text-neutral-400">{img.caption}</p>
        {images.length > 1 && (
          <>
            <button type="button" onClick={onPrev} aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" onClick={onNext} aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
        <button type="button" onClick={onClose} aria-label="Close lightbox"
          className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "0.99",  label: "R² Score"          },
  { value: "81",    label: "Features after EDA" },
  { value: "2,051", label: "Training samples"   },
  { value: "~$12K", label: "Avg. RMSE"          },
];

const GALLERY_IMAGES = [
  { src: "/projects/house/saleprice-dist.png",      alt: "Distribution of SalePrice showing right skew before log transformation",              caption: "SalePrice distribution — before log transform" },
  { src: "/projects/house/log-transform.png",       alt: "SalePrice distribution after log transformation showing normal distribution",          caption: "SalePrice after log1p — normalised"            },
  { src: "/projects/house/correlation-heatmap.png", alt: "Heatmap of feature correlations with SalePrice",                                      caption: "Correlation heatmap — top features"            },
  { src: "/projects/house/outliers.png",            alt: "Scatter plot showing outlier removal from GrLivArea vs SalePrice",                    caption: "Outlier removal — GrLivArea vs SalePrice"      },
  { src: "/projects/house/residuals.png",           alt: "Residual plot from the trained Linear Regression model",                               caption: "Residual plot — trained model"                 },
  { src: "/projects/house/gradio-ui.png",           alt: "Gradio interface for the House Price Predictor deployed on HuggingFace Spaces",       caption: "Gradio demo interface"                         },
];

const EDA_BARS = [
  { label: "NAmes",   value: 225, pct: 100 },
  { label: "CollgCr", value: 150, pct: 67  },
  { label: "OldTown", value: 113, pct: 50  },
  { label: "Edwards", value: 100, pct: 44  },
  { label: "Somerst", value: 86,  pct: 38  },
  { label: "Gilbert", value: 79,  pct: 35  },
  { label: "NridgHt", value: 77,  pct: 34  },
  { label: "Sawyer",  value: 74,  pct: 33  },
];

const FEATURES_ENGINEERED = [
  { name: "TotalSF",            formula: "TotalBsmtSF + 1stFlrSF + 2ndFlrSF",                                         reason: "Total above-ground square footage is a stronger single predictor than its three components individually."                                    },
  { name: "TotalBathrooms",     formula: "FullBath + 0.5 × HalfBath + BsmtFullBath + 0.5 × BsmtHalfBath",            reason: "A single weighted bathroom count avoids multicollinearity across four correlated bath features."                                           },
  { name: "HouseAge",           formula: "YrSold − YearBuilt",                                                        reason: "Age at point of sale is more predictive than raw build year because it captures depreciation directly."                                   },
  { name: "RemodelAge",         formula: "YrSold − YearRemodAdd",                                                     reason: "Captures recency of renovation — a key price driver independent of original construction date."                                          },
  { name: "HasPool",            formula: "PoolArea > 0 → 1 else 0",                                                   reason: "Pool presence is a rare binary signal. Collapsing PoolArea to a flag avoids a mostly-zero column."                                       },
  { name: "log1p(SalePrice)",   formula: "log(1 + SalePrice)",                                                        reason: "Target was right-skewed. Log transformation normalises the distribution for linear regression assumptions."                              },
];

const PIPELINE_STEPS = [
  { title: "Data loading & audit",        desc: "Load train/test CSVs. Audit shape, dtypes, missing values per column. Identify numerical vs categorical splits."                                                        },
  { title: "Exploratory data analysis",   desc: "Distribution plots for all numerical features. Correlation matrix. Neighbourhood frequency analysis. Outlier visualisation via scatter plots."                          },
  { title: "Outlier removal",             desc: "Two GrLivArea outliers (>4,000 sqft, low price) removed per original dataset documentation. IQR-based removal on select skewed columns."                               },
  { title: "Missing value imputation",    desc: "Categorical NaNs filled with 'None' (e.g. no garage). Numerical NaNs filled with median. LotFrontage filled by neighbourhood median."                                  },
  { title: "Feature engineering",         desc: "Six composite features derived (TotalSF, TotalBathrooms, HouseAge, RemodelAge, HasPool). Target log-transformed."                                                       },
  { title: "Encoding & scaling",          desc: "Label encoding for ordinal categoricals (quality/condition scales). One-hot for nominal. StandardScaler on numerical features."                                         },
  { title: "Model training & evaluation", desc: "Linear Regression trained on 80% split. R² = 0.99. RMSE ~$12K. Residual plots confirmed homoscedasticity."                                                             },
  { title: "Deployment",                  desc: "Model pickled and loaded in a Gradio app. User inputs key features via sliders and dropdowns, receives predicted price in real time."                                   },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HousePricePredictionPage() {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setHeroReady(true)); }, []);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox  = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)), []);
  const nextImage = useCallback(() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % GALLERY_IMAGES.length)), []);

  const overviewR = useReveal();
  const datasetR  = useReveal();
  const edaR      = useReveal();
  const featureR  = useReveal();
  const modelR    = useReveal();
  const galleryR  = useReveal();
  const demoR     = useReveal();
  const githubR   = useReveal();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="project-hero" aria-label="Project: House Price Prediction"
        className="relative overflow-hidden bg-neutral-950 px-5 py-24 sm:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-neutral-950 to-neutral-950" />
          <div className="absolute -top-20 right-0 h-[440px] w-[440px] rounded-full bg-emerald-800/20 blur-[110px]" />
          <div className="absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-teal-900/20 blur-[80px]" />
        </div>
        <div className="relative mx-auto flex max-w-4xl flex-col gap-6">
          <div style={revealStyle(heroReady, 0)}>
            <Link href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:rounded-sm">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All projects
            </Link>
          </div>
          <div style={revealStyle(heroReady, 80)} className="flex flex-wrap gap-2">
            {["Machine Learning", "Regression", "Feature Engineering", "EDA"].map((t) => (
              <span key={t} className="rounded-full border border-emerald-700/50 bg-emerald-900/40 px-3 py-1 text-xs font-medium text-emerald-300">{t}</span>
            ))}
            <span className="rounded-full border border-teal-700/50 bg-teal-900/40 px-3 py-1 text-xs font-medium text-teal-400">● Live</span>
          </div>
          <h1 style={revealStyle(heroReady, 160)}
            className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            House Price<br />
            <span className="text-emerald-400">Prediction System</span>
          </h1>
          <p style={revealStyle(heroReady, 240)} className="max-w-xl text-lg leading-relaxed text-neutral-400">
            An end-to-end ML pipeline — from raw Ames housing data through thorough EDA,
            feature engineering, and outlier handling — to a deployed Linear Regression model achieving R²&nbsp;≈&nbsp;0.99.
          </p>
          <div style={revealStyle(heroReady, 320)} className="flex flex-wrap gap-6 border-t border-neutral-800 pt-6" aria-label="Key metrics">
            {HERO_STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="font-mono text-2xl font-semibold text-white">{value}</span>
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">{label}</span>
              </div>
            ))}
          </div>
          <div style={revealStyle(heroReady, 400)} className="flex flex-wrap gap-3">
            <a href="#demo"
              onClick={(e) => { e.preventDefault(); document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-500 hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950">
              Try Live Demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="https://github.com/s4tyam2k04/house_price_predictor" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/60 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-800 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
            <a href="https://huggingface.co/spaces/s4tyam2k04/house_price_predictor" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800/60 px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-800 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500">
              HuggingFace ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <SectionWrap id="overview" label="Project Overview" bg="bg-white">
        <div ref={overviewR.ref as React.RefObject<HTMLDivElement>}>
          <h2 id="overview-heading" style={revealStyle(overviewR.visible, 0)} className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900">What this project does</h2>
          <div style={revealStyle(overviewR.visible, 100)} className="grid gap-6 sm:grid-cols-2">
            <p className="text-base leading-relaxed text-neutral-600">Raw housing data is messy — skewed distributions, correlated features, spurious outliers, and dozens of columns that confuse more than they clarify. This project treats the data engineering problem as seriously as the modelling problem. Thorough EDA came before any model was fit.</p>
            <p className="text-base leading-relaxed text-neutral-600">The result is a Linear Regression model that achieves R²&nbsp;≈&nbsp;0.99 — not because the algorithm is powerful, but because the features fed into it are clean, well-constructed, and genuinely predictive. The model is deployed via Gradio on HuggingFace Spaces for live predictions.</p>
          </div>
          <div style={revealStyle(overviewR.visible, 200)} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {HERO_STATS.map(({ value, label }) => <Stat key={label} value={value} label={label} accent={value === "0.99"} />)}
          </div>
        </div>
      </SectionWrap>

      {/* ── Dataset ───────────────────────────────────────────────────────── */}
      <SectionWrap id="dataset" label="Dataset" bg="bg-neutral-50">
        <div ref={datasetR.ref as React.RefObject<HTMLDivElement>}>
          <h2 id="dataset-heading" style={revealStyle(datasetR.visible, 0)} className="mb-4 text-3xl font-semibold tracking-tight text-neutral-900">Ames Housing Dataset</h2>
          <p style={revealStyle(datasetR.visible, 80)} className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-600">Compiled by Dean De Cock as a modern alternative to the classic Boston Housing dataset, the Ames dataset covers residential home sales in Ames, Iowa from 2006 to 2010. It contains 79 explanatory variables — a mix of continuous, discrete, ordinal, and nominal — describing nearly every aspect of a property.</p>
          <div style={revealStyle(datasetR.visible, 160)} className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[{ value: "2,919", label: "Total records" }, { value: "79", label: "Raw features" }, { value: "2006", label: "Data from" }, { value: "2010", label: "Data to" }].map(({ value, label }) => <Stat key={label} value={value} label={label} />)}
          </div>
          <div style={revealStyle(datasetR.visible, 240)} className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Continuous", examples: ["LotArea", "GrLivArea", "TotalBsmtSF", "1stFlrSF", "GarageArea"],    color: "border-emerald-100 bg-emerald-50", label: "text-emerald-700" },
              { title: "Ordinal",    examples: ["OverallQual", "OverallCond", "ExterQual", "KitchenQual", "BsmtQual"], color: "border-blue-100 bg-blue-50",       label: "text-blue-700"    },
              { title: "Nominal",    examples: ["Neighborhood", "HouseStyle", "RoofStyle", "Foundation", "SaleType"], color: "border-violet-100 bg-violet-50",   label: "text-violet-700"  },
            ].map(({ title, examples, color, label }) => (
              <div key={title} className={`rounded-xl border p-5 ${color}`}>
                <p className={`mb-3 text-xs font-semibold uppercase tracking-wider ${label}`}>{title}</p>
                <ul className="space-y-1">{examples.map((e) => <li key={e} className="font-mono text-xs text-neutral-600">{e}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      {/* ── EDA ───────────────────────────────────────────────────────────── */}
      <SectionWrap id="eda" label="EDA Highlights" bg="bg-white">
        <div ref={edaR.ref as React.RefObject<HTMLDivElement>}>
          <h2 id="eda-heading" style={revealStyle(edaR.visible, 0)} className="mb-3 text-3xl font-semibold tracking-tight text-neutral-900">What the data revealed</h2>
          <p style={revealStyle(edaR.visible, 80)} className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-600">EDA was conducted before any feature was touched. The goal: understand the distribution of every variable, identify outliers, and let the data dictate which features warranted engineering.</p>
          <div style={revealStyle(edaR.visible, 160)} className="mb-8 grid gap-4 sm:grid-cols-2">
            {[
              { finding: "SalePrice is right-skewed",             tag: "Target engineering", detail: "Distribution peaked around $160K with a long right tail. Log transformation normalised it, satisfying Linear Regression's normality assumption.",                                          action: "Applied log1p() to target before training."                                              },
              { finding: "Two extreme outliers in GrLivArea",     tag: "Outlier removal",    detail: "Two properties with GrLivArea > 4,000 sqft sold for unusually low prices. Noted explicitly in the original dataset documentation as non-representative.",                                action: "Removed both records from training set."                                                 },
              { finding: "OverallQual is the strongest predictor",tag: "Feature insight",    detail: "Pearson r = 0.79 with SalePrice. Quality rating encodes the combined effect of materials, finish, and condition — a natural price proxy.",                                               action: "Preserved as-is. No binning needed."                                                     },
              { finding: "19 features with >15% missing values",  tag: "Missing data",       detail: "Most missing values were structural — 'NaN' meant 'no garage', not unknown. Imputing with median would have been incorrect.",                                                           action: "Categorical NaN → 'None'. Numerical NaN → median or neighbourhood median."              },
            ].map(({ finding, detail, action, tag }) => (
              <div key={finding} className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-neutral-900">{finding}</p>
                  <span className="flex-shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">{tag}</span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-neutral-500">{detail}</p>
                <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
                  <span className="text-xs font-semibold text-emerald-700">Action: </span>
                  <span className="text-xs text-emerald-800">{action}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={revealStyle(edaR.visible, 280)} className="grid gap-6 md:grid-cols-2">
            <BarChart title="Neighbourhood frequency (top 8)" bars={EDA_BARS} />
            <CorrelationGrid />
          </div>
        </div>
      </SectionWrap>

      {/* ── Feature Engineering ───────────────────────────────────────────── */}
      <SectionWrap id="features" label="Feature Engineering" bg="bg-neutral-50">
        <div ref={featureR.ref as React.RefObject<HTMLDivElement>}>
          <h2 id="features-heading" style={revealStyle(featureR.visible, 0)} className="mb-3 text-3xl font-semibold tracking-tight text-neutral-900">Building better signals</h2>
          <p style={revealStyle(featureR.visible, 80)} className="mb-8 max-w-2xl text-base leading-relaxed text-neutral-600">Feature engineering — not model complexity — drove the performance on this dataset. Six derived features were constructed, each with documented reasoning.</p>
          <div style={revealStyle(featureR.visible, 160)} className="mb-10 flex flex-col gap-3">
            {FEATURES_ENGINEERED.map(({ name, formula, reason }) => (
              <div key={name} className="grid gap-3 rounded-xl border border-neutral-200 bg-white p-5 sm:grid-cols-[140px_1fr_1fr]">
                <div className="flex items-start">
                  <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-sm font-semibold text-emerald-700">{name}</span>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Formula</p>
                  <p className="font-mono text-xs leading-relaxed text-neutral-600">{formula}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Why</p>
                  <p className="text-xs leading-relaxed text-neutral-600">{reason}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={revealStyle(featureR.visible, 280)}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Complete pipeline — 8 stages</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PIPELINE_STEPS.map(({ title, desc }, i) => (
                <div key={title} className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-4">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 font-mono text-[11px] font-bold text-emerald-700">{i + 1}</span>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-neutral-800">{title}</p>
                    <p className="text-xs leading-relaxed text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrap>

      {/* ── Model Performance ─────────────────────────────────────────────── */}
      <SectionWrap id="performance" label="Model Performance" bg="bg-white">
        <div ref={modelR.ref as React.RefObject<HTMLDivElement>}>
          <h2 id="performance-heading" style={revealStyle(modelR.visible, 0)} className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900">Results</h2>
          <div style={revealStyle(modelR.visible, 80)} className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[{ value: "0.99", label: "R² (test set)", accent: true }, { value: "~$12K", label: "RMSE", accent: false }, { value: "0.98", label: "R² (cross-val)", accent: false }, { value: "Linear", label: "Algorithm", accent: false }].map(({ value, label, accent }) => <Stat key={label} value={value} label={label} accent={accent} />)}
          </div>
          <div style={revealStyle(modelR.visible, 180)} className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-6">
              <p className="mb-3 text-sm font-semibold text-neutral-800">Why Linear Regression worked at R² = 0.99</p>
              <p className="mb-4 text-sm leading-relaxed text-neutral-600">Linear Regression is not powerful by default. It worked here because the features fed into it were clean and genuinely linear with the target after log transformation. The engineering did the work — the algorithm collected the result.</p>
              <ul className="space-y-2 text-sm text-neutral-600">
                {["Log-transformed target removed skew and stabilised variance", "Composite features (TotalSF, TotalBathrooms) reduced multicollinearity", "Outlier removal eliminated leverage points distorting the fit", "StandardScaler ensured no feature dominated by magnitude"].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0 text-emerald-500" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="mb-2 text-sm font-semibold text-neutral-800">Honest context</p>
                <p className="text-sm leading-relaxed text-neutral-600">R² = 0.99 on in-distribution Ames data is strong, but this dataset is well-behaved compared to real-world housing data. Noise, undisclosed renovations, and macro market conditions are absent here. The model would need retraining on local data before deployment in any real estate product.</p>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="mb-2 text-sm font-semibold text-neutral-800">Improvement paths</p>
                <ul className="space-y-1.5 text-sm text-neutral-600">
                  {["Ridge / Lasso regularisation to test coefficient stability", "Gradient Boosting (XGBoost) as ensemble comparison", "Additional neighbourhood-level features (school ratings, proximity)", "Automated retraining pipeline for distribution shift detection"].map((t) => (
                    <li key={t} className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-neutral-400" />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrap>

      {/* ── Screenshots ───────────────────────────────────────────────────── */}
      <SectionWrap id="screenshots" label="Screenshots" bg="bg-neutral-50">
        <div ref={galleryR.ref as React.RefObject<HTMLDivElement>}>
          <h2 id="screenshots-heading" style={revealStyle(galleryR.visible, 0)} className="mb-3 text-3xl font-semibold tracking-tight text-neutral-900">Visuals</h2>
          <p style={revealStyle(galleryR.visible, 80)} className="mb-8 text-sm text-neutral-500">Click any image to enlarge. All charts are real outputs from the EDA and training notebooks.</p>
          <div style={revealStyle(galleryR.visible, 160)} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_IMAGES.map((img, i) => <GalleryItem key={img.src} src={img.src} alt={img.alt} caption={img.caption} onClick={() => openLightbox(i)} />)}
          </div>
        </div>
      </SectionWrap>

      {/* ── Live Demo ─────────────────────────────────────────────────────── */}
      <SectionWrap id="demo" label="Live Demo" bg="bg-white">
        <div ref={demoR.ref as React.RefObject<HTMLDivElement>}>
          <h2 id="demo-heading" style={revealStyle(demoR.visible, 0)} className="mb-2 text-3xl font-semibold tracking-tight text-neutral-900">Try the predictor</h2>
          <p style={revealStyle(demoR.visible, 80)} className="mb-6 text-base text-neutral-500">Adjust house details — living area, quality rating, year built, garage capacity — and receive a predicted sale price in real time. Powered by HuggingFace Spaces.</p>
          <div style={revealStyle(demoR.visible, 160)} className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
            <iframe src="https://s4tyam2k04-house-price-predictor.hf.space" title="House Price Predictor — live Gradio demo" width="100%" height="600" loading="lazy" className="block w-full border-0 bg-neutral-50" />
          </div>
          <p style={revealStyle(demoR.visible, 240)} className="mt-3 text-center text-sm text-neutral-400">
            Demo not loading?{" "}
            <a href="https://huggingface.co/spaces/s4tyam2k04/house_price_predictor" target="_blank" rel="noopener noreferrer"
              className="font-medium text-emerald-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-emerald-600">
              Open on HuggingFace Spaces ↗
            </a>
          </p>
        </div>
      </SectionWrap>

      {/* ── GitHub ────────────────────────────────────────────────────────── */}
      <SectionWrap id="github" label="Source Code" bg="bg-neutral-50">
        <div ref={githubR.ref as React.RefObject<HTMLDivElement>}>
          <h2 id="github-heading" style={revealStyle(githubR.visible, 0)} className="mb-8 text-3xl font-semibold tracking-tight text-neutral-900">Code &amp; repository</h2>
          <div style={revealStyle(githubR.visible, 80)} className="mb-6 flex flex-col items-start gap-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-700" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">s4tyam2k04 / house_price_predictor</p>
                <p className="text-sm text-neutral-500">Scikit-Learn · Pandas · NumPy · Gradio · HuggingFace</p>
              </div>
            </div>
            <a href="https://github.com/s4tyam2k04/house_price_predictor" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-neutral-700 hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700 focus-visible:ring-offset-2">
              View on GitHub
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div style={revealStyle(githubR.visible, 180)} className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Key files",         items: ["eda.ipynb", "train.py", "app.py", "requirements.txt", "model.pkl"]                              },
              { label: "Notebook outputs",  items: ["saleprice-dist.png", "correlation-heatmap.png", "residuals.png", "outliers.png"]                 },
              { label: "Run locally",       items: ["git clone <repo>", "pip install -r requirements.txt", "python app.py"]                          },
            ].map(({ label, items }) => (
              <div key={label} className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
                <ul className="space-y-1.5">{items.map((item) => <li key={item} className="font-mono text-xs text-neutral-600">{item}</li>)}</ul>
              </div>
            ))}
          </div>
          <div style={revealStyle(githubR.visible, 280)} className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-8">
            <Link href="/projects/marine-trash-detection"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-emerald-600">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Marine Trash Detection
            </Link>
            <Link href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-emerald-600">
              All projects
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </SectionWrap>

      {lightboxIndex !== null && (
        <Lightbox images={GALLERY_IMAGES} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      )}
    </>
  );
}
