"use client"

import { School } from "./types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SchoolTooltipProps {
    school: School
    children: React.ReactNode
}

export function SchoolTooltip({ school, children }: SchoolTooltipProps) {
    return (
        <div className="group relative">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <Card className="bg-slate-900 border-slate-700 p-3 shadow-xl text-xs">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-100 text-sm">{school.name}</span>
                        <span className="text-cyan-400 font-mono font-bold">{school.score}分</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                        {school.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[10px] px-1 h-4 bg-slate-800 text-slate-400 border-slate-700">
                                {tag}
                            </Badge>
                        ))}
                        {school.provincialKey && (
                            <Badge variant="default" className="text-[10px] px-1 h-4 bg-amber-600/20 text-amber-400 border-amber-600/50">
                                省重点
                            </Badge>
                        )}
                    </div>

                    <div className="space-y-1 border-t border-slate-800 pt-2">
                        <div className="flex justify-between text-slate-400">
                            <span>当前位次:</span>
                            <span className="text-slate-200 font-mono">{school.ranking}</span>
                        </div>
                        <div className="text-slate-500 text-[10px] mt-1">近3年分数线:</div>
                        {school.scoreLine3Years?.map(line => (
                            <div key={line.year} className="flex justify-between text-[10px] text-slate-400">
                                <span>{line.year}</span>
                                <span className="font-mono">{line.score}分 / {line.rank}位</span>
                            </div>
                        ))}
                    </div>
                </Card>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900"></div>
            </div>
        </div>
    )
}
