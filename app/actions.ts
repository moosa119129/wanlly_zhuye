'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function saveVideo(formData: FormData) {
    const bvid = formData.get('bvid') as string

    if (!bvid) {
        console.error('BV ID is required')
        return
    }

    try {
        // In a real app, we might fetch video details from Bilibili API here
        // For now, we just save the BV ID and some default values
        await prisma.video.create({
            data: {
                title: `Video ${bvid}`, // Placeholder title
                bvid: bvid,
                type: 'long',
            },
        })

        revalidatePath('/admin')
    } catch (error) {
        console.error('Failed to save video:', error)
    }
}

export async function joinWaitlist(formData: FormData) {
    const email = formData.get('email') as string
    const demoId = formData.get('demoId') as string

    if (!email || !demoId) {
        return
    }

    console.log(`User ${email} joined waitlist for demo ${demoId}`)

    // In a real app, we would save this to a database table like `Waitlist`
    // await prisma.waitlist.create({ data: { email, demoId: parseInt(demoId) } })

    revalidatePath(`/ai-lab/${demoId}`)
}

export async function saveWiseFillRecord(data: {
    name: string
    phone: string
    score: number
    volunteers: any[]
}) {
    try {
        await prisma.wiseFillRecord.create({
            data: {
                name: data.name,
                phone: data.phone,
                score: data.score,
                volunteers: JSON.stringify(data.volunteers),
            },
        })
        return { success: true }
    } catch (error) {
        console.error("Failed to save WiseFill record:", error)
        return { success: false, error: "Failed to save record" }
    }
}
