import { ARTICLES } from "@/lib/static-data";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return ARTICLES.map((article) => ({
        slug: article.slug
    }))
}

interface ArticlePageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
    // Force rebuild
    const { slug } = await params
    const article = ARTICLES.find(a => a.slug === slug)

    if (!article) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title={article.title}
                description={article.excerpt || ''}
            />
            <div className="container max-w-4xl py-12 px-4 md:px-6">
                {article.coverImage && (
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
                        <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
                    <Badge variant="secondary">{article.category}</Badge>
                    {article.publishedAt && (
                        <time>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</time>
                    )}
                </div>
                <div
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
    );
}
