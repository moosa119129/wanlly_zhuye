'use client';

import React, { useState } from 'react';
import { LayoutDashboard, FileText, Clock, BookOpen } from 'lucide-react';
import { Dashboard } from '@/components/roi-focus/Dashboard';
import { SchemaBlueprint } from '@/components/roi-focus/SchemaBlueprint';
import { UserGuide } from '@/components/roi-focus/UserGuide';

export default function ROIFocusPage() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'blueprint' | 'guide'>('dashboard');

    return (
        <div className="min-h-screen bg-[#f5f6f7] text-gray-900 pb-20">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 tracking-tight">ROI Focus</h1>
                                <p className="text-xs text-gray-500 font-medium">Work Investment Portfolio</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'dashboard'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                <span className="hidden sm:inline">工作台</span> (Dashboard)
                            </button>

                            <button
                                onClick={() => setActiveTab('guide')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'guide'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <BookOpen className="w-4 h-4" />
                                <span className="hidden sm:inline">使用指南</span> (Guide)
                            </button>

                            <button
                                onClick={() => setActiveTab('blueprint')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'blueprint'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <FileText className="w-4 h-4" />
                                <span className="hidden sm:inline">架构蓝图</span> (Schema)
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'dashboard' && (
                    <div className="animate-fadeIn">
                        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">今日投资盘点</h2>
                                <p className="text-gray-500 mt-1">像经营公司一样经营你的时间。目标：核心资产 + 杠杆建设 &gt; 60%</p>
                            </div>
                            <button
                                onClick={() => setActiveTab('guide')}
                                className="text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1"
                            >
                                <BookOpen className="w-4 h-4" />
                                新手必读：如何使用本系统？
                            </button>
                        </div>
                        <Dashboard />
                    </div>
                )}

                {activeTab === 'blueprint' && (
                    <div className="animate-fadeIn">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">飞书多维表格设计规范</h2>
                            <p className="text-gray-500 mt-1">请参考下方配置在飞书中创建您的 ROI 管理系统。</p>
                        </div>
                        <SchemaBlueprint />
                    </div>
                )}

                {activeTab === 'guide' && (
                    <div className="animate-fadeIn">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">ROI 投资组合工作法 · 使用手册</h2>
                            <p className="text-gray-500 mt-1">掌握心法，比使用工具更重要。</p>
                        </div>
                        <UserGuide />
                    </div>
                )}
            </main>

            <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-3 text-center text-xs text-gray-400 z-40">
                ROI Work Investment Portfolio Model © 2024
            </footer>
        </div>
    );
}
