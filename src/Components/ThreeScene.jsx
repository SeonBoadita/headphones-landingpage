import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Model from './Model'

const ThreeScene = () => {
    return (
        <div className="canvas w-full h-screen fixed">
            <Canvas camera={{ position: [0, 0, 8], fov: 25 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
                <Environment preset="city" />
                <Model modelUrl={"/Models/jv_headphone.glb"} />
            </Canvas>
        </div>
    )
}

export default ThreeScene
