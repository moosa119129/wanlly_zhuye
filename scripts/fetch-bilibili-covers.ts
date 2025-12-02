// B站视频和课程封面获取脚本

// B站视频封面获取
async function getVideoCover(bvid: string): Promise<string | null> {
    try {
        const apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        })
        const data = await response.json() as any

        if (data.code === 0 && data.data && data.data.pic) {
            // B站返回的封面URL，通常是 http://，需要转换为 https://
            return data.data.pic.replace('http://', 'https://')
        }
        return null
    } catch (error) {
        console.error(`获取视频 ${bvid} 封面失败:`, error)
        return null
    }
}

// B站课程封面获取（通过cheese API）
async function getCourseCover(ssid: string): Promise<string | null> {
    try {
        const apiUrl = `https://api.bilibili.com/pugv/view/web/season?season_id=${ssid}`
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        })
        const data = await response.json() as any

        if (data.code === 0 && data.data && data.data.cover) {
            return data.data.cover.replace('http://', 'https://')
        }
        return null
    } catch (error) {
        console.error(`获取课程 ${ssid} 封面失败:`, error)
        return null
    }
}

async function main() {
    console.log('🎬 开始获取B站封面...\n')

    // 需要获取封面的视频列表
    const videos = [
        { bvid: 'BV1j9H5eSEkt', title: '深度解析视频 3' },
        { bvid: 'BV1Gu4y157Xr', title: '学习力提升视频 1' },
        { bvid: 'BV1mm4y1u7oq', title: '学习力提升视频 2' },
        { bvid: 'BV1134y1A7ih', title: '学习力提升视频 3' }
    ]

    console.log('📹 视频封面:')
    for (const video of videos) {
        const cover = await getVideoCover(video.bvid)
        if (cover) {
            console.log(`✅ ${video.title} (${video.bvid}):`)
            console.log(`   ${cover}\n`)
        } else {
            console.log(`❌ ${video.title} (${video.bvid}): 获取失败\n`)
        }
        // 延迟避免请求过快
        await new Promise(resolve => setTimeout(resolve, 500))
    }

    // 需要获取封面的课程列表（从URL中提取season_id）
    const courses = [
        { ssid: '192065874', title: '2025最新初升高政策变化及志愿填报逻辑指南' },
        { ssid: '24621', title: '成都中考志愿填报，从基础到实战' }
    ]

    console.log('\n🎓 课程封面:')
    for (const course of courses) {
        const cover = await getCourseCover(course.ssid)
        if (cover) {
            console.log(`✅ ${course.title} (ss${course.ssid}):`)
            console.log(`   ${cover}\n`)
        } else {
            console.log(`❌ ${course.title} (ss${course.ssid}): 获取失败\n`)
        }
        await new Promise(resolve => setTimeout(resolve, 500))
    }

    console.log('✨ 完成!')
}

main().catch(console.error)
