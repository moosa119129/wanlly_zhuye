"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { School, UserProfile } from "./types"
import { saveWiseFillRecord } from "@/app/actions"
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react"

interface AIAnalysisModalProps {
    isOpen: boolean
    onClose: () => void
    userProfile: UserProfile
    score: number
    volunteers: (School | null)[]
}

export function AIAnalysisModal({ isOpen, onClose, userProfile, score, volunteers }: AIAnalysisModalProps) {
    const [status, setStatus] = useState<'analyzing' | 'saving' | 'done' | 'error'>('analyzing')
    const [analysisText, setAnalysisText] = useState("")

    useEffect(() => {
        if (isOpen) {
            setStatus('analyzing')
            // Simulate AI analysis delay
            setTimeout(() => {
                generateAnalysis()
            }, 2000)
        }
    }, [isOpen])

    const generateAnalysis = async () => {
        const filledSlots = volunteers.filter(v => v !== null) as School[]

        // Construct the prompt
        let prompt = `考生 ${userProfile.name} (分数: ${score}) 的志愿分析请求。\n`
        prompt += `已填报 ${filledSlots.length} 个志愿：\n`
        filledSlots.forEach(s => {
            prompt += `- ${s.name} (${s.score}分, ${s.provincialKey ? '省重点' : '普通'})\n`
        })
        prompt += `\n请给出详细的志愿结构分析和建议。`

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            })

            const data = await response.json()
            setAnalysisText(data.result || "无法获取分析结果。")

        } catch (error) {
            console.error("Frontend Analysis Error:", error)
            setAnalysisText("网络请求失败，请检查网络连接。")
        }

        setStatus('saving')

        // Save to backend (keep existing logic)
        const result = await saveWiseFillRecord({
            name: userProfile.name,
            phone: userProfile.phone,
            score: score,
            volunteers: filledSlots.map(s => s.name)
        })

        if (result.success) {
            setStatus('done')
        } else {
            setStatus('error')
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-2xl p-4"
                    >
                        <Card className="bg-slate-900 border-slate-700 shadow-2xl text-slate-100 overflow-hidden">
                            <CardHeader className="bg-slate-800/50 border-b border-slate-700">
                                <CardTitle className="flex items-center gap-2 text-xl text-indigo-400">
                                    ✨ AI 志愿智能分析
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 min-h-[300px] flex flex-col">
                                {status === 'analyzing' && (
                                    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-400">
                                        <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
                                        <p>正在分析您的志愿结构与录取概率...</p>
                                    </div>
                                )}

                                {(status === 'saving' || status === 'done' || status === 'error') && (
                                    <div className="flex-1 space-y-4">
                                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-300">
                                            {analysisText}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                            <div className="flex items-center gap-2 text-sm">
                                                {status === 'saving' && (
                                                    <span className="flex items-center gap-2 text-yellow-500">
                                                        <Loader2 className="w-4 h-4 animate-spin" /> 正在保存记录...
                                                    </span>
                                                )}
                                                {status === 'done' && (
                                                    <span className="flex items-center gap-2 text-emerald-400">
                                                        <CheckCircle className="w-4 h-4" /> 记录已保存
                                                    </span>
                                                )}
                                                {status === 'error' && (
                                                    <span className="flex items-center gap-2 text-red-400">
                                                        <AlertTriangle className="w-4 h-4" /> 保存失败
                                                    </span>
                                                )}
                                            </div>
                                            <Button onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-white border border-slate-500">
                                                关闭
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
