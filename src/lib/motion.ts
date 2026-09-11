import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/*
 * Aurora animation system
 *
 * All motion values are intentionally subtle.
 * Components can use these variants throughout the landing page.
 *
 * Reduced-motion support is handled through CSS as well as
 * Framer Motion's own useReducedMotion hook where needed.
 */

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
};

export const viewportAmount = {
  amount: 0.25,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
};

export const smoothTransition = {
  duration: 0.5,
  ease,
};