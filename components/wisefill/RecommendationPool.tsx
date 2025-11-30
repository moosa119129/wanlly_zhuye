import { School } from "./types"
import { Card } from "@/components/ui/card"
import { useDraggable } from "@dnd-kit/core"
import { SchoolTooltip } from "./SchoolTooltip"

interface RecommendationPoolProps {
    schools: School[]
    isLoading?: boolean
}

export function RecommendationPool({ schools, isLoading }: RecommendationPoolProps) {
    if (isLoading) {
        return <div className="text-slate-500 text-center py-10">Calculating...</div>
    }

    if (schools.length === 0) {
        return <div className="text-slate-600 text-center py-10 text-sm">请输入分数以获取推荐</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto custom-scrollbar pr-2 h-full content-start">
            {schools.map(school => (
                <DraggableCard key={school.id} school={school} />
            ))}
        </div>
    )
}

function DraggableCard({ school }: { school: School }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `pool-${school.id}`,
        data: { school, type: 'source' }
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
    } : undefined

    // Mock probability based on score (just for visual)
    const probability = Math.random() * 100

    return (
        <SchoolTooltip school={school}>
            <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="touch-none h-full">
                <Card className="p-3 bg-slate-800/50 border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800 cursor-grab active:cursor-grabbing group transition-all h-full backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-200 text-sm group-hover:text-indigo-300 transition-colors truncate">{school.name}</span>
                        <span className="text-cyan-400 font-mono text-xs font-bold">{school.score}</span>
                    </div>

                    {/* Probability Bar */}
                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden mb-2">
                        <div
                            className={`h-full ${probability > 80 ? 'bg-emerald-500' : probability > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${probability}%` }}
                        />
                    </div>

                    <div className="flex gap-1 flex-wrap">
                        {school.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] bg-slate-900/50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-700/50">
                                {tag}
                            </span>
                        ))}
                    </div>
                </Card>
            </div>
        </SchoolTooltip>
    )
}
