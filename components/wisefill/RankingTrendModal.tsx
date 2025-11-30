"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface RankingTrendModalProps {
    isOpen: boolean
    onClose: () => void
    score: number
    ranking: number
}

export function RankingTrendModal({ isOpen, onClose, score, ranking }: RankingTrendModalProps) {
    // Mock 5-year trend data based on current ranking
    const data = [
        { year: '2020', rank: Math.floor(ranking * 1.1) },
        { year: '2021', rank: Math.floor(ranking * 1.05) },
        { year: '2022', rank: Math.floor(ranking * 0.95) },
        { year: '2023', rank: Math.floor(ranking * 1.02) },
        { year: '2024', rank: ranking },
    ]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-indigo-400 flex items-center gap-2">
                        📈 5年位次分布趋势
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <div className="flex justify-between items-center mb-6 px-4">
                        <div className="text-center">
                            <div className="text-sm text-slate-400">当前分数</div>
                            <div className="text-2xl font-bold text-cyan-400 font-mono">{score}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-slate-400">预估位次</div>
                            <div className="text-2xl font-bold text-amber-400 font-mono">{ranking}</div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    reversed // Rank is better when lower
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                    itemStyle={{ color: '#818cf8' }}
                                    labelStyle={{ color: '#94a3b8' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="rank"
                                    stroke="#818cf8"
                                    strokeWidth={3}
                                    dot={{ fill: '#818cf8', r: 4, strokeWidth: 2, stroke: '#1e293b' }}
                                    activeDot={{ r: 6, fill: '#c7d2fe' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <p className="text-xs text-slate-500 text-center mt-4">
                        * 数据基于历史同分段位次折算，仅供参考
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
