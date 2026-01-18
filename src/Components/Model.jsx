import React, { useContext, useMemo, useRef, useState } from 'react'
import modelData from '../json/headphone.json'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { ContextProvider } from '../Context/ContextProvider'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import vertexShaderCode from '../shaders/vertexShader.glsl?raw'
import fragmentShaderCode from '../shaders/fragmentShader.glsl?raw'

const Headphone = ({ position, url, color }) => {

    const { scene } = useGLTF(url)
    const cloneModel = useMemo(() => {
        const clone = scene.clone()
        clone.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone()
                child.material.color.set(color)
            }
        })
        return clone
    }, [scene, color])

    const ref = useRef(null)
    useFrame((state) => {
        if (ref.current) {
            ref.current.lookAt(state.mouse.x, state.mouse.y, 10)
        }
    })
    return (
        <group>
            <primitive
                object={cloneModel}
                ref={ref}
                position={position}
                scale={[0.55, 0.55, 0.55]}
            />
        </group>

    )
}
const Model = ({ modelRef, planeVisibility }) => {
    const { index } = useContext(ContextProvider)
    const planeRef = useRef()
    const [opacity, setOpacity] = useState(0)
    const uniformMouse = useRef({
        uMouse: {
            value: new THREE.Vector2(-1, -1)
        }
    })
    useGSAP(() => {
        if (modelRef.current) {
            gsap.to(modelRef.current.rotation, {
                z: (index / 6) * Math.PI * 2,
                duration: 0.8,
                ease: "power2.out"
            })
        }
    }, [index])

    // Smooth transition for plane opacity
    useGSAP(() => {
        gsap.to({ value: opacity }, {
            value: planeVisibility ? 1 : 0,
            duration: 0.2,
            ease: "easeInOut",
            onUpdate: function () {
                setOpacity(this.targets()[0].value)
            }
        })
    }, [planeVisibility])

    return (
        <>
            <group
                rotation={[0, Math.PI / 3, 0]}
                position={[3, 0, -5]}
            >
                <mesh
                    onPointerMove={(e) => {
                        uniformMouse.current.uMouse.value.copy(e.uv)
                    }}
                    onPointerLeave={() => {
                        uniformMouse.current.uMouse.value.copy(new THREE.Vector2(-1, -1))
                    }}
                    ref={planeRef}
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 4, 0, 0]}
                    visible={opacity > 0}
                >
                    <planeGeometry args={[20.5, 1]} />
                    <shaderMaterial
                        vertexShader={vertexShaderCode}
                        fragmentShader={fragmentShaderCode}
                        uniforms={uniformMouse.current}
                        color={'#ffffff'}
                        transparent={true}
                        opacity={opacity}
                    />
                </mesh>
            </group>

            <group
                ref={modelRef}
                position={[-1, -6.4, 0]}
                rotation={[0, 0.7, 0]}
            >
                {
                    modelData.map((val, key) => {
                        const angle = (key / modelData.length) * Math.PI * 2
                        const x = Math.sin(angle) * 5
                        const y = Math.cos(angle) * 5
                        return (
                            <Headphone
                                key={key}
                                position={[x, y, 1.5]}
                                url={val.modelUrl}
                                color={val.backgroundColor}
                                modelRef={modelRef}
                            />
                        )
                    })
                }
            </group>
        </>
    )
}

export default Model
