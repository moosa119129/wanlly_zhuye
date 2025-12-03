import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface MetricsCardProps {
    label: string;
    value: string | number;
    status?: 'success' | 'danger' | 'neutral';
    subtext?: string;
    icon?: React.ReactNode;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ label, value, status = 'neutral', subtext, icon }) => {
    const statusColors = {
        success: 'bg-green-50 text-green-700 border-green-200',
        danger: 'bg-red-50 text-red-700 border-red-200',
        neutral: 'bg-white text-gray-700 border-gray-200',
    };

    return (
        <div className={`p-4 rounded-xl border ${statusColors[status]} shadow-sm flex flex-col justify-between h-full`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium opacity-80">{label}</span>
                {icon && <div className="opacity-80">{icon}</div>}
            </div>
            <div>
                <div className="text-2xl font-bold flex items-center gap-2">
                    {value}
                    {status === 'success' && <TrendingUp className="w-5 h-5" />}
                    {status === 'danger' && <TrendingDown className="w-5 h-5" />}
                </div>
                {subtext && <p className="text-xs mt-1 opacity-70">{subtext}</p>}
            </div>
        </div>
    );
};
