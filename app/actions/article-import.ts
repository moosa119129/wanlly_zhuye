'use server'

import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

export async function importWeChatArticle(url: string) {
    if (!url) {
        return { error: 'URL is required' };
    }

    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // WeChat articles usually have content in #js_content
        const contentHtml = $('#js_content').html();

        if (!contentHtml) {
            return { error: 'Could not find article content' };
        }

        const title = $('#activity-name').text().trim();
        const author = $('#js_name').text().trim();

        const turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced'
        });

        // Custom rule to handle WeChat images (data-src to src)
        turndownService.addRule('wechatImages', {
            filter: 'img',
            replacement: function (content, node) {
                const element = node as HTMLElement;
                const src = element.getAttribute('data-src') || element.getAttribute('src');
                const alt = element.getAttribute('alt') || '';
                return src ? `![${alt}](${src})` : '';
            }
        });

        const markdown = turndownService.turndown(contentHtml);

        return {
            title,
            author,
            content: markdown
        };
    } catch (error) {
        console.error('Import error:', error);
        return { error: 'Failed to import article' };
    }
}
