/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"],
      },
      keyframes: {
        slideIn: {
          "0%":   { transform: "scaleX(0)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
        /* New: Shifting gradient mask logic */
        textShine: {
          "0%":   { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        slideIn: "slideIn 200ms ease-out",
        /* New: Smooth, premium 6-second infinite blue flow */
        textShine: "textShine 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;