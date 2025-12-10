"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Clock, TrendingUp, Sparkles, Loader2, ArrowLeft, BarChart3, Target, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ScheduledPost {
  id: string
  content: string
  platform: string
  scheduledDate: string
  scheduledTime: string
  status: "scheduled" | "published" | "draft"
  engagement: {
    predicted: number
    reach: number
  }
  bestTime: boolean
}

interface CalendarDay {
  date: Date
  posts: ScheduledPost[]
  isToday: boolean
  isCurrentMonth: boolean
}

export default function SmartCalendarPage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [posts, setPosts] = useState<ScheduledPost[]>([])
  const [showOptimalTimes, setShowOptimalTimes] = useState(false)

  const platforms = [
    { id: "all", name: "All Platforms", color: "bg-purple-500" },
    { id: "LinkedIn", name: "LinkedIn", color: "bg-blue-500" },
    { id: "Instagram", name: "Instagram", color: "bg-pink-500" },
    { id: "YouTube", name: "YouTube", color: "bg-red-500" }
  ]

  const [selectedPlatform, setSelectedPlatform] = useState("all")

  const daysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days: CalendarDay[] = []

    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i)
      days.push({
        date,
        posts: [],
        isToday: false,
        isCurrentMonth: false
      })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = date.toDateString() === new Date().toDateString()
      const dayPosts = posts.filter(post => {
        const postDate = new Date(post.scheduledDate)
        return postDate.toDateString() === date.toDateString()
      })

      days.push({
        date,
        posts: dayPosts,
        isToday,
        isCurrentMonth: true
      })
    }

    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day)
      days.push({
        date,
        posts: [],
        isToday: false,
        isCurrentMonth: false
      })
    }

    return days
  }

  const handleAnalyzeSchedule = async () => {
    setAnalyzing(true)

    try {
      console.log("🔍 Analyzing optimal posting schedule...")

      const response = await fetch("/api/analyze-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: selectedPlatform,
          userId: "user_123"
        })
      })

      if (!response.ok) {
        throw new Error("Failed to analyze schedule")
      }

      const result = await response.json()
      console.log("✅ Schedule analyzed:", result)

      setPosts(result.scheduledPosts)
      setShowOptimalTimes(true)
      setAnalyzing(false)
    } catch (err) {
      console.error("❌ Error:", err)
      setAnalyzing(false)
    }
  }

  const changeMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const getFilteredPosts = (dayPosts: ScheduledPost[]) => {
    if (selectedPlatform === "all") return dayPosts
    return dayPosts.filter(post => post.platform === selectedPlatform)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] rounded-full bg-pink-500/5 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/#features" 
          className="inline-flex items-center gap-2 mb-8 text-white/60 hover:text-white transition-all duration-300 hover:gap-3"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Features
        </Link>

        {/* Header with Glass Effect */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 p-3 shadow-lg shadow-purple-500/50 backdrop-blur-xl">
              <CalendarIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Smart <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">Calendar</span>
            </h1>
          </div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            AI-powered content scheduling with optimal posting times and engagement predictions
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Glass Controls */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Filter by Platform:
                </label>
                <div className="flex gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-300 text-sm font-medium backdrop-blur-xl ${
                        selectedPlatform === platform.id
                          ? `${platform.color} border-white/20 text-white shadow-lg`
                          : "border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAnalyzeSchedule}
                disabled={analyzing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 font-semibold shadow-xl shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:scale-105 backdrop-blur-xl border border-white/20"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Analyze Best Times
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Glass Calendar */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-6 mb-6 hover:border-white/20 transition-all duration-300">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {formatDate(currentMonth)}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => changeMonth("prev")}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl"
                >
                  Today
                </button>
                <button
                  onClick={() => changeMonth("next")}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Week Days */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-white/60 py-2 bg-white/5 rounded-lg backdrop-blur-xl">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid with Glass Effect */}
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth(currentMonth).map((day, index) => {
                const filteredPosts = getFilteredPosts(day.posts)
                const hasScheduledPosts = filteredPosts.length > 0

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 rounded-lg border transition-all duration-300 cursor-pointer backdrop-blur-xl group ${
                      day.isToday
                        ? "border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
                        : day.isCurrentMonth
                        ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                        : "border-white/5 bg-white/[0.02] opacity-50"
                    }`}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <div className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                      day.isToday 
                        ? "text-purple-400 group-hover:text-purple-300" 
                        : "text-white/80 group-hover:text-white"
                    }`}>
                      {day.date.getDate()}
                    </div>
                    {hasScheduledPosts && (
                      <div className="space-y-1">
                        {filteredPosts.slice(0, 2).map((post) => (
                          <div
                            key={post.id}
                            className={`text-xs px-2 py-1 rounded backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                              post.platform === "LinkedIn" ? "bg-blue-500/30 text-blue-300 border border-blue-400/30 hover:bg-blue-500/40" :
                              post.platform === "Instagram" ? "bg-pink-500/30 text-pink-300 border border-pink-400/30 hover:bg-pink-500/40" :
                              "bg-red-500/30 text-red-300 border border-red-400/30 hover:bg-red-500/40"
                            } ${post.bestTime ? "shadow-lg shadow-green-500/30" : ""}`}
                          >
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.scheduledTime}
                            </div>
                          </div>
                        ))}
                        {filteredPosts.length > 2 && (
                          <div className="text-xs text-white/40 px-2 bg-white/5 rounded backdrop-blur-xl">
                            +{filteredPosts.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Glass Optimal Times Panel */}
          {showOptimalTimes && (
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-6 w-6 text-green-400" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  AI-Recommended Posting Times
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["LinkedIn", "Instagram", "YouTube"].map((platform) => (
                  <div 
                    key={platform} 
                    className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <span className={`inline-block w-3 h-3 rounded-full shadow-lg ${
                        platform === "LinkedIn" ? "bg-blue-500 shadow-blue-500/50" :
                        platform === "Instagram" ? "bg-pink-500 shadow-pink-500/50" :
                        "bg-red-500 shadow-red-500/50"
                      }`}></span>
                      {platform}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm">Tuesday 10:00 AM</span>
                        </div>
                        <span className="text-xs text-green-400 font-semibold px-2 py-1 rounded bg-green-500/20 backdrop-blur-xl">Peak Time</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm">Thursday 2:00 PM</span>
                        </div>
                        <span className="text-xs text-cyan-400 font-semibold px-2 py-1 rounded bg-cyan-500/20 backdrop-blur-xl">High Engagement</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-purple-400" />
                          <span className="text-sm">Friday 6:00 PM</span>
                        </div>
                        <span className="text-xs text-purple-400 font-semibold px-2 py-1 rounded bg-purple-500/20 backdrop-blur-xl">Good Time</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
