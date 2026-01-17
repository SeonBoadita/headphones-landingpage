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
        <primitive
            object={cloneModel}
            ref={ref}
            position={position}
            scale={[0.55, 0.55, 0.55]}
        />
    )
}
const Model = ({ modelUrl }) => {
    const { index } = useContext(ContextProvider)
    const groupRef = useRef(null)

    useGSAP(() => {
        if (groupRef.current) {
            gsap.to(groupRef.current.rotation, {
                z: (index / 6) * Math.PI * 2,
                duration: 0.8,
                ease: "power2.out"
            })
        }
    }, [index])

    return (
        <>
            <group
                ref={groupRef}
                position={[0, -6.4, 0]}
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
                                url={modelUrl}
                                color={val.backgroundColor}
                            />
                        )
                    })
                }
            </group>
        </>
    )
}

export default Model
