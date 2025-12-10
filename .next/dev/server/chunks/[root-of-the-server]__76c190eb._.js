module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/analyze-schedule/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(request) {
    try {
        const body = await request.json();
        console.log("📥 Received schedule analysis request:", body);
        const { platform, userId } = body;
        await new Promise((resolve)=>setTimeout(resolve, 2000));
        const scheduledPosts = [];
        const platforms = platform === "all" ? [
            "LinkedIn",
            "Instagram",
            "YouTube"
        ] : [
            platform
        ];
        const today = new Date();
        for(let i = 0; i < 30; i++){
            const date = new Date(today);
            date.setDate(date.getDate() + i);
            const postsPerDay = Math.floor(Math.random() * 4);
            for(let j = 0; j < postsPerDay; j++){
                const selectedPlatform = platforms[Math.floor(Math.random() * platforms.length)];
                const hours = [
                    9,
                    10,
                    12,
                    14,
                    16,
                    18,
                    20
                ];
                const hour = hours[Math.floor(Math.random() * hours.length)];
                scheduledPosts.push({
                    id: `post_${date.getTime()}_${j}`,
                    content: `Engaging content for ${selectedPlatform}`,
                    platform: selectedPlatform,
                    scheduledDate: date.toISOString().split('T')[0],
                    scheduledTime: `${hour}:00`,
                    status: Math.random() > 0.7 ? "published" : "scheduled",
                    engagement: {
                        predicted: Math.floor(Math.random() * 5000) + 1000,
                        reach: Math.floor(Math.random() * 20000) + 5000
                    },
                    bestTime: hour === 10 || hour === 14 || hour === 18
                });
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Schedule analyzed successfully",
            scheduledPosts: scheduledPosts,
            optimalTimes: {
                LinkedIn: [
                    "Tuesday 10:00 AM",
                    "Thursday 2:00 PM",
                    "Friday 6:00 PM"
                ],
                Instagram: [
                    "Monday 9:00 AM",
                    "Wednesday 7:00 PM",
                    "Saturday 11:00 AM"
                ],
                YouTube: [
                    "Thursday 4:00 PM",
                    "Friday 8:00 PM",
                    "Sunday 3:00 PM"
                ]
            }
        });
    } catch (error) {
        console.error("❌ Analysis error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to analyze schedule"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__76c190eb._.js.map