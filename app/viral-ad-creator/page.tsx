"use client"

import { useState } from "react"
import { Zap, Sparkles, Loader2, Download, Target, ArrowLeft, Wand2, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import VideoPlayerPro from "@/components/ui/video-player-pro"

interface AdCreative {
  id: string
  url: string
  thumbnail: string
  platform: string
  adType: string
  productName: string
  targetAudience: string
  callToAction: string
  duration: number
}

export default function ViralAdCreatorPage() {
  const [generating, setGenerating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [selectedAdType, setSelectedAdType] = useState("product-showcase")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["LinkedIn"])
  const [callToAction, setCallToAction] = useState("Learn More")
  const [ads, setAds] = useState<AdCreative[]>([])
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const adTypes = [
    { id: "product-showcase", name: "Product Showcase" },
    { id: "testimonial", name: "Customer Testimonial" },
    { id: "explainer", name: "Explainer Video" },
    { id: "comparison", name: "Before/After" },
    { id: "tutorial", name: "Tutorial/Demo" },
    { id: "announcement", name: "Launch Announcement" }
  ]

  const platforms = [
    { id: "LinkedIn", name: "LinkedIn", color: "bg-blue-500" },
    { id: "Instagram", name: "Instagram", color: "bg-pink-500" },
    { id: "YouTube", name: "YouTube", color: "bg-red-500" }
  ]

  const ctaOptions = [
    "Learn More",
    "Shop Now",
    "Get Started",
    "Sign Up Free",
    "Download Now",
    "Book a Demo",
    "Try It Free",
    "Join Now"
  ]

  const exampleInputs = {
    productName: "CloudSync Pro",
    description: "AI-powered cloud storage solution with automatic file organization and team collaboration features",
    audience: "Small business owners and tech startups aged 25-45"
  }

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    )
  }

  const handleGenerate = async () => {
    if (!productName.trim()) {
      setError("Please enter product name")
      return
    }

    if (!productDescription.trim()) {
      setError("Please enter product description")
      return
    }

    if (selectedPlatforms.length === 0) {
      setError("Please select at least one platform")
      return
    }

    try {
      setGenerating(true)
      setError(null)
      setProgress(0)

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev
          return prev + 5
        })
      }, 400)

      console.log("Creating viral ads...")
      console.log("Product:", productName)
      console.log("Description:", productDescription)
      console.log("Ad Type:", selectedAdType)
      console.log("Platforms:", selectedPlatforms)

      const response = await fetch("/api/create-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: productName,
          productDescription: productDescription,
          targetAudience: targetAudience,
          adType: selectedAdType,
          platforms: selectedPlatforms,
          callToAction: callToAction,
          userId: "user_123"
        })
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error("Failed to create ads")
      }

      const result = await response.json()
      console.log("Ads created:", result)

      setGenerating(false)
      setUploading(true)

      await new Promise(resolve => setTimeout(resolve, 2000))

      setAds(result.ads)
      setUploading(false)
      setProductName("")
      setProductDescription("")
      setTargetAudience("")
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "Failed to create ads")
      setGenerating(false)
      setUploading(false)
    }
  }

  const resetCreation = () => {
    setAds([])
    setProductName("")
    setProductDescription("")
    setTargetAudience("")
    setError(null)
    setProgress(0)
  }

  const fillExample = () => {
    setProductName(exampleInputs.productName)
    setProductDescription(exampleInputs.description)
    setTargetAudience(exampleInputs.audience)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/#features" 
          className="inline-flex items-center gap-2 mb-8 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Features
        </Link>

        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 p-3">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Viral Ad <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">Creator</span>
            </h1>
          </div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Create high-performing AI-powered ads and publish directly to social media platforms
          </p>
        </div>

        {ads.length === 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  Product Information
                </label>
                <button
                  onClick={fillExample}
                  className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                  disabled={generating || uploading}
                >
                  Fill Example
                </button>
              </div>

              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product/Service Name"
                className="w-full mb-3 px-4 py-3 rounded-xl bg-[#0f0f0f] border border-gray-700 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                disabled={generating || uploading}
              />

              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe your product/service features and benefits..."
                className="w-full h-24 px-4 py-3 rounded-xl bg-[#0f0f0f] border border-gray-700 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                disabled={generating || uploading}
              />
            </div>

            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-cyan-400" />
                Target Audience (Optional)
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Small business owners aged 25-45, Tech enthusiasts..."
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-gray-700 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                disabled={generating || uploading}
              />
            </div>

            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-purple-400" />
                Ad Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {adTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedAdType(type.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedAdType === type.id
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-gray-700 bg-[#0f0f0f] hover:border-gray-600"
                    }`}
                    disabled={generating || uploading}
                  >
                    <div className="text-sm font-medium">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-green-400" />
                Call to Action
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ctaOptions.map((cta) => (
                  <button
                    key={cta}
                    onClick={() => setCallToAction(cta)}
                    className={`px-4 py-3 rounded-xl border transition-all font-medium ${
                      callToAction === cta
                        ? "border-green-500 bg-green-500/10 text-green-400"
                        : "border-gray-700 bg-[#0f0f0f] text-white/60 hover:text-white hover:border-gray-600"
                    }`}
                    disabled={generating || uploading}
                  >
                    {cta}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-cyan-400" />
                Target Platforms
              </label>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`px-6 py-3 rounded-xl border transition-all font-medium ${
                      selectedPlatforms.includes(platform.id)
                        ? `${platform.color} border-transparent text-white`
                        : "border-gray-700 bg-[#0f0f0f] text-white/60 hover:text-white hover:border-gray-600"
                    }`}
                    disabled={generating || uploading}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>

            {(generating || uploading) && (
              <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/60">
                    {generating ? "Creating viral ads with AI..." : "Publishing to platforms..."}
                  </span>
                  <span className="text-sm text-purple-400">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}

            {!generating && !uploading && (
              <button
                onClick={handleGenerate}
                disabled={!productName.trim() || !productDescription.trim() || selectedPlatforms.length === 0}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all font-semibold text-lg shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Zap className="h-5 w-5" />
                Create Viral Ads
              </button>
            )}
          </div>
        )}

        {ads.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Viral Ads are Ready!</h2>
                <p className="text-white/60">{ads.length} ads created and published</p>
              </div>
              <button
                onClick={resetCreation}
                className="px-6 py-3 rounded-xl border border-gray-700 bg-[#1a1a1a]/80 hover:bg-[#2a2a2a] transition-colors"
              >
                Create New Ad
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="relative aspect-video bg-gray-800">
                    <VideoPlayerPro src={ad.url} />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{ad.productName}</h3>
                    <p className="text-sm text-white/60 mb-3 line-clamp-2">{ad.adType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</p>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/10 px-2 py-1 border border-purple-500/20 text-xs text-purple-400">
                        {ad.platform}
                      </span>
                      <span className="text-xs text-white/40">{ad.duration}s</span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-green-500/10 px-2 py-1 border border-green-500/20 text-xs text-green-400">
                        {ad.callToAction}
                      </span>
                    </div>

                    <a
                      href={ad.url}
                      download
                      className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all text-sm font-medium"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
