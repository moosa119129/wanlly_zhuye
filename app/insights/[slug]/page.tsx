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
                    <div className="aspect-[2.35/1] relative rounded-lg overflow-hidden mb-8 bg-gradient-to-br from-slate-800 to-slate-900">
                        <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
                <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
                    <Badge variant="secondary">{article.category}</Badge>
                    {article.publishedAt && (
                        <time>{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</time>
                    )}
                </div>
                {/* 文章头图 */}
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/article-images/header.png"
                        alt="文章头图"
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* 文章尾图 */}
                <div className="mt-12 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/article-images/footer.png"
                        alt="文章尾图"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
