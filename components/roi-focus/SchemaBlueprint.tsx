import React from 'react';
import { Database, Layout, Code } from 'lucide-react';

export const SchemaBlueprint: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-slate-50 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-800">飞书多维表格架构蓝图 (Schema)</h2>
            </div>

            <div className="p-6 space-y-8">

                {/* Part 1: Schema */}
                <section>
                    <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">1</span>
                        数据表结构设计
                    </h3>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 border-b">字段名称</th>
                                    <th className="px-6 py-3 border-b">字段类型 (飞书术语)</th>
                                    <th className="px-6 py-3 border-b">选项/逻辑配置</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900">任务名称</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs">文本</span></td>
                                    <td className="px-6 py-4">简洁描述任务内容</td>
                                </tr>
                                <tr className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900">投资标的 (Quadrant)</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">单选</span></td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> 核心资产区</div>
                                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> 杠杆建设区</div>
                                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> 资源/共识区</div>
                                            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-500"></span> 运营/损耗区</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900">预计投入 (Hrs)</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs">数字</span></td>
                                    <td className="px-6 py-4">格式：小数 (保留1位)</td>
                                </tr>
                                <tr className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900">投资策略</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">公式</span></td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-600 bg-slate-50 p-2 rounded">
                                        IFS([投资标的]="核心资产区", "🦁 All-in", [投资标的]="杠杆建设区", "⚙️ 优化固化", [投资标的]="资源/共识区", "🤝 高效准确", [投资标的]="运营/损耗区", "🧹 极简授权")
                                    </td>
                                </tr>
                                <tr className="bg-white border-b">
                                    <td className="px-6 py-4 font-medium text-gray-900">ROI 自评</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">单选</span></td>
                                    <td className="px-6 py-4">High (高回报), Mid (中回报), Low (低回报), Negative (负收益/亏损)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Part 2: Automation */}
                <section>
                    <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">2</span>
                        自动化公式逻辑 (今日市值评分)
                    </h3>
                    <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-sm shadow-inner">
                        <div className="flex items-center gap-2 text-slate-400 mb-2 border-b border-slate-700 pb-2">
                            <Code className="w-4 h-4" />
                            <span>Feishu Formula Syntax</span>
                        </div>
                        <p className="mb-2 text-green-400">// 逻辑：如果(核心+杠杆)工时占比 &gt; 60%，显示盈利</p>
                        <p>
                            IF(<br />
                            &nbsp;&nbsp;(SUMIF([投资标的], "核心资产区", [预计投入]) + SUMIF([投资标的], "杠杆建设区", [预计投入])) / SUM([预计投入]) &gt; 0.6,<br />
                            &nbsp;&nbsp;"🟢 盈利 (市值增长)",<br />
                            &nbsp;&nbsp;"🔴 亏损 (资本缩水)"<br />
                            )
                        </p>
                    </div>
                </section>

                {/* Part 3: Views */}
                <section>
                    <h3 className="text-md font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">3</span>
                        关键视图配置 (Views)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
                                <Layout className="w-4 h-4" /> 看板视图 (Kanban)
                            </div>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">分组依据：</span>投资标的
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">用途：</span>直观审视精力分配是否在“左侧象限”（核心/杠杆）。
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
                                <Layout className="w-4 h-4" /> 甘特图 (Gantt)
                            </div>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">时间轴：</span>按“投资策略”着色
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">用途：</span>确保黄金时间段（上午）优先被“核心资产”任务占据。
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg bg-gray-50">
                            <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
                                <Layout className="w-4 h-4" /> 仪表盘 (Dashboard)
                            </div>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">统计：</span>损耗区耗时占比
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                <span className="font-medium">用途：</span>每周复盘，若损耗 &gt; 20%，需启动“授权/隔离”策略。
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};
