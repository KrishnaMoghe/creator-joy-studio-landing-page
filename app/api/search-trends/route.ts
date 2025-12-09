import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📥 Received trend search request:", body)

    const { query, platform, category, userId } = body

    // Simulate AI analysis (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Mock trending topics
    const trendingTopics = [
      {
        id: `trend_1_${Date.now()}`,
        topic: `${query} - Latest Innovations`,
        platform: platform === "all" ? "LinkedIn" : platform,
        engagement: Math.floor(Math.random() * 50000) + 10000,
        views: Math.floor(Math.random() * 500000) + 100000,
        posts: Math.floor(Math.random() * 5000) + 1000,
        growthRate: `+${Math.floor(Math.random() * 50) + 20}%`,
        category: category === "all" ? "technology" : category,
        keywords: [
          query.split(" ")[0],
          "innovation",
          "2025",
          "trending",
          "viral"
        ],
        suggestedContent: `Create a carousel post highlighting the top 5 ${query} trends in 2025. Include statistics, expert quotes, and actionable insights. End with a call-to-action asking followers to share their experiences.`,
        bestTimeToPost: "Tuesday, 10:00 AM - 12:00 PM",
        targetAudience: "Professionals aged 25-45"
      },
      {
        id: `trend_2_${Date.now()}`,
        topic: `How ${query} is Transforming Business`,
        platform: platform === "all" ? "Instagram" : platform,
        engagement: Math.floor(Math.random() * 40000) + 8000,
        views: Math.floor(Math.random() * 400000) + 80000,
        posts: Math.floor(Math.random() * 4000) + 800,
        growthRate: `+${Math.floor(Math.random() * 40) + 15}%`,
        category: category === "all" ? "business" : category,
        keywords: [
          "transformation",
          "digital",
          "strategy",
          "growth",
          "innovation"
        ],
        suggestedContent: `Share a short 60-second video explaining how ${query} is revolutionizing your industry. Use dynamic visuals, on-screen text, and trending audio. Include a before/after comparison for maximum impact.`,
        bestTimeToPost: "Wednesday, 7:00 PM - 9:00 PM",
        targetAudience: "Business owners aged 30-50"
      },
      {
        id: `trend_3_${Date.now()}`,
        topic: `${query} Success Stories & Case Studies`,
        platform: platform === "all" ? "YouTube" : platform,
        engagement: Math.floor(Math.random() * 60000) + 15000,
        views: Math.floor(Math.random() * 600000) + 150000,
        posts: Math.floor(Math.random() * 6000) + 1500,
        growthRate: `+${Math.floor(Math.random() * 60) + 25}%`,
        category: category === "all" ? "marketing" : category,
        keywords: [
          "success",
          "case study",
          "results",
          "ROI",
          "implementation"
        ],
        suggestedContent: `Create a 10-minute deep-dive video featuring real ${query} success stories. Interview industry leaders, show metrics, and provide step-by-step implementation tips. Optimize for SEO with timestamps and chapters.`,
        bestTimeToPost: "Thursday, 2:00 PM - 4:00 PM",
        targetAudience: "Decision makers aged 35-55"
      },
      {
        id: `trend_4_${Date.now()}`,
        topic: `Top 10 ${query} Tools & Resources`,
        platform: platform === "all" ? "LinkedIn" : platform,
        engagement: Math.floor(Math.random() * 45000) + 9000,
        views: Math.floor(Math.random() * 450000) + 90000,
        posts: Math.floor(Math.random() * 4500) + 900,
        growthRate: `+${Math.floor(Math.random() * 45) + 18}%`,
        category: category === "all" ? "technology" : category,
        keywords: [
          "tools",
          "resources",
          "productivity",
          "software",
          "automation"
        ],
        suggestedContent: `Create an infographic listing the top 10 ${query} tools with pros, cons, and pricing. Include a comparison table and your personal recommendation. Encourage engagement by asking which tool followers use.`,
        bestTimeToPost: "Monday, 9:00 AM - 11:00 AM",
        targetAudience: "Tech professionals aged 25-40"
      },
      {
        id: `trend_5_${Date.now()}`,
        topic: `${query} Mistakes to Avoid in 2025`,
        platform: platform === "all" ? "Instagram" : platform,
        engagement: Math.floor(Math.random() * 35000) + 7000,
        views: Math.floor(Math.random() * 350000) + 70000,
        posts: Math.floor(Math.random() * 3500) + 700,
        growthRate: `+${Math.floor(Math.random() * 35) + 12}%`,
        category: category === "all" ? "education" : category,
        keywords: [
          "mistakes",
          "avoid",
          "tips",
          "lessons",
          "best practices"
        ],
        suggestedContent: `Create a Reel highlighting the top 5 ${query} mistakes people make. Use bold text overlays, trending transitions, and a relatable hook. End with a free checklist download to capture leads.`,
        bestTimeToPost: "Friday, 6:00 PM - 8:00 PM",
        targetAudience: "Beginners & enthusiasts aged 20-35"
      }
    ]

    return NextResponse.json({
      success: true,
      message: `Found ${trendingTopics.length} trending topics`,
      topics: trendingTopics,
      metadata: {
        userId: userId,
        query: query,
        platform: platform,
        category: category,
        searchTime: "3.2s",
        totalResults: trendingTopics.length
      }
    })
  } catch (error) {
    console.error("❌ Trend search error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to search trends" },
      { status: 500 }
    )
  }
}
