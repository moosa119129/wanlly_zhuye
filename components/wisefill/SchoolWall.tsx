"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { School } from "./types"
import { Card } from "@/components/ui/card"
import { useDraggable } from "@dnd-kit/core"
import { SchoolTooltip } from "./SchoolTooltip"

interface SchoolWallProps {
    schools: School[]
    isPaused: boolean
    highlightedSchools: string[]
}

export function SchoolWall({ schools, isPaused, highlightedSchools }: SchoolWallProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const controls = useAnimationControls()
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (containerRef.current) {
            setHeight(containerRef.current.scrollHeight / 2)
        }
    }, [schools])

    useEffect(() => {
        if (highlightedSchools.length > 0) {
            controls.stop()
            // Scroll to the first highlighted school
            const firstId = highlightedSchools[0]
            const element = document.getElementById(`school-card-${firstId}`)
            if (element && containerRef.current) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        } else if (!isPaused) {
            controls.start({
                y: -height,
                transition: {
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                }
            })
        }
    }, [highlightedSchools, isPaused, height, controls])

    return (
        <div className="h-full w-full overflow-hidden relative mask-gradient">
            <motion.div
                ref={containerRef}
                animate={controls}
                onMouseEnter={() => controls.stop()}
                onMouseLeave={() => !highlightedSchools.length && controls.start({ y: -height, transition: { duration: 60, ease: "linear", repeat: Infinity } })}
                className="grid gap-4 p-4 grid-cols-3"
            >
                {schools.map((school, index) => (
                    <div id={`school-card-${school.id}`} key={`${school.id}-${index}`}>
                        <SchoolCard
                            school={school}
                            isHighlighted={highlightedSchools.includes(school.id)}
                        />
                    </div>
                ))}
                {/* Duplicate for infinite scroll effect (only needed when animating) */}
                {highlightedSchools.length === 0 && schools.map((school, index) => (
                    <div key={`dup-${school.id}-${index}`}>
                        <SchoolCard
                            school={school}
                            isHighlighted={false}
                        />
                    </div>
                ))}
            </motion.div>

            {/* Gradient Masks - Only show when scrolling (not highlighted) */}
            {highlightedSchools.length === 0 && (
                <>
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
                </>
            )}
        </div>
    )
}

function SchoolCard({ school, isHighlighted }: { school: School, isHighlighted: boolean }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `wall-${school.id}-${Math.random()}`, // Unique ID for wall items
        data: { school, type: 'wall' },
    })

    return (
        <SchoolTooltip school={school}>
            <div ref={setNodeRef} {...listeners} {...attributes} className="touch-none h-full">
                <Card
                    className={`
            p-2 h-full flex flex-col justify-between cursor-grab active:cursor-grabbing transition-all duration-500
            ${isHighlighted
                            ? 'bg-indigo-900/40 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105 z-20'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                        }
          `}
                >
                    <div className="text-center">
                        <div className={`font-bold text-xs mb-1 truncate ${isHighlighted ? 'text-indigo-300' : 'text-slate-300'}`}>
                            {school.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">{school.score}</div>
                    </div>
                </Card>
            </div>
        </SchoolTooltip>
    )
}
