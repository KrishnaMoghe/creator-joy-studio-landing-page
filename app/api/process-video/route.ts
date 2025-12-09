import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📥 Received:", body)

    // Simulate processing delay (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Return mock trial output
    return NextResponse.json({
      success: true,
      message: "Video processed successfully",
      clips: [
        {
          id: "clip_linkedin_1",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          platform: "LinkedIn",
          duration: 30,
          thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
          title: "Opening Hook - Perfect for LinkedIn"
        },
        {
          id: "clip_instagram_1",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          platform: "Instagram",
          duration: 45,
          thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
          title: "Viral Moment - Instagram Reels"
        },
        {
          id: "clip_youtube_1",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          platform: "YouTube",
          duration: 60,
          thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
          title: "Best Highlights - YouTube Shorts"
        },
        {
          id: "clip_linkedin_2",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Chromecast.mp4",
          platform: "LinkedIn",
          duration: 28,
          thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Chromecast.jpg",
          title: "Key Takeaway - LinkedIn Feed"
        },
        {
          id: "clip_instagram_2",
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          platform: "Instagram",
          duration: 40,
          thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
          title: "Trending Content - Instagram"
        }
      ],
      metadata: {
        originalVideo: body.videoUrl,
        processingTime: "2.3s",
        totalClips: 5,
        platforms: body.platforms || ["LinkedIn", "Instagram", "YouTube"]
      }
    })
  } catch (error) {
    console.error("❌ Error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process video" },
      { status: 500 }
    )
  }
}
