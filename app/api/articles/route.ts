import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');

    try {
        const articles = await prisma.article.findMany({
            where: published !== null ? { published: published === 'true' } : undefined,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, slug, excerpt, content, coverImage, published } = body;

        const article = await prisma.article.create({
            data: {
                title,
                slug,
                excerpt: excerpt || null,
                content,
                coverImage: coverImage || null,
                published: published || false,
                publishedAt: published ? new Date() : null
            }
        });

        return NextResponse.json(article);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}
