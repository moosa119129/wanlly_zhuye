import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Plus, Trash2, CheckCircle2, Circle, Sparkles, BrainCircuit } from 'lucide-react';
import { Task, QuadrantType } from '@/lib/roi-focus/types';
import { QUADRANT_CONFIGS, INITIAL_TASKS } from '@/lib/roi-focus/constants';
import { MetricsCard } from './MetricsCard';
import { analyzePortfolio } from '@/lib/roi-focus/geminiService';

export const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [viewMode, setViewMode] = useState<'List' | 'Kanban'>('Kanban');
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskQuadrant, setNewTaskQuadrant] = useState<QuadrantType>(QuadrantType.CORE);
    const [newTaskDuration, setNewTaskDuration] = useState(1);
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // --- Calculations ---
    const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0);

    const stats = useMemo(() => {
        const data: Record<QuadrantType, number> = {
            [QuadrantType.CORE]: 0,
            [QuadrantType.LEVERAGE]: 0,
            [QuadrantType.ALIGNMENT]: 0,
            [QuadrantType.MAINTENANCE]: 0,
        };
        tasks.forEach(t => {
            data[t.quadrant] += t.duration;
        });
        return data;
    }, [tasks]);

    const coreAndLeverageDuration = stats[QuadrantType.CORE] + stats[QuadrantType.LEVERAGE];
    const coreRatio = totalDuration > 0 ? coreAndLeverageDuration / totalDuration : 0;
    const isProfitable = coreRatio >= 0.6;

    const chartData = Object.values(QuadrantType).map(type => ({
        name: QUADRANT_CONFIGS[type].label.split(' ')[0],
        value: stats[type],
        color: QUADRANT_CONFIGS[type].color.replace('text-', '').replace('-600', '-500') // hacky way to map tailwind text color to hex-ish for charts (better to verify in Constants, but this works for demo)
    }));

    // Custom colors for recharts
    const COLORS = ['#dc2626', '#2563eb', '#ca8a04', '#6b7280'];

    // --- Handlers ---
    const addTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            quadrant: newTaskQuadrant,
            duration: Number(newTaskDuration),
            status: 'Todo',
            roiRating: 'Mid' // Default
        };
        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
        setAiAnalysis(null); // Clear previous analysis on change
    };

    const toggleStatus = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Done' ? 'Todo' : 'Done' } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
        setAiAnalysis(null);
    };

    const handleAIAnalysis = async () => {
        setIsAnalyzing(true);
        const result = await analyzePortfolio(tasks, coreRatio);
        setAiAnalysis(result);
        setIsAnalyzing(false);
    };

    return (
        <div className="space-y-6">
            {/* 1. Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricsCard
                    label="今日市值评分 (Daily Score)"
                    value={isProfitable ? "🟢 盈利" : "🔴 亏损"}
                    status={isProfitable ? "success" : "danger"}
                    subtext={`核心+杠杆占比: ${(coreRatio * 100).toFixed(0)}% (目标 > 60%)`}
                    icon={<Sparkles className="w-5 h-5" />}
                />
                <MetricsCard
                    label="总投入工时"
                    value={`${totalDuration}h`}
                    subtext="Total Investment"
                />
                <MetricsCard
                    label="核心资产投入"
                    value={`${stats[QuadrantType.CORE]}h`}
                    status="success"
                    subtext="Strategy: All-in"
                />
                <MetricsCard
                    label="运营损耗"
                    value={`${stats[QuadrantType.MAINTENANCE]}h`}
                    status={stats[QuadrantType.MAINTENANCE] > totalDuration * 0.2 ? "danger" : "neutral"}
                    subtext="Keep below 20%"
                />
            </div>

            {/* 2. Charts & Controls Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Charts */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-1 flex flex-col items-center">
                    <h3 className="text-sm font-semibold text-gray-700 w-full mb-4">精力分布 (Portfolio Allocation)</h3>
                    <div className="w-full h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
                        {chartData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-1">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                                {d.name}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Task Input */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-gray-700">新增投资标的 (Add Task)</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="输入任务名称..."
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                            />
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 outline-none bg-white"
                                value={newTaskQuadrant}
                                onChange={(e) => setNewTaskQuadrant(e.target.value as QuadrantType)}
                            >
                                {Object.values(QUADRANT_CONFIGS).map(q => (
                                    <option key={q.id} value={q.id}>{q.label}</option>
                                ))}
                            </select>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    className="w-20 border border-gray-300 rounded-lg px-3 py-2 outline-none"
                                    value={newTaskDuration}
                                    onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                                    min="0.1"
                                    step="0.5"
                                />
                                <span className="text-sm text-gray-500">hrs</span>
                            </div>
                            <button
                                onClick={addTask}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add
                            </button>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 flex gap-4 border border-slate-100">
                            <span className="font-semibold text-indigo-900">当前策略参考:</span>
                            {QUADRANT_CONFIGS[newTaskQuadrant].strategy}
                            <span className="mx-2">|</span>
                            {QUADRANT_CONFIGS[newTaskQuadrant].description}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Tasks View */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('Kanban')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all ${viewMode === 'Kanban' ? 'bg-white shadow text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            看板 (Kanban)
                        </button>
                        <button
                            onClick={() => setViewMode('List')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all ${viewMode === 'List' ? 'bg-white shadow text-gray-900 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            列表 (Table)
                        </button>
                    </div>
                    <button
                        onClick={handleAIAnalysis}
                        disabled={isAnalyzing}
                        className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50 px-3 py-1.5 rounded-md hover:bg-purple-100 transition-colors border border-purple-200"
                    >
                        <BrainCircuit className="w-4 h-4" />
                        {isAnalyzing ? '分析中...' : 'AI 投资顾问分析'}
                    </button>
                </div>

                {/* AI Analysis Result Area */}
                {aiAnalysis && (
                    <div className="p-6 bg-purple-50 border-b border-purple-100 animate-fadeIn">
                        <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> 顾问点评
                        </h4>
                        <div className="prose prose-sm text-purple-800 max-w-none whitespace-pre-line leading-relaxed">
                            {aiAnalysis}
                        </div>
                    </div>
                )}

                <div className="p-6 min-h-[400px] overflow-x-auto">
                    {viewMode === 'Kanban' ? (
                        <div className="flex gap-4 min-w-[800px]">
                            {Object.values(QUADRANT_CONFIGS).map(config => (
                                <div key={config.id} className="flex-1 min-w-[200px] bg-slate-50 rounded-xl p-3 border border-slate-200 flex flex-col">
                                    <div className={`mb-3 pb-2 border-b-2 ${config.color.replace('text', 'border')} flex justify-between items-end`}>
                                        <span className={`font-bold ${config.color} text-sm`}>{config.label.split(' ')[0]}</span>
                                        <span className="text-xs text-gray-400 bg-white px-2 py-0.5 rounded-full border">
                                            {tasks.filter(t => t.quadrant === config.id).reduce((acc, curr) => acc + curr.duration, 0)}h
                                        </span>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        {tasks.filter(t => t.quadrant === config.id).map(task => (
                                            <div key={task.id} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <button onClick={() => toggleStatus(task.id)} className="mt-0.5">
                                                        {task.status === 'Done' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-gray-300" />}
                                                    </button>
                                                    <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Trash2 className="w-3 h-3 text-red-300 hover:text-red-500" />
                                                    </button>
                                                </div>
                                                <p className={`text-sm mb-2 ${task.status === 'Done' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                                    {task.title}
                                                </p>
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{task.duration}h</span>
                                                    <span className={`px-1.5 py-0.5 rounded border ${task.roiRating === 'High' ? 'bg-green-50 text-green-700 border-green-200' :
                                                            task.roiRating === 'Negative' ? 'bg-red-50 text-red-700 border-red-200' :
                                                                'bg-gray-50 text-gray-500 border-gray-200'
                                                        }`}>{task.roiRating} ROI</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Task Name</th>
                                    <th className="px-4 py-3">Quadrant</th>
                                    <th className="px-4 py-3">Duration</th>
                                    <th className="px-4 py-3">Strategy (Auto)</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => {
                                    const qConfig = QUADRANT_CONFIGS[task.quadrant];
                                    return (
                                        <tr key={task.id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <button onClick={() => toggleStatus(task.id)}>
                                                    {task.status === 'Done' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-300" />}
                                                </button>
                                            </td>
                                            <td className={`px-4 py-3 font-medium ${task.status === 'Done' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                                {task.title}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${qConfig.bgColor} ${qConfig.color} ${qConfig.borderColor}`}>
                                                    {qConfig.label.split(' ')[0]}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{task.duration}h</td>
                                            <td className="px-4 py-3 text-xs font-mono text-gray-500">{qConfig.strategy}</td>
                                            <td className="px-4 py-3">
                                                <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};
