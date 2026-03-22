import type { Transition, Variants } from "framer-motion";

export const easing = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
} as const;

export const duration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

export const transition: Record<string, Transition> = {
  fast: { duration: duration.fast, ease: easing.easeOut },
  normal: { duration: duration.normal, ease: easing.easeOut },
  slow: { duration: duration.slow, ease: easing.easeOut },
  spring: { type: "spring", stiffness: 300, damping: 30 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.normal },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.normal },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: transition.normal },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: transition.normal },
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const motionPresets = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  scaleIn,
  stagger,
  easing,
  duration,
  transition,
} as const;
