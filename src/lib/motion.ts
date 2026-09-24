import type { Transition } from "framer-motion"

/** Signature easing for the whole site — fast out, very soft settle. */
export const SILK: [number, number, number, number] = [0.22, 1, 0.36, 1]
/** Sharper overshoot-free curve, good for large travel. */
export const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 20,
  mass: 0.6,
}

export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.5,
}

export const VIEWPORT = { once: true, amount: 0.25 } as const
