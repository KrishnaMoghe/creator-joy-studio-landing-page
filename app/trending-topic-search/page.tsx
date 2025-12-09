"use client"

import { useState } from "react"
import { TrendingUp, Search, Sparkles, Loader2, ArrowLeft, Calendar, BarChart3, Eye, MessageCircle, Share2, Hash } from "lucide-react"
import Link from "next/link"

interface TrendingTopic {
  id: string
  topic: string
  platform: string
  engagement: number
  views: number
  posts: number
  growthRate: string
  category: string
  keywords: string[]
  suggestedContent: string
  bestTimeToPost: string
  targetAudience: string
}

export default function TrendingTopicSearchPage() {
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [topics, setTopics] = useState<TrendingTopic[]>([])
  const [error, setError] = useState<string | null>(null)

  const platforms = [
    { id: "all", name: "All Platforms" },
    { id: "LinkedIn", name: "LinkedIn", color: "bg-blue-500" },
    { id: "Instagram", name: "Instagram", color: "bg-pink-500" },
    { id: "YouTube", name: "YouTube", color: "bg-red-500" }
  ]

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "technology", name: "Technology" },
    { id: "business", name: "Business" },
    { id: "marketing", name: "Marketing" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "education", name: "Education" },
    { id: "entertainment", name: "Entertainment" }
  ]

  const exampleQueries = [
    "AI and machine learning trends",
    "Social media marketing strategies",
    "Remote work productivity tips",
    "Sustainable business practices"
  ]

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search query")
      return
    }

    try {
      setSearching(true)
      setError(null)

      console.log("Searching trending topics...")
      console.log("Query:", query)
      console.log("Platform:", selectedPlatform)
      console.log("Category:", selectedCategory)

      const response = await fetch("/api/search-trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query,
          platform: selectedPlatform,
          category: selectedCategory,
          userId: "user_123"
        })
      })

      if (!response.ok) {
        throw new Error("Failed to search trending topics")
      }

      const result = await response.json()
      console.log("Trends found:", result)

      setTopics(result.topics)
      setSearching(false)
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "Failed to search trends")
      setSearching(false)
    }
  }

  const resetSearch = () => {
    setTopics([])
    setQuery("")
    setError(null)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
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
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Trending Topic <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">Search</span>
            </h1>
          </div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discover what's trending across social media platforms with AI-powered insights and content suggestions
          </p>
        </div>

        {topics.length === 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
              <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-purple-400" />
                Search Trending Topics
              </label>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="What topics are you interested in?"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#0f0f0f] border border-gray-700 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  disabled={searching}
                />
                <button
                  onClick={handleSearch}
                  disabled={searching || !query.trim()}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all font-semibold shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {searching ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      Search
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4">
                <p className="text-xs text-white/40 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQueries.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(example)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors"
                      disabled={searching}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
                <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-cyan-400" />
                  Platform
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`px-4 py-3 rounded-xl border transition-all font-medium ${
                        selectedPlatform === platform.id
                          ? "border-purple-500 bg-purple-500/10 text-white"
                          : "border-gray-700 bg-[#0f0f0f] text-white/60 hover:text-white hover:border-gray-600"
                      }`}
                      disabled={searching}
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl p-6">
                <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
                  <Hash className="h-4 w-4 text-green-400" />
                  Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.slice(0, 4).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-3 rounded-xl border transition-all font-medium ${
                        selectedCategory === category.id
                          ? "border-purple-500 bg-purple-500/10 text-white"
                          : "border-gray-700 bg-[#0f0f0f] text-white/60 hover:text-white hover:border-gray-600"
                      }`}
                      disabled={searching}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                {error}
              </div>
            )}
          </div>
        )}

        {topics.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Trending Topics Found</h2>
                <p className="text-white/60">{topics.length} trending topics for "{query}"</p>
              </div>
              <button
                onClick={resetSearch}
                className="px-6 py-3 rounded-xl border border-gray-700 bg-[#1a1a1a]/80 hover:bg-[#2a2a2a] transition-colors"
              >
                New Search
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className="rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{topic.topic}</h3>
                          <span className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 border text-xs font-medium ${
                            topic.platform === "LinkedIn" ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                            topic.platform === "Instagram" ? "bg-pink-500/10 border-pink-500/20 text-pink-400" :
                            "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}>
                            {topic.platform}
                          </span>
                        </div>
                        <p className="text-sm text-white/60 capitalize">{topic.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{topic.growthRate}</div>
                        <div className="text-xs text-white/40">Growth Rate</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 p-4 rounded-xl bg-[#0f0f0f] border border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-purple-500/10 p-2">
                          <Eye className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{formatNumber(topic.views)}</div>
                          <div className="text-xs text-white/40">Views</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-cyan-500/10 p-2">
                          <MessageCircle className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{formatNumber(topic.engagement)}</div>
                          <div className="text-xs text-white/40">Engagement</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-500/10 p-2">
                          <BarChart3 className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{formatNumber(topic.posts)}</div>
                          <div className="text-xs text-white/40">Posts</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Hash className="h-4 w-4 text-purple-400" />
                        Popular Keywords
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {topic.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 rounded-lg bg-purple-500/10 px-3 py-1 border border-purple-500/20 text-xs text-purple-400"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 border border-purple-500/20">
                      <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                        AI Content Suggestion
                      </div>
                      <p className="text-sm text-white/80">{topic.suggestedContent}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl bg-[#0f0f0f] border border-gray-700">
                        <div className="text-xs text-white/40 mb-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Best Time to Post
                        </div>
                        <div className="text-sm font-semibold">{topic.bestTimeToPost}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0f0f0f] border border-gray-700">
                        <div className="text-xs text-white/40 mb-1">Target Audience</div>
                        <div className="text-sm font-semibold">{topic.targetAudience}</div>
                      </div>
                    </div>
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
