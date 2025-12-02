import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
    let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = []
    try {
        articles = await prisma.article.findMany({
            orderBy: { updatedAt: 'desc' }
        })
    } catch (error) {
        console.error("Failed to fetch articles:", error)
        articles = []
    }

    return (
        <div className="container py-12 px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">文章管理</h1>
                    <p className="text-muted-foreground mt-2">管理您的所有文章内容</p>
                </div>
                <Button asChild>
                    <Link href="/admin/articles/new">✍️ 撰写新文章</Link>
                </Button>
            </div>

            {articles.length > 0 ? (
                <div className="grid gap-4">
                    {articles.map((article) => (
                        <Card key={article.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CardTitle className="text-xl">
                                                {article.title}
                                            </CardTitle>
                                            {article.published ? (
                                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                    已发布
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">草稿</Badge>
                                            )}
                                        </div>
                                        {article.excerpt && (
                                            <CardDescription className="line-clamp-2">
                                                {article.excerpt}
                                            </CardDescription>
                                        )}
                                        <div className="flex gap-4 text-xs text-muted-foreground mt-3">
                                            <span>
                                                更新于 {formatDistance(new Date(article.updatedAt), new Date(), {
                                                    addSuffix: true,
                                                    locale: zhCN
                                                })}
                                            </span>
                                            {article.publishedAt && (
                                                <>
                                                    <span>·</span>
                                                    <span>
                                                        发布于 {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/articles/${article.id}/edit`}>编辑</Link>
                                        </Button>
                                        {article.published && (
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/insights/${article.slug}`} target="_blank">
                                                    预览
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p>还没有文章，开始创建第一篇吧！</p>
                </div>
            )}
        </div>
    );
}
