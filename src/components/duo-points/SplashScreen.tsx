"use client"

import { useEffect } from "react"
import { Zap } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="text-center animate-in fade-in duration-700">
        <div className="relative inline-block">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 rounded-full scale-150 animate-pulse" />
          
          {/* Logo */}
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-bounce">
              <Zap className="w-16 h-16 text-white stroke-[2px] fill-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-2">
          UPoints
        </h1>
        <p className="text-lg text-purple-300 font-semibold tracking-wide">
          Hábitos • Pontos • Recompensas
        </p>
      </div>
    </div>
  )
}
