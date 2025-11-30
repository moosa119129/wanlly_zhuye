import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
    const articles = await prisma.article.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' }
    });

    return (
        <div className="flex flex-col min-h-screen">
            <PageHeader
                title="💡 观点与思考"
                description="深度文章与独立见解，记录成长与思考的轨迹。"
            />
            <div className="container py-12 px-4 md:px-6">
                {articles.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-6">
                        {articles.map((article) => (
                            <Link key={article.id} href={`/insights/${article.slug}`} className="w-full max-w-sm">
                                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
                                    {article.coverImage && (
                                        <div className="aspect-video bg-muted relative overflow-hidden">
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                                            {article.title}
                                        </CardTitle>
                                        {article.excerpt && (
                                            <CardDescription className="line-clamp-3 mt-2">
                                                {article.excerpt}
                                            </CardDescription>
                                        )}
                                        {article.publishedAt && (
                                            <p className="text-xs text-muted-foreground mt-2">
                                                {formatDistance(new Date(article.publishedAt), new Date(), {
                                                    addSuffix: true,
                                                    locale: zhCN
                                                })}
                                            </p>
                                        )}
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>暂无文章，敬请期待...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
