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

export interface Podcast {
    id: number
    title: string
    description: string
    coverImage: string
    duration: string
    linkUrl: string
    episodeId: string  // 小宇宙单集ID，用于嵌入播放器
    publishedAt: Date
}

export const PODCASTS: Podcast[] = [
    {
        id: 1,
        title: "数字时代亲子关系，孩子和家长谁才是被'伤害'的？",
        description: "探讨数字时代下的亲子关系，21天行动计划帮助家长建立高质量陪伴习惯。",
        coverImage: "/podcast-cover.png",
        duration: "44:00",
        linkUrl: "https://www.xiaoyuzhoufm.com/episode/67416b058d1233fb0d5dd71b",
        episodeId: "67416b058d1233fb0d5dd71b",
        publishedAt: new Date('2024-11-23')
    },
    {
        id: 2,
        title: "高质量陪伴，成长过程中坚实基础",
        description: "高质量陪伴的四维模型：情感连接、互动交流、日常参与、支持引导。5个实践关键字助你成为更好的家长。",
        coverImage: "/podcast-cover.png",
        duration: "35:00",
        linkUrl: "https://www.xiaoyuzhoufm.com/episode/672c6d2182eb19451ddb0572",
        episodeId: "672c6d2182eb19451ddb0572",
        publishedAt: new Date('2024-11-07')
    },
    {
        id: 3,
        title: "即将抵达：开篇介绍，家庭教育中如何为孩子规划升学路径？",
        description: "面爸的第一条播客，分享视频里无法分享的内容，致力于亲子陪伴教育，愿每个孩子都有光明的未来！",
        coverImage: "/podcast-cover.png",
        duration: "13:00",
        linkUrl: "https://www.xiaoyuzhoufm.com/episode/668272aa077b88831b74601c",
        episodeId: "668272aa077b88831b74601c",
        publishedAt: new Date('2024-07-01')
    }
]

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
        id: 2,
        title: "WiseFill 中考志愿智能填报",
        description: "基于数据分析的志愿填报辅助工具,帮助家长做出明智选择。",
        status: "Live",
        linkUrl: "/ai-lab/wisefill",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
    },
    {
        id: 3,
        title: "ROI Focus - 工作投资组合管理",
        description: "基于ROI思维的时间管理工具，像经营公司一样经营你的时间。包含看板、甘特图和AI投资顾问分析。",
        status: "Beta",
        linkUrl: "/ai-lab/roi-focus",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
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
    },

]

// 从同步脚本生成的 JSON 文件读取文章数据
import articlesData from './articles-data.json';

// 转换 JSON 数据为 Article 类型
export const ARTICLES: Article[] = articlesData.map((article: any) => ({
    ...article,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
    createdAt: new Date(article.createdAt),
    updatedAt: new Date(article.updatedAt),
}));

