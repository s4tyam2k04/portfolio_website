import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Satyam Kumar — AI Engineer & Builder",
  description:
    "B.Tech AI & ML student building deployed systems with machine learning, computer vision, and creative design. Two live projects on HuggingFace.",
  keywords: [
    "Satyam Kumar",
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "YOLOv8",
    "Portfolio",
    "VIPS-TC",
    "GGSIPU",
  ],
  authors: [{ name: "Satyam Kumar" }],
  openGraph: {
    title: "Satyam Kumar — AI Engineer & Builder",
    description:
      "Deployed AI projects, NCC Cadet, 5 years design practice. Based in Delhi.",
    url: "https://satyamkumar.dev", // ← update with real domain
    siteName: "Satyam Kumar",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyam Kumar — AI Engineer & Builder",
    description:
      "Deployed AI projects, NCC Cadet, 5 years design practice. Based in Delhi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-white text-neutral-900">
        {/* Skip to main content — keyboard / screen reader accessibility */}
        <a
          href="#home"
          className="
            sr-only focus:not-sr-only
            focus:fixed focus:top-4 focus:left-4 focus:z-[200]
            focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2
            focus:text-sm focus:font-semibold focus:text-white
            focus:shadow-lg focus:outline-none
          "
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="home">
          {children}
        </main>
      </body>
    </html>
  );
}
