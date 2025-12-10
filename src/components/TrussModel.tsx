import { useEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh, MeshStandardMaterial, Group } from 'three'
import { useFrame } from '@react-three/fiber'
import trussModel from '../assets/truss.glb'

interface TrussModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  color?: string
  visible?: boolean
}

export function TrussModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color, visible = true }: TrussModelProps) {
  const gltf = useGLTF(trussModel)
  const groupRef = useRef<Group>(null)
  const currentOpacityRef = useRef(visible ? 1 : 0)
  const targetOpacity = visible ? 1 : 0
  
  // Clone the scene so we can have multiple instances
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene])
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        if (child.material) {
          const material = child.material as MeshStandardMaterial
          if (color) {
            material.color.set(color)
          }
          material.transparent = true
          material.opacity = currentOpacityRef.current
        }
      }
    })
  }, [color, scene])
  
  // Animate opacity changes
  useFrame(() => {
    const diff = targetOpacity - currentOpacityRef.current
    if (Math.abs(diff) > 0.001) {
      currentOpacityRef.current += diff * 0.1
      
      scene.traverse((child) => {
        if (child instanceof Mesh) {
          if (child.material) {
            const material = child.material as MeshStandardMaterial
            material.opacity = currentOpacityRef.current
          }
        }
      })
      
      // Update group visibility
      if (groupRef.current) {
        groupRef.current.visible = currentOpacityRef.current > 0.01
      }
    }
  })
  
  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale} visible={visible || currentOpacityRef.current > 0.01}>
      <primitive object={scene} />
    </group>
  )
}

// Preload the model
useGLTF.preload(trussModel)
