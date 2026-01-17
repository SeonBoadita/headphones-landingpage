import React, { useRef, useState } from 'react'
import Home from './Components/Home'
import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import Nav from './Components/Nav'
import headphonesJSONData from './json/headphone.json'
import Loader from './Components/Loader'
import { useGSAP } from '@gsap/react'

const App = () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(true);
  const [headphoneData] = useState(headphonesJSONData);
  const [index, setIndex] = useState(0);
  const { buttonColor, buttonTextColor } = headphoneData[index];
  const heroRef = useRef(null);
  const next = () => {
    setIndex((index + 1) % headphoneData.length)
    setRight(!right);
  };
  const prev = () => {
    setIndex((index - 1 + headphoneData.length) % headphoneData.length)
    setLeft(!left);
  };
  useGSAP(() => {
    gsap.to(".slider", {
      scale: 10,
      display: "none",
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        scrub: true,
        start: "top top",
        end: "100vh top",
        // markers: true
      }
    })
  })
  return (
    <>
      <Loader />
      <Nav val={headphoneData[index]} />


      <div className="mainContainer">
        <Home val={headphoneData[index]} index={index} left={left} right={right} intensity={headphoneData[index].intensity} heroRef={heroRef} />

        <div style={{ padding: "0 7px" }} className="slider pointer-events-none z-9999 fixed top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full">

          <div
            onClick={prev}
            style={{ backgroundColor: buttonColor + '4D', borderColor: buttonColor + '4D' }}
            className="left backdrop-blur-md border shadow-lg w-[5vw] h-[5vw] rounded-full flex items-center justify-center text-[2vw] pointer-events-auto cursor-pointer transition-all"
          >
            <i className="fa-solid fa-chevron-left" style={{ color: buttonTextColor }}></i>
          </div>

          <div
            onClick={next}
            style={{ backgroundColor: buttonColor + '4D', borderColor: buttonColor + '4D' }}
            className="right backdrop-blur-md border shadow-lg w-[5vw] h-[5vw] rounded-full flex items-center justify-center text-[2vw] pointer-events-auto cursor-pointer transition-all"
          >
            <i className="fa-solid fa-chevron-right" style={{ color: buttonTextColor }}></i>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
