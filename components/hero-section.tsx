"use client"
import { ArrowRight } from "lucide-react"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"

interface HeroSectionProps {
  onAuthClick: () => void
}

export function HeroSection({ onAuthClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#030303] z-10 pb-32">
      {/* Hero Geometric Component - Takes up most of the space */}
      <div className="w-full flex-shrink-0 mb-16">
        <HeroGeometric 
          badge="Introducing CreatorJoy Studio" 
          title1="Empower Your" 
          title2="Creative Journey" 
        />
      </div>

      {/* Content Below Hero - CTA Buttons and Stats */}
      <div className="relative z-30 flex flex-col items-center justify-center px-4 w-full">
        <div className="flex flex-col items-center text-center space-y-16 w-full max-w-7xl mx-auto">
          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <button
              onClick={onAuthClick}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white transition-all hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
            >
              Get Started Free
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </button>
            <button className="rounded-full border-2 border-purple-500/50 px-8 py-4 text-lg font-bold text-white transition-all hover:border-purple-500 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 active:scale-95">
              Watch Demo
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 w-full pt-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text mb-2">
                10K+
              </div>
              <p className="text-sm sm:text-base text-white/60 font-medium">Active Creators</p>
            </div>
            
            <div className="hidden sm:block h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text mb-2">
                $5M+
              </div>
              <p className="text-sm sm:text-base text-white/60 font-medium">Earned by Creators</p>
            </div>
            
            <div className="hidden sm:block h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text mb-2">
                150+
              </div>
              <p className="text-sm sm:text-base text-white/60 font-medium">Countries Supported</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
