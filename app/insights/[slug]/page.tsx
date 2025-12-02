import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ArticleCoverImage } from "@/components/article-cover-image";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
    const articles = await prisma.article.findMany({
        select: { slug: true }
    });
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

interface ArticlePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
        where: { slug }
    });

    if (!article) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section with Cover Image */}
            {/* Hero Section with Cover Image */}
            <div className="relative w-full h-[400px] overflow-hidden">
                <ArticleCoverImage
                    src={article.coverImage}
                    alt={article.title}
                />
            </div>

            {/* Article Content */}
            <article className="w-full max-w-4xl mx-auto py-12 px-6 md:px-8 lg:px-12">
                {/* Title and Meta */}
                <header className="mb-10">
                    <div className="mb-4">
                        <Badge variant="outline" className="text-primary border-primary/50">
                            {article.category}
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        {article.title}
                    </h1>
                    {article.excerpt && (
                        <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
                            {article.excerpt}
                        </p>
                    )}
                    {article.publishedAt && (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground border-l-2 border-primary pl-4">
                            <time dateTime={article.publishedAt.toISOString()}>
                                {new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <span>·</span>
                            <span>
                                {formatDistance(new Date(article.publishedAt), new Date(), {
                                    addSuffix: true,
                                    locale: zhCN
                                })}
                            </span>
                        </div>
                    )}
                </header>

                {/* Article Body */}
                <div
                    className="prose prose-lg prose-slate dark:prose-invert max-w-none
                               prose-headings:font-bold prose-headings:tracking-tight prose-headings:mb-4 prose-headings:mt-8
                               prose-h1:text-3xl prose-h1:mb-6
                               prose-h2:text-2xl prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                               prose-h3:text-xl
                               prose-p:text-base prose-p:leading-8 prose-p:mb-6 prose-p:text-foreground
                               prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                               prose-strong:text-foreground prose-strong:font-semibold
                               prose-ul:my-6 prose-ol:my-6 prose-li:my-2
                               prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
                               prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
                               prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:p-4 prose-pre:rounded-lg
                               prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
        </div>
    );
}
