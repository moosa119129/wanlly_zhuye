import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface FilingSimulationModalProps {
    isOpen: boolean
    onClose: () => void
}

export function FilingSimulationModal({ isOpen, onClose }: FilingSimulationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col p-0 bg-slate-950 border-slate-800">
                <DialogHeader className="px-6 py-4 border-b border-slate-800 shrink-0">
                    <DialogTitle className="text-slate-100">中考投档模拟系统</DialogTitle>
                </DialogHeader>
                <div className="flex-1 w-full h-full overflow-hidden bg-white">
                    <iframe
                        src="/toudang.html"
                        className="w-full h-full border-0"
                        title="中考投档模拟演练"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
