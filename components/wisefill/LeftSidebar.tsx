import { School, UserProfile } from "./types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotateCcw, TrendingUp } from "lucide-react"
import { useDroppable } from "@dnd-kit/core"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LeftSidebarProps {
    userProfile: UserProfile | null
    score: number | ""
    setScore: (score: number | "") => void
    ranking: number
    slots: (School | null)[]
    onRemoveSlot: (index: number) => void
    onReset: () => void
    onGenerateReport: () => void
    onOpenSimulation: () => void
}

export function LeftSidebar({
    userProfile,
    score,
    setScore,
    ranking,
    slots,
    onRemoveSlot,
    onReset,
    onGenerateReport,
    onOpenSimulation
}: LeftSidebarProps) {
    return (
        <div className="h-full flex flex-col bg-slate-900/50 backdrop-blur-md border-r border-slate-800/50">
            {/* Header / User Info */}
            <div className="shrink-0 p-2 border-b border-slate-800/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-indigo-500/20">
                        {userProfile ? userProfile.name[0] : "G"}
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-100">{userProfile ? userProfile.name : "Guest"}</div>
                        <div className="text-[9px] text-slate-400 font-mono">{userProfile ? userProfile.phone : ""}</div>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onReset} className="h-6 w-6 text-slate-500 hover:text-white hover:bg-slate-800" title="重置">
                    <RotateCcw className="w-3 h-3" />
                </Button>
            </div>

            {/* Score & Rank */}
            <div className="shrink-0 p-3 space-y-3">
                <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">Score / 分数</label>
                    <div className="relative">
                        <Input
                            type="number"
                            placeholder="输入分数..."
                            className={`bg-slate-900 border-slate-700 text-xl font-mono font-bold h-12 text-center tracking-widest focus:ring-indigo-500 focus:border-indigo-500 transition-all ${!score ? 'border-indigo-500/50 ring-2 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-pulse' : ''
                                }`}
                            value={score}
                            onChange={(e) => {
                                const val = e.target.value
                                if (val === '' || (Number(val) >= 0 && Number(val) <= 750)) {
                                    setScore(val === '' ? '' : Number(val))
                                }
                            }}
                        />
                        {!score && (
                            <div className="absolute -right-2 -top-2 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold tracking-wider uppercase flex items-center gap-1">
                        Rank / 位次
                        <TrendingUp className="w-2 h-2 text-emerald-400" />
                    </label>
                    <div className="text-lg font-mono font-bold text-amber-400">
                        {score && Number(score) >= 400 ? ranking.toLocaleString() : "---"}
                    </div>
                    {score && Number(score) < 400 && (
                        <div className="text-[8px] text-red-400">分数过低，无法获取位次</div>
                    )}
                </div>
            </div>

            {/* Volunteer Slots - 固定高度 */}
            <div className="h-[400px] overflow-y-auto px-2 py-1 space-y-1.5 custom-scrollbar">
                <div className="text-[9px] text-slate-500 font-bold tracking-wider uppercase mb-1">Volunteer Slots</div>
                {slots.map((school, index) => (
                    <Slot key={index} index={index} school={school} onRemove={() => onRemoveSlot(index)} />
                ))}
            </div>

            {/* Generate Report Button - 固定在底部 */}
            <div className="shrink-0 p-2 border-t border-slate-800/50 bg-slate-900/30 space-y-2">
                <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 h-10 text-xs font-bold"
                    onClick={onGenerateReport}
                    disabled={!score || slots.every(s => s === null)}
                >
                    📄 生成方案书
                </Button>
                <Button
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 h-10 text-xs font-bold"
                    onClick={onOpenSimulation}
                >
                    🎯 投档模拟系统
                </Button>
            </div>
        </div>
    )
}

function Slot({ index, school, onRemove }: { index: number, school: School | null, onRemove: () => void }) {
    const { setNodeRef, isOver } = useDroppable({
        id: `slot-${index}`,
        data: { type: 'slot', index }
    })

    return (
        <div ref={setNodeRef} className="relative group">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-600 w-3 text-right">
                {String(index + 1).padStart(2, '0')}
            </div>

            {school ? (
                <motion.div
                    layoutId={`slot-card-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-800/80 border border-indigo-500/30 rounded-lg p-2 shadow-lg relative overflow-hidden group-hover:border-indigo-500/60 transition-colors"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="font-bold text-xs text-slate-200">{school.name}</div>
                            <div className="text-[9px] text-slate-400 font-mono">CODE: {school.id}</div>
                        </div>
                        <div className="text-[10px] font-bold text-cyan-400 font-mono">{school.score}</div>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                        className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-red-400 transition-opacity text-sm"
                    >
                        ×
                    </button>
                </motion.div>
            ) : (
                <div className={cn(
                    "h-[50px] border-2 border-dashed border-slate-800 rounded-lg flex items-center justify-center text-[10px] text-slate-600 transition-colors",
                    isOver ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400" : "hover:border-slate-700"
                )}>
                    Drop Here
                </div>
            )}
        </div>
    )
}
