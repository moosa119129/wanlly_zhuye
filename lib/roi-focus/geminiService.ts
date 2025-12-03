import { GoogleGenAI } from "@google/genai";
import { Task, QuadrantType } from "../roi-focus/types";

export const analyzePortfolio = async (tasks: Task[], score: number): Promise<string> => {
    try {
        // Use NEXT_PUBLIC_GEMINI_API_KEY for client-side access
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (!apiKey) {
            return "请在环境变量中配置 NEXT_PUBLIC_GEMINI_API_KEY 以使用 AI 分析功能。";
        }

        const ai = new GoogleGenAI({ apiKey });

        // Group tasks for context
        const summary = tasks.map(t =>
            `- [${t.quadrant}] ${t.title} (${t.duration}h, ROI: ${t.roiRating})`
        ).join('\n');

        const prompt = `
      你是一位顶级的时间管理与效能顾问，精通“ROI工作投资组合模型”。
      
      请根据以下用户的今日工作任务列表和评分，给出一针见血的点评和改进建议。
      
      当前表现：
      - 任务列表：
      ${summary}
      - 核心资产+杠杆建设 占比得分：${(score * 100).toFixed(1)}%
      
      要求：
      1. 如果得分低于60%，语气要严厉但具有建设性，指出哪里是在“亏损”。
      2. 如果得分高于60%，给予肯定并提出如何进一步扩大“杠杆”。
      3. 重点分析那些标记为 "Negative" 或 "Low" ROI 的任务是否占用了太多时间。
      4. 输出格式为 Markdown，包含“诊断结果”和“行动建议”两个部分，保持简练。
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash', // Updated to 2.0-flash as 1.5 might be deprecated or 2.0 is better
            contents: prompt,
        });

        return response.text || "无法生成分析结果。";
    } catch (error) {
        console.error("AI Analysis failed:", error);
        return "AI 分析服务暂时不可用，请检查 API Key 设置或网络连接。";
    }
};
