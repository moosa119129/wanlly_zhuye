import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.video.deleteMany()
    await prisma.appDemo.deleteMany()
    await prisma.article.deleteMany()

    // 3个中视频 (Long Form) - User requested videos
    await prisma.video.createMany({
        data: [
            {
                title: "10天3600公里，酷暑下的晋豫环线亲子自驾游，详细路书已出",
                bvid: "BV1EitvzXERP",
                type: "long",
                coverImage: "https://i0.hdslb.com/bfs/archive/6e8fe5b328696b94e4ec8ad6d63f570843c87e8c.jpg"
            },
            {
                title: "一首新写的旧歌，它早该写了，轻易不敢翻唱的一首……cover:李宗盛",
                bvid: "BV1SvZmYqE7B",
                type: "long",
                coverImage: "https://i2.hdslb.com/bfs/archive/96e92d25a6d632aa49b56d68172c81c12809ed28.jpg"
            },
            {
                title: "你考虑过高中分班问题吗？文科没有实验班，文科生出路在哪？",
                bvid: "BV1At421b7K7",
                type: "long",
                coverImage: "https://i1.hdslb.com/bfs/archive/8b3f109462f353eef7b5919fb6d86fb81e028c21.jpg"
            },
        ]
    })

    // 3个短视频 (Short Form)
    await prisma.video.createMany({
        data: [
            { title: "短视频示例1", bvid: "BV1ab4y1H7kL", type: "short", coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
            { title: "短视频示例2", bvid: "BV1CD4y1D7mQ", type: "short", coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f" },
            { title: "短视频示例3", bvid: "BV1Ef4y1S7nR", type: "short", coverImage: "https://images.unsplash.com/photo-1531297420497-356454371425" },
        ]
    })

    // 插入 AI 应用数据
    await prisma.appDemo.createMany({
        data: [
            {
                title: "中考投档模拟系统",
                description: "基于投档逻辑的模拟系统，直观展示投档过程。",
                status: "Live",
                linkUrl: "/toudang.html",
                coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71" // 数据/图表类配图
            },
            {
                title: "AI辅助中考志愿填报系统",
                description: "基于数据分析的志愿填报辅助工具，帮助家长做出明智选择。",
                status: "Live",
                linkUrl: "/ai-lab/wisefill",
                coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97" // 教育/AI类配图
            }
        ]
    })

    // 插入示例文章
    await prisma.article.createMany({
        data: [
            {
                title: "如何利用 AI 提升编程效率",
                slug: "ai-programming-efficiency",
                excerpt: "探讨如何通过 AI 辅助工具如 Cursor、GitHub Copilot 等，将编程效率提升 10 倍。",
                content: `<h2>引言</h2><p>在当今快速发展的技术环境中，AI 辅助编程工具正在改变我们的工作方式。</p><h2>主要工具</h2><ul><li>Cursor - 智能代码编辑器</li><li>GitHub Copilot - AI 代码助手</li><li>ChatGPT - 问题解答与调试</li></ul><h2>实践建议</h2><p>将这些工具结合使用，可以显著提升开发效率。关键在于理解工具的优势，并在合适的场景中使用。</p>`,
                coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
                published: true,
                publishedAt: new Date('2025-11-20')
            },
            {
                title: "中考志愿填报的数据分析思路",
                slug: "zhongkao-data-analysis",
                excerpt: "用数据驱动的方法，帮助家长和学生做出更明智的升学决策。",
                content: `<h2>为什么需要数据分析</h2><p>中考志愿填报是一个信息不对称的过程，通过数据分析可以更好地理解学校的真实水平。</p><h2>关键指标</h2><ol><li>中考平均分</li><li>高考本科率</li><li>特殊类型招生比例</li></ol><h2>分析方法</h2><p>建议家长收集近3年数据，进行横向和纵向对比，找出规律和趋势。</p>`,
                coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070",
                published: true,
                publishedAt: new Date('2025-11-25')
            },
            {
                title: "个人知识管理系统搭建指南",
                slug: "personal-knowledge-management",
                excerpt: "使用 Obsidian 构建第二大脑，实现知识的沉淀与复利增长。",
                content: `<h2>什么是个人知识管理</h2><p>PKM (Personal Knowledge Management) 是一个持续学习、整理、应用知识的过程。</p><h2>工具选择</h2><p>推荐使用 Obsidian，因为它基于本地文件，支持 Markdown，并有强大的双向链接功能。</p><blockquote>知识的价值在于连接与应用</blockquote>`,
                coverImage: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070",
                published: false,
                publishedAt: null
            }
        ]
    })

    // 插入课程数据
    await prisma.course.createMany({
        data: [
            {
                title: "中考志愿填报：从入门到精通",
                description: "全面解析中考政策，教你如何科学填报志愿，规避风险，锁定理想高中。",
                coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070",
                price: "¥99",
                features: JSON.stringify(["政策解读", "数据分析", "案例实战", "一对一答疑"]),
                linkUrl: "https://www.bilibili.com/"
            },
            {
                title: "高中生涯规划与选科指导",
                description: "提前规划高中三年，科学选择选考科目，为高考打下坚实基础。",
                coverImage: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074",
                price: "¥199",
                features: JSON.stringify(["生涯测评", "选科策略", "大学专业关联", "名校学长分享"]),
                linkUrl: "https://www.bilibili.com/"
            },
            {
                title: "高效学习法：引爆你的学习力",
                description: "掌握科学的学习方法，提升记忆力、专注力和理解力，让学习事半功倍。",
                coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070",
                price: "¥59",
                features: JSON.stringify(["费曼学习法", "番茄工作法", "思维导图", "错题管理"]),
                linkUrl: "https://www.bilibili.com/"
            }
        ]
    })
}


main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
