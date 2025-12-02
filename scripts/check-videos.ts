import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const videos = await prisma.video.findMany()
    console.log('Total videos:', videos.length)
    console.log('Categories:', [...new Set(videos.map(v => v.category))])
    console.log('Videos:', JSON.stringify(videos, null, 2))
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
