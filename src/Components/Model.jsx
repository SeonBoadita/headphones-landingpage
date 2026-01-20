import React, { useContext, useMemo, useRef, useState } from 'react'
import modelData from '../json/headphone.json'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { ContextProvider } from '../Context/ContextProvider'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import vertexShaderCode from '../shaders/vertexShader.glsl?raw'
import fragmentShaderCode from '../shaders/fragmentShader.glsl?raw'

import imageVertexShaderCode from '../shaders/imageVertex.glsl?raw'
import imageFragmentShaderCode from '../shaders/imageFragment.glsl?raw'

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
const Model = ({ modelRef, planeVisibility, planeBound, visibleImage, planeTexture }) => {
    const { index } = useContext(ContextProvider)
    const planeRef = useRef()
    const [opacity, setOpacity] = useState(0)
    const texture = useTexture('/textures/texture.png')
    const imageTexture = useTexture(planeTexture)
    // const { viewport } = useThree()

    console.log("planeBound", planeBound)
    console.log("imageTexture", imageTexture)
    console.log("planeTexture path", planeTexture)
    const shaderUniforms = useMemo(() => ({
        uMouse: { value: new THREE.Vector2(-1, -1) },
        uTime: { value: 0 },
        uTexture: { value: texture }
    }), [texture])

    const shaderImageUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uImgMouse: { value: new THREE.Vector2(-1, -1) },
        uTexture: { value: imageTexture },
        uProgress: { value: 0 }
    }), [imageTexture])


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
            ease: "power2.out",
            onUpdate: function () {
                setOpacity(this.targets()[0].value)
            }
        })
    }, [planeVisibility])

    // Smooth fade-in for image plane
    useGSAP(() => {
        gsap.to(shaderImageUniforms.uProgress, {
            value: visibleImage ? 1 : 0,
            duration: 1.5,
            ease: "power2.out"
        })
    }, [visibleImage])

    useFrame((state) => {
        shaderUniforms.uTime.value = state.clock.getElapsedTime()
        shaderImageUniforms.uTime.value = state.clock.getElapsedTime()
    })

    return (
        <>
            <group
                visible={!visibleImage}
                rotation={[0, Math.PI / 2.7, 0]}
                position={[2.5, -0.25, -5]}
                scale={[1.5, 1, 1]}
            >
                <mesh
                    onPointerMove={(e) => {
                        if (e.uv) {
                            shaderUniforms.uMouse.value.copy(e.uv)
                        }
                    }}
                    onPointerLeave={() => {
                        shaderUniforms.uMouse.value.set(-1, -1)
                    }}
                    ref={planeRef}
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 4.5, 0, 0]}
                    visible={opacity > 0}
                >
                    <planeGeometry args={[20.5, 1, 128, 128]} />
                    <shaderMaterial
                        vertexShader={vertexShaderCode}
                        fragmentShader={fragmentShaderCode}
                        uniforms={shaderUniforms}
                        transparent={true}
                    />
                </mesh>
            </group>

            <group
                visible={!visibleImage}
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

            <group
                position={[0, 0, 1]}
                visible={visibleImage}
            >
                <mesh
                    onPointerMove={(e) => {
                        if (e.uv) {
                            shaderImageUniforms.uImgMouse.value.copy(e.uv)
                        }
                    }}
                    onPointerLeave={() => {
                        shaderImageUniforms.uImgMouse.value.set(-1, -1)
                    }}
                >
                    <planeGeometry args={[8, 4.5, 100, 100]} />
                    <shaderMaterial
                        vertexShader={imageVertexShaderCode}
                        fragmentShader={imageFragmentShaderCode}
                        uniforms={shaderImageUniforms}
                        side={THREE.DoubleSide}
                        transparent={true}
                    />
                </mesh>
            </group>
        </>
    )
}

export default Model
