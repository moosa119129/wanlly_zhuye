import { QuadrantType, QuadrantConfig, Task } from './types';

export const QUADRANT_CONFIGS: Record<QuadrantType, QuadrantConfig> = {
    [QuadrantType.CORE]: {
        id: QuadrantType.CORE,
        label: '核心资产区 (High Value)',
        description: '直接创收、构建核心竞争力',
        strategy: 'All-in / 黄金时间',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
    },
    [QuadrantType.LEVERAGE]: {
        id: QuadrantType.LEVERAGE,
        label: '杠杆建设区 (Leverage)',
        description: 'SOP制定、工具优化、人才培养',
        strategy: '优化 & 固化',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
    },
    [QuadrantType.ALIGNMENT]: {
        id: QuadrantType.ALIGNMENT,
        label: '资源/共识区 (Alignment)',
        description: '向上管理、跨部门协同',
        strategy: '高效 & 准确',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    },
    [QuadrantType.MAINTENANCE]: {
        id: QuadrantType.MAINTENANCE,
        label: '运营/损耗区 (Maintenance)',
        description: '行政琐事、突发救火、无效会议',
        strategy: '授权 & 极简 & 隔离',
        color: 'text-gray-500',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200'
    }
};

export const INITIAL_TASKS: Task[] = [
    {
        id: '1',
        title: 'Q4 战略规划深度思考',
        quadrant: QuadrantType.CORE,
        duration: 2.5,
        status: 'Doing',
        roiRating: 'High'
    },
    {
        id: '2',
        title: '优化销售团队 SOP 手册',
        quadrant: QuadrantType.LEVERAGE,
        duration: 1.5,
        status: 'Todo',
        roiRating: 'High'
    },
    {
        id: '3',
        title: '跨部门预算对齐会',
        quadrant: QuadrantType.ALIGNMENT,
        duration: 1.0,
        status: 'Done',
        roiRating: 'Mid'
    },
    {
        id: '4',
        title: '处理发票报销流程',
        quadrant: QuadrantType.MAINTENANCE,
        duration: 0.5,
        status: 'Todo',
        roiRating: 'Low'
    },
    {
        id: '5',
        title: '临时救火：客户投诉处理',
        quadrant: QuadrantType.MAINTENANCE,
        duration: 1.0,
        status: 'Done',
        roiRating: 'Negative'
    }
];
