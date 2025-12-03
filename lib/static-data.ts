// Static data extracted from seed.ts for Netlify deployment
// This replaces database queries to enable serverless deployment

export interface Video {
    id: number
    title: string
    bvid: string
    type: string
    category: string
    coverImage: string | null
}

export interface AppDemo {
    id: number
    title: string
    description: string
    status: string
    linkUrl: string
    coverImage: string | null
}

export interface Course {
    id: number
    title: string
    description: string
    coverImage: string
    price: string
    features: string[] // Parsed JSON array
    linkUrl: string
    createdAt: Date
    updatedAt: Date
}

export interface Article {
    id: number
    title: string
    slug: string
    excerpt: string | null
    content: string
    coverImage: string | null
    category: string
    published: boolean
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

export const VIDEOS: Video[] = [
    {
        id: 1,
        title: "一首新写的旧歌,它早该写了,轻易不敢翻唱的一首……cover:李宗盛",
        bvid: "BV1SvZmYqE7B",
        type: "long",
        category: "深度解析",
        coverImage: "https://i2.hdslb.com/bfs/archive/96e92d25a6d632aa49b56d68172c81c12809ed28.jpg"
    },
    {
        id: 2,
        title: "10天3600公里,酷暑下的晋豫环线亲子自驾游,详细路书已出",
        bvid: "BV1EitvzXERP",
        type: "long",
        category: "深度解析",
        coverImage: "https://i0.hdslb.com/bfs/archive/6e8fe5b328696b94e4ec8ad6d63f570843c87e8c.jpg"
    },
    {
        id: 3,
        title: "深度解析视频 3",
        bvid: "BV1j9H5eSEkt",
        type: "long",
        category: "深度解析",
        coverImage: "https://i0.hdslb.com/bfs/archive/eac92078f02544d8cb75bbb1d2e338af1c794ddd.jpg"
    },
    {
        id: 4,
        title: "学习力提升视频 1",
        bvid: "BV1Gu4y157Xr",
        type: "long",
        category: "学习力提升",
        coverImage: "https://i1.hdslb.com/bfs/archive/a600893cf2a62ace689a546f82015938cd69ddd6.jpg"
    },
    {
        id: 5,
        title: "学习力提升视频 2",
        bvid: "BV1mm4y1u7oq",
        type: "long",
        category: "学习力提升",
        coverImage: "https://i1.hdslb.com/bfs/archive/77306d553a64088b7725b1657fa4bd5f0230251d.jpg"
    },
    {
        id: 6,
        title: "学习力提升视频 3",
        bvid: "BV1134y1A7ih",
        type: "long",
        category: "学习力提升",
        coverImage: "https://i1.hdslb.com/bfs/archive/c16243de09b071f86cc156dd609ba67fbda2101e.jpg"
    }
]

export const APP_DEMOS: AppDemo[] = [
    {
        id: 1,
        title: "中考投档模拟系统",
        description: "基于投档逻辑的模拟系统,直观展示投档过程。",
        status: "Live",
        linkUrl: "/ai-lab/toudang",
        coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
        id: 2,
        title: "WiseFill 中考志愿智能填报",
        description: "基于数据分析的志愿填报辅助工具,帮助家长做出明智选择。",
        status: "Live",
        linkUrl: "/ai-lab/wisefill",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
    }
]

export const COURSES: Course[] = [
    {
        id: 1,
        title: '2025最新初升高政策变化及志愿填报逻辑指南',
        description: '专业陪跑老爸,从小升初到初升高,精通成都中考逻辑。全面解读2025年最新政策变化,帮助家长和学生科学规划升学路径。',
        coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070',
        price: '¥99',
        features: ['12课时精讲', '长期有效观看', '政策深度解读', '志愿填报逻辑'],
        linkUrl: 'https://www.bilibili.com/cheese/play/ss192065874',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        title: '成都中考志愿填报,从基础到实战',
        description: '面面的爸爸亲授,IT大厂管理出身,20年管理教育经验。从基础知识到实战演练,手把手教你填报志愿,避免滑档风险。',
        coverImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070',
        price: '¥199',
        features: ['8课时实战演练', '长期有效', '自主上手不滑档', '投档逻辑解析'],
        linkUrl: 'https://www.bilibili.com/cheese/play/ss24621',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        title: "中考志愿填报:从入门到精通",
        description: "全面解析中考政策,教你如何科学填报志愿,规避风险,锁定理想高中。",
        coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
        price: "¥99",
        features: ["政策解读", "数据分析", "案例实战", "一对一答疑"],
        linkUrl: "https://www.bilibili.com/",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        title: "高中生涯规划与选科指导",
        description: "提前规划高中三年,科学选择选考科目,为高考打下坚实基础。",
        coverImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074",
        price: "¥199",
        features: ["生涯测评", "选科策略", "大学专业关联", "名校学长分享"],
        linkUrl: "https://www.bilibili.com/",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 5,
        title: "高效学习法:引爆你的学习力",
        description: "掌握科学的学习方法,提升记忆力、专注力和理解力,让学习事半功倍。",
        coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070",
        price: "¥59",
        features: ["费曼学习法", "番茄工作法", "思维导图", "错题管理"],
        linkUrl: "https://www.bilibili.com/",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]
