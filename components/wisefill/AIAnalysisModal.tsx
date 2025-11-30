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
        // Mock AI Analysis Logic
        const filledSlots = volunteers.filter(v => v !== null) as School[]
        let text = `考生 ${userProfile.name} (分数: ${score}) 的志愿分析报告：\n\n`

        if (filledSlots.length === 0) {
            text += "⚠️ 您尚未填报任何志愿，建议根据分数选择合适的学校。\n"
        } else {
            text += `✅ 已填报 ${filledSlots.length} 个志愿。\n`

            const rushCount = filledSlots.filter(s => s.score > score).length
            const stableCount = filledSlots.filter(s => s.score <= score && s.score >= score - 10).length
            const protectCount = filledSlots.filter(s => s.score < score - 10).length
            const provincialCount = filledSlots.filter(s => s.provincialKey).length

            text += `\n📊 结构分析：\n- 冲刺型: ${rushCount}所\n- 稳妥型: ${stableCount}所\n- 保底型: ${protectCount}所\n`
            text += `- 省重点: ${provincialCount}所\n\n`

            text += "💡 详细点评：\n"
            if (rushCount > 3) text += "⚠️ 冲刺学校过多，风险较大，建议增加稳妥型学校。\n"
            if (protectCount === 0) text += "⚠️ 缺乏保底学校，存在滑档风险！请务必选择至少一所分数线低于您成绩10分以上的学校。\n"
            if (stableCount >= 3 && protectCount >= 2) text += "🌟 志愿结构合理，梯度分明，录取概率较高。\n"

            if (provincialCount > 0) {
                text += `🌟 您选择了 ${provincialCount} 所省重点中学，展现了较高的目标追求。\n`
            }

            // Specific school comments
            const riskySchool = filledSlots.find(s => s.score > score + 5)
            if (riskySchool) {
                text += `⚠️ 注意：${riskySchool.name} 分数线较高（${riskySchool.score}），录取难度大，建议作为第一志愿冲刺。\n`
            }

            const safeSchool = filledSlots.find(s => s.score < score - 15)
            if (safeSchool) {
                text += `✅ ${safeSchool.name} 作为保底志愿非常稳妥（${safeSchool.score}），可确保录取。\n`
            }
        }

        setAnalysisText(text)
        setStatus('saving')

        // Save to backend
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
