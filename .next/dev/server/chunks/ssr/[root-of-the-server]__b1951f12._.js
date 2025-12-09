module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/smart-video-clips/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const handleUploadAndProcess = async ()=>{
    if (!uploadedFile) return;
    try {
        setUploading(true);
        setError(null);
        setUploadProgress(0);
        const formData = new FormData();
        formData.append("video", uploadedFile);
        console.log("Uploading to:", "/api/upload-video");
        console.log("File:", uploadedFile.name, uploadedFile.size);
        const uploadInterval = setInterval(()=>{
            setUploadProgress((prev)=>{
                if (prev >= 95) return prev;
                return prev + 5;
            });
        }, 300);
        const uploadResponse = await fetch("/api/upload-video", {
            method: "POST",
            body: formData
        });
        clearInterval(uploadInterval);
        console.log("Upload response status:", uploadResponse.status);
        if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json().catch(()=>null);
            console.error("Upload error:", errorData);
            throw new Error(errorData?.error || `Upload failed with status ${uploadResponse.status}`);
        }
        const { videoUrl } = await uploadResponse.json();
        console.log("Video uploaded:", videoUrl);
        setUploadProgress(100);
        await new Promise((resolve)=>setTimeout(resolve, 500));
        setUploading(false);
        setProcessing(true);
        setUploadProgress(0);
        console.log("Sending to n8n:", ("TURBOPACK compile-time value", "http://localhost:5678/webhook/generate-clips"));
        const n8nResponse = await fetch(("TURBOPACK compile-time value", "http://localhost:5678/webhook/generate-clips") || "https://your-n8n-instance.com/webhook/video-upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                videoUrl: videoUrl,
                userId: "user_123",
                platforms: [
                    "LinkedIn",
                    "Instagram",
                    "YouTube"
                ]
            })
        });
        console.log("n8n response status:", n8nResponse.status);
        if (!n8nResponse.ok) {
            const errorData = await n8nResponse.json().catch(()=>null);
            console.error("n8n error:", errorData);
            throw new Error(errorData?.error || "Failed to process video");
        }
        const result = await n8nResponse.json();
        console.log("Processing result:", result);
        setClips(result.clips || []);
        setProcessing(false);
        setUploadedFile(null);
    } catch (err) {
        console.error("Full error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
        setUploading(false);
        setProcessing(false);
        setUploadProgress(0);
    }
};
}),
"[project]/app/smart-video-clips/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/smart-video-clips/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b1951f12._.js.map