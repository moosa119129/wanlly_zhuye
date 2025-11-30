import { ArrowLeft, ArrowUp, MousePointer2, Sparkles } from "lucide-react"

export function EmptyStatePlaceholder() {
    return (
        <div className="w-full h-full bg-slate-900/30 rounded-xl border border-slate-800/50 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-50" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.1 }} />

            <div className="relative z-10 max-w-md space-y-8">
                {/* Welcome Header */}
                <div className="space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 mb-4 ring-4 ring-indigo-500/10">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">欢迎使用 WiseFill 志愿智填</h2>
                    <p className="text-slate-400 text-sm">只需三步，为您生成科学的志愿填报方案</p>
                </div>

                {/* 3-Step Guide */}
                <div className="grid gap-4 text-left">
                    {/* Step 1 */}
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</div>
                        <div className="flex-1">
                            <h3 className="text-slate-200 font-medium flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4 text-blue-400 animate-pulse" />
                                输入分数
                            </h3>
                            <p className="text-xs text-slate-500">在左上角输入考生的中考估分或实分</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">2</div>
                        <div className="flex-1">
                            <h3 className="text-slate-200 font-medium flex items-center gap-2">
                                <ArrowUp className="w-4 h-4 text-purple-400" />
                                选择策略
                            </h3>
                            <p className="text-xs text-slate-500">点击上方卡片，选择“冲刺/稳健/保底”策略</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</div>
                        <div className="flex-1">
                            <h3 className="text-slate-200 font-medium flex items-center gap-2">
                                拖拽调整
                                <MousePointer2 className="w-4 h-4 text-emerald-400" />
                            </h3>
                            <p className="text-xs text-slate-500">从右侧列表或下方推荐池拖拽学校至志愿栏</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
