import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts'
import { School } from './types'

interface GradientChartProps {
    slots: (School | null)[];
    userScore: number;
}

export function GradientChart({ slots, userScore }: GradientChartProps) {
    // Transform slots into chart data - CRUCIAL: Force Number conversion
    const rawData = slots.map((school, index) => {
        if (!school) return { name: `志愿${index + 1}`, score: null, diff: null, schoolName: '未填报' }
        return {
            name: `志愿${index + 1}`,
            score: Number(school.score),  // EXPLICIT NUMBER CONVERSION
            diff: Number(school.score) - userScore,
            schoolName: school.name
        }
    })

    // Debugging output
    console.log('Chart Data Sample:', rawData[0])

    const chartData = rawData

    // Calculate domain for YAxis
    const scores = slots.map(s => s?.score).filter(s => s !== undefined).map(s => Number(s))
    let yDomain: [number | 'auto', number | 'auto'] = ['auto', 'auto']

    if (scores.length > 0) {
        const min = Math.min(...scores)
        const max = Math.max(...scores)
        yDomain = [min - 20, max + 20]
    }

    // Custom Dot to show status
    const CustomDot = (props: any) => {
        const { cx, cy, payload } = props;
        if (!payload || payload.score === null) return null;

        let fill = "#6366f1"; // Stable (Indigo)
        if (payload.diff > 0) fill = "#f43f5e"; // Rush (Rose)
        if (payload.diff < -10) fill = "#10b981"; // Protect (Emerald)

        return (
            <svg x={cx - 6} y={cy - 6} width={12} height={12} fill="none" viewBox="0 0 12 12">
                <circle cx="6" cy="6" r="6" fill={fill} fillOpacity="0.3" />
                <circle cx="6" cy="6" r="3" fill={fill} />
            </svg>
        );
    };

    return (
        <div className="w-full bg-slate-900/30 rounded-xl border border-slate-800/50 p-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Gradient Analysis / 梯度分析
            </div>

            <div className="w-full h-[550px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" vertical={false} opacity={0.4} />
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                        />
                        <YAxis
                            domain={yDomain}
                            stroke="#94a3b8"
                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                            tickLine={false}
                            axisLine={false}
                            width={40}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                            itemStyle={{ color: '#e2e8f0' }}
                            formatter={(value: any, name: any, props: any) => [value, props.payload.schoolName]}
                            labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                            cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <ReferenceLine y={userScore} stroke="#eab308" strokeDasharray="3 3" label={{ position: 'insideTopRight', value: 'My Score', fill: '#eab308', fontSize: 10 }} />

                        <Line
                            type="stepAfter"
                            dataKey="score"
                            stroke="#F59E0B"
                            strokeWidth={4}
                            connectNulls={true}
                            dot={<CustomDot />}
                            activeDot={{ r: 6, fill: '#fff' }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
