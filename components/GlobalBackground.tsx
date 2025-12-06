"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function GlobalBackground() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/bg-robot.png"
                    alt="Background"
                    className={cn(
                        "w-full h-full object-cover transition-all duration-700 ease-in-out",
                        // Subpages: Zoom in (scale-150) and anchor to left (object-left) to hide the robot
                        // Home: Normal view
                        !isHome && "scale-150 object-left"
                    )}
                />

                {/* Overlays */}
                {isHome ? (
                    <>
                        {/* Home: Gradient overlay for text readability on left, clear on right */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    </>
                ) : (
                    <>
                        {/* Subpages: Stronger uniform overlay for better content readability */}
                        <div className="absolute inset-0 bg-slate-950/80" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-blue-950/20 to-slate-950/90" />
                    </>
                )}
            </div>
        </div>
    );
}
