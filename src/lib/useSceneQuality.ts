import * as React from "react"

export type SceneTier = "low" | "high"

export interface SceneQuality {
  /** Coarse capability bucket used to scale particles / effects. */
  tier: SceneTier
  /** WebGL is available and we should mount the canvas at all. */
  supported: boolean
  /** User asked for reduced motion — render a single static frame. */
  animate: boolean
  particleCount: number
  shapeCount: number
  dpr: [number, number]
  postProcessing: boolean
}

const FULL: SceneQuality = {
  tier: "high",
  supported: true,
  animate: true,
  particleCount: 1400,
  shapeCount: 9,
  dpr: [1, 1.8],
  postProcessing: true,
}

const OFF: SceneQuality = {
  ...FULL,
  supported: false,
  animate: false,
  postProcessing: false,
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"))
  } catch {
    return false
  }
}

/**
 * Reads device capability once. This is a client-rendered SPA, so the
 * initializer can touch `window` directly — no effect round-trip needed.
 */
function detectQuality(): SceneQuality {
  if (typeof window === "undefined") return OFF
  if (!supportsWebGL()) return OFF

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  const nav = navigator as NavigatorWithMemory
  const lowPower =
    window.matchMedia("(max-width: 820px)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4

  return {
    tier: lowPower ? "low" : "high",
    supported: true,
    animate: !reducedMotion,
    particleCount: lowPower ? 420 : FULL.particleCount,
    shapeCount: lowPower ? 5 : FULL.shapeCount,
    dpr: lowPower ? [1, 1.3] : FULL.dpr,
    postProcessing: !lowPower && !reducedMotion,
  }
}

/**
 * How much of the WebGL layer this device can afford. Small screens, few
 * cores or little RAM get a lighter scene, and `prefers-reduced-motion`
 * collapses the whole thing to one static frame.
 */
export function useSceneQuality(): SceneQuality {
  return React.useState(detectQuality)[0]
}
