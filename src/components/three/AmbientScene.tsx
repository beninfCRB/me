import * as React from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import type { MotionValue } from "framer-motion"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"
import * as THREE from "three"
import { CameraRig, ScrollGroup } from "@/components/three/CameraRig"
import { BreathingGem, FloatingShapes } from "@/components/three/FloatingGeometry"
import { ParticleField } from "@/components/three/ParticleField"

export interface AmbientSceneProps {
  progress: MotionValue<number>
  particleCount: number
  shapeCount: number
  dpr: [number, number]
  postProcessing: boolean
  animate: boolean
}

/**
 * Image-based lighting generated in memory, so the metallic surfaces have
 * something to reflect without downloading an HDR file.
 */
function StudioEnvironment() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  React.useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const target = pmrem.fromScene(room, 0.04)
    scene.environment = target.texture

    return () => {
      target.dispose()
      pmrem.dispose()
      room.dispose()
      scene.environment = null
    }
  }, [gl, scene])

  return null
}

export default function AmbientScene({
  progress,
  particleCount,
  shapeCount,
  dpr,
  postProcessing,
  animate,
}: AmbientSceneProps) {
  return (
    <Canvas
      dpr={dpr}
      frameloop={animate ? "always" : "demand"}
      camera={{ position: [0, 0.1, 6.2], fov: 45, near: 0.1, far: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
    >
      <React.Suspense fallback={null}>
        <StudioEnvironment />

        <ambientLight intensity={0.45} />
        <directionalLight
          position={[5, 6, 4]}
          intensity={1.5}
          color="#e0f2fe"
        />
        <pointLight
          position={[-6, -2, 2]}
          intensity={38}
          distance={24}
          decay={2}
          color="#3b82f6"
        />
        <pointLight
          position={[6, 3, -2]}
          intensity={30}
          distance={24}
          decay={2}
          color="#7dd3fc"
        />

        <CameraRig enabled={animate} intensity={1} />

        <ScrollGroup progress={progress} animate={animate}>
          <BreathingGem animate={animate} />
          <FloatingShapes count={shapeCount} animate={animate} />
        </ScrollGroup>

        <ParticleField count={particleCount} animate={animate} />

        {postProcessing ? (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.22}
              luminanceSmoothing={0.5}
              mipmapBlur
              radius={0.72}
            />
          </EffectComposer>
        ) : null}
      </React.Suspense>
    </Canvas>
  )
}
