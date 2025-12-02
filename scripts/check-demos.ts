import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const demos = await prisma.appDemo.findMany()
    console.log('AppDemos:', JSON.stringify(demos, null, 2))
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
