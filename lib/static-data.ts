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
    publishedAt: Date
}

export const PODCASTS: Podcast[] = [
    {
        id: 1,
        title: "教育的本质是唤醒",
        description: "探讨教育的真谛，如何激发孩子的内在动力，而非简单的知识灌输。",
        coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=2070",
        duration: "45:20",
        linkUrl: "#",
        publishedAt: new Date('2025-11-20')
    },
    {
        id: 2,
        title: "AI时代的家庭教育",
        description: "人工智能飞速发展，家长应该如何调整教育策略，培养孩子面向未来的能力。",
        coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070",
        duration: "38:15",
        linkUrl: "#",
        publishedAt: new Date('2025-11-15')
    },
    {
        id: 3,
        title: "对话：从程序员到教育博主",
        description: "分享我的个人转型经历，以及作为一名技术型家长对教育的独特思考。",
        coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
        duration: "52:10",
        linkUrl: "#",
        publishedAt: new Date('2025-11-10')
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

export const ARTICLES: Article[] = [
    {
        id: 1,
        title: "别再盯着重本率了！3个数据告诉你一所高中真正的含金量",
        slug: "high-school-quality-metrics",
        category: "升学规划",
        excerpt: "接近中考的时候，家长群里一旦涉及到选高中的话题，最热闹的永远围绕着重本率和清北人数。但真正的好学校，应该具备将普通食材烹饪出顶级美味的能力。",
        content: "<p>接近中考的时候，家长群里一旦涉及到选高中的话题，最热闹的永远围绕着重本率和清北人数。我特别理解这种心情，毕竟在现有的评价体系下，分数和升学率确实是最硬的指标，也是大家最直接的安全感来源。</p><h2>师生比：被看见的权利</h2><p>很多家长在择校时，会关注学校的硬件，比如食堂、宿舍，却唯独忽略了最核心的生产关系——师生比。</p><h2>隐形课程：学校的精神底色</h2><p>假如我们把一所学校所有的课程表、考试、作业都拿走，这所学校还剩下什么？</p><h2>多样性：反脆弱生态系统</h2><p>最后一个关键指标是学校的多样性。这决定了孩子在学校这个小社会里，能不能找到属于自己的生态位。</p>",
        coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070",
        published: true,
        publishedAt: new Date('2025-11-24'),
        createdAt: new Date('2025-11-24'),
        updatedAt: new Date('2025-11-24')
    },
    {
        id: 2,
        title: "中考550分进了600分的高中，你想好怎样承受这些代价了吗？",
        slug: "risks-of-reaching-too-high",
        category: "升学规划",
        excerpt: "今年中考，有好多家长问过类似的问题：中考预估550分，但家里有资源可以去到600分水平的学校，要不要冲？我给他们所有人的答案也基本是一样的：别去！",
        content: "<p>今年中考，有好多家长问过类似的问题：中考预估550分，但家里有资源可以去到600分水平的学校，要不要冲？我给他们所有人的答案也基本是一样的：别去！</p><h2>很难看清的真相</h2><p>很多家长做出这样决定的前提，是因为他们深信这样一个逻辑：好学校有好老师、好资源、好氛围，升学率还高。</p><h2>至少三个代价</h2><p>如果一个孩子长期都听不懂，或者说跟不上学习进度，他会慢慢陷入一个恶性循环。</p>",
        coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070",
        published: true,
        publishedAt: new Date('2025-10-18'),
        createdAt: new Date('2025-10-18'),
        updatedAt: new Date('2025-10-18')
    },
    {
        id: 3,
        title: "听再多建议都纠结？孩子择校这个世纪难题，算清这三笔账你就懂了",
        slug: "school-choice-cost-benefit",
        category: "升学规划",
        excerpt: "要不要择校？就像一场年年都要刮一遍的狂风。这道课题的本质从未变过：它不是一道简单的优劣选择题，而是一场关乎孩子心性、家庭资源与未来路径的深度战略规划。",
        content: "<p>要不要择校？就像一场年年都要刮一遍的狂风，差不多每年从上半年开始就要席卷家长圈。</p><h2>一、你孩子到底要跟谁比？</h2><p>小升初，择校与不择校，是一个关于对手的问题，也是一个关于赛道选择的问题。</p><h2>二、需要自信还是刺激？</h2><p>我们总说，名校环境好。好在哪里？除了优秀的师资和管理，更重要的是它营造的一种高手环绕的氛围。</p><h2>三、你家庭资源打算如何分配？</h2><p>这是一笔经济账，更是一笔时间、精力账。</p>",
        coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070",
        published: true,
        publishedAt: new Date('2025-10-12'),
        createdAt: new Date('2025-10-12'),
        updatedAt: new Date('2025-10-12')
    }
]
