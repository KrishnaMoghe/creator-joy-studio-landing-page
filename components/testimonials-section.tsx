"use client"
import { Star } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Artist & NFT Creator",
    quote:
      "CreatorJoy helped me scale my digital art business from 0 to 6-figures in just 8 months. The community features are unmatched.",
    metric: "$850K earned",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Marcus Johnson",
    role: "Fitness Coach & Online Trainer",
    quote:
      "The monetization suite made it incredibly easy to launch my subscription service. I went from side hustle to full-time business.",
    metric: "15K+ subscribers",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Elena Rodriguez",
    role: "Music Producer & Educator",
    quote:
      "CreatorJoy's analytics helped me understand my audience better. Now I can create content that truly resonates with them.",
    metric: "2.5M monthly listeners",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full flex items-center justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 py-20"
    >
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Loved by <span className="gradient-text">Creators Worldwide</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Join thousands of successful creators who have transformed their passion into thriving businesses.
          </p>
        </div>

        {/* Marquee Testimonials */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 flex-row">
            <div className="flex shrink-0 animate-marquee flex-row gap-8">
              {/* First set of testimonials */}
              {testimonials.map((testimonial, index) => (
                <div
                  key={`first-${index}`}
                  className="group/card relative rounded-xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 min-w-[350px] max-w-[350px]"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-t-xl opacity-0 group-hover/card:opacity-100 transition-opacity" />

                  {/* Star Rating */}
                  <div className="mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mb-6 text-base leading-relaxed text-foreground italic">"{testimonial.quote}"</p>

                  {/* Divider */}
                  <div className="mb-6 h-px bg-gradient-to-r from-border to-transparent" />

                  {/* Creator Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Metric Badge */}
                  <div className="mt-4 inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {testimonial.metric}
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for infinite scroll */}
              {testimonials.map((testimonial, index) => (
                <div
                  key={`second-${index}`}
                  className="group/card relative rounded-xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 min-w-[350px] max-w-[350px]"
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-t-xl opacity-0 group-hover/card:opacity-100 transition-opacity" />

                  {/* Star Rating */}
                  <div className="mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mb-6 text-base leading-relaxed text-foreground italic">"{testimonial.quote}"</p>

                  {/* Divider */}
                  <div className="mb-6 h-px bg-gradient-to-r from-border to-transparent" />

                  {/* Creator Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Metric Badge */}
                  <div className="mt-4 inline-block rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {testimonial.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background" />
        </div>
      </div>
    </section>
  )
}
