export enum QuadrantType {
    CORE = 'CORE',       // 核心资产区
    LEVERAGE = 'LEVERAGE', // 杠杆建设区
    ALIGNMENT = 'ALIGNMENT', // 资源/共识区
    MAINTENANCE = 'MAINTENANCE' // 运营/损耗区
}

export interface Task {
    id: string;
    title: string;
    quadrant: QuadrantType;
    duration: number; // in hours
    status: 'Todo' | 'Doing' | 'Done';
    roiRating: 'High' | 'Mid' | 'Low' | 'Negative';
}

export interface QuadrantConfig {
    id: QuadrantType;
    label: string;
    description: string;
    strategy: string; // The "Strategy" formula result
    color: string;
    bgColor: string;
    borderColor: string;
}

export interface DailyScore {
    score: number;
    isProfitable: boolean;
    coreRatio: number;
}
