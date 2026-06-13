import type { CSSProperties } from "react";

/**
 * Returns inline style for a scroll-reveal fade-up animation.
 * Used identically across all section components.
 * Named `revealStyle` everywhere — replaces the local `rs()` and `revealStyle()` variants.
 */
export function revealStyle(visible: boolean, delay = 0): CSSProperties {
  return {
    opacity:         visible ? 1 : 0,
    transform:       visible ? "translateY(0)" : "translateY(20px)",
    transition:      "opacity 0.55s ease, transform 0.55s ease",
    transitionDelay: `${delay}ms`,
  };
}
