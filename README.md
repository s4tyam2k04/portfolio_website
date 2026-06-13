<div align="center">

# Satyam Kumar — Portfolio

**AI Engineer · Builder · Graphic Designer**

[![Live Demo](https://img.shields.io/badge/Live-satyamkumar.dev-blue?style=flat-square&logo=vercel)](https://satyamkumar.dev)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

*Building intelligent systems with machine learning, computer vision, and creative thinking.*

</div>

---

## About

Personal portfolio for Satyam Kumar — a third-year B.Tech AI & ML student at VIPS-TC, GGSIPU. Built from scratch with Next.js 14, TypeScript, and Tailwind CSS. No templates. No UI kits. Every component written and designed by hand.

The site showcases two deployed AI/ML projects, a vertical timeline of experience and education, an interactive skills section, and a certifications block — assembled into a fast, accessible, fully responsive site with scroll-triggered animations throughout.

---

## Featured Projects

### 🌊 Marine Trash Detection System
> Fine-tuned YOLOv8m-seg on 7,212 underwater images to detect and segment 16 classes of marine debris and sea life.

| Detail | Value |
|---|---|
| Model | YOLOv8m-seg (instance segmentation) |
| Dataset | TrashCan 1.0 — 7,212 annotated images |
| Classes | 16 (8 debris + 8 marine life) |
| Result | **65.6% mAP50** |
| Live demo | [HuggingFace Spaces ↗](https://huggingface.co/spaces/s4tyam2k04/marine_trash_detector) |
| Source | [GitHub ↗](https://github.com/s4tyam2k04/marine_trash_detection) |

### 🏠 House Price Prediction System
> End-to-end ML pipeline — EDA, feature engineering, outlier handling, Linear Regression — deployed via Gradio.

| Detail | Value |
|---|---|
| Model | Linear Regression with full preprocessing pipeline |
| Dataset | Ames-style housing dataset |
| Pipeline | EDA → Outlier removal → Feature engineering → Deploy |
| Result | **R² ≈ 0.99** |
| Live demo | [HuggingFace Spaces ↗](https://huggingface.co/spaces/s4tyam2k04/house_price_predictor) |
| Source | [GitHub ↗](https://github.com/s4tyam2k04/house_price_predictor) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Fonts | Inter + JetBrains Mono |
| Animations | CSS transitions + IntersectionObserver (no library) |
| Deployment | Vercel |

---

## Skills

**Technical** — Python · Machine Learning · SQL · HTML · CSS · React · NLP · Flutter

**AI / ML Tools** — Pandas · NumPy · YOLOv8 · Gradio · HuggingFace · Vercel

**Creative** — Photoshop · Premiere Pro · Figma · Canva · Framer

---

## Experience

**Co-Head, Social Media Team** — 1 Delhi Air Squadron NCC · 2024–2027
Led visual communication and content strategy for 1DAS's social media presence. Managed cross-departmental coordination for recruitment drives, events, and institutional milestones.

**Graphic Designer** — 35MM Filmmaking Society · VIPS-TC · 2024–2026
Visual identity, event posters, and digital assets for one of VIPS-TC's most active creative societies.

---

## Project Structure

```
satyam-portfolio/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── page.tsx                    # Homepage — assembles all sections
│   ├── globals.css                 # Tailwind directives
│   └── projects/
│       ├── marine-trash-detection/
│       │   └── page.tsx            # Route wrapper
│       └── house-price-prediction/
│           └── page.tsx            # Route wrapper
├── components/
│   ├── Navbar.tsx                  # Fixed nav, scroll-spy, mobile drawer
│   ├── Hero.tsx                    # Two-column hero, profile image fade
│   ├── FeaturedProjects.tsx        # Project card grid
│   ├── About.tsx                   # Identity pillars, stat count-up
│   ├── Experience.tsx              # Vertical timeline
│   ├── Skills.tsx                  # Three-column skill clusters
│   ├── Certifications.tsx          # Achievement cards
│   ├── ContactAndFooter.tsx        # Contact links + footer
│   ├── marine-trash-page.tsx       # Full project case study
│   └── house-price-page.tsx        # Full project case study
├── hooks/
│   └── useReveal.ts                # Shared IntersectionObserver hook
└── lib/
    └── animation.ts                # Shared revealStyle() utility
```

---

## Running Locally

```bash
# Clone
git clone https://github.com/s4tyam2k04/satyam-portfolio.git
cd satyam-portfolio

# Install dependencies (requires Node.js 18+)
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Design Notes

**Zero animation libraries.** All scroll-reveal animations use a single shared `useReveal` hook backed by `IntersectionObserver`. The `revealStyle()` utility in `lib/animation.ts` returns inline CSS properties — no Framer Motion, no GSAP.

**Profile image fades on scroll.** The hero section tracks `window.scrollY` and fades the profile photo from fully visible to transparent over the first 300px of scroll using a passive scroll listener.

**Project pages are self-contained.** Each project page is a single component file with its own data, gallery images, lightbox, and embedded HuggingFace Space iframe. Adding a future project means one new component file and one new route folder.

**No UI library.** Every component is plain Tailwind utility classes. No shadcn, no Radix, no MUI.

---

## Background

**B.Tech — Artificial Intelligence & Machine Learning**
VIPS-TC, GGSIPU · 2023–2027 · CGPA: 7.58

**NCC Cadet** — 1 Delhi Air Squadron
Co-Head, Social Media Team · 6 years design practice

---

## Contact

- **LinkedIn:** [linkedin.com/in/satyamkr04](https://linkedin.com/in/satyamkr04)
- **HuggingFace:** [huggingface.co/s4tyam2k04](https://huggingface.co/s4tyam2k04)

---

<div align="center">
  <sub>Designed and built by Satyam Kumar · 2026</sub>
</div>
