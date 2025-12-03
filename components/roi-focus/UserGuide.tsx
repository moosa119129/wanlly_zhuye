import React from 'react';
import { Target, Zap, Users, AlertTriangle, Clock, HelpCircle, Trophy, ArrowRight } from 'lucide-react';

export const UserGuide: React.FC = () => {
    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">

            {/* 1. Hero / Core Mindset */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Trophy className="w-64 h-64" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-4">写在前面：不要把这仅仅当成一个“记事本”</h2>
                    <p className="text-xl text-indigo-100 font-light leading-relaxed max-w-3xl">
                        请把你的一天看作一家公司，你的时间就是资金。<br />
                        这个表格的目标，不是帮你把事情“做完”，而是帮你把时间“投对”，从而产生最大的回报（ROI）。
                    </p>
                </div>
            </div>

            {/* 2. Quadrant Definitions */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">1</div>
                    <h3 className="text-xl font-bold text-gray-900">第一步：学会给任务“贴标签” (最重要的环节)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Core - Red */}
                    <div className="bg-red-50 rounded-xl border border-red-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3 text-red-700">
                            <Target className="w-6 h-6" />
                            <h4 className="text-lg font-bold">1. 核心资产区 (High Value)</h4>
                        </div>
                        <div className="bg-white/60 p-2 rounded mb-3 text-sm font-semibold text-red-800">🔴 【做这个才值钱】</div>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li><strong>定义：</strong>做了这件事，直接带来业绩、搞定大客户，或者让你在公司里变得不可替代。</li>
                            <li><strong>识别：</strong>如果今天只能做一件事，是不是它？</li>
                            <li><strong>策略：</strong><span className="bg-red-200 px-1 rounded text-red-900 font-bold">All-in</span> 手机静音，在精力最好的时候死磕它。</li>
                        </ul>
                    </div>

                    {/* Leverage - Blue */}
                    <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3 text-blue-700">
                            <Zap className="w-6 h-6" />
                            <h4 className="text-lg font-bold">2. 杠杆建设区 (System)</h4>
                        </div>
                        <div className="bg-white/60 p-2 rounded mb-3 text-sm font-semibold text-blue-800">🔵 【做一次，懒十年】</div>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li><strong>定义：</strong>SOP制定、工具优化。现在做可能累，但以后能自动完成或交给别人。</li>
                            <li><strong>识别：</strong>做这件事，是为了以后“偷懒”吗？</li>
                            <li><strong>策略：</strong><span className="bg-blue-200 px-1 rounded text-blue-900 font-bold">优化 & 固化</span> 每天必须安排一点时间积累“家底”。</li>
                        </ul>
                    </div>

                    {/* Alignment - Yellow */}
                    <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3 text-yellow-700">
                            <Users className="w-6 h-6" />
                            <h4 className="text-lg font-bold">3. 资源/共识区 (Alignment)</h4>
                        </div>
                        <div className="bg-white/60 p-2 rounded mb-3 text-sm font-semibold text-yellow-800">🟡 【为了拿结果去沟通】</div>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li><strong>定义：</strong>向上管理、跨部门协同。除非你是独立开发者，否则你需要支持。</li>
                            <li><strong>识别：</strong>这个沟通能消除阻碍吗？如果不能，就是废话。</li>
                            <li><strong>策略：</strong><span className="bg-yellow-200 px-1 rounded text-yellow-900 font-bold">高效</span> 讲结论，给方案，不闲聊。</li>
                        </ul>
                    </div>

                    {/* Maintenance - Gray */}
                    <div className="bg-gray-100 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3 text-gray-600">
                            <AlertTriangle className="w-6 h-6" />
                            <h4 className="text-lg font-bold">4. 运营/损耗区 (Maintenance)</h4>
                        </div>
                        <div className="bg-white/60 p-2 rounded mb-3 text-sm font-semibold text-gray-700">⚫ 【能不做就不做】</div>
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li><strong>定义：</strong>贴发票、取快递、填表。做了没功劳，不做有麻烦。</li>
                            <li><strong>识别：</strong>能不能外包？能不能拖到下班前一气儿做完？</li>
                            <li><strong>策略：</strong><span className="bg-gray-300 px-1 rounded text-gray-900 font-bold">极简 & 隔离</span> 不要一大早做！留到垃圾时间处理。</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 3. Daily Workflow */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">2</div>
                    <h3 className="text-xl font-bold text-gray-900">第二步：手把手教你操作（一日流程）</h3>
                </div>

                <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:h-full before:w-0.5 before:bg-indigo-100">

                    <div className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 bg-indigo-50 rounded-full border-2 border-indigo-200 flex items-center justify-center text-indigo-600">
                            <Clock className="w-4 h-4" />
                        </div>
                        <h4 className="text-lg font-bold text-indigo-900 mb-2">🌅 早上 9:00：像投资人一样“制定策略”</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p>1. 打开表格，点击 <strong>【今日规划】</strong> 视图。</p>
                            <p>2. 先填 <span className="text-red-600 font-bold">🔴核心区</span>：问自己，“今天要盈利，必须拿下哪件事？”（限1-2件）。</p>
                            <p>3. 再填 <span className="text-blue-600 font-bold">🔵杠杆区</span>：问自己，“今天能不能抽30分钟，整理个SOP？”</p>
                            <p className="bg-orange-50 p-2 rounded border border-orange-100 inline-block text-orange-800 mt-2">
                                ⚠️ 检查预计耗时：如果🔴+🔵的时间少于全天的50%，说明你今天的计划是“亏损”的，请重新调整！
                            </p>
                        </div>
                    </div>

                    <div className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 bg-indigo-50 rounded-full border-2 border-indigo-200 flex items-center justify-center text-indigo-600">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                        <h4 className="text-lg font-bold text-indigo-900 mb-2">☀️ 工作中：像推土机一样“执行”</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p>1. 切换到 <strong>【看板视图】</strong>。</p>
                            <p>2. <strong>只看红色列</strong>：强迫自己先做完核心资产区的任务。</p>
                            <p>3. <strong>警惕灰色列</strong>：突然来了个杂事？把它填进表格，告诉自己：“下午4点再统一处理”。</p>
                        </div>
                    </div>

                    <div className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 bg-indigo-50 rounded-full border-2 border-indigo-200 flex items-center justify-center text-indigo-600">
                            <Trophy className="w-4 h-4" />
                        </div>
                        <h4 className="text-lg font-bold text-indigo-900 mb-2">🌙 晚上 18:00：像CEO一样“盘点账目”</h4>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p>1. 切换到 <strong>【仪表盘】</strong>，看一眼【今日市值评分】。</p>
                            <p>2. <strong>🟢 盈利</strong>：恭喜！你今天在升值。</p>
                            <p>3. <strong>🔴 亏损</strong>：灵魂拷问——“那些损耗区的事，能不能用杠杆区的方法（如SOP）解决掉？”</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. FAQ */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-purple-700">
                        <HelpCircle className="w-5 h-5" />
                        <h3 className="font-bold text-lg">新手避坑指南 (FAQ)</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold text-sm text-gray-900 mb-1">Q: 我觉得所有事情都很重要怎么办？</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                错觉。测试方法：如果明天就要被开除，为了保住工作你只能做一件事，你会选哪个？那个才是核心资产。其他的降级。
                            </p>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                            <p className="font-semibold text-sm text-gray-900 mb-1">Q: 为什么还要填“预估时间”？</p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                因为你对时间的感知是错的。填了预估，复盘时对比实际耗时，才能训练出精准的时间感。
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-indigo-100 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-indigo-800">
                        <Target className="w-5 h-5" />
                        <h3 className="font-bold text-lg">老板给了我一堆杂事怎么办？</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white p-3 rounded-lg border border-indigo-50 shadow-sm">
                            <p className="font-semibold text-sm text-gray-900 mb-1">💡 案例：订盒饭</p>
                            <p className="text-xs text-gray-600 leading-relaxed mb-2">
                                新手觉得这是倒霉的杂事（损耗）。<br />
                                高手会思考：怎么把杂事变成“杠杆”？
                            </p>
                            <p className="text-xs text-indigo-700 font-medium bg-indigo-50 p-2 rounded">
                                整理一个“全公司口味偏好表”和“商家红黑榜”，把杂事做出 SOP。你就是在把“损耗”转化成“杠杆”。这就是高手。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Final Banner */}
            <div className="text-center py-8 border-t border-gray-200 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">🏆 终极心法：不要填满格子</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    优秀的表现是：🔴核心区（1-2件事）做得极其漂亮。<br />
                    ⚫损耗区（杂事）越少越好，甚至空白。<br />
                    你的产出，取决于你在红色和蓝色区域投入了多少生命。
                </p>
            </div>

        </div>
    );
};
