export interface School {
    id: string | number
    name: string
    score: number
    tags: string[]
    location?: string
    provincialKey?: boolean
    probability?: number
    type?: string
    ranking?: number
    scoreLine3Years?: { year: number; score: number; rank: number }[]
}

export interface UserProfile {
    name: string
    phone: string
}

export type Strategy = 'rush' | 'stable' | 'protect' | null
