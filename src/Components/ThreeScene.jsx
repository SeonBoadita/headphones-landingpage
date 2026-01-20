import React, { Suspense, useContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Model from './Model'
import { ContextProvider } from '../Context/ContextProvider'


const DirectionalLight = () => {
    const { intensity } = useContext(ContextProvider)
    return (
        <directionalLight intensity={intensity || 0.8} color="white" position={[0, 2, 1]} />
    )
}
const ThreeScene = ({ modelRef, planeVisibility, planeBound, visibleImage, planeTexture }) => {
    return (
        <div className={`canvas w-full h-screen fixed`}>
            <Canvas camera={{ position: [0, 0, 8], fov: 25 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                {/* <OrbitControls /> */}
                <Suspense fallback={null}>
                    <Environment preset="city" />
                    <Model modelRef={modelRef} planeVisibility={planeVisibility} planeBound={planeBound} visibleImage={visibleImage} planeTexture={planeTexture} />
                </Suspense>
                <DirectionalLight />
            </Canvas>
        </div>
    )
}

export default ThreeScene
