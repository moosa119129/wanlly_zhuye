import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

interface AIInsightBoxProps {
    text: string
}

export function AIInsightBox({ text }: AIInsightBoxProps) {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        setDisplayedText("")
        let i = 0
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i))
                i++
            } else {
                clearInterval(timer)
            }
        }, 30) // Typewriter speed

        return () => clearInterval(timer)
    }, [text])

    return (
        <div className="bg-slate-900/50 border border-indigo-500/20 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
            <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                AI Insight
            </div>
            <div className="text-sm text-slate-300 font-mono leading-relaxed min-h-[60px] whitespace-pre-wrap">
                {displayedText}
                <span className="animate-pulse inline-block w-1.5 h-3 bg-indigo-500 ml-1 align-middle" />
            </div>
        </div>
    )
}
