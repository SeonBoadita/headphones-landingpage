import React, { useState } from 'react'
import Home from './Components/Home'
import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import Nav from './Components/Nav'
import headphonesJSONData from './json/headphone.json'

const App = () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  const headphoneData = headphonesJSONData;
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((index + 1) % headphoneData.length)
    console.log(index)
  };
  const prev = () => {
    setIndex((index - 1 + headphoneData.length) % headphoneData.length)
    console.log(index)
  };

  return (
    <>
      <Nav />


      <div className="mainContainer">
        <Home val={headphoneData[index]} index={index} intensity={headphoneData[index].intensity} />

        <div style={{ padding: "0 7px" }} className="slider pointer-events-none z-9999 fixed top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full">

          <div
            onClick={prev}
            className="left bg-[#ffffff]/30 backdrop-blur-md border border-white/30 shadow-lg w-[5vw] h-[5vw] rounded-full flex items-center justify-center text-[2vw] pointer-events-auto cursor-pointer hover:bg-[#ffffff]/50 transition-all"
          >
            <i className="fa-solid fa-chevron-left text-white"></i>
          </div>

          <div
            onClick={next}
            className="right bg-[#ffffff]/30 backdrop-blur-md border border-white/30 shadow-lg w-[5vw] h-[5vw] rounded-full flex items-center justify-center text-[2vw] pointer-events-auto cursor-pointer hover:bg-[#ffffff]/50 transition-all"
          >
            <i className="fa-solid fa-chevron-right text-white"></i>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
