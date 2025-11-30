import { School } from "./types"
import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { MapPin, Home, Utensils } from "lucide-react"

interface RightMarqueeProps {
    schools: School[]
}

export function RightMarquee({ schools }: RightMarqueeProps) {
    const controls = useAnimationControls()
    const [isPaused, setIsPaused] = useState(false)
    const [hoveredSchool, setHoveredSchool] = useState<{ school: School, y: number } | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Duplicate schools for infinite scroll
    const displaySchools = [...schools, ...schools]
    const itemHeight = 60

    useEffect(() => {
        if (!isPaused) {
            controls.start({
                y: - (schools.length * itemHeight),
                transition: {
                    duration: schools.length * 5,  // 减慢到5倍（原来是2倍）
                    ease: "linear",
                    repeat: Infinity,
                }
            })
        } else {
            controls.stop()
        }
    }, [isPaused, schools.length, controls])

    const handleMouseEnter = (school: School, e: React.MouseEvent) => {
        setIsPaused(true)
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        setHoveredSchool({ school, y: rect.top })
    }

    const handleMouseLeave = () => {
        setIsPaused(false)
        setHoveredSchool(null)
    }

    // 允许用户滚动时暂停自动滚动
    const handleScroll = () => {
        setIsPaused(true)
        // 2秒后恢复自动滚动
        setTimeout(() => setIsPaused(false), 2000)
    }

    return (
        <div className="h-full bg-slate-950 border-l border-slate-800/50 flex flex-col relative" ref={containerRef}>
            <div className="p-4 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur z-10">
                <div className="text-xs text-slate-400 font-bold tracking-wider uppercase">Live Intelligence</div>
            </div>

            <div
                className="flex-1 overflow-y-auto relative custom-scrollbar"
                ref={scrollRef}
                onScroll={handleScroll}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <motion.div
                    animate={controls}
                    className="flex flex-col"
                >
                    {displaySchools.map((school, index) => (
                        <div
                            key={`${school.id}-${index}`}
                            className="h-[60px] px-4 flex items-center justify-between border-b border-slate-800/30 hover:bg-indigo-500/10 cursor-pointer transition-colors group"
                            onMouseEnter={(e) => handleMouseEnter(school, e)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div>
                                <div className="text-sm font-bold text-slate-300 group-hover:text-indigo-300 transition-colors">{school.name}</div>
                                <div className="text-[10px] text-slate-500">{school.location || "City Center"}</div>
                            </div>
                            <div className="text-xs font-mono text-slate-500 group-hover:text-cyan-400">{school.score}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Floating Tooltip */}
            {hoveredSchool && (
                <div
                    className="fixed z-50 w-80 bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-md p-0 overflow-hidden"
                    style={{
                        top: Math.min(window.innerHeight - 300, Math.max(20, hoveredSchool.y - 100)), // Clamp to viewport
                        left: containerRef.current ? containerRef.current.getBoundingClientRect().left - 340 : 'auto' // Position to the left
                    }}
                >
                    {/* Header Image Placeholder */}
                    <div className="h-24 bg-gradient-to-r from-indigo-900 to-purple-900 relative">
                        <div className="absolute bottom-3 left-4">
                            <h3 className="text-lg font-bold text-white shadow-black drop-shadow-md">{hoveredSchool.school.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-indigo-200">
                                <MapPin className="w-3 h-3" /> {hoveredSchool.school.location || "Unknown Location"}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                            <div className="text-center flex-1 border-r border-slate-800">
                                <div className="text-[10px] text-slate-500 uppercase">Score Line</div>
                                <div className="text-xl font-mono font-bold text-cyan-400">{hoveredSchool.school.score}</div>
                            </div>
                            <div className="text-center flex-1">
                                <div className="text-[10px] text-slate-500 uppercase">Ranking</div>
                                <div className="text-xl font-mono font-bold text-amber-400">Top 10%</div>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                                <Home className="w-3 h-3 text-slate-500" />
                                <span>住宿：4-6人间，独立卫浴，有空调</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Utensils className="w-3 h-3 text-slate-500" />
                                <span>食堂：省级A级食堂，三层独立餐厅</span>
                            </div>
                        </div>

                        <div className="flex gap-2 flex-wrap pt-2 border-t border-slate-800">
                            {hoveredSchool.school.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
