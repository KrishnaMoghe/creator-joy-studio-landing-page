import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📥 Received video generation request:", body)

    const { prompt, style, platforms, userId } = body

    // Simulate AI video generation (5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Mock generated videos
    const videoSamples = [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg"
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
      }
    ]

    const videos = platforms.map((platform: string, index: number) => ({
      id: `gen_${platform.toLowerCase()}_${Date.now()}_${index}`,
      url: videoSamples[index % videoSamples.length].url,
      thumbnail: videoSamples[index % videoSamples.length].thumbnail,
      platform: platform,
      prompt: prompt,
      duration: [30, 45, 60][index % 3],
      style: style,
      uploadedAt: new Date().toISOString(),
      status: "uploaded"
    }))

    return NextResponse.json({
      success: true,
      message: `Generated ${videos.length} videos and uploaded to platforms`,
      videos: videos,
      metadata: {
        userId: userId,
        prompt: prompt,
        style: style,
        generationTime: "5.2s",
        platforms: platforms
      }
    })
  } catch (error) {
    console.error("❌ Generation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to generate videos" },
      { status: 500 }
    )
  }
}
