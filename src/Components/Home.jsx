import ThreeScene from './ThreeScene'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from 'gsap/all'
import { ContextProvider } from '../Context/ContextProvider'

const Home = ({ val, index, intensity }) => {

    const { modelUrl, name, description, textColor, backgroundColor, buttonColor, buttonTextColor } = val || {}

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
            <ContextProvider.Provider value={{ index, intensity }}>
                <div id="smooth-wrapper">
                    <div id="smooth-content">
                        <div className="hero w-full max-h-screen font-[Poppins]" style={{ color: textColor, backgroundColor: backgroundColor }}>
                            <div className="hero-container relative w-full h-screen">
                                <div className="hero-text flex items-center justify-center flex-col whitespace-nowrap z-10 absolute w-fit h-fit top-[52vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                    <div className="heading1 text-[15vw] leading-none font-bold text-[#000000]">Pure</div>
                                    <div className="heading2 uppercase text-[1.5vw] tracking-[1.5vw] leading-none">Supiror sound</div>
                                    <div className="heading3 text-transparent leading-none text-[10vw] [-webkit-text-stroke:1.4px_white]">expression</div>
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
