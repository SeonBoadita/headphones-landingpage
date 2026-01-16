import ThreeScene from './ThreeScene'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/all'
import { ContextProvider } from '../Context/ContextProvider'
import { useState } from 'react'

const Home = () => {

    const [index, setIndex] = useState(0)
    useGSAP(() => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1,
            effects: true,
            smoothTouch: 0.1,
        })
    }, [])
    return (
        <>
            <ContextProvider.Provider value={{ index, setIndex }}>
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <div className="hero w-full max-h-screen bg-[#ffdab3]">
                            <div className="hero-container w-full h-screen">
                                <div className="hero-text flex items-center justify-center flex-col whitespace-nowrap z-10 absolute w-fit h-fit top-[52vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                    <div className="heading1 text-[15vw] leading-none">Pure</div>
                                    <div className="heading2 uppercase text-[2vw] leading-none">Supiror sound</div>
                                    <div className="heading3 text-transparent leading-none text-[10vw] [-webkit-text-stroke:2px_white]">expression</div>
                                </div>
                                <ThreeScene />


                                <div style={{ padding: "0 5px" }} className="slider relative top-1/2 transform -translate-y-1/2 flex items-center justify-between">
                                    <div onClick={() => setIndex(index - 1)} className="left bg-[#57595B] w-[5vw] h-[5vw] rounded-full">Left</div>
                                    <div onClick={() => setIndex(index + 1)} className="right bg-[#57595B] w-[5vw] h-[5vw] rounded-full">Right</div>
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
