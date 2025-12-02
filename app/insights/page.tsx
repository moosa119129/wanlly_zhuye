import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <Link key={article.id} href={`/insights/${article.slug}`} className="group" target="_blank" rel="noopener noreferrer">
                                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col">
                                    {article.coverImage && (
                                        <div className="aspect-video bg-muted relative overflow-hidden">
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                referrerPolicy="no-referrer"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                                    {article.category}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                    <CardHeader className="flex-1">
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
