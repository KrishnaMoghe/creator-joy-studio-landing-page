import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📥 Received ad creation request:", body)

    const { productName, productDescription, targetAudience, adType, platforms, callToAction, userId } = body

    // Simulate AI ad creation (5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Mock ad videos
    const adSamples = [
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg"
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg"
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Chromecast.mp4",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Chromecast.jpg"
      }
    ]

    const ads = platforms.map((platform: string, index: number) => ({
      id: `ad_${platform.toLowerCase()}_${Date.now()}_${index}`,
      url: adSamples[index % adSamples.length].url,
      thumbnail: adSamples[index % adSamples.length].thumbnail,
      platform: platform,
      productName: productName,
      adType: adType,
      targetAudience: targetAudience || "General Audience",
      callToAction: callToAction,
      duration: [15, 30, 45][index % 3],
      publishedAt: new Date().toISOString(),
      status: "published",
      metrics: {
        impressions: Math.floor(Math.random() * 10000) + 1000,
        clicks: Math.floor(Math.random() * 500) + 100,
        ctr: (Math.random() * 5 + 2).toFixed(2) + "%"
      }
    }))

    return NextResponse.json({
      success: true,
      message: `Created ${ads.length} viral ads and published to platforms`,
      ads: ads,
      metadata: {
        userId: userId,
        productName: productName,
        adType: adType,
        creationTime: "5.1s",
        platforms: platforms
      }
    })
  } catch (error) {
    console.error("❌ Ad creation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create ads" },
      { status: 500 }
    )
  }
}
