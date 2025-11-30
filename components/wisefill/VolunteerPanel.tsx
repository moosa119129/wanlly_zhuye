"use client"

import { useDroppable, useDraggable } from "@dnd-kit/core"
import { School, Strategy } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Shield, Anchor } from "lucide-react"

interface VolunteerPanelProps {
    score: number | ""
    setScore: (s: number | "") => void
    strategy: Strategy
    setStrategy: (s: Strategy) => void
    recommendations: School[]
    slots: (School | null)[]
    onRemoveSlot: (index: number) => void
}

export function VolunteerPanel({
    score, setScore, strategy, setStrategy, recommendations, slots, onRemoveSlot
}: VolunteerPanelProps) {

    return (
        <div className="flex flex-col h-full gap-6 p-6 overflow-y-auto custom-scrollbar">
            {/* Score Input */}
            <div className="space-y-2">
                <h3 className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
                    考生分数 / Score
                </h3>
                <div className="relative">
                    <Input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(Number(e.target.value))}
                        className="bg-slate-900/50 border-slate-700 text-3xl font-bold text-center h-16 text-white focus:border-indigo-500 focus:ring-indigo-500/50"
                        placeholder="000"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">/ 710</span>
                </div>
            </div>

            {/* Strategy Selection */}
            {score && (
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500">
                    <h3 className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
                        生成策略 / Strategy
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                        <StrategyBtn
                            active={strategy === 'rush'}
                            onClick={() => setStrategy('rush')}
                            icon={<Rocket className="w-4 h-4" />}
                            label="激进"
                            sub="冲高为主"
                            color="text-red-400"
                            borderColor="border-red-500/50"
                        />
                        <StrategyBtn
                            active={strategy === 'stable'}
                            onClick={() => setStrategy('stable')}
                            icon={<Anchor className="w-4 h-4" />}
                            label="稳妥"
                            sub="攻守兼备"
                            color="text-emerald-400"
                            borderColor="border-emerald-500/50"
                        />
                        <StrategyBtn
                            active={strategy === 'protect'}
                            onClick={() => setStrategy('protect')}
                            icon={<Shield className="w-4 h-4" />}
                            label="保底"
                            sub="确保录取"
                            color="text-blue-400"
                            borderColor="border-blue-500/50"
                        />
                    </div>
                </div>
            )}

            {/* Recommendation Pool (Draggable Sources) */}
            {strategy && (
                <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
                    <h3 className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
                        推荐学校池 / Pool
                    </h3>
                    <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {recommendations.map(school => (
                            <DraggableSourceCard key={school.id} school={school} />
                        ))}
                    </div>
                </div>
            )}

            {/* Volunteer Slots (Droppable Targets) */}
            <div className="space-y-2 flex-1 flex flex-col">
                <h3 className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
                    志愿表 / Volunteer List
                </h3>
                <div className="flex-1 space-y-3">
                    {slots.map((school, index) => (
                        <DroppableSlot
                            key={index}
                            index={index}
                            school={school}
                            onRemove={() => onRemoveSlot(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function StrategyBtn({ active, onClick, icon, label, sub, color, borderColor }: any) {
    return (
        <button
            onClick={onClick}
            className={`
        relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-1
        ${active
                    ? `bg-slate-800/80 ${borderColor} shadow-[0_0_15px_rgba(99,102,241,0.2)] scale-105`
                    : "bg-transparent border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                }
      `}
        >
            <div className={`${active ? color : ""}`}>{icon}</div>
            <div className={`font-bold text-sm ${active ? "text-white" : ""}`}>{label}</div>
            <div className="text-[10px] opacity-70">{sub}</div>
        </button>
    )
}

function DraggableSourceCard({ school }: { school: School }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `source-${school.id}`,
        data: { school, type: 'source' },
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
    } : undefined

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none">
            <Card className="p-2 bg-slate-800 border-slate-700 hover:border-indigo-500 cursor-grab active:cursor-grabbing">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200 text-sm truncate">{school.name}</span>
                    <span className="text-cyan-400 font-mono text-xs">{school.score}</span>
                </div>
            </Card>
        </div>
    )
}

function DroppableSlot({ index, school, onRemove }: { index: number, school: School | null, onRemove: () => void }) {
    const { setNodeRef, isOver } = useDroppable({
        id: `slot-${index}`,
        data: { index, type: 'slot' },
    })

    return (
        <div
            ref={setNodeRef}
            className={`
        relative h-14 rounded-lg border transition-all duration-300 flex items-center px-4 gap-4
        ${isOver ? "bg-indigo-900/30 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-[1.02]" : "bg-slate-900/40 border-slate-800"}
        ${school ? "border-l-4 border-l-indigo-500" : "border-l-4 border-l-slate-700"}
      `}
        >
            <span className="font-mono text-slate-600 text-lg font-bold w-6 opacity-50">
                {String(index + 1).padStart(2, '0')}
            </span>

            {school ? (
                <div className="flex-1 flex justify-between items-center animate-in fade-in zoom-in duration-300">
                    <div>
                        <div className="font-bold text-slate-100">{school.name}</div>
                        <div className="flex gap-2 text-[10px] text-slate-400">
                            <span className="text-cyan-400 font-mono">{school.score}分</span>
                            <span>{school.type === 'provincial' ? '省重' : '普高'}</span>
                        </div>
                    </div>
                    <button onClick={onRemove} className="text-slate-600 hover:text-red-400 transition-colors">
                        ✕
                    </button>
                </div>
            ) : (
                <div className="text-slate-700 text-sm font-medium italic">
                    拖入学校填报
                </div>
            )}
        </div>
    )
}
