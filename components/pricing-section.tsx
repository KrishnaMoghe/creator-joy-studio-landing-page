import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for new creators just starting out",
    features: [
      "Up to 1,000 followers tracking",
      "Basic analytics dashboard",
      "Email support",
      "5 digital products",
      "Community forums",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$99",
    description: "For growing creators scaling their business",
    features: [
      "Unlimited followers tracking",
      "Advanced analytics & insights",
      "Priority email & chat support",
      "Unlimited digital products",
      "Private community management",
      "Monetization suite",
      "Collaboration tools",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For established creators & studios",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "Team management & roles",
      "White-label options",
      "API access",
      "24/7 phone support",
    ],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the perfect plan for your creative journey. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.highlighted
                  ? "border-2 border-primary bg-gradient-to-b from-primary/10 to-card/40 scale-105 md:scale-100 shadow-2xl shadow-primary/20"
                  : "border border-border/50 bg-card/50 hover:border-border hover:shadow-lg hover:shadow-primary/5"
              } backdrop-blur-xl p-8`}
            >
              {/* Highlighted Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-block rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-bold text-white">
                  Most Popular
                </div>
              )}

              {/* Plan Name & Description */}
              <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

              {/* Price */}
              <div className="mt-6 mb-8">
                <span className="text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/50 active:scale-95"
                    : "border border-primary/50 text-primary hover:border-primary hover:bg-primary/10"
                }`}
              >
                {plan.highlighted ? "Start Free Trial" : "Get Started"}
              </button>

              {/* Divider */}
              <div className="mb-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ or Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All plans come with a 14-day free trial. No credit card required. Cancel anytime.
          </p>
          <a href="#features" className="text-primary font-semibold hover:text-secondary transition-colors">
            See all features →
          </a>
        </div>
      </div>
    </section>
  )
}
