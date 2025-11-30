export interface School {
    id: number
    name: string
    score: number
    tags: string[]
    location?: string
}

export interface UserProfile {
    name: string
    phone: string
}

export type Strategy = 'rush' | 'stable' | 'protect' | null
