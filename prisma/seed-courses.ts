
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.course.deleteMany({})
    const courses = [
        {
            title: '2025最新初升高政策变化及志愿填报逻辑指南',
            description: '专业陪跑老爸，从小升初到初升高，精通成都中考逻辑。全面解读2025年最新政策变化，帮助家长和学生科学规划升学路径。',
            coverImage: '/uploads/course-2025-cover.png',
            price: '¥99',
            features: JSON.stringify(['12课时精讲', '长期有效观看', '政策深度解读', '志愿填报逻辑']),
            linkUrl: 'https://www.bilibili.com/cheese/play/ss192065874'
        },
        {
            title: '成都中考志愿填报，从基础到实战',
            description: '面面的爸爸亲授，IT大厂管理出身，20年管理教育经验。从基础知识到实战演练，手把手教你填报志愿，避免滑档风险。',
            coverImage: 'https://archive.biliimg.com/bfs/archive/c17407adbbf4d34e73631dbc10279cdbb226905b.jpg',
            price: '¥199',
            features: JSON.stringify(['8课时实战演练', '长期有效', '自主上手不滑档', '投档逻辑解析']),
            linkUrl: 'https://www.bilibili.com/cheese/play/ss24621'
        }
    ]

    for (const course of courses) {
        await prisma.course.create({
            data: course
        })
    }

    console.log('Seed data inserted')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
