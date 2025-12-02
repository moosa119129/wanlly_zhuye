// 辅助脚本:将Markdown文章转换为HTML并提取元数据
import * as fs from 'fs';
import * as path from 'path';

interface ArticleData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    publishedAt: string;
}

// 简单的Markdown到HTML转换(移除YAML frontmatter和图片)
function markdownToHtml(markdown: string): string {
    // 移除YAML frontmatter
    let content = markdown.replace(/^---[\s\S]*?---\n/, '');

    // 移除微信公众号相关内容
    content = content.replace(/!\[.*?\]\(https:\/\/mmbiz\.qpic\.cn\/.*?\)/g, '');
    content = content.replace(/!\[.*?\]\(https:\/\/mp\.weixin\.qq\.com\/.*?\)/g, '');
    content = content.replace(/原创.*?面面的爸爸.*?\d{4}年\d{1,2}月\d{1,2}日.*?\d{1,2}:\d{2}/g, '');
    content = content.replace(/\*\*点击蓝字\s+关注面爸\*\*/g, '');
    content = content.replace(/金沙遗址博物馆/g, '');
    content = content.replace(/\*\*本篇文章约\d+字.*?\*\*/g, '');
    content = content.replace(/💌 我们的故事，未完待续 🌟……/g, '');
    content = content.replace(/\*\*愿我们所有的孩子，都有一个光明的未来\*\*/g, '');
    content = content.replace(/作者提示:.*?仅供参考/g, '');
    content = content.replace(/同步该文章/g, '');
    content = content.replace(/继续滑动看下一个/g, '');
    content = content.replace(/向上滑动看下一个/g, '');
    content = content.replace(/面面的爸爸/g, '');
    content = content.replace(/---\s*## 相关笔记[\s\S]*$/g, '');
    content = content.replace(/---\s*## 🔗 关联卡片[\s\S]*$/g, '');

    // 基本Markdown转HTML
    // 标题
    content = content.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    content = content.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    content = content.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // 粗体和斜体
    content = content.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // 引用块
    content = content.replace(/^&gt; (.+)/gm, '<blockquote>$1</blockquote>');
    content = content.replace(/^> (.+)/gm, '<blockquote>$1</blockquote>');

    // 段落(多个连续换行视为段落分隔)
    const paragraphs = content.split(/\n\n+/);
    content = paragraphs
        .map(p => {
            p = p.trim();
            if (!p) return '';
            if (p.startsWith('<h') || p.startsWith('<blockquote')) return p;
            return `<p>${p.replace(/\n/g, '<br>')}</p>`;
        })
        .filter(p => p)
        .join('\n');

    return content;
}

// 生成URL友好的slug
function generateSlug(title: string): string {
    // 移除特殊字符,保留中文、字母、数字
    const cleaned = title.replace(/[？！，。、：；""''（）【】《》…—·]/g, '');
    // 使用拼音或简单处理
    return cleaned.substring(0, 50).replace(/\s+/g, '-').toLowerCase();
}

// 提取摘要(文章开头的引用块或前100个字)
function extractExcerpt(content: string): string {
    // 尝试提取引用块
    const quoteMatch = content.match(/^> (.+)/m);
    if (quoteMatch) {
        return quoteMatch[1].trim().substring(0, 150);
    }

    // 否则取前面的文字
    const textMatch = content.match(/[^\n]+/);
    if (textMatch) {
        return textMatch[0].substring(0, 120) + '...';
    }

    return '';
}

console.log('Article conversion helper loaded.');
