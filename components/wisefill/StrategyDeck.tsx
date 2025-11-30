import { Strategy } from "./types"
import { Button } from "@/components/ui/button"
import { Rocket, Shield, Anchor } from "lucide-react"
import { cn } from "@/lib/utils"

interface StrategyDeckProps {
    currentStrategy: Strategy
    onSelect: (strategy: Strategy) => void
    disabled: boolean
}

export function StrategyDeck({ currentStrategy, onSelect, disabled }: StrategyDeckProps) {
    const strategies = [
        { id: 'rush', name: '冲刺型', icon: Rocket, desc: '激进策略', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
        { id: 'stable', name: '稳健型', icon: Anchor, desc: '平衡策略', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
        { id: 'protect', name: '保底型', icon: Shield, desc: '安全策略', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    ] as const

    return (
        <div className="grid grid-cols-3 gap-3">
            {strategies.map((s) => {
                const isSelected = currentStrategy === s.id
                const Icon = s.icon
                return (
                    <button
                        key={s.id}
                        onClick={() => onSelect(s.id)}
                        disabled={disabled}
                        className={cn(
                            "relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center gap-1.5 group",
                            s.bg,
                            s.border,
                            isSelected ? "ring-2 ring-offset-2 ring-offset-slate-950 ring-white/20 scale-[1.02]" : "hover:scale-[1.02] opacity-70 hover:opacity-100",
                            disabled && "opacity-30 cursor-not-allowed hover:scale-100"
                        )}
                    >
                        <Icon className={cn("w-5 h-5", s.color)} />
                        <div className="text-xs font-bold text-slate-200">{s.name}</div>
                        <div className="text-[9px] text-slate-400">{s.desc}</div>
                    </button>
                )
            })}
        </div>
    )
}
