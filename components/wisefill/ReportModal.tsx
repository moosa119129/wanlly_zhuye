import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { School, UserProfile } from "./types"
import { FileText, Download, CheckCircle } from "lucide-react"
import { useState } from "react"

interface ReportModalProps {
    isOpen: boolean
    onClose: () => void
    slots: (School | null)[]
    userProfile: UserProfile | null
    score: number
}

export function ReportModal({ isOpen, onClose, slots, userProfile, score }: ReportModalProps) {
    const [isDownloading, setIsDownloading] = useState(false)
    const [isDownloaded, setIsDownloaded] = useState(false)

    const handleDownload = () => {
        setIsDownloading(true)
        // Mock download delay
        setTimeout(() => {
            setIsDownloading(false)
            setIsDownloaded(true)
            setTimeout(() => {
                setIsDownloaded(false)
                onClose()
            }, 2000)
        }, 1500)
    }

    const filledSlots = slots.filter(s => s !== null) as School[]

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <FileText className="w-5 h-5 text-indigo-400" />
                        志愿填报方案书预览
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        考生：{userProfile?.name} | 分数：{score}分 | 志愿数：{filledSlots.length}/8
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                        <h4 className="text-sm font-bold text-slate-300 mb-3">志愿清单</h4>
                        <div className="space-y-2">
                            {slots.map((school, index) => (
                                <div key={index} className="flex items-center text-sm border-b border-slate-800/50 last:border-0 pb-2 last:pb-0">
                                    <span className="w-8 text-slate-500 font-mono">{String(index + 1).padStart(2, '0')}</span>
                                    {school ? (
                                        <>
                                            <span className="flex-1 text-slate-200">{school.name}</span>
                                            <span className="text-slate-400 font-mono text-xs">{school.score}分</span>
                                        </>
                                    ) : (
                                        <span className="text-slate-600 italic">未填报</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-indigo-900/10 rounded-lg p-4 border border-indigo-500/20">
                        <h4 className="text-sm font-bold text-indigo-300 mb-2">AI 推荐语</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            该方案采用了较为稳健的策略，前3个志愿充分利用了分数优势进行冲击，中间志愿确保了较高的录取概率，保底志愿选择合理。建议确认学校代码无误后提交。
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white">
                        取消
                    </Button>
                    <Button
                        onClick={handleDownload}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white min-w-[140px]"
                        disabled={isDownloading || isDownloaded}
                    >
                        {isDownloading ? (
                            "生成中..."
                        ) : isDownloaded ? (
                            <><CheckCircle className="w-4 h-4 mr-2" /> 下载完成</>
                        ) : (
                            <><Download className="w-4 h-4 mr-2" /> 确认下载 PDF</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
