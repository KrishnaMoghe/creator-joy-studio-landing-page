"use client"

import { useState } from "react"
import { Clapperboard, Sparkles, Loader2, Download, Video, ArrowLeft, Wand2 } from "lucide-react"
import Link from "next/link"
import VideoPlayerPro from "@/components/ui/video-player-pro"

interface GeneratedVideo {
  id: string
  url: string
  thumbnail: string
  platform: string
  prompt: string
  duration: number
  style: string
}

export default function AIVideoGenerationPage() {
  const [generating, setGenerating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("professional")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["LinkedIn"])
  const [videos, setVideos] = useState<GeneratedVideo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const styles = [
    { id: "professional", name: "Professional" },
    { id: "creative", name: "Creative" },
    { id: "minimal", name: "Minimal" },
    { id: "energetic", name: "Energetic" },
    { id: "corporate", name: "Corporate" },
    { id: "casual", name: "Casual" }
  ]

  const platforms = [
    { id: "LinkedIn", name: "LinkedIn", color: "bg-blue-500" },
    { id: "Instagram", name: "Instagram", color: "bg-pink-500" },
    { id: "YouTube", name: "YouTube", color: "bg-red-500" }
  ]

  const examplePrompts = [
    "Create a 30-second video about AI in healthcare with futuristic visuals",
    "Make an engaging video explaining blockchain technology for beginners",
    "Generate a product launch video for a new SaaS platform",
    "Create a motivational video about entrepreneurship with inspiring quotes"
  ]

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    )
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
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

      console.log("Generating videos...")
      console.log("Prompt:", prompt)
      console.log("Style:", selectedStyle)
      console.log("Platforms:", selectedPlatforms)

      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          style: selectedStyle,
          platforms: selectedPlatforms,
          userId: "user_123"
        })
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error("Failed to generate videos")
      }

      const result = await response.json()
      console.log("Videos generated:", result)

      setGenerating(false)
      setUploading(true)

      await new Promise(resolve => setTimeout(resolve, 2000))

      setVideos(result.videos)
      setUploading(false)
      setPrompt("")
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "Failed to generate videos")
      setGenerating(false)
      setUploading(false)
    }
  }

  const resetGeneration = () => {
    setVideos([])
    setPrompt("")
    setError(null)
    setProgress(0)
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
              <Clapperboard className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              AI Video <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">Generation</span>
            </h1>
          </div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Describe your vision and let AI create viral videos from scratch. Auto-upload to LinkedIn, Instagram, and YouTube
          </p>
        </div>

        {videos.length === 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
                Video Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to create... Be specific about the content, style, and message."
                className="w-full h-32 px-4 py-3 rounded-xl bg-[#0f0f0f] border border-gray-700 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                disabled={generating || uploading}
              />
              
              <div className="mt-4">
                <p className="text-xs text-white/40 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors"
                      disabled={generating || uploading}
                    >
                      {example.substring(0, 50)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-cyan-400" />
                Video Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedStyle === style.id
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-gray-700 bg-[#0f0f0f] hover:border-gray-600"
                    }`}
                    disabled={generating || uploading}
                  >
                    <div className="text-sm font-medium">{style.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <Video className="h-4 w-4 text-green-400" />
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
                    {generating ? "Generating videos with AI..." : "Uploading to platforms..."}
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
                disabled={!prompt.trim() || selectedPlatforms.length === 0}
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all font-semibold text-lg shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Generate Videos with AI
              </button>
            )}
          </div>
        )}

        {videos.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your AI-Generated Videos are Ready!</h2>
                <p className="text-white/60">{videos.length} videos created and uploaded</p>
              </div>
              <button
                onClick={resetGeneration}
                className="px-6 py-3 rounded-xl border border-gray-700 bg-[#1a1a1a]/80 hover:bg-[#2a2a2a] transition-colors"
              >
                Create New Video
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="relative aspect-video bg-gray-800">
                    <VideoPlayerPro src={video.url} />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.prompt}</h3>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/10 px-2 py-1 border border-purple-500/20 text-xs text-purple-400">
                        {video.platform}
                      </span>
                      <span className="text-xs text-white/40">{video.duration}s</span>
                      <span className="text-xs text-white/40 capitalize">{video.style}</span>
                    </div>

                    <a
                      href={video.url}
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
