import React from "react";

export default function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        </div>
    );
}
