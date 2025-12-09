"use client"

import { useState, useCallback } from "react"
import { Upload, Film, Loader2, Download, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { useDropzone } from "react-dropzone"
import Link from "next/link"

interface ClipResult {
  id: string
  url: string
  thumbnail?: string
  duration?: number
  platform: string
}

export default function SmartVideoClipsPage() {
  const [uploading, setUploading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [clips, setClips] = useState<ClipResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file")
        return
      }
      
      if (file.size > 500 * 1024 * 1024) {
        setError("Video file size must be less than 500MB")
        return
      }
      
      setUploadedFile(file)
      setError(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"]
    },
    maxFiles: 1,
    disabled: uploading || processing
  })

  const handleUploadAndProcess = async () => {
    if (!uploadedFile) return

    try {
      setUploading(true)
      setError(null)
      setUploadProgress(0)

      const formData = new FormData()
      formData.append("video", uploadedFile)

      console.log("📤 Starting upload...")
      console.log("📁 File:", uploadedFile.name, `${(uploadedFile.size / 1024 / 1024).toFixed(2)}MB`, uploadedFile.type)

      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) return prev
          return prev + 5
        })
      }, 300)

      const uploadResponse = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      }).catch(err => {
        clearInterval(uploadInterval)
        console.error("❌ Network error:", err)
        throw new Error("Network error: Unable to reach server. Is your dev server running?")
      })

      clearInterval(uploadInterval)
      
      console.log("📊 Response status:", uploadResponse.status)

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({ error: "Unknown error" }))
        console.error("❌ Server error:", errorData)
        throw new Error(errorData.error || `Server error: ${uploadResponse.status}`)
      }

      const { videoUrl } = await uploadResponse.json()
      console.log("✅ Upload successful! URL:", videoUrl)

      setUploadProgress(100)
      await new Promise(resolve => setTimeout(resolve, 500))

      setUploading(false)
      setProcessing(true)

      console.log("🤖 Sending to n8n...")
      const n8nUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      console.log("🔗 n8n URL:", n8nUrl || "NOT SET")

      if (!n8nUrl || n8nUrl === "https://your-n8n-instance.com/webhook/video-upload") {
        throw new Error("n8n webhook URL not configured. Please set NEXT_PUBLIC_N8N_WEBHOOK_URL in .env.local")
      }

      const n8nResponse = await fetch(n8nUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: videoUrl,
          userId: "user_123",
          platforms: ["LinkedIn", "Instagram", "YouTube"],
        }),
      }).catch(err => {
        console.error("❌ n8n network error:", err)
        throw new Error("Unable to reach n8n webhook. Check your NEXT_PUBLIC_N8N_WEBHOOK_URL")
      })

      console.log("📊 n8n response status:", n8nResponse.status)

      if (!n8nResponse.ok) {
        const errorData = await n8nResponse.json().catch(() => ({ error: "Unknown error" }))
        console.error("❌ n8n error:", errorData)
        throw new Error(errorData.error || "n8n processing failed")
      }

      const result = await n8nResponse.json()
      console.log("✅ Processing complete!", result)

      setClips(result.clips || [])
      setProcessing(false)
      setUploadedFile(null)
    } catch (err) {
      console.error("❌ Full error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setUploading(false)
      setProcessing(false)
    }
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setClips([])
    setError(null)
    setUploadProgress(0)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/#features" 
          className="inline-flex items-center gap-2 mb-8 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Features
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 p-3">
              <Film className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Smart Video <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">Clips</span>
            </h1>
          </div>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Upload your long-form video and let AI convert it into viral short clips optimized for LinkedIn, Instagram, and YouTube
          </p>
        </div>

        {/* Upload Section */}
        {clips.length === 0 && (
          <div className="max-w-3xl mx-auto">
            <div
              {...getRootProps()}
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
                isDragActive ? "border-purple-500 bg-purple-500/10" : "border-gray-700 bg-[#1a1a1a]/80"
              } ${uploading || processing ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-purple-500/50"} backdrop-blur-xl p-12`}
            >
              <input {...getInputProps()} />
              
              <div className="flex flex-col items-center justify-center text-center">
                {!uploadedFile ? (
                  <>
                    <Upload className="h-16 w-16 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {isDragActive ? "Drop your video here" : "Upload Your Video"}
                    </h3>
                    <p className="text-white/60 mb-4">
                      Drag & drop your video file here, or click to browse
                    </p>
                    <p className="text-sm text-white/40">
                      Supports MP4, MOV, AVI, MKV, WEBM (Max 500MB)
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{uploadedFile.name}</h3>
                    <p className="text-white/60 mb-4">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Uploading...</span>
                    <span className="text-sm text-purple-400">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Processing State */}
              {processing && (
                <div className="mt-6 flex flex-col items-center">
                  <Loader2 className="h-12 w-12 text-purple-400 animate-spin mb-4" />
                  <p className="text-white/60">AI is generating your viral clips...</p>
                  <p className="text-sm text-white/40 mt-2">This may take a few minutes</p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-400 mb-1">Error</h4>
                  <p className="text-sm text-red-400/80">{error}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {uploadedFile && !processing && !uploading && (
              <div className="mt-8 flex gap-4 justify-center">
                <button
                  onClick={resetUpload}
                  className="px-6 py-3 rounded-xl border border-gray-700 bg-[#1a1a1a]/80 hover:bg-[#2a2a2a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadAndProcess}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all font-semibold shadow-lg shadow-purple-500/25"
                >
                  Generate Clips
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        {clips.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Viral Clips are Ready!</h2>
                <p className="text-white/60">{clips.length} clips generated</p>
              </div>
              <button
                onClick={resetUpload}
                className="px-6 py-3 rounded-xl border border-gray-700 bg-[#1a1a1a]/80 hover:bg-[#2a2a2a] transition-colors"
              >
                Upload New Video
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clips.map((clip, index) => (
                <div
                  key={clip.id}
                  className="rounded-2xl border border-gray-700 bg-[#1a1a1a]/80 backdrop-blur-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                >
                  {/* Video Preview */}
                  <div className="relative aspect-[9/16] bg-gray-800">
                    <video
                      src={clip.url}
                      className="w-full h-full object-cover"
                      controls
                      preload="metadata"
                    />
                  </div>

                  {/* Clip Info */}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Clip {index + 1}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/10 px-2 py-1 border border-purple-500/20 text-xs text-purple-400">
                        {clip.platform}
                      </span>
                      {clip.duration && (
                        <span className="text-xs text-white/40">{clip.duration}s</span>
                      )}
                    </div>

                    {/* Download Button */}
                    <a
                      href={clip.url}
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
