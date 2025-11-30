import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(params.id) }
        });

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { title, slug, excerpt, content, coverImage, published } = body;

        const article = await prisma.article.update({
            where: { id: parseInt(params.id) },
            data: {
                title,
                slug,
                excerpt: excerpt || null,
                content,
                coverImage: coverImage || null,
                published,
                publishedAt: published ? new Date() : null
            }
        });

        return NextResponse.json(article);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.article.delete({
            where: { id: parseInt(params.id) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }
}
