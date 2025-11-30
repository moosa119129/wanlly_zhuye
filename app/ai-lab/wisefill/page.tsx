"use client"

import { useState, useMemo, useEffect } from "react"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core"
import { LoginModal } from "@/components/wisefill/LoginModal"
import { ALL_SCHOOLS } from "@/components/wisefill/data"
import { School, Strategy, UserProfile } from "@/components/wisefill/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LeftSidebar } from "@/components/wisefill/LeftSidebar"
import { StrategyDeck } from "@/components/wisefill/StrategyDeck"
import { RightMarquee } from "@/components/wisefill/RightMarquee"
import { GradientChart } from "@/components/wisefill/GradientChart"
import { ReportModal } from "@/components/wisefill/ReportModal"

export default function WiseFillPage() {
    const DEV_MODE = true
    const [isLoggedIn, setIsLoggedIn] = useState(DEV_MODE)
    const [userProfile, setUserProfile] = useState<UserProfile | null>(
        DEV_MODE ? { name: "开发者", phone: "138****1234" } : null
    )

    const [score, setScore] = useState<number | "">("")
    const [strategy, setStrategy] = useState<Strategy>(null)
    const [slots, setSlots] = useState<(School | null)[]>(Array(8).fill(null))
    const [aiText, setAiText] = useState("等待输入分数和策略...")
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [activeDragSchool, setActiveDragSchool] = useState<School | null>(null)

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }))
    const recommendations = useMemo(() => {
        if (!score) return []
        return ALL_SCHOOLS.filter(s => Math.abs(s.score - Number(score)) <= 20).slice(0, 6)
    }, [score])

    const currentRanking = useMemo(() => {
        if (!score) return 0
        return Math.max(1, Math.floor(50000 - (Number(score) * 70)))
    }, [score])

    useEffect(() => {
        if (!score) {
            setAiText("请在左侧输入您的中考分数，系统将为您匹配最佳学校。")
            return
        }
        if (!strategy) {
            setAiText(`当前分数 ${score}，位次约 ${currentRanking}。\n请在上方选择一种填报策略以开始。`)
            return
        }

        const filledCount = slots.filter(s => s !== null).length
        const rushCount = slots.filter(s => s && s.score > Number(score)).length
        const stableCount = slots.filter(s => s && s.score <= Number(score) && s.score >= Number(score) - 10).length

        let analysis = `已应用 [${strategy === 'rush' ? '冲刺' : strategy === 'stable' ? '稳健' : '保底'}] 策略。\n`
        analysis += `当前方案包含 ${rushCount} 个冲刺志愿，${stableCount} 个稳妥志愿。\n`
        if (filledCount < 8) {
            analysis += "⚠️ 志愿未填满，建议从右下角推荐池中拖拽学校填补空缺。"
        } else {
            analysis += "✅ 志愿已填满，结构合理。梯度分布请参考上方图表。"
        }
        setAiText(analysis)
    }, [score, strategy, slots, currentRanking])

    const handleStrategyChange = (newStrategy: Strategy) => {
        setStrategy(newStrategy)
        if (!score) return

        const numScore = Number(score)
        const rushPool = ALL_SCHOOLS.filter(s => s.score > numScore && s.score <= numScore + 15).sort((a, b) => a.score - b.score)
        const stablePool = ALL_SCHOOLS.filter(s => s.score <= numScore && s.score >= numScore - 10).sort((a, b) => b.score - a.score)
        const protectPool = ALL_SCHOOLS.filter(s => s.score < numScore - 10 && s.score >= numScore - 40).sort((a, b) => b.score - a.score)

        let targetSchools: School[] = []
        if (newStrategy === 'rush') {
            targetSchools = [...rushPool.slice(0, 3), ...stablePool.slice(0, 3), ...protectPool.slice(0, 2)]
        } else if (newStrategy === 'stable') {
            targetSchools = [...rushPool.slice(0, 1), ...stablePool.slice(0, 5), ...protectPool.slice(0, 2)]
        } else {
            targetSchools = [...stablePool.slice(0, 3), ...protectPool.slice(0, 5)]
        }

        if (targetSchools.length < 8) {
            const remaining = ALL_SCHOOLS
                .filter(s => !targetSchools.find(t => t.id === s.id))
                .filter(s => Math.abs(s.score - numScore) < 50)
                .sort((a, b) => Math.abs(a.score - numScore) - Math.abs(b.score - numScore))
            targetSchools = [...targetSchools, ...remaining.slice(0, 8 - targetSchools.length)]
        }

        targetSchools.sort((a, b) => b.score - a.score)
        const newSlots = Array(8).fill(null)
        targetSchools.slice(0, 8).forEach((school, i) => { newSlots[i] = school })
        setSlots(newSlots)
    }

    const handleDragStart = (event: DragStartEvent) => {
        const school = event.active.data.current?.school as School
        if (school) setActiveDragSchool(school)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveDragSchool(null)
        if (!event.over) return

        const activeSchool = event.active.data.current?.school as School
        const overType = event.over.data.current?.type
        const overIndex = event.over.data.current?.index

        if (activeSchool && overType === 'slot' && typeof overIndex === 'number') {
            const newSlots = [...slots]
            newSlots[overIndex] = activeSchool
            setSlots(newSlots)
        }
    }

    const handleRemoveSlot = (index: number) => {
        const newSlots = [...slots]
        newSlots[index] = null
        setSlots(newSlots)
    }

    const handleReset = () => {
        setScore("")
        setStrategy(null)
        setSlots(Array(8).fill(null))
    }

    return (
        <div className="w-full h-[calc(100vh-128px)] bg-slate-950 text-slate-100 overflow-hidden">
            {!isLoggedIn && <LoginModal onLogin={(name, phone) => { setUserProfile({ name, phone }); setIsLoggedIn(true) }} />}
            <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} slots={slots} userProfile={userProfile} score={Number(score) || 0} />

            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-[320px_1fr_340px] h-full w-full">
                    <LeftSidebar
                        userProfile={userProfile}
                        score={score}
                        setScore={setScore}
                        ranking={currentRanking}
                        slots={slots}
                        onRemoveSlot={handleRemoveSlot}
                        onReset={handleReset}
                        onGenerateReport={() => setIsReportModalOpen(true)}
                    />

                    <div className="h-full flex flex-col p-4 gap-3 bg-slate-950/50 relative">
                        <div className="shrink-0">
                            <h3 className="text-[10px] text-slate-500 font-bold mb-2">STRATEGY / 策略引擎</h3>
                            <StrategyDeck currentStrategy={strategy} onSelect={handleStrategyChange} disabled={!score} />
                        </div>

                        <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-auto">
                            {!strategy ? (
                                <div className="w-full p-12">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                                        <span className="text-7xl">⚡</span>
                                    </div>
                                    <div className="text-center mb-12">
                                        <h2 className="text-6xl font-black text-white mb-4 tracking-tight">欢迎使用 WiseFill</h2>
                                        <p className="text-3xl text-blue-400 font-bold">中考志愿智能填报系统</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
                                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 border-2 border-blue-400/40 shadow-2xl shadow-blue-500/30 hover:scale-105 transition-transform">
                                            <div className="text-7xl font-black text-white mb-4">①</div>
                                            <div className="text-2xl text-white font-black mb-2">输入分数</div>
                                            <div className="text-base text-blue-100">在左侧输入中考分数</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 border-2 border-purple-400/40 shadow-2xl shadow-purple-500/30 hover:scale-105 transition-transform">
                                            <div className="text-7xl font-black text-white mb-4">②</div>
                                            <div className="text-2xl text-white font-black mb-2">选择策略</div>
                                            <div className="text-base text-purple-100">上方选择策略类型</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 border-2 border-emerald-400/40 shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-transform">
                                            <div className="text-7xl font-black text-white mb-4">③</div>
                                            <div className="text-2xl text-white font-black mb-2">生成方案</div>
                                            <div className="text-base text-emerald-100">系统自动生成</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full min-h-[600px] p-6">
                                    <GradientChart slots={slots} userScore={Number(score) || 0} />
                                </div>
                            )}
                        </div>

                        <div className="shrink-0 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 rounded-xl border border-purple-500/30 p-6 h-[180px] shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">💡</span>
                                <span className="text-white text-xl font-black">AI 智能分析</span>
                            </div>
                            <div className="text-base text-white font-medium leading-relaxed">{aiText}</div>
                        </div>

                        {/* 生成报告按钮 - 移到这里，100%可见 */}
                        <div className="shrink-0">
                            <Button
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-2xl shadow-indigo-500/40 h-14 text-lg font-black"
                                onClick={() => setIsReportModalOpen(true)}
                                disabled={!score || slots.every(s => s === null)}
                            >
                                📄 生成志愿填报方案书
                            </Button>
                        </div>
                    </div>

                    <RightMarquee schools={ALL_SCHOOLS} />
                </div>

                <DragOverlay>
                    {activeDragSchool && (
                        <Card className="p-2 bg-indigo-600 text-white border-none shadow-xl w-[200px]">
                            <div className="font-bold text-sm">{activeDragSchool.name}</div>
                            <div className="text-xs">{activeDragSchool.score}分</div>
                        </Card>
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    )
}
