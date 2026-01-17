import ThreeScene from './ThreeScene'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import { ContextProvider } from '../Context/ContextProvider'
import gsap from 'gsap'
import { useRef, useState, useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const Home = ({ val, index, intensity, left, right, heroRef }) => {

    const { modelUrl, name, description, textColor, backgroundColor, buttonColor, buttonTextColor } = val || {}
    const heading1 = useRef(null);
    const heading2 = useRef(null);
    const heading3 = useRef(null);
    const threeScene = useRef(null)
    const modelRef = useRef(null)
    const [value, setValue] = useState(false);
    const [modelReady, setModelReady] = useState(false);

    useGSAP(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1,
            effects: true,
            smoothTouch: 0.1,
        })
    }, [])
    useGSAP(() => {
        if (heading1.current && heading2.current && heading3.current) {
            const tl = gsap.timeline()
            tl.from(heading1.current, { x: 100, opacity: 0, duration: 0.1 })
            tl.from(heading2.current, { x: 100, opacity: 0, duration: 0.1 })
            tl.from(heading3.current, { x: 100, opacity: 0, duration: 0.1 })
            setValue(true);
        }
    }, [])
    useGSAP(() => {
        if (value) {
            const tl = gsap.timeline()
            tl.from(heading1.current, { x: 100, opacity: 0, duration: 0.1 })
            tl.from(heading2.current, { x: 100, opacity: 0, duration: 0.1 })
            tl.from(heading3.current, { x: 100, opacity: 0, duration: 0.1 })
        }
    }, [right])

    useGSAP(() => {
        if (value) {
            const tl = gsap.timeline()
            tl.from(heading1.current, { x: -100, opacity: 0, duration: 0.1 })
            tl.from(heading2.current, { x: -100, opacity: 0, duration: 0.1 })
            tl.from(heading3.current, { x: -100, opacity: 0, duration: 0.1 })
        }
    }, [left])

    // Check when model is ready
    useEffect(() => {
        const checkModel = setInterval(() => {
            if (modelRef.current) {
                console.log("Model is ready!")
                setModelReady(true)
                clearInterval(checkModel)
            }
        }, 100)

        return () => clearInterval(checkModel)
    }, [])

    useGSAP(() => {
        if (!modelReady) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "+=700%",
                // markers: true,
                scrub: true,
                pin: true,
                pinSpacing: true
            }
        })

        tl.to(modelRef.current.rotation, {
            y: Math.PI / 4,
        })
        tl.to(modelRef.current.position, {
            y: -7.4,
        }, "<")
        tl.to(modelRef.current.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
        }, "<")
        tl.to(".hero-text", {
            opacity: 0,
            y: -400,
            display: "none",
            duration: 0.5
        }, "<")
        tl.to(".button", {
            opacity: 0,
            x: -200,
            display: "none",
            duration: 0.5
        }, "<")
        tl.to(".description", {
            opacity: 0,
            x: 200,
            display: "none",
            duration: 0.5
        }, "<")
    }, { dependencies: [modelReady] })

    return (
        <>
            <ContextProvider.Provider value={{ index, intensity }}>
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <div className="hero w-full h-screen font-[Poppins]" style={{ color: textColor, backgroundColor: backgroundColor }}>
                            <div ref={heroRef} className="hero-container relative w-full h-screen">
                                <div className="hero-text flex items-center justify-center flex-col whitespace-nowrap z-10 absolute w-fit h-fit top-[52vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">


                                    <div style={{ color: textColor }} ref={heading1} className="heading1 text-[15vw] leading-none font-bold">Pure</div>
                                    <div style={{ color: textColor }} ref={heading2} className="heading2 uppercase text-[1.5vw] tracking-[1.5vw] leading-none">Superior sound</div>
                                    <div style={{ WebkitTextStrokeColor: textColor }} ref={heading3} className="heading3 text-transparent leading-none text-[10vw] [-webkit-text-stroke:1.4px]">expression</div>


                                </div>

                                <div ref={threeScene} className="three w-full h-screen">
                                    <ThreeScene modelUrl={modelUrl} modelRef={modelRef} />
                                </div>

                                <div className="description absolute bottom-[5vh] right-[3vw] w-[25vw]">
                                    <h1 className="title font-semibold text-[1.4vw]">{name}</h1>
                                    <p className="text font-thin text-[0.8vw]">{description}</p>
                                </div>

                                <div style={{ padding: "12px 16px", backgroundColor: buttonColor, color: buttonTextColor }} className="button rounded-lg absolute bottom-[10vh] left-[10vw] bg-black">
                                    <button className="shop-now flex items-center justify-center gap-2">
                                        Shop now
                                        <i className="fa-solid fa-right-long font-thin"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="section2 w-full h-screen bg-amber-950"></div>
                    </div>
                </div>
            </ContextProvider.Provider>
        </>
    )
}

export default Home
