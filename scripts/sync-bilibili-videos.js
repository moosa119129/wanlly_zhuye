/**
 * B站视频同步脚本
 * 使用方法：
 * 1. 在B站个人主页打开浏览器控制台（F12 -> Console）
 * 2. 运行下面的"浏览器代码"
 * 3. 将复制的JSON保存到 scripts/bilibili-videos.json
 * 4. 运行: node scripts/sync-bilibili-videos.js
 */

const fs = require('fs');
const path = require('path');

// 配置
const PINNED_VIDEOS = [
    'BV1mm4y1u7oq',  // 中考改革
    'BV1SvZmYqE7B',  // 李宗盛
    'BV1yV4y1r74a'   // 中考总分710分
];

const EXCLUDED_BVIDS = [
    // 在这里添加不想显示的视频BV号
];

// 分类映射规则
function categorizeVideo(title) {
    if (title.includes('中考') && (title.includes('政策') || title.includes('改革') || title.includes('总分') || title.includes('招生'))) {
        return '中考政策';
    }
    if (title.includes('志愿') || title.includes('填报') || title.includes('录取') || title.includes('断档'))) {
        return '志愿填报';
    }
    if (title.includes('指标到校') || title.includes('四七九指标')) {
        return '指标到校';
    }
    if (title.includes('升学') || title.includes('规划') || title.includes('小升初') || title.includes('初升高') || title.includes('择校') || title.includes('学区')) {
        return '升学规划';
    }
    if (title.includes('自驾') || title.includes('旅行') || title.includes('公里')) {
        return '亲子旅行';
    }
    return '其他';
}

async function syncVideos() {
    console.log('🎬 开始同步B站视频...\n');

    // 读取从B站提取的JSON数据
    const jsonPath = path.join(__dirname, 'bilibili-videos.json');

    if (!fs.existsSync(jsonPath)) {
        console.error('❌ 错误: 找不到 bilibili-videos.json 文件');
        console.log('\n📝 请先执行以下步骤：');
        console.log('1. 打开B站个人主页: https://space.bilibili.com/284427802/video');
        console.log('2. 按F12打开控制台，粘贴并运行浏览器代码（见文件头部注释）');
        console.log('3. 将复制的数据保存为 scripts/bilibili-videos.json');
        console.log('4. 重新运行本脚本\n');
        process.exit(1);
    }

    let rawVideos;
    try {
        rawVideos = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    } catch (error) {
        console.error('❌ JSON文件格式错误:', error.message);
        process.exit(1);
    }

    // 过滤和处理视频
    const videos = rawVideos
        .filter(v => v.bvid && !EXCLUDED_BVIDS.includes(v.bvid))
        .map((v, index) => ({
            id: index + 1,
            title: v.title,
            bvid: v.bvid,
            type: 'long',
            category: categorizeVideo(v.title),
            coverImage: v.cover
        }));

    // 置顶视频
    const pinnedVideos = [];
    const otherVideos = [];

    videos.forEach(video => {
        if (PINNED_VIDEOS.includes(video.bvid)) {
            const pinnedIndex = PINNED_VIDEOS.indexOf(video.bvid);
            pinnedVideos[pinnedIndex] = video;
        } else {
            otherVideos.push(video);
        }
    });

    // 重新分配ID
    const finalVideos = [...pinnedVideos.filter(Boolean), ...otherVideos].map((v, i) => ({
        ...v,
        id: i + 1
    }));

    console.log(`✅ 成功处理 ${finalVideos.length} 个视频`);
    console.log(`   - 置顶视频: ${pinnedVideos.filter(Boolean).length} 个`);
    console.log(`   - 其他视频: ${otherVideos.length} 个\n`);

    // 统计分类
    const categories = {};
    finalVideos.forEach(v => {
        categories[v.category] = (categories[v.category] || 0) + 1;
    });
    console.log('📊 分类统计:');
    Object.entries(categories).forEach(([cat, count]) => {
        console.log(`   - ${cat}: ${count} 个`);
    });

    // 更新 static-data.ts
    const dataPath = path.join(__dirname, '../lib/static-data.ts');
    let content = fs.readFileSync(dataPath, 'utf-8');

    // 生成新的 VIDEOS 数组代码
    const videoCode = `export const VIDEOS: Video[] = [
    // 置顶视频
${pinnedVideos.filter(Boolean).map(v =>
        `    { id: ${v.id}, title: "${v.title}", bvid: "${v.bvid}", type: "${v.type}", category: "${v.category}", coverImage: "${v.coverImage}" }`
    ).join(',\n')}${otherVideos.length > 0 ? ',\n    // 其他视频' : ''}
${otherVideos.map(v =>
        `    { id: ${v.id}, title: "${v.title}", bvid: "${v.bvid}", type: "${v.type}", category: "${v.category}", coverImage: "${v.coverImage}" }`
    ).join(',\n')}
]`;

    // 替换原有的 VIDEOS 数组
    const videosRegex = /export const VIDEOS: Video\[\] = \[[\s\S]*?\n\]/;
    content = content.replace(videosRegex, videoCode);

    fs.writeFileSync(dataPath, content, 'utf-8');
    console.log('\n✅ 已更新 lib/static-data.ts');
    console.log('🎉 同步完成！刷新浏览器即可看到最新视频\n');
}

syncVideos().catch(console.error);
