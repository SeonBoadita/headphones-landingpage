import React, { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'

const Loader = () => {
    const { active, progress } = useProgress()
    const [minTimeElapsed, setMinTimeElapsed] = useState(false)
    const [smoothProgress, setSmoothProgress] = useState(0)

    // Smooth progress animation
    useEffect(() => {
        const timer = setInterval(() => {
            setSmoothProgress(prev => {
                const diff = progress - prev
                if (Math.abs(diff) < 0.5) return progress
                return prev + diff * 0.1
            })
        }, 16)
        return () => clearInterval(timer)
    }, [progress])

    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setMinTimeElapsed(true)
            }, 800)
            return () => clearTimeout(timeout)
        }
    }, [progress])

    const showLoader = !minTimeElapsed || active || progress < 100

    return (
        <div
            style={{ zIndex: 999999 }}
            className={`fixed inset-0 w-full h-screen flex flex-col items-center justify-center bg-[#1a1a1a] transition-all duration-100 ease-out ${showLoader ? 'opacity-200' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Brand text */}
            <div style={{ marginBottom: '48px' }} className="text-center">
                <h1 className="text-white text-[3vw] font-[Poppins] font-bold tracking-wider">Pure</h1>
                <p className="text-white/50 text-[0.8vw] font-[Poppins] uppercase tracking-[0.5em]">Loading experience</p>
            </div>

            {/* Minimal progress bar */}
            <div className="w-[30vw] relative">
                {/* Track */}
                <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                    {/* Progress fill */}
                    <div
                        className="h-full bg-white rounded-full"
                        style={{
                            width: `${smoothProgress}%`,
                            transition: 'width 0.05s linear'
                        }}
                    />
                </div>

                {/* Progress text */}
                <div style={{ marginTop: '24px' }} className="flex items-center justify-center">
                    <span className="text-white/80 text-[1.2vw] font-[Poppins] font-light tabular-nums">
                        {Math.round(smoothProgress)}%
                    </span>
                </div>
            </div>

            {/* Subtle animated dots */}
            <div style={{ marginTop: '32px', gap: '8px' }} className="flex">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                    />
                ))}
            </div>
        </div>
    )
}

export default Loader