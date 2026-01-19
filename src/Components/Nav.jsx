import React from 'react'
import Logo from './Logo'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Nav = ({ val }) => {
    const { textColor } = val || {}
    useGSAP(() => {
            const tl = gsap.timeline()
            tl.from(".navContent", { y: -100, opacity: 0, duration: 0.5 })
    }, [])
    return (
        <>
            <nav style={{ padding: "0 20px 0 5px", color: textColor }} className={`fixed top-0 left-0 z-100 w-full h-[12vh] flex items-center bg-${textColor}/10 backdrop-blur-[0.2vh]`}>
                <div className="navContent flex items-center justify-between w-full h-full px-8">
                    <div className="leftSide flex items-end justify-start ">
                        <div className="quote uppercase text-[10px]" >Your Sound, Your Style</div>
                        <Logo textColor={textColor} />
                    </div>
                    <div className="rightSide">
                        <ul className="sections flex items-center justify-center gap-10 uppercase text-[14px]">
                            <li className="headphones">Headphones</li>
                            <li className="services">Services</li>
                            <li className="contactus">Contact Us</li>
                            <li className="about">About</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav
