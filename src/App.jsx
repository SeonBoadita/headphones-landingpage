import React from 'react'
import Home from './Components/Home'
import gsap from 'gsap'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import Nav from './Components/Nav'
const App = () => {

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
  return (
    <>
      <Nav />
      <Home />
    </>
  )
}

export default App
