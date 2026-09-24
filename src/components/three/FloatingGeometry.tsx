import * as React from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const SKY = "#38bdf8"
const BLUE = "#3b82f6"
const LIGHT_SKY = "#7dd3fc"
const INDIGO = "#6366f1"

type ShapeKind = "orb" | "knot" | "ring" | "shard" | "gem" | "wire"

interface ShapeSpec {
  kind: ShapeKind
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  speed: number
  bob: number
  color: string
}

/**
 * Composition balanced toward the page edges so it reads as depth behind the
 * copy instead of competing with it.
 */
const SHAPES: ShapeSpec[] = [
  {
    kind: "knot",
    position: [-3.1, 1.55, -2.6],
    rotation: [0.4, 0.6, 0],
    scale: 0.7,
    speed: 0.16,
    bob: 0.34,
    color: SKY,
  },
  {
    kind: "ring",
    position: [3.75, -1.55, -2.2],
    rotation: [1.15, 0.35, 0.2],
    scale: 0.85,
    speed: -0.12,
    bob: 0.42,
    color: BLUE,
  },
  {
    kind: "shard",
    position: [-3.55, -1.35, -1.1],
    rotation: [0.6, 0.9, 0.3],
    scale: 0.75,
    speed: 0.22,
    bob: 0.5,
    color: SKY,
  },
  {
    kind: "gem",
    position: [0.75, 2.25, -4.2],
    rotation: [0.3, 0.2, 0.1],
    scale: 0.8,
    speed: 0.14,
    bob: 0.36,
    color: INDIGO,
  },
  {
    kind: "wire",
    position: [-1.65, -2.35, -3.2],
    rotation: [0.2, 0.5, 0],
    scale: 0.9,
    speed: -0.18,
    bob: 0.44,
    color: BLUE,
  },
  {
    kind: "orb",
    position: [4.35, 1.75, -4.6],
    rotation: [0, 0, 0],
    scale: 0.9,
    speed: 0.2,
    bob: 0.3,
    color: LIGHT_SKY,
  },
  {
    kind: "shard",
    position: [-4.4, 0.5, -4.8],
    rotation: [0.9, 0.4, 0.6],
    scale: 0.6,
    speed: -0.24,
    bob: 0.52,
    color: INDIGO,
  },
  {
    kind: "ring",
    position: [1.85, -2.6, -5.1],
    rotation: [0.6, 1.1, 0.4],
    scale: 0.62,
    speed: 0.26,
    bob: 0.4,
    color: BLUE,
  },
  {
    kind: "wire",
    position: [4.7, -0.35, -1.8],
    rotation: [0.5, 0.25, 0.4],
    scale: 0.5,
    speed: 0.19,
    bob: 0.46,
    color: INDIGO,
  },
]

function ShapeGeometry({ kind }: { kind: ShapeKind }) {
  switch (kind) {
    case "orb":
      return <sphereGeometry args={[0.4, 32, 32]} />
    case "knot":
      return <torusKnotGeometry args={[0.36, 0.085, 140, 18, 2, 3]} />
    case "ring":
      return <torusGeometry args={[0.88, 0.04, 18, 110]} />
    case "shard":
      return <octahedronGeometry args={[0.46, 0]} />
    case "gem":
      return <dodecahedronGeometry args={[0.44, 0]} />
    case "wire":
      return <icosahedronGeometry args={[0.56, 1]} />
    default:
      return null
  }
}

/**
 * Wireframe pieces read as pure light, solid pieces carry a coloured
 * emissive core that the bloom pass picks up.
 */
function isWire(kind: ShapeKind) {
  return kind === "knot" || kind === "ring" || kind === "wire"
}

function FloatingShape({
  spec,
  animate,
}: {
  spec: ShapeSpec
  animate: boolean
}) {
  const ref = React.useRef<THREE.Group>(null)
  const seed = React.useMemo(
    () => spec.position[0] * 2.1 + spec.position[1] * 1.7,
    [spec.position]
  )

  useFrame((state, delta) => {
    const node = ref.current
    if (!node || !animate) return
    const t = state.clock.elapsedTime
    const step = Math.min(delta, 0.05)
    node.rotation.y += spec.speed * step
    node.rotation.x += spec.speed * 0.45 * step
    node.position.y =
      spec.position[1] + Math.sin(t * spec.speed + seed) * spec.bob
    node.position.x =
      spec.position[0] + Math.cos(t * spec.speed * 0.7 + seed) * 0.16
  })

  return (
    <group
      ref={ref}
      position={spec.position}
      rotation={spec.rotation}
      scale={spec.scale}
    >
      <mesh>
        <ShapeGeometry kind={spec.kind} />
        {isWire(spec.kind) ? (
          <meshBasicMaterial
            color={spec.color}
            wireframe
            transparent
            opacity={0.42}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        ) : (
          <meshStandardMaterial
            color={spec.color}
            emissive={spec.color}
            emissiveIntensity={0.5}
            roughness={0.22}
            metalness={0.55}
            flatShading
          />
        )}
      </mesh>
    </group>
  )
}

export function FloatingShapes({
  count = SHAPES.length,
  animate = true,
}: {
  count?: number
  animate?: boolean
}) {
  return (
    <group>
      {SHAPES.slice(0, count).map((spec) => (
        <FloatingShape key={spec.kind + spec.position.join()} spec={spec} animate={animate} />
      ))}
    </group>
  )
}

/**
 * A faceted crystal that breathes. Displacement is a pure function of the
 * original vertex position, so duplicated vertices in the non-indexed
 * geometry stay welded and the surface never tears.
 */
export function BreathingGem({
  animate = true,
  position = [2.55, 0.15, -0.45] as [number, number, number],
}: {
  animate?: boolean
  position?: [number, number, number]
}) {
  const geometry = React.useMemo(
    () => new THREE.IcosahedronGeometry(1.34, 3),
    []
  )
  const original = React.useMemo(
    () => Float32Array.from(geometry.attributes.position.array as Float32Array),
    [geometry]
  )
  const shell = React.useRef<THREE.Mesh>(null)
  const crystal = React.useRef<THREE.Mesh>(null)

  React.useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state) => {
    const node = crystal.current
    if (!node) return
    const t = state.clock.elapsedTime

    if (animate) {
      const attr = geometry.attributes.position
      const array = attr.array as Float32Array
      for (let i = 0; i < array.length; i += 3) {
        const x = original[i]
        const y = original[i + 1]
        const z = original[i + 2]
        const noise =
          Math.sin(x * 1.7 + t * 0.62) *
          Math.cos(y * 1.45 - t * 0.48) *
          Math.sin(z * 1.9 + t * 0.55)
        const scale = 1 + noise * 0.11
        array[i] = x * scale
        array[i + 1] = y * scale
        array[i + 2] = z * scale
      }
      attr.needsUpdate = true
      node.rotation.y = t * 0.11
      node.rotation.x = Math.sin(t * 0.19) * 0.2
      if (shell.current) {
        shell.current.rotation.y = -t * 0.07
        shell.current.rotation.z = Math.cos(t * 0.13) * 0.22
      }
    } else {
      node.rotation.y = 0.6
      node.rotation.x = 0.25
    }
  })

  return (
    <group position={position}>
      <mesh ref={crystal} geometry={geometry}>
        <meshStandardMaterial
          color="#172554"
          emissive="#38bdf8"
          emissiveIntensity={0.75}
          roughness={0.16}
          metalness={0.72}
          flatShading
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.92, 1]} />
        <meshBasicMaterial
          color={LIGHT_SKY}
          wireframe
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight
        color={SKY}
        intensity={26}
        distance={9}
        decay={2}
      />
    </group>
  )
}
