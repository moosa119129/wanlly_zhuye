import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CompanyPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
            <section className="flex-1 py-12 md:py-24 lg:py-32 relative overflow-hidden">
                {/* Background Layers (Consistent with Homepage) */}
                <div className="absolute inset-0 z-0">
                    <div className="h-full w-full bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20" />
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8) 1px, transparent 1px),
                                              linear-gradient(90deg, rgba(59, 130, 246, 0.8) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}
                    />
                </div>

                <div className="container px-4 md:px-6 relative z-10 max-w-3xl mx-auto">
                    <div className="mb-8">
                        <Button asChild variant="ghost" className="text-blue-200 hover:text-white hover:bg-blue-800/50">
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                返回首页
                            </Link>
                        </Button>
                    </div>

                    <div className="bg-slate-900/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-blue-900/50">
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-400/50 shadow-lg shrink-0">
                                <img
                                    src="/avatar.png"
                                    alt="LightYear Algorithm"
                                    className="object-cover w-full h-full scale-110 object-[center_20%]"
                                />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">关于光年算法</h1>
                                <p className="text-xl text-blue-300 font-medium">LightYear Algorithm</p>
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-6">
                            <p>
                                大家好，这里是光年算法（LightYear Algorithm）。
                            </p>
                            <p>
                                我们致力于用数据和技术解决教育中的实际问题。创建这个平台的初衷，是希望通过可视化的数据和智能化的工具，帮助家长和学生们在升学规划的道路上少走弯路，做出更明智的决策。
                            </p>
                            <p>
                                在这里，你可以找到关于中考投档的模拟演练系统，以及对教育数据的深度分析和见解。我们相信，数据不仅仅是冰冷的数字，它们背后隐藏着通往未来的线索。
                            </p>
                            <p>
                                如果你有任何问题或建议，欢迎通过 Bilibili 或其他方式联系我们。让我们一起探索 AI 与教育的无限可能。
                            </p>
                        </div>

                        {/* Contact & Social Section */}
                        <div className="mt-12 pt-8 border-t border-blue-500/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Left Column: Contact & Social Text */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                            <span className="text-blue-400">📧</span> 联系邮箱
                                        </h3>
                                        <p className="text-blue-200 text-lg">wanlly@example.com</p>
                                    </div>

                                    <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-500/30">
                                        <h3 className="text-xl font-semibold text-white mb-3">全网同名搜索</h3>
                                        <p className="text-2xl font-bold text-blue-300 mb-4">“面面的爸爸”</p>
                                        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                                            <span className="px-3 py-1 bg-pink-900/40 text-pink-300 rounded-full border border-pink-500/30">Bilibili</span>
                                            <span className="px-3 py-1 bg-slate-700/60 text-white rounded-full border border-slate-500/30">抖音</span>
                                            <span className="px-3 py-1 bg-orange-900/40 text-orange-300 rounded-full border border-orange-500/30">视频号</span>
                                            <span className="px-3 py-1 bg-red-900/40 text-red-300 rounded-full border border-red-500/30">小红书</span>
                                        </div>
                                    </div>

                                    <Button asChild size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50 transition-all">
                                        <Link href="https://space.bilibili.com/284427802" target="_blank">
                                            在 Bilibili 关注我
                                        </Link>
                                    </Button>
                                </div>

                                {/* Right Column: QR Code */}
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="bg-white p-3 rounded-xl shadow-lg max-w-[280px]">
                                        <img
                                            src="/wechat_qr.png"
                                            alt="扫一扫加我微信"
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                    <p className="text-slate-400 mt-3 text-sm text-center md:text-left w-full max-w-[280px]">
                                        扫一扫上面的二维码图案，加我为朋友
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
