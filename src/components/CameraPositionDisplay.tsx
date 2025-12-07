import { useFrame, useThree } from '@react-three/fiber'
import { useState } from 'react'
import { Html } from '@react-three/drei'

export function CameraPositionDisplay() {
  const { camera } = useThree()
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })

  useFrame(() => {
    setPosition({
      x: Math.round(camera.position.x * 100) / 100,
      y: Math.round(camera.position.y * 100) / 100,
      z: Math.round(camera.position.z * 100) / 100,
    })
  })

  return (
    <Html
      position={[0, 0, 0]}
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '14px',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    >
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Camera Position:</div>
        <div>X: {position.x}</div>
        <div>Y: {position.y}</div>
        <div>Z: {position.z}</div>
        <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.7 }}>
          [{position.x}, {position.y}, {position.z}]
        </div>
      </div>
    </Html>
  )
}
