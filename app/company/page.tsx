import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Target, Brain, Shield, Zap } from "lucide-react";
import GrowthModel from "@/components/GrowthModel";

export default function CompanyPage() {
    return (
        <div className="min-h-screen">
            <div className="relative z-10">
                {/* Header Section */}
                <header className="container mx-auto px-6 py-20 md:py-32 text-center">
                    <div className="flex justify-center mb-8">
                        <img
                            src="/company-logo.png"
                            alt="LightYear Algorithm Logo"
                            className="h-20 md:h-24 w-auto object-contain"
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
                        关于我们
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide uppercase">
                        About LightYear Algorithm
                    </p>
                </header>

                {/* 01. Brand Vision */}
                <section className="container mx-auto px-6 py-16 md:py-24 border-t border-white/10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-yellow-400">
                                <span className="text-sm font-mono tracking-widest">01.</span>
                                <span className="text-sm font-bold tracking-widest uppercase">Brand Vision | 品牌愿景</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                                <span className="text-yellow-400">内修算力</span>，外决前程
                            </h2>
                            <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                                <p>
                                    在信息爆炸与教育焦虑并存的时代，家庭教育往往陷入“盲卷”的困境：海量的信息是噪音，无序的努力是内耗。
                                </p>
                                <p>
                                    <strong className="text-white">光年算法 (LightYear Algorithm)</strong> 是一家专注于K12阶段的新媒体教育咨询服务机构。我们拒绝贩卖焦虑，主张用数据的尺度丈量未来。我们的存在，是为了在混乱的升学信息中为您做“熵减”，在漫长的成长跑道上为您寻找“最优解”。
                                </p>
                                <blockquote className="border-l-4 border-yellow-400 pl-6 py-2 text-2xl font-medium text-white italic">
                                    我们相信：教育不是博弈，是精密的规划与进化。
                                </blockquote>
                            </div>
                        </div>
                        <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 group">
                            <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                                src="/company_tech_lines.png"
                                alt="Rising Trend Lines"
                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </section>

                {/* 02. Core Philosophy */}
                <section className="bg-slate-900/50 py-16 md:py-24">
                    <div className="container mx-auto px-6">
                        <div className="mb-16">
                            <div className="flex items-center gap-4 text-yellow-400 mb-6">
                                <span className="text-sm font-mono tracking-widest">02.</span>
                                <span className="text-sm font-bold tracking-widest uppercase">Core Philosophy | 核心理念</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                                50% 远见 (Light Year) + 50% 方法 (Algorithm)
                            </h2>
                            <p className="text-xl text-slate-300 max-w-3xl">
                                不同于传统的单一补习或纯粹的中介咨询，光年算法坚持“双轮驱动”的教育模型：
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Card 1: Light Year */}
                            <div className="bg-slate-800/50 p-10 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group">
                                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500/30 transition-colors">
                                    <Target className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">光年 (Light Year)</h3>
                                <p className="text-lg text-blue-200 mb-4">—— 升学规划的广度</p>
                                <p className="text-slate-400 leading-relaxed">
                                    我们拥有连接“光年”的视野。从中考政策解读到长远升学路径设计，我们帮您跳出当下的分数困局，以终为始，预见孩子的长远前程。
                                </p>
                            </div>

                            {/* Card 2: Algorithm */}
                            <div className="bg-slate-800/50 p-10 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all group">
                                <div className="w-14 h-14 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-yellow-500/30 transition-colors">
                                    <Brain className="w-8 h-8 text-yellow-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">算法 (Algorithm)</h3>
                                <p className="text-lg text-yellow-200 mb-4">—— 学习能力的精度</p>
                                <p className="text-slate-400 leading-relaxed">
                                    我们通过科学的训练体系，提升孩子的核心“算力”（学习力）。通过拆解学习习惯、优化思维模型，让每一次努力都有算法加持，让每一滴汗水都算数。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Growth Model Visualization */}
                <section className="container mx-auto px-6 py-16 md:py-24">
                    <GrowthModel />
                </section>

                {/* 03. Service Roles */}
                <section className="container mx-auto px-6 py-16 md:py-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/20 group">
                            <div className="absolute inset-0 bg-purple-600/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                                src="/company_brain_network.png"
                                alt="Brain Network"
                                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="order-1 lg:order-2 space-y-10">
                            <div>
                                <div className="flex items-center gap-4 text-yellow-400 mb-6">
                                    <span className="text-sm font-mono tracking-widest">03.</span>
                                    <span className="text-sm font-bold tracking-widest uppercase">Our Roles | 服务角色</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-white mb-6">
                                    重构家庭教育的<br />“精密作战单元”
                                </h2>
                                <p className="text-lg text-slate-300">
                                    我们将复杂的家庭教育拆解为科学的协作分工，让每一个家庭成员都能在正确的位置上发挥最大价值：
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="mt-1">
                                        <Shield className="w-6 h-6 text-yellow-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">对于妈妈，我们是「<span className="text-yellow-400">情报过滤器</span>」</h4>
                                        <p className="text-slate-400 leading-relaxed">
                                            我们深知您搜集信息的辛苦。我们利用大数据为您清洗海量资讯，去伪存真，只提供高价值的决策情报，让您不再被谣言和焦虑裹挟。
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="mt-1">
                                        <Target className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">对于爸爸，我们是「升学战略部」</h4>
                                        <p className="text-slate-400 leading-relaxed">
                                            我们理解您对理性的追求。我们提供可视化的数据模型和推演逻辑，辅助您制定最适合孩子的战略决策，做孩子人生路上的定海神针。
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="mt-1">
                                        <Zap className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2">对于孩子，我们是「学习进化论」</h4>
                                        <p className="text-slate-400 leading-relaxed">
                                            我们不是监工，而是顾问。我们传授高效的“大脑算法”，帮助孩子提升内功，在学业的丛林中实现自我进化与突围。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 04. Brand Promise & Footer */}
                <section className="bg-gradient-to-b from-slate-900 to-black py-20 md:py-32 text-center border-t border-white/10">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto space-y-10">
                            <div className="flex items-center justify-center gap-4 text-yellow-400 mb-4">
                                <span className="text-sm font-mono tracking-widest">04.</span>
                                <span className="text-sm font-bold tracking-widest uppercase">Our Promise | 品牌承诺</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                在光年算法，我们不相信运气，<br />我们相信逻辑。
                            </h2>

                            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                                我们致力于成为那个撬动未来的支点，用理性的光芒，照亮孩子通往光年的征途。
                            </p>

                            <div className="py-10">
                                <p className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                                    让努力有算法，让未来有方向。
                                </p>
                            </div>

                            <div className="pt-16 border-t border-white/10 mt-16 text-left md:text-center">
                                <div className="inline-block text-left bg-slate-800/50 p-8 rounded-2xl border border-white/5">
                                    <h3 className="text-xl font-bold text-white mb-4 tracking-wider">LIGHTYEAR ALGORITHM</h3>
                                    <ul className="space-y-3 text-slate-300">
                                        <li className="flex flex-col md:flex-row md:items-center gap-2">
                                            <span className="text-slate-500 uppercase text-sm font-bold w-24">中文名</span>
                                            <span className="font-medium">光年算法</span>
                                        </li>
                                        <li className="flex flex-col md:flex-row md:items-center gap-2">
                                            <span className="text-slate-500 uppercase text-sm font-bold w-24">定位</span>
                                            <span className="font-medium">家庭教育的数据外脑与决策罗盘</span>
                                        </li>
                                        <li className="flex flex-col md:flex-row md:items-center gap-2">
                                            <span className="text-slate-500 uppercase text-sm font-bold w-24">主营</span>
                                            <span className="font-medium">升学规划咨询 / 青少年学习力提升训练</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
