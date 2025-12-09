"use client"
import { Film, Clapperboard, Zap, Lightbulb } from "lucide-react"
import { Linkedin, Instagram, Youtube } from "lucide-react"
import AnimatedBackground from "@/components/ui/animated-background"
import { useState } from "react"
import { useRouter } from "next/navigation"

const features = [
  {
    icon: Film,
    title: "Smart Video Clips",
    description: "Convert long videos into viral shorts optimized for LinkedIn, Instagram, and YouTube",
    platforms: ["LinkedIn", "Instagram", "YouTube"],
    route: "/smart-video-clips"
  },
  {
    icon: Clapperboard,
    title: "AI Video Generation",
    description: "Generate viral videos from scratch with AI and auto-upload to LinkedIn, Instagram, and YouTube",
    platforms: ["LinkedIn", "Instagram", "YouTube"],
    route: "/ai-video-generation"
  },
  {
    icon: Zap,
    title: "Viral Ad Creator",
    description: "Create high-performing AI-powered ads and publish directly to social media platforms",
    platforms: ["LinkedIn", "Instagram", "YouTube"],
    route: "/viral-ad-creator"
  },
  {
    icon: Lightbulb,
    title: "AI Research Assistant",
    description:
      "Personalized virtual assistant that researches trending topics and suggests content ideas tailored to your niche",
    platforms: [],
    route: "/trending-topic-search"
  },
]

const platformIcons: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  YouTube: Youtube,
}

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const router = useRouter()
  const handleFeatureClick = (index: number) => {
    const feature = features[index]
    console.log(`Feature clicked: ${features[index].title}`)
    // Add your click handler logic here
    if (feature.route) {
      router.push(feature.route)
    } else {
      // Coming soon notification or other logic
      console.log(`${feature.title} - Coming Soon!`)
    }
    // For example: navigate to feature details, open modal, etc.
  }

  return (
    <section id="features" className="relative z-20 w-full py-24 lg:py-32 bg-[#0f0f0f] px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl text-white">
            Everything You Need to{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              Succeed
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/60">
            Powerful features designed specifically for creators to build, grow, and monetize their passion.
          </p>
        </div>

        {/* Animated Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedBackground
            className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.6,
            }}
            enableHover
            onValueChange={(value) => setActiveFeature(value)}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  data-id={`feature-${index}`}
                  onClick={() => handleFeatureClick(index)}
                  className="rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Large gradient icon */}
                    <div className="mb-6 inline-flex rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 p-5 w-fit transition-transform group-hover:scale-110">
                      <Icon className="h-10 w-10 text-white" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-6 flex-grow">
                      {feature.description}
                    </p>

                    {feature.platforms.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {feature.platforms.map((platform) => {
                          const PlatformIcon = platformIcons[platform]
                          return (
                            <div
                              key={platform}
                              className="inline-flex items-center gap-1 rounded-lg bg-purple-500/10 px-3 py-1.5 border border-purple-500/20"
                            >
                              {PlatformIcon && <PlatformIcon className="h-4 w-4 text-purple-400" />}
                              <span className="text-xs font-medium text-purple-400">{platform}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </AnimatedBackground>
        </div>
      </div>
    </section>
  )
}
