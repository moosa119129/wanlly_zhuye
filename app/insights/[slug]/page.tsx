import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
    params: {
        slug: string;
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const article = await prisma.article.findFirst({
        where: {
            slug: params.slug,
            published: true
        }
    });

    if (!article) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section with Cover Image */}
            {article.coverImage && (
                <div className="relative w-full h-[400px] overflow-hidden">
                    <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
            )}

            {/* Article Content */}
            <article className="container max-w-4xl py-12 px-4 md:px-6">
                {/* Title and Meta */}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-4">
                        {article.title}
                    </h1>
                    {article.excerpt && (
                        <p className="text-xl text-muted-foreground mb-4">
                            {article.excerpt}
                        </p>
                    )}
                    {article.publishedAt && (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                    className="prose prose-slate dark:prose-invert max-w-none
                               prose-headings:font-bold prose-headings:tracking-tight
                               prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                               prose-p:text-base prose-p:leading-7
                               prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                               prose-img:rounded-lg prose-img:shadow-lg
                               prose-pre:bg-slate-900 prose-pre:text-slate-50"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
        </div>
    );
}
