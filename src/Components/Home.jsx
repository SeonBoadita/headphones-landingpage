import ThreeScene from './ThreeScene'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/all'
import { ContextProvider } from '../Context/ContextProvider'
import gsap from 'gsap'
import { useRef, useState } from 'react'

const Home = ({ val, index, intensity, left, right }) => {

    const { modelUrl, name, description, textColor, backgroundColor, buttonColor, buttonTextColor } = val || {}
    const heading1 = useRef(null);
    const heading2 = useRef(null);
    const heading3 = useRef(null);
    const [value, setValue] = useState(false);

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
    return (
        <>
            <ContextProvider.Provider value={{ index, intensity }}>
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <div className="hero w-full max-h-screen font-[Poppins]" style={{ color: textColor, backgroundColor: backgroundColor }}>
                            <div className="hero-container relative w-full h-screen">
                                <div className="hero-text flex items-center justify-center flex-col whitespace-nowrap z-10 absolute w-fit h-fit top-[52vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">


                                    <div style={{ color: textColor }} ref={heading1} className="heading1 text-[15vw] leading-none font-bold">Pure</div>
                                    <div style={{ color: textColor }} ref={heading2} className="heading2 uppercase text-[1.5vw] tracking-[1.5vw] leading-none">Superior sound</div>
                                    <div style={{ WebkitTextStrokeColor: textColor }} ref={heading3} className="heading3 text-transparent leading-none text-[10vw] [-webkit-text-stroke:1.4px]">expression</div>


                                </div>
                                <ThreeScene modelUrl={modelUrl} />

                                <div className="discription absolute bottom-[5vh] right-[3vw] w-[25vw]">
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
                    </div>
                </div>
            </ContextProvider.Provider>
        </>
    )
}

export default Home
