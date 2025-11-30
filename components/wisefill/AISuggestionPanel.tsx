import { School } from "./types"
import { Card } from "@/components/ui/card"
import { useDraggable } from "@dnd-kit/core"
import { SchoolTooltip } from "./SchoolTooltip"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

interface AISuggestionPanelProps {
    suggestions: School[]
    aiText: string
}

export function AISuggestionPanel({ suggestions, aiText }: AISuggestionPanelProps) {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        setDisplayedText("")
        let i = 0
        const timer = setInterval(() => {
            if (i < aiText.length) {
                setDisplayedText(prev => prev + aiText.charAt(i))
                i++
            } else {
                clearInterval(timer)
            }
        }, 20)
        return () => clearInterval(timer)
    }, [aiText])

    return (
        <div className="h-full grid grid-cols-1 md:grid-cols-[1fr_240px] gap-4">
            {/* Left: AI Text Analysis */}
            <div className="bg-slate-900/50 border border-indigo-500/20 rounded-xl p-4 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                <div className="flex items-center gap-2 mb-3 text-indigo-400 text-xs font-bold uppercase tracking-wider shrink-0">
                    <Sparkles className="w-3 h-3" />
                    AI Strategy Insight
                </div>
                <div className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap overflow-y-auto custom-scrollbar flex-1">
                    {displayedText}
                    <span className="animate-pulse inline-block w-1.5 h-3 bg-indigo-500 ml-1 align-middle" />
                </div>
            </div>

            {/* Right: Mini Suggestion Pool */}
            <div className="flex flex-col min-h-0">
                <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 flex justify-between">
                    <span>Top Alternatives</span>
                    <span className="bg-slate-800 px-1.5 rounded text-slate-400">{suggestions.length}</span>
                </h4>
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                    {suggestions.map(school => (
                        <DraggableMiniCard key={school.id} school={school} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function DraggableMiniCard({ school }: { school: School }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `pool-${school.id}`,
        data: { school, type: 'source' }
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
    } : undefined

    return (
        <SchoolTooltip school={school}>
            <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none">
                <Card className="p-2 bg-slate-800/50 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800 cursor-grab active:cursor-grabbing group transition-all flex justify-between items-center">
                    <div className="truncate flex-1 mr-2">
                        <div className="font-bold text-slate-300 text-xs truncate group-hover:text-indigo-300 transition-colors">{school.name}</div>
                    </div>
                    <div className="text-cyan-400 font-mono text-[10px] font-bold bg-cyan-950/30 px-1.5 py-0.5 rounded">
                        {school.score}
                    </div>
                </Card>
            </div>
        </SchoolTooltip>
    )
}
