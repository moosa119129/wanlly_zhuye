import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface WelcomeModalProps {
    isOpen: boolean
    onClose: () => void
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl bg-slate-950 border-slate-800 p-0 overflow-hidden">
                <div className="relative h-full flex flex-col">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 pointer-events-none" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="p-8 relative z-10 flex flex-col items-center text-center space-y-8">
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30"
                        >
                            <span className="text-5xl">🎓</span>
                        </motion.div>

                        {/* Title & Description */}
                        <div className="space-y-4">
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-black text-white tracking-tight"
                            >
                                欢迎使用 WiseFill
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed"
                            >
                                您的中考志愿智能填报助手。
                                <br />
                                基于大数据分析，为您提供科学、精准的志愿填报建议。
                            </motion.p>
                        </div>

                        {/* Features Grid */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-3 gap-4 w-full"
                        >
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-2xl mb-2">📊</div>
                                <div className="text-sm font-bold text-slate-200">智能分析</div>
                                <div className="text-xs text-slate-500">基于历年数据</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-2xl mb-2">🎯</div>
                                <div className="text-sm font-bold text-slate-200">策略推荐</div>
                                <div className="text-xs text-slate-500">冲稳保科学配比</div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <div className="text-2xl mb-2">📑</div>
                                <div className="text-sm font-bold text-slate-200">生成报告</div>
                                <div className="text-xs text-slate-500">一键导出方案</div>
                            </div>
                        </motion.div>

                        {/* Action Button */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="w-full pt-4"
                        >
                            <Button
                                onClick={onClose}
                                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-lg font-bold shadow-lg shadow-indigo-500/25"
                            >
                                开始规划未来 🚀
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
