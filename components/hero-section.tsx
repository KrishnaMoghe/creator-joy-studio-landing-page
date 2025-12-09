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
          {/* CTA Buttons with Interactive Hover Effect */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            {/* Get Started Button */}
            <button
              onClick={onAuthClick}
              className="group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 min-w-[220px]"
            >
              <span className="relative z-20 inline-flex items-center gap-2 transition-all duration-500 ease-out group-hover:translate-x-[200%] group-hover:opacity-0">
                Get Started Free
              </span>
              <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 transition-all duration-500 ease-out -translate-x-[200%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                <span>Get Started Free</span>
                <ArrowRight size={20} />
              </div>
              <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 h-0 w-0 rounded-full bg-white/20 transition-all duration-500 ease-out group-hover:h-[300%] group-hover:w-[300%]"></div>
            </button>

            {/* Watch Demo Button */}
            <button 
              className="group relative overflow-hidden rounded-full border-2 border-purple-500/50 bg-transparent px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 min-w-[200px]"
            >
              <span className="relative z-20 inline-flex items-center gap-2 transition-all duration-500 ease-out group-hover:translate-x-[200%] group-hover:opacity-0">
                Watch Demo
              </span>
              <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 transition-all duration-500 ease-out -translate-x-[200%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                <span>Watch Demo</span>
                <ArrowRight size={20} />
              </div>
              <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 h-0 w-0 rounded-full bg-purple-500/20 transition-all duration-500 ease-out group-hover:h-[300%] group-hover:w-[300%]"></div>
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
            
            <div className="hidden sm:block h-16 w-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
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
