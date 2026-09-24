import * as React from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

/** Small deterministic PRNG — keeps the nebula identical between renders. */
function mulberry32(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const PALETTE = ["#a855f7", "#ec4899", "#22d3ee", "#c4b5fd", "#f0abfc"]

interface ParticleFieldProps {
  count?: number
  animate?: boolean
  radius?: number
}

/**
 * Additive point cloud distributed in a squashed sphere so it reads as a
 * nebula rather than a flat starfield.
 */
export function ParticleField({
  count = 1200,
  animate = true,
  radius = 12,
}: ParticleFieldProps) {
  const ref = React.useRef<THREE.Points>(null)

  const { positions, colors } = React.useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color()
    const random = mulberry32(count * 7919 + Math.round(radius * 100))

    for (let i = 0; i < count; i += 1) {
      const distance = radius * (0.3 + Math.pow(random(), 0.75) * 0.7)
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)

      positions[i * 3] = distance * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = distance * Math.cos(phi) * 0.5
      positions[i * 3 + 2] = distance * Math.sin(phi) * Math.sin(theta)

      color.set(PALETTE[i % PALETTE.length])
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [count, radius])

  useFrame((state, delta) => {
    const node = ref.current
    if (!node || !animate) return
    const step = Math.min(delta, 0.05)
    node.rotation.y += step * 0.035
    node.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.14
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
