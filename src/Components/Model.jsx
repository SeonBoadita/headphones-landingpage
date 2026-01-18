import React, { useContext, useMemo, useRef } from 'react'
import modelData from '../json/headphone.json'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { ContextProvider } from '../Context/ContextProvider'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


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
const Model = ({ modelRef }) => {
    const { index } = useContext(ContextProvider)

    useGSAP(() => {
        if (modelRef.current) {
            gsap.to(modelRef.current.rotation, {
                z: (index / 6) * Math.PI * 2,
                duration: 0.8,
                ease: "power2.out"
            })
        }
    }, [index])

    return (
        <>

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
