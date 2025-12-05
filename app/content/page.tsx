import { PageHeader } from "@/components/page-header";
import { ARTICLES, VIDEOS, PODCASTS } from "@/lib/static-data";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, FileText, Mic, ArrowRight, Clock } from "lucide-react";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";

export default function ContentPage() {
    // Get top 3 items for each category
    // Force rebuild
    const featuredVideos = VIDEOS.slice(0, 3);
    const featuredArticles = ARTICLES.filter(a => a.published).slice(0, 3);
    const featuredPodcasts = PODCASTS.slice(0, 3);

    return (
        <div className="flex flex-col">
            <PageHeader
                title="💎 精品内容"
                description="汇聚深度解析视频、专业教育文章与前沿播客，为您提供全方位的教育视野。"
            />

            <div className="container py-12 px-4 md:px-6 space-y-20">

                {/* Videos Section */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <PlayCircle className="w-6 h-6 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">深度视频</h2>
                        </div>
                        <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
                            <Link href="/videos" className="flex items-center gap-1">
                                查看全部 <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredVideos.map((video) => (
                            <Link key={video.id} href={video.bvid ? `https://www.bilibili.com/video/${video.bvid}` : "#"} target="_blank" className="group">
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={video.coverImage || "/placeholder.png"}
                                            alt={video.title}
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                        <div className="absolute bottom-2 right-2">
                                            <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm border-none">
                                                {video.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="line-clamp-2 text-base group-hover:text-blue-500 transition-colors">
                                            {video.title}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Articles Section */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <FileText className="w-6 h-6 text-purple-500" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">教育文章</h2>
                        </div>
                        <Button variant="ghost" asChild className="text-muted-foreground hover:text-primary">
                            <Link href="/insights" className="flex items-center gap-1">
                                查看全部 <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredArticles.map((article) => (
                            <Link key={article.id} href={`/insights/${article.slug}`} target="_blank" className="group">
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col">
                                    {article.coverImage && (
                                        <div className="aspect-[2/1] relative overflow-hidden">
                                            <img
                                                src={article.coverImage}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                                    {article.category}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                    <CardHeader className="flex-1">
                                        <CardTitle className="line-clamp-2 text-lg group-hover:text-purple-500 transition-colors">
                                            {article.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2 mt-2">
                                            {article.excerpt}
                                        </CardDescription>
                                        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            {article.publishedAt && formatDistance(new Date(article.publishedAt), new Date(), { addSuffix: true, locale: zhCN })}
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Podcasts Section */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500/10 rounded-lg">
                                <Mic className="w-6 h-6 text-orange-500" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">精品播客</h2>
                        </div>
                        {/* No "View All" for now as it's a new section */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredPodcasts.map((podcast) => (
                            <div key={podcast.id} className="group cursor-pointer">
                                <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
                                    <div className="aspect-square relative overflow-hidden">
                                        <img
                                            src={podcast.coverImage}
                                            alt={podcast.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                                <PlayCircle className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2">
                                            <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm border-none flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {podcast.duration}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="line-clamp-1 text-lg group-hover:text-orange-500 transition-colors">
                                            {podcast.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2 mt-2">
                                            {podcast.description}
                                        </CardDescription>
                                        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                                            <span>发布于 {new Date(podcast.publishedAt).toLocaleDateString('zh-CN')}</span>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
