"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ArticleCoverImageProps {
    src?: string | null
    alt: string
    className?: string
}

export function ArticleCoverImage({ src, alt, className }: ArticleCoverImageProps) {
    const [error, setError] = useState(false)

    // 如果没有图片地址或加载失败，显示默认渐变背景
    if (!src || error) {
        return (
            <div className={cn("w-full h-full bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden", className)}>
                {/* 装饰性背景图案 */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px),
                                          linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
        )
    }

    return (
        <div className={cn("relative w-full h-full bg-muted", className)}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={() => setError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
    )
}
