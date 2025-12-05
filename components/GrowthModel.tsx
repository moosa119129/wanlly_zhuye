"use client";

import React from "react";
import { Compass, Map, Zap, Wrench, Brain, School, Home, Users, Search, Target, ChevronUp } from "lucide-react";

export default function GrowthModel() {
    return (
        <div className="w-full relative overflow-hidden bg-[#050b14] rounded-3xl border border-white/10 p-8 md:p-12">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/cyberpunk-bg.png')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050b14] via-transparent to-[#050b14]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[length:30px_30px] opacity-20"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-12">
                <header className="text-center relative">
                    <div className="absolute -inset-4 bg-[#00f3ff]/20 blur-3xl rounded-full opacity-20"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wider drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                        <span className="text-[#00f3ff]">LIGHTYEAR</span> ALGORITHM
                    </h2>
                    <p className="text-[#00f3ff]/80 text-sm md:text-lg tracking-[0.5em] uppercase font-mono">Holographic Growth Model</p>
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent mx-auto mt-4"></div>
                </header>

                {/* Top Section: Inputs (Unified Container) */}
                <div className="w-full relative border-2 border-[#00f3ff]/30 rounded-3xl p-8 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                    {/* Label for the Unified Box */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#050b14] px-6 py-1 border border-[#00f3ff]/30 rounded-full text-[#00f3ff] font-mono text-xs tracking-widest shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                        GROWTH FACTORS
                    </div>

                    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8">

                        {/* Left Column: Internal (Inverted Pyramid) */}
                        <div className="flex-1 flex flex-col items-center z-10 relative group">
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 border-b-2 border-[#00f3ff] pb-2 px-4">
                                <Brain className="text-[#00f3ff] animate-pulse w-6 h-6" />
                                <span>内因 · 个体</span>
                                <span className="text-xs text-gray-400 font-normal ml-2 font-mono">INTERNAL</span>
                            </h3>

                            <div className="flex flex-col items-center w-full space-y-4">
                                {/* Container for 4 Layers */}
                                <div className="w-full bg-black/20 border border-white/10 rounded-xl p-4 space-y-2 relative">
                                    {/* Layer 1: Dao */}
                                    <div className="w-full bg-white/5 border border-white/5 p-3 rounded-lg border-l-4 border-l-[#ffd700] relative overflow-hidden hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <Compass size={20} className="text-[#ffd700]" />
                                                <div>
                                                    <h4 className="text-md font-bold text-[#ffd700]">道 · 愿景</h4>
                                                    <p className="text-[10px] text-gray-400">Vision / Mission / Values</p>
                                                </div>
                                            </div>
                                            <div className="text-right hidden md:block">
                                                <span className="text-xs text-gray-300">目标 / 使命 / 价值观</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center"><ChevronUp className="text-[#00f3ff]/30 w-3 h-3" /></div>

                                    {/* Layer 2: Fa */}
                                    <div className="w-full bg-white/5 border border-white/5 p-3 rounded-lg border-l-4 border-l-[#00f3ff] relative overflow-hidden hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <Map size={20} className="text-[#00f3ff]" />
                                                <div>
                                                    <h4 className="text-md font-bold text-[#00f3ff]">法 · 规划</h4>
                                                    <p className="text-[10px] text-gray-400">Strategy & Logic</p>
                                                </div>
                                            </div>
                                            <div className="text-right hidden md:block">
                                                <span className="text-xs text-gray-300">升学路径 / 逻辑层次</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center"><ChevronUp className="text-[#00f3ff]/30 w-3 h-3" /></div>

                                    {/* Layer 3: Shu */}
                                    <div className="w-full bg-white/5 border border-white/5 p-3 rounded-lg border-l-4 border-l-purple-500 relative overflow-hidden hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <Zap size={20} className="text-purple-400" />
                                                <div>
                                                    <h4 className="text-md font-bold text-purple-400">术 · 能力</h4>
                                                    <p className="text-[10px] text-gray-400">Core Competence</p>
                                                </div>
                                            </div>
                                            <div className="text-right hidden md:block">
                                                <span className="text-xs text-gray-300">动力 / 执行力 / 习惯</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center"><ChevronUp className="text-[#00f3ff]/30 w-3 h-3" /></div>

                                    {/* Layer 4: Qi */}
                                    <div className="w-full bg-white/5 border border-white/5 p-3 rounded-lg border-l-4 border-l-green-400 relative overflow-hidden hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <Wrench size={20} className="text-green-400" />
                                                <div>
                                                    <h4 className="text-md font-bold text-green-400">器 · 工具</h4>
                                                    <p className="text-[10px] text-gray-400">Tools & Systems</p>
                                                </div>
                                            </div>
                                            <div className="text-right hidden md:block">
                                                <span className="text-xs text-gray-300">手册 / 课程 / 系统</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center"><ChevronUp className="text-[#00f3ff]/30 w-4 h-4" /></div>

                                {/* Layer 5: Cornerstone */}
                                <div className="w-full bg-gradient-to-r from-[#00f3ff]/20 to-purple-500/20 border border-[#ffd700]/50 p-4 rounded-xl text-center shadow-[0_0_15px_rgba(255,215,0,0.2)] animate-[float_6s_ease-in-out_infinite]">
                                    <h4 className="text-lg font-bold text-[#ffd700] flex items-center justify-center gap-2"><Brain size={20} />基石 · 5维算力</h4>
                                    <p className="text-xs text-gray-300 mt-1">注意力 / 记忆 / 思维 / 观察 / 空间</p>
                                </div>
                            </div>
                        </div>

                        {/* Middle Column: Interaction Flow & Decoder */}
                        <div className="w-full lg:w-1/4 flex flex-col justify-center items-center relative z-0 py-8 lg:py-0 gap-8">

                            {/* Decoder */}
                            <div className="relative w-full">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#00f3ff] via-purple-500 to-[#00f3ff] rounded-lg opacity-30 blur"></div>
                                <div className="relative bg-black/80 border border-white/10 p-4 rounded-lg text-center backdrop-blur-md">
                                    <div className="text-[#ffd700] font-bold mb-2 flex items-center justify-center gap-2"><Search size={16} />关系解码器</div>
                                    <div className="flex flex-col gap-2 text-sm">
                                        <span className="bg-[#00f3ff]/20 px-3 py-1 rounded text-[#00f3ff]">DISC (外显)</span>
                                        <span className="text-gray-500 text-xs">+</span>
                                        <span className="bg-purple-500/20 px-3 py-1 rounded text-purple-400">MBTI (内化)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Interaction Node (Dynamic Animation) */}
                            <div className="relative flex items-center justify-center w-32 h-32">
                                {/* Orbiting Particles */}
                                <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#00f3ff] rounded-full blur-[2px] shadow-[0_0_10px_#00f3ff]"></div>
                                </div>
                                <div className="absolute inset-0 animate-[spin_4s_linear_infinite_reverse]">
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full blur-[2px] shadow-[0_0_10px_#a855f7]"></div>
                                </div>

                                {/* Central Core */}
                                <div className="relative z-10 bg-black/80 border border-white/20 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                </div>

                                <div className="absolute -bottom-6 text-white/50 font-mono text-[10px] tracking-widest">INTERACTION</div>
                            </div>

                        </div>

                        {/* Right Column: External (Environment) */}
                        <div className="flex-1 flex flex-col items-center z-10">
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3 border-b-2 border-purple-500 pb-2 px-4">
                                <School className="text-purple-400 animate-pulse w-6 h-6" />
                                <span>外因 · 环境</span>
                                <span className="text-xs text-gray-400 font-normal ml-2 font-mono">EXTERNAL</span>
                            </h3>

                            <div className="w-full space-y-4 h-full flex flex-col justify-center">
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl border-l-4 border-l-purple-500 flex items-center gap-4 group hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
                                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/40 transition-colors">
                                        <School className="text-2xl text-purple-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">学校环境</h4>
                                        <p className="text-xs text-gray-400">School Environment</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl border-l-4 border-l-purple-500 flex items-center gap-4 group hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
                                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/40 transition-colors">
                                        <Home className="text-2xl text-purple-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">家庭环境</h4>
                                        <p className="text-xs text-gray-400">Family Environment</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl border-l-4 border-l-purple-500 flex items-center gap-4 group hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
                                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/40 transition-colors">
                                        <Users className="text-2xl text-purple-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">社会场域</h4>
                                        <p className="text-xs text-gray-400">Social Field</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Downward Triangle Pointer */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                        {/* Triangle Shape using CSS borders */}
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-[#00f3ff] filter drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] animate-bounce"></div>
                    </div>
                </div>

                {/* Bottom Section: Result */}
                <div className="w-full max-w-4xl z-10 mt-8">
                    <div className="relative w-full bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-[#ffd700] flex flex-col md:flex-row items-center justify-between p-8 text-center md:text-left shadow-[0_0_30px_rgba(255,215,0,0.15)] group overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700]/10 to-transparent opacity-50"></div>

                        <div className="flex items-center gap-8 z-10">
                            <div className="transform group-hover:scale-110 transition-transform duration-500">
                                <Target size={80} className="text-[#ffd700]" />
                            </div>

                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_5px_rgba(255,215,0,0.5)]">结果</h2>
                                <h3 className="text-2xl text-[#ffd700]">学业与人生发展</h3>
                                <p className="text-gray-300 text-sm mt-2">Academic & Life Development</p>
                            </div>
                        </div>

                        <div className="mt-6 md:mt-0 z-10 text-right">
                            <div className="text-xs text-gray-500 font-mono mb-2">FORMULA</div>
                            <div className="text-xl font-bold text-white font-mono">
                                <span className="text-[#00f3ff]">INTERNAL</span> × <span className="text-purple-400">EXTERNAL</span> = <span className="text-[#ffd700]">RESULT</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
