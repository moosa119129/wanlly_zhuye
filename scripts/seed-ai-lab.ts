import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const demo = await prisma.appDemo.create({
        data: {
            title: 'AI 写作助手',
            description: '基于 LLM 的智能写作辅助工具，可以帮助你快速生成文章大纲、润色段落和纠正语法错误。',
            status: 'Live',
            linkUrl: 'https://example.com/writer',
            coverImage: 'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
    })

    await prisma.appDemo.create({
        data: {
            title: '智能代码审查',
            description: '自动分析代码质量，发现潜在 Bug 和安全漏洞，并提供优化建议。',
            status: 'Building',
            linkUrl: '#',
            coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
    })

    console.log('Created demo:', demo)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
