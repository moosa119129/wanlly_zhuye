import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing");
            return NextResponse.json({ result: "AI 服务配置错误：缺少 API Key。" });
        }

        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return NextResponse.json({ result: text });
        } catch (apiError: any) {
            console.error("Gemini API Error:", apiError);
            // Return a friendly error message instead of 500
            return NextResponse.json({
                result: `AI 服务暂时不可用 (${apiError.message || "Unknown Error"})。请检查 API Key 配置或稍后再试。`
            });
        }

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ result: "服务器内部错误，请稍后再试。" });
    }
}
