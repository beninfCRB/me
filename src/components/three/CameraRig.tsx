import * as React from "react"
import { useFrame } from "@react-three/fiber"
import { type MotionValue, useMotionValueEvent } from "framer-motion"
import * as THREE from "three"

interface CameraRigProps {
  /** How far the camera travels toward the pointer, in world units. */
  intensity?: number
  enabled?: boolean
}

/**
 * Frame-rate independent spring so the parallax feels silky on any refresh rate.
 */
function smoothing(delta: number, halfLife = 0.28) {
  return 1 - Math.pow(2, -delta / halfLife)
}

/**
 * Moves the camera toward the pointer with a slow spring. The canvas is
 * `pointer-events-none`, so we listen on `window` instead of relying on R3F.
 */
export function CameraRig({ intensity = 1, enabled = true }: CameraRigProps) {
  const target = React.useRef({ x: 0, y: 0 })
  const current = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    if (!enabled) return
    let frame = 0
    let pending = { x: 0, y: 0 }

    const onPointerMove = (event: PointerEvent) => {
      pending = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      }
      if (frame) return
      frame = requestAnimationFrame(() => {
        target.current = pending
        frame = 0
      })
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [enabled])

  useFrame((state, delta) => {
    if (!enabled) return
    const k = smoothing(Math.min(delta, 0.05))
    current.current.x += (target.current.x - current.current.x) * k
    current.current.y += (target.current.y - current.current.y) * k

    state.camera.position.x = current.current.x * 0.95 * intensity
    state.camera.position.y = -current.current.y * 0.6 * intensity + 0.1
    state.camera.position.z = 6.2
    state.camera.lookAt(0, 0, 0)
  })

  return null
}

/**
 * Drifts and rotates its children as the page scrolls, so the 3D layer feels
 * physically connected to the document instead of pinned behind it.
 */
export function ScrollGroup({
  progress,
  children,
  animate = true,
}: {
  progress: MotionValue<number>
  children: React.ReactNode
  animate?: boolean
}) {
  const group = React.useRef<THREE.Group>(null)
  const value = React.useRef(0)

  useMotionValueEvent(progress, "change", (latest) => {
    value.current = latest
  })

  useFrame((state, delta) => {
    const node = group.current
    if (!node) return
    const target = value.current
    const k = smoothing(Math.min(delta, 0.05), 0.45)

    const targetY = target * Math.PI * 1.35
    const targetX = -target * 0.55
    node.rotation.y += (targetY - node.rotation.y) * k
    node.rotation.x += (targetX - node.rotation.x) * k
    node.position.y = THREE.MathUtils.lerp(
      node.position.y,
      target * 2.6,
      k
    )
    if (animate) {
      node.position.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.5
    }
  })

  return <group ref={group}>{children}</group>
}
