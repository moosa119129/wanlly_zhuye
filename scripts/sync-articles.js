/**
 * Obsidian 文章同步脚本
 * 
 * 功能：
 * 1. 读取 Obsidian 公众号文章库中的 Markdown 文件
 * 2. 解析 YAML frontmatter，筛选 status: 🚀 已发布 的文章
 * 3. 下载/复制图片到 public/articles/images/
 * 4. 转换 Markdown 为 HTML
 * 5. 生成 lib/articles-data.json
 * 
 * 用法：
 *   node scripts/sync-articles.js [vault-path]
 *   例如：node scripts/sync-articles.js "D:\MMDBB_vault"
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const { pinyin } = require('pinyin-pro');
const https = require('https');
const http = require('http');

// 配置
const CONFIG = {
    // Obsidian 文章库相对于 vault 根目录的路径
    articlesPath: '20 Areas/Education/公众号文章库',
    // 输出的 JSON 文件路径
    outputJsonPath: 'lib/articles-data.json',
    // 图片输出目录
    imagesOutputDir: 'public/articles/images',
    // 发布状态标记
    publishedStatus: '🚀 已发布',
};

/**
 * 中文转拼音 slug
 */
function toSlug(title) {
    // 移除特殊字符，中文转拼音
    const pinyinStr = pinyin(title, { toneType: 'none', type: 'array' }).join('-');
    return pinyinStr
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // 移除非字母数字
        .replace(/\s+/g, '-')     // 空格转连字符
        .replace(/-+/g, '-')      // 多个连字符合并
        .replace(/^-|-$/g, '')    // 移除首尾连字符
        .substring(0, 80);        // 限制长度
}

/**
 * 下载图片
 */
function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;

        const request = protocol.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://mp.weixin.qq.com/'
            }
        }, (response) => {
            // 处理重定向
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download: ${response.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(destPath);
            response.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve(destPath);
            });
            fileStream.on('error', reject);
        });

        request.on('error', reject);
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error('Download timeout'));
        });
    });
}

/**
 * 生成图片文件名
 */
function generateImageFileName(url, slug, index) {
    // 从 URL 中提取扩展名
    let ext = '.jpg';
    if (url.includes('wx_fmt=png')) ext = '.png';
    else if (url.includes('wx_fmt=gif')) ext = '.gif';
    else if (url.includes('wx_fmt=webp')) ext = '.webp';
    else if (url.match(/\.(png|jpg|jpeg|gif|webp)/i)) {
        const match = url.match(/\.(png|jpg|jpeg|gif|webp)/i);
        ext = '.' + match[1].toLowerCase();
    }

    return `${slug}-img-${index}${ext}`;
}

/**
 * 处理文章中的图片
 */
async function processImages(content, slug, vaultPath, imagesDir) {
    let processedContent = content;
    const imageMap = new Map();
    let imageIndex = 0;

    // 匹配 Markdown 图片语法: ![alt](url) 和 Obsidian 语法: ![[image.png]]
    const mdImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const obsidianImageRegex = /!\[\[([^\]]+)\]\]/g;

    // 处理标准 Markdown 图片
    let match;
    const imagesToDownload = [];

    while ((match = mdImageRegex.exec(content)) !== null) {
        const [fullMatch, alt, url] = match;

        // 跳过已处理的
        if (imageMap.has(url)) continue;

        // 跳过 data URL
        if (url.startsWith('data:')) continue;

        // 跳过无效的 SVG placeholder
        if (url.includes("www.w3.org/2000/svg")) continue;

        imageIndex++;
        const fileName = generateImageFileName(url, slug, imageIndex);
        const localPath = `/articles/images/${fileName}`;
        const destPath = path.join(imagesDir, fileName);

        imageMap.set(url, { localPath, destPath, alt });
        imagesToDownload.push({ url, destPath, fileName });
    }

    // 下载图片
    for (const { url, destPath, fileName } of imagesToDownload) {
        if (fs.existsSync(destPath)) {
            console.log(`  ⏭️  图片已存在: ${fileName}`);
            continue;
        }

        try {
            console.log(`  ⬇️  下载图片: ${fileName}`);
            await downloadImage(url, destPath);
        } catch (error) {
            console.log(`  ❌ 下载失败: ${fileName} - ${error.message}`);
        }
    }

    // 替换图片 URL
    for (const [originalUrl, { localPath, alt }] of imageMap) {
        const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`!\\[([^\\]]*)\\]\\(${escapedUrl}\\)`, 'g');
        processedContent = processedContent.replace(regex, `![${alt || '图片'}](${localPath})`);
    }

    // 处理 Obsidian 本地图片语法 ![[image.png]]
    const obsidianMatches = [...content.matchAll(obsidianImageRegex)];
    for (const match of obsidianMatches) {
        const imageName = match[1];
        // 查找图片文件（可能在 attachments 子目录或其他位置）
        const possiblePaths = [
            path.join(vaultPath, CONFIG.articlesPath, 'attachments', imageName),
            path.join(vaultPath, CONFIG.articlesPath, imageName),
            path.join(vaultPath, 'attachments', imageName),
        ];

        let foundPath = null;
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                foundPath = p;
                break;
            }
        }

        if (foundPath) {
            imageIndex++;
            const ext = path.extname(imageName);
            const fileName = `${slug}-local-${imageIndex}${ext}`;
            const destPath = path.join(imagesDir, fileName);
            const localPath = `/articles/images/${fileName}`;

            if (!fs.existsSync(destPath)) {
                console.log(`  📋 复制本地图片: ${fileName}`);
                fs.copyFileSync(foundPath, destPath);
            }

            processedContent = processedContent.replace(match[0], `![${imageName}](${localPath})`);
        }
    }

    return { content: processedContent, coverImage: imageMap.size > 0 ? [...imageMap.values()][0].localPath : null };
}

/**
 * 清理文章内容
 */
function cleanContent(content) {
    return content
        // 移除公众号特有的装饰文本
        .replace(/点击蓝字\s*关注.*$/gm, '')
        .replace(/原创.*\[.*\].*\*\d{4}年.*$/gm, '')
        .replace(/继续滑动看下一个/g, '')
        .replace(/向上滑动看下一个/g, '')
        .replace(/同步该文章/g, '')
        .replace(/作者提示:.*$/gm, '')
        // 移除 Obsidian 内部链接 [[link]]
        .replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (match, link, alias) => alias || link)
        // 移除多余空行
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/**
 * 解析单篇文章
 */
async function parseArticle(filePath, vaultPath, imagesDir, id) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    // 检查发布状态
    if (frontmatter.status !== CONFIG.publishedStatus) {
        return null;
    }

    const fileName = path.basename(filePath, '.md');
    const slug = toSlug(fileName);

    console.log(`📄 处理文章: ${fileName}`);

    // 处理图片
    const { content: processedContent, coverImage } = await processImages(content, slug, vaultPath, imagesDir);

    // 清理内容
    const cleanedContent = cleanContent(processedContent);

    // 转换为 HTML
    const htmlContent = marked.parse(cleanedContent);

    // 提取摘要（第一个 blockquote 或前200字）
    let excerpt = '';
    const blockquoteMatch = cleanedContent.match(/^>\s*(.+)$/m);
    if (blockquoteMatch) {
        excerpt = blockquoteMatch[1].trim();
    } else {
        // 移除 Markdown 语法，取前200字
        excerpt = cleanedContent
            .replace(/^#+\s+.+$/gm, '')
            .replace(/!\[.*?\]\(.*?\)/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/[*_`#]/g, '')
            .trim()
            .substring(0, 200);
    }

    return {
        id,
        title: fileName,
        slug,
        category: frontmatter.topic || '升学规划',
        excerpt,
        content: htmlContent,
        coverImage: coverImage || null,
        published: true,
        publishedAt: frontmatter['publish-date'] || frontmatter.created || new Date().toISOString().split('T')[0],
        createdAt: frontmatter.created || new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
    };
}

/**
 * 主函数
 */
async function main() {
    // 获取 vault 路径
    const vaultPath = process.argv[2] || 'D:\\MMDBB_vault';
    const articlesDir = path.join(vaultPath, CONFIG.articlesPath);

    console.log('🚀 Obsidian 文章同步脚本');
    console.log(`📁 Vault 路径: ${vaultPath}`);
    console.log(`📁 文章目录: ${articlesDir}`);

    // 检查目录是否存在
    if (!fs.existsSync(articlesDir)) {
        console.error(`❌ 文章目录不存在: ${articlesDir}`);
        process.exit(1);
    }

    // 确保图片输出目录存在
    const imagesDir = path.resolve(CONFIG.imagesOutputDir);
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
        console.log(`📁 创建图片目录: ${imagesDir}`);
    }

    // 获取所有 Markdown 文件
    const files = fs.readdirSync(articlesDir)
        .filter(f => f.endsWith('.md') && !f.startsWith('.'));

    console.log(`📝 找到 ${files.length} 个文章文件`);

    // 解析所有文章
    const articles = [];
    let id = 1;

    for (const file of files) {
        const filePath = path.join(articlesDir, file);
        const article = await parseArticle(filePath, vaultPath, imagesDir, id);

        if (article) {
            articles.push(article);
            id++;
        }
    }

    console.log(`\n✅ 已处理 ${articles.length} 篇已发布文章`);

    // 按发布日期排序（最新的在前）
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // 写入 JSON 文件
    const outputPath = path.resolve(CONFIG.outputJsonPath);
    fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf-8');
    console.log(`📄 已生成: ${outputPath}`);

    // 输出统计
    console.log('\n📊 统计:');
    console.log(`   - 已发布文章: ${articles.length}`);
    console.log(`   - 跳过的文章: ${files.length - articles.length}`);
}

main().catch(console.error);
