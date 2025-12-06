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
    // 置顶视频
    { id: 1, title: "中考改革，火力更集中，拿掉小四门，减负对哪类孩子最不利？何时推广全国？", bvid: "BV1mm4y1u7oq", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/77306d553a64088b7725b1657fa4bd5f0230251d.jpg" },
    { id: 2, title: "一首新写的旧歌，它早该写了，轻易不敢翻唱的一首……cover:李宗盛", bvid: "BV1SvZmYqE7B", type: "long", category: "其他", coverImage: "https://i1.hdslb.com/bfs/archive/96e92d25a6d632aa49b56d68172c81c12809ed28.jpg" },
    { id: 3, title: "今年成都中考总分710分，你知道是怎么构成的吗？详细分析", bvid: "BV1yV4y1r74a", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/6fe7c35d250c36203008248efc60e79f0643d7fc.jpg" },
    // 其他视频
    { id: 4, title: "10天3600公里，酷暑下的晋豫环线亲子自驾游，详细路书已出", bvid: "BV1EitvzXERP", type: "long", category: "亲子旅行", coverImage: "https://i1.hdslb.com/bfs/archive/6e8fe5b328696b94e4ec8ad6d63f570843c87e8c.jpg" },
    { id: 5, title: "2025北京中考改革，背后深意？如何影响深远？", bvid: "BV152XBY6EV1", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/5987d1b5b797a22e0a548fed1c78816ad22d91aa.jpg" },
    { id: 6, title: "连夜整理2025成都中考政策解读，对不起，晚了一天", bvid: "BV1GZQwYYEnX", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/183956e512f17383aaaf63a477dca4f6109e05e0.jpg" },
    { id: 7, title: "普通家庭，如何了解升学政策？其实没那么多信息差的", bvid: "BV1m4wpe6EE8", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/b70bebc003ddac69a1b68c708cf3cc3f2a829dfd.jpg" },
    { id: 8, title: "【毕业旅行】超完整1万公里新疆伊犁自驾游线路，22天不堵车", bvid: "BV1j9H5eSEkt", type: "long", category: "亲子旅行", coverImage: "https://i1.hdslb.com/bfs/archive/eac92078f02544d8cb75bbb1d2e338af1c794ddd.jpg" },
    { id: 9, title: "初升高，如何从初中入学就开始布局？该怎么准备升学路径？家长该干嘛？", bvid: "BV19i421h7Uu", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/f4075103e86864b6d73d2d3038477b5a4bf56866.jpg" },
    { id: 10, title: "小升初和初升高都是升学，区别有多大？应该怎么规划小升初？", bvid: "BV17T421k7eL", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/fd817e55c202a3475a2167e6707979bbcacf075b.jpg" },
    { id: 11, title: "2024面爸的成都中考志愿填报指南", bvid: "", type: "long", category: "志愿填报", coverImage: "https://archive.biliimg.com/bfs/archive/c17407adbbf4d34e73631dbc10279cdbb226905b.jpg" },
    { id: 12, title: "重磅出击，打击暗箱和掐尖招生，这次动真格了？学区房能降温吗？", bvid: "BV1sT421X7hm", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/32b1e91e8caa6f683a308ed61d39f8ecda8dda17.jpg" },
    { id: 13, title: "代表提案：取消高中会考，能减负吗？减谁的负？会带来什么后果？", bvid: "BV1fC411p7Ba", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/9560a3a5e360151f3fb79f817cb951a390781b78.jpg" },
    { id: 14, title: "你考虑过高中分班问题吗？文科没有实验班，文科生出路在哪？", bvid: "BV1At421b7K7", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/8b3f109462f353eef7b5919fb6d86fb81e028c21.jpg" },
    { id: 15, title: "成都一诊分数代表啥？理性分析", bvid: "BV1JJ4m147za", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/75e722702e09ef23899e90881d76387aab499a8a.jpg" },
    { id: 16, title: "教育新增实验区实验校政策解读，利好还是小白鼠？家长能做些什么？", bvid: "BV1RN4y1p7HV", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/c8627fa6edf4071f1d3d4e5c2d70364663ef4e41.jpg" },
    { id: 17, title: "综合素质评价填完没？其实对教育是有深远意义的，详细解析", bvid: "BV1dw411E75X", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/f368565b2cb7be546f1ecb9b68991709b5a3abbb.jpg" },
    { id: 18, title: "英语，要从中考高考中踢出去吗？硬核分析，很多人忽略了英语的一个维度", bvid: "BV1MK4y167sk", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/9ddf2996f200e0c425ffd4e428e5c2aefa861345.jpg" },
    { id: 19, title: "马上一诊要来，你知道意义多重大吗？直接影响指标到校", bvid: "BV1F94y1w7CD", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/bbf6887622a49c5308223dfd30204c4fe7f270a7.jpg" },
    { id: 20, title: "入团有多重要？初中还是高中？竟然影响人生轨迹", bvid: "BV1Gc41127su", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/b6f42b179562b192ade8e1040d69fe0eaee768e5.jpg" },
    { id: 21, title: "初三半期考试重要吗？如何算出成都中考能得的分数？你能够到哪所高中？", bvid: "BV1Gu4y157Xr", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/a600893cf2a62ace689a546f82015938cd69ddd6.jpg" },
    { id: 22, title: "开学总是9月1号？神兽归笼的日期你还没有想过深层的原因吧？", bvid: "BV1Jc41197F8", type: "long", category: "其他", coverImage: "https://i1.hdslb.com/bfs/archive/f1d7ca3ecbc14656eb27309e15f3e297a2b6d0d3.jpg" },
    { id: 23, title: "不要纠结学区房了，3大建议给你，升学不迷茫，普娃也适用", bvid: "BV1Sa4y1X7i4", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/b90e65b1a3c9d03cd5ade3b76c8ae6f19f444247.jpg" },
    { id: 24, title: "二三圈层的娃，要不要去主城读书？有什么方式？", bvid: "BV1bC4y1n7q3", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/f6fa65e5555c2ddb1961c0cefeb82e0f58222969.jpg" },

    { id: 26, title: "成都哪个学区牛？2个片区名校扎堆，遥遥领先，看看有你的吗？", bvid: "BV1134y1A7ih", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/c16243de09b071f86cc156dd609ba67fbda2101e.jpg" },
    { id: 27, title: "今年私立初中全部学校都招不满，竟然出现100%补录的学校？为什么小升初越来越不愿意选择民办？", bvid: "BV1FP411878J", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/2479138d12356f5d2fbf753f9597e5491b56423a.jpg" },
    { id: 28, title: "小学初中都是摇号，还有好班吗？入学后是怎么分班的？", bvid: "BV1P14y127ro", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/807cb6c44ab2411e0b369085c02ded9b5826d421.jpg" },
    { id: 29, title: "通过指标到校升入高中的孩子，3年后有什么不同？命运会如何偏差？", bvid: "BV1uN4y1d7Rq", type: "long", category: "指标到校", coverImage: "https://i1.hdslb.com/bfs/archive/a36c61eae179e7a53f022bbe2d147a338bb306e0.jpg" },
    { id: 30, title: "孩子和父母一起看，小升初上岸了，给所有孩子的寄语，三年初中应该怎么度过？", bvid: "BV1xX4y1j7os", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/cb40ddb3008e162217016a94f3195337e7340be0.jpg" },
    { id: 31, title: "你要择校吗？由中考和小升初思考，如果择校，你失去的是……", bvid: "BV13P41167PV", type: "long", category: "升学规划", coverImage: "https://i1.hdslb.com/bfs/archive/1a37341ab2e2bd33b631ea802a6fb4369afcb935.jpg" },
    { id: 32, title: "带娃7000公里怎么走下来的？你能明显看到孩子的变化，暑假亲子旅行的意义", bvid: "BV1YW4y1d7cJ", type: "long", category: "亲子旅行", coverImage: "https://i1.hdslb.com/bfs/archive/b7bde90f682701c6aff2d97efb6c61fe8f1e00be.jpg" },
    { id: 33, title: "高考志愿，应该从什么时候开始关注？很可能你已经晚了", bvid: "BV14V4y1b7cM", type: "long", category: "志愿填报", coverImage: "https://i1.hdslb.com/bfs/archive/ff2a7a300e017e7a1e03fea324fcc53576ca65e4.jpg" },
    { id: 34, title: "名校竟然断档？最详细的成都中考招生录取数据分析，来看黑马和冷门", bvid: "BV17g4y1w7Z1", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/b046dd5f822896124e1953d6f291af6361b6dac1.jpg" },
    { id: 35, title: "别纠结了，保姆级中考志愿填报教程，照做就行，成绩发布当天行动指南", bvid: "BV17X4y1p7nT", type: "long", category: "志愿填报", coverImage: "https://i1.hdslb.com/bfs/archive/2d76286d6add917a93e310f850b5aa84521af2cd.jpg" },
    { id: 36, title: "中考必看，填报志愿不纠结，线差位次法轻松搞定高中选校攻略，分数不浪费", bvid: "BV1kN41167mT", type: "long", category: "志愿填报", coverImage: "https://i1.hdslb.com/bfs/archive/3c57acf013e761eccc39f389ce17b38faa004468.jpg" },
    { id: 37, title: "不知怎么选高中？中考志愿指南，成都高中5大梯队，你够到第几层？", bvid: "BV19s4y1y7TY", type: "long", category: "志愿填报", coverImage: "https://i1.hdslb.com/bfs/archive/83498689db1a029f371481ec4ff51a9ab3dfe6d0.jpg" },
    { id: 38, title: "2023中考招生计划数据大分析，还有你们最关注的区指标和项目班", bvid: "BV1eo4y1E7xy", type: "long", category: "中考政策", coverImage: "https://i1.hdslb.com/bfs/archive/917909a7b4d09b53a1c2e73046a5d2343f387733.jpg" },
    { id: 39, title: "初升高，指标到校马上要100%？升学是不是更容易了？意义与利弊", bvid: "BV1qo4y1u7nC", type: "long", category: "指标到校", coverImage: "https://i1.hdslb.com/bfs/archive/e2b02feebc1d5872174b53661ccecc417915a27c.jpg" },
    { id: 40, title: "2023成都四七九指标到校名额931个，数据详尽分析，名额都给了谁？", bvid: "BV1Yh4y1o7wF", type: "long", category: "指标到校", coverImage: "https://i1.hdslb.com/bfs/archive/6627915febfec4ea650c37f94fb67de554919a3b.jpg" },
    { id: 41, title: "定了，成都指标到校政策详细解读，你能拿到名额吗？如何录取？", bvid: "BV1Ek4y1s7mR", type: "long", category: "指标到校", coverImage: "https://i1.hdslb.com/bfs/archive/a892c6b40830ab8cb3859951f9364e4803249dc3.jpg" },

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

