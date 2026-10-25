/**
 * Aurelia Estates — Unified Motion Design System
 * Creative Direction: QUIET CINEMATIC PRECISION
 */

import { Variants } from "framer-motion";

export const MOTION_DURATIONS = {
  instant: 0.1,
  micro: 0.18, // 120-220ms: hover, buttons, micro-interactions
  ui: 0.3, // 220-380ms: menus, tabs, active indicators
  editorial: 0.65, // 450-750ms: content, quotes, principles reveals
  hero: 0.95, // 700-1200ms: hero visual vessel, headline
  architectural: 1.2, // 800-1400ms: deep architectural transitions
} as const;

export const MOTION_EASINGS = {
  // Architectural settle — decelerating luxury curve
  architectural: [0.16, 1, 0.3, 1] as const,
  // Cinematic transition — smooth S-curve
  cinematic: [0.21, 0.47, 0.32, 0.98] as const,
  // Precise interface feedback
  precise: [0.25, 0.1, 0.25, 1] as const,
  // Gentle ease out
  easeOut: [0, 0, 0.2, 1] as const,
} as const;

export const MOTION_SPRINGS = {
  gentle: { stiffness: 180, damping: 28 },
  snappy: { stiffness: 280, damping: 32 },
  tight: { stiffness: 380, damping: 26 },
} as const;

/**
 * Reusable Framer Motion Variants
 */

// Hero Architectural Image Mask Reveal
export const heroImageVariants: Variants = {
  hidden: {
    clipPath: "inset(8% 4% 8% 4%)",
    opacity: 0,
    scale: 1.04,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATIONS.architectural,
      ease: MOTION_EASINGS.architectural,
    },
  },
};

// Subtle Editorial Fade and Rise
export const editorialRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: MOTION_DURATIONS.editorial,
      ease: MOTION_EASINGS.cinematic,
    },
  },
};

// Staggered Container
export const staggerContainer = (staggerMs = 0.08, delayMs = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerMs,
      delayChildren: delayMs,
    },
  },
});

// Modal / Lightbox Specimen Reveal
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.ui,
      ease: MOTION_EASINGS.architectural,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 4,
    transition: {
      duration: MOTION_DURATIONS.micro,
      ease: MOTION_EASINGS.precise,
    },
  },
};
