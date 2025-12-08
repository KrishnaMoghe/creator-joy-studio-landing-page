import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Artist & NFT Creator",
    quote:
      "CreatorJoy helped me scale my digital art business from 0 to 6-figures in just 8 months. The community features are unmatched.",
    metric: "$850K earned",
    image: "/digital-artist-avatar.jpg",
  },
  {
    name: "Marcus Johnson",
    role: "Fitness Coach & Online Trainer",
    quote:
      "The monetization suite made it incredibly easy to launch my subscription service. I went from side hustle to full-time business.",
    metric: "15K+ subscribers",
    image: "/fitness-coach-avatar.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Music Producer & Educator",
    quote:
      "CreatorJoy's analytics helped me understand my audience better. Now I can create content that truly resonates with them.",
    metric: "2.5M monthly listeners",
    image: "/music-producer-avatar.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full flex items-center justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 py-20"
    >
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

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-border/50 bg-gradient-to-b from-card/80 to-card/40 p-8 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />

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
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary"
                />
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
    </section>
  )
}
